const legacyOwnerKey = 'moyang:mock-storage-legacy-owner';
const legacyReaders = new Map();
const legacyMigrations = new Map();
const migratingKeys = new Set();
export const mockStorageLock = 'moyang:mock-storage';
export class MockStorageUnavailableError extends Error {
    constructor() {
        super('저장된 자료를 확인하지 못했어요. 브라우저 설정을 확인한 뒤 다시 시도해 주세요.');
    }
}
const getAccountSuffix = () => {
    return '';
};
const keyWithAccount = (key, suffix) => `${key}${suffix || ':guest'}`;
const readSessionStorage = (key) => {
    try {
        return sessionStorage.getItem(key);
    }
    catch {
        throw new MockStorageUnavailableError();
    }
};
const ownedSessionPrefix = (key, scope) => `moyang:mock-storage-owned-session:${encodeURIComponent(scope)}:${encodeURIComponent(key)}:`;
const isAccountScope = (scope) => scope !== null && scope.startsWith('moyang:user:') && scope.length > 'moyang:user:'.length;
const backupSession = (sourceKey, prefix, keepLatest = false) => {
    try {
        const saved = readSessionStorage(sourceKey);
        if (saved === null)
            return;
        let timestamp = Date.now();
        let matchingKey;
        const tabKey = `${prefix}last-backup`;
        const previousBackup = keepLatest ? readSessionStorage(tabKey) : null;
        for (let index = 0; index < localStorage.length; index += 1) {
            const backupKey = localStorage.key(index);
            if (!backupKey?.startsWith(prefix))
                continue;
            const previousTime = Number(backupKey.slice(prefix.length).split(':')[0]);
            if (localStorage.getItem(backupKey) === saved) {
                if (backupKey === previousBackup)
                    return;
                matchingKey = backupKey;
            }
            if (Number.isFinite(previousTime)) {
                timestamp = Math.max(timestamp, previousTime + 1);
            }
        }
        if (matchingKey && (!keepLatest || !previousBackup)) {
            if (keepLatest)
                sessionStorage.setItem(tabKey, matchingKey);
            return;
        }
        const backupKey = `${prefix}${timestamp}:${crypto.randomUUID()}`;
        localStorage.setItem(backupKey, saved);
        if (keepLatest)
            sessionStorage.setItem(tabKey, backupKey);
    }
    catch {
        // 백업에 실패해도 세션 원본은 삭제하지 않는다.
    }
};
const backupOwnedSession = (key) => {
    const owner = localStorage.getItem(legacyOwnerKey);
    if (isAccountScope(owner))
        backupSession(key, ownedSessionPrefix(key, owner), true);
    try {
        const prefix = `${key}:user:`;
        for (let index = 0; index < sessionStorage.length; index += 1) {
            const sourceKey = sessionStorage.key(index);
            if (!sourceKey?.startsWith(prefix) || sourceKey.length === prefix.length)
                continue;
            const scope = `moyang${sourceKey.slice(key.length)}`;
            backupSession(sourceKey, ownedSessionPrefix(sourceKey, scope), true);
        }
    }
    catch {
        // 접근할 수 없는 세션 원본은 그대로 보관한다.
    }
};
const backupUnownedSession = (key) => {
    const owner = localStorage.getItem(legacyOwnerKey);
    const sourceKeys = isAccountScope(owner) ? [`${key}:guest`] : [key, `${key}:guest`];
    for (const sourceKey of sourceKeys) {
        backupSession(sourceKey, `moyang:mock-storage-backup:session:${encodeURIComponent(sourceKey)}:`);
    }
};
export const getMockStorageKey = (key) => keyWithAccount(key, getAccountSuffix());
export const withMockStorageLock = async (key, update, signal) => {
    signal?.throwIfAborted();
    const accountKey = getMockStorageKey(key);
    const applyUpdate = () => {
        signal?.throwIfAborted();
        if (accountKey !== getMockStorageKey(key))
            throw new Error('로그인 정보가 변경됐어요');
        return update();
    };
    if (!navigator.locks)
        return applyUpdate();
    return navigator.locks.request(mockStorageLock, { signal }, applyUpdate);
};
export const getMockStorageScope = (token) => {
    try {
        return `moyang${getAccountSuffix(token)}`;
    }
    catch {
        return null;
    }
};
export const writeMockStorage = (key, data) => {
    readSessionStorage(key);
    localStorage.setItem(key, JSON.stringify(data));
};
export const readMockStorage = (key, parse, forWrite = false) => {
    const suffix = getAccountSuffix();
    const accountSuffix = suffix || ':guest';
    const readLegacy = key.endsWith(accountSuffix)
        ? legacyReaders.get(key.slice(0, -accountSuffix.length))
        : undefined;
    const local = localStorage.getItem(key);
    let session = null;
    let sessionUnavailable = false;
    if (local === null || readLegacy || forWrite) {
        try {
            session = readSessionStorage(key);
        }
        catch (error) {
            if (forWrite)
                throw error;
            sessionUnavailable = true;
        }
    }
    const saved = readLegacy?.(local, session, suffix, forWrite) ?? local ?? session;
    if (saved === null && sessionUnavailable)
        throw new MockStorageUnavailableError();
    if (saved === null)
        return null;
    return parse(saved);
};
const migrateRegisteredStorage = async (includeGuest = false) => {
    try {
        const scope = getMockStorageScope();
        const migrateForAccount = () => {
            if (scope && getMockStorageScope() === scope && (scope !== 'moyang' || includeGuest)) {
                const accountSuffix = scope.slice('moyang'.length);
                for (const migrateKey of legacyMigrations.values())
                    migrateKey(accountSuffix);
            }
            for (const key of legacyMigrations.keys())
                backupOwnedSession(key);
            for (const key of legacyMigrations.keys())
                backupUnownedSession(key);
        };
        if (navigator.locks)
            await navigator.locks.request(mockStorageLock, migrateForAccount);
        else
            migrateForAccount();
    }
    catch {
        // 저장소를 읽지 못해도 앱은 시작한다.
    }
};
export const migrateLegacyMockStorage = async (migrate) => {
    try {
        migrate('');
        await migrateRegisteredStorage();
    }
    catch {
        // 저장소를 읽지 못해도 앱은 시작한다.
    }
};
export const migrateLegacyMockKey = (key, accountSuffix, parse, merge) => {
    const readSources = (suffix, { hasCurrent, forWrite = false, requireAccess = forWrite, }) => {
        const sources = [];
        let unavailable = false;
        let damagedOriginal = false;
        let damagedBackup = false;
        const readBackups = (sourceKey) => {
            const prefix = ownedSessionPrefix(sourceKey, `moyang${suffix}`);
            const backupKeys = [];
            for (let index = 0; index < localStorage.length; index += 1) {
                const backupKey = localStorage.key(index);
                if (backupKey?.startsWith(prefix))
                    backupKeys.push(backupKey);
            }
            for (const backupKey of backupKeys.sort().reverse()) {
                try {
                    const saved = localStorage.getItem(backupKey);
                    if (saved !== null) {
                        sources.push({ storage: localStorage, key: backupKey, saved, data: parse(saved) });
                    }
                }
                catch {
                    damagedBackup = true;
                }
            }
        };
        readBackups(keyWithAccount(key, suffix));
        if (localStorage.getItem(legacyOwnerKey) === `moyang${suffix}`) {
            for (const getStorage of [() => localStorage, () => sessionStorage]) {
                let storage;
                let saved;
                try {
                    storage = getStorage();
                    saved = storage.getItem(key);
                }
                catch {
                    unavailable = true;
                    continue;
                }
                if (saved === null)
                    continue;
                try {
                    sources.push({ storage, key, saved, data: parse(saved) });
                    hasCurrent = true;
                }
                catch {
                    damagedOriginal = true;
                }
            }
        }
        readBackups(key);
        if ((requireAccess && (unavailable || damagedBackup)) ||
            (forWrite && damagedOriginal) ||
            (!hasCurrent && (damagedBackup || ((unavailable || damagedOriginal) && !sources.length)))) {
            throw new MockStorageUnavailableError();
        }
        return sources;
    };
    const mergeSources = (current, sources) => sources.reduce((data, source) => (data === null ? source.data : merge(data, source.data)), current === null ? null : parse(current));
    const migrateForAccount = (suffix) => {
        try {
            if (getAccountSuffix() !== suffix)
                return;
            const scopedKey = keyWithAccount(key, suffix);
            const local = localStorage.getItem(scopedKey);
            const session = readSessionStorage(scopedKey);
            const sources = suffix
                ? readSources(suffix, {
                    hasCurrent: local !== null || session !== null,
                    requireAccess: true,
                })
                : [];
            if (session !== null) {
                sources.unshift({
                    storage: sessionStorage,
                    key: scopedKey,
                    saved: session,
                    data: parse(session),
                });
            }
            if (!sources.length)
                return;
            const migrated = mergeSources(local, sources);
            if (getAccountSuffix() !== suffix)
                return;
            writeMockStorage(scopedKey, migrated);
            for (const { storage, key: sourceKey, saved } of sources) {
                if (sourceKey === key && localStorage.getItem(legacyOwnerKey) !== `moyang${suffix}`)
                    continue;
                if (storage.getItem(sourceKey) === saved)
                    storage.removeItem(sourceKey);
            }
        }
        catch {
            // 이전에 실패하면 원본을 다음 실행까지 보관한다.
        }
    };
    legacyMigrations.set(key, migrateForAccount);
    legacyReaders.set(key, (local, session, suffix, forWrite) => {
        const sources = suffix
            ? readSources(suffix, { hasCurrent: local !== null || session !== null, forWrite })
            : [];
        if (!sources.length && session === null)
            return;
        let sessionData = null;
        if (session !== null) {
            try {
                sessionData = parse(session);
            }
            catch (error) {
                if (forWrite ||
                    (local === null &&
                        !sources.some(({ storage, key: sourceKey }) => storage === localStorage && sourceKey === key))) {
                    throw error;
                }
            }
        }
        const current = local !== null && sessionData !== null
            ? JSON.stringify(merge(parse(local), sessionData))
            : (local ?? (sessionData !== null ? session : null));
        const merged = JSON.stringify(mergeSources(current, sources));
        const scopedKey = keyWithAccount(key, suffix);
        if (!migratingKeys.has(scopedKey)) {
            migratingKeys.add(scopedKey);
            void migrateRegisteredStorage(true).finally(() => migratingKeys.delete(scopedKey));
        }
        return merged;
    });
    if (accountSuffix)
        migrateForAccount(accountSuffix);
};
