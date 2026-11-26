/** 앱 수명 동안 유지한다. 라우트를 왕복하거나 StrictMode가 다시 연결해도 재생하지 않는다. */
export class EntryIntro {
    state;
    listeners = new Set();
    cancelTimer;
    started = false;
    schedule;
    constructor(initialPath, schedule = (callback, delay) => {
        const timer = setTimeout(callback, delay);
        return () => clearTimeout(timer);
    }) {
        this.schedule = schedule;
        this.state = { phase: initialPath === '/' ? 'waiting' : 'done', generation: 0 };
    }
    getSnapshot = () => this.state;
    subscribe = (listener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };
    publish(phase, generation = this.state.generation) {
        this.state = { phase, generation };
        this.listeners.forEach((listener) => listener());
    }
    enter(path, reducedMotion) {
        if (path !== '/' || reducedMotion)
            this.finish();
        else if (!this.started && this.state.phase === 'waiting')
            this.play();
    }
    play() {
        this.started = true;
        const generation = this.state.generation;
        this.cancelTimer = this.schedule(() => {
            if (this.state.generation !== generation || this.state.phase !== 'waiting')
                return;
            this.publish('running');
            this.cancelTimer = this.schedule(() => {
                if (this.state.generation === generation)
                    this.finish();
            }, 2000);
        }, 800);
    }
    finish = () => {
        this.cancelTimer?.();
        this.cancelTimer = undefined;
        this.started = true;
        if (this.state.phase !== 'done')
            this.publish('done');
    };
    restart(reducedMotion) {
        this.cancelTimer?.();
        this.publish(reducedMotion ? 'done' : 'waiting', this.state.generation + 1);
        if (!reducedMotion)
            this.play();
    }
}
/** 새 문서에서는 기록이 비어 있으므로 직접 접근·새로고침 뒤 외부 페이지로 돌아가지 않는다. */
export class EntryHistory {
    entries = new Map();
    sequence = 0;
    open(index) {
        if (typeof index !== 'number')
            return null;
        const entryOrigin = `entry-${++this.sequence}`;
        this.entries.set(entryOrigin, index);
        return { entryOrigin };
    }
    canReturn(state, index) {
        if (!state || typeof state !== 'object' || !('entryOrigin' in state))
            return false;
        const origin = typeof state.entryOrigin === 'string' && this.entries.get(state.entryOrigin);
        return typeof origin === 'number' && typeof index === 'number' && index === origin + 1;
    }
}
export const entryIntro = new EntryIntro(typeof window === 'undefined' || /^\/project\/wish\/?$/.test(window.location.pathname) ? '/' : '/other');
export const entryHistory = new EntryHistory();
