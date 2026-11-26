import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PageHeader } from '@/components/moyang';
import { useMockStorageScope } from '@/features/moyang/hooks/useMockStorageScope';
import { apiClient, isMoyangLoggedIn } from '@/features/moyang/lib/api-client';
import { getMockPreviewRecordId } from '@/features/moyang/lib/mock-reflections';
import { getMockStorageScope } from '@/features/moyang/lib/mock-storage';
import previewImage from '@/assets/moyang/drawing/drawing-2.png';
import styles from './DrawingDetails.module.css';
const isValidId = (value) => typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
// 화면을 떠난 뒤 완료된 업로드도 같은 그림으로 돌아오면 재사용한다.
const completedUploads = new Map();
const pendingUploads = new Map();
const getUploadKey = (scope, draftId) => JSON.stringify([scope, draftId]);
/** 선택한 그림을 확인하고 제목과 떠오른 생각을 입력한다. */
export const DrawingDetails = ({ flow } = {}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const storageScope = useMockStorageScope();
    const [draftScope] = useState(storageScope);
    const data = location.state;
    const pickedPhoto = flow?.photo ?? data?.photo;
    const previewPhoto = data?.previewPhoto;
    const photo = useMemo(() => pickedPhoto ?? (previewPhoto && new Blob([previewPhoto.bytes], { type: previewPhoto.type })), [pickedPhoto, previewPhoto]);
    const uploadKey = storageScope && data?.draftId ? getUploadKey(storageScope, data.draftId) : null;
    const uploaded = flow
        ? undefined
        : (data?.uploaded ?? (uploadKey ? completedUploads.get(uploadKey) : undefined));
    const uploadedRecordId = uploaded?.recordId ?? uploaded?.activityId;
    const isPreview = !flow && true;
    const imageRef = useRef(null);
    const [title, setTitle] = useState(flow ? flow.draft.title : (data?.draft?.title ?? uploaded?.title ?? ''));
    const [thought, setThought] = useState(flow ? flow.draft.note : (data?.draft?.note ?? uploaded?.note ?? ''));
    const [error, setError] = useState('');
    const invalidUpload = !!uploaded && (!isValidId(uploaded.drawingId) || !isValidId(uploadedRecordId));
    const [notice, setNotice] = useState(invalidUpload
        ? '그림은 업로드되었지만 저장 정보를 확인하지 못했어요. 다시 업로드하지 말고 관리자에게 문의해 주세요.'
        : '');
    const [pending, setPending] = useState(false);
    const submitting = useRef(false);
    const active = useRef(true);
    useEffect(() => {
        active.current = true;
        return () => {
            active.current = false;
        };
    }, []);
    useEffect(() => {
        if (!(photo instanceof Blob))
            return;
        const url = URL.createObjectURL(photo);
        if (imageRef.current)
            imageRef.current.src = url;
        return () => URL.revokeObjectURL(url);
    }, [photo]);
    if (!storageScope ||
        storageScope !== draftScope ||
        (!flow && data?.storageScope && data.storageScope !== storageScope)) {
        return <Navigate to="/project/moyang/drawing" replace/>;
    }
    if (!(photo instanceof Blob) && !isPreview) {
        return flow ? (<p role="alert">선택한 그림을 확인해 주세요.</p>) : (<Navigate to="/project/moyang/drawing/upload" replace/>);
    }
    const submit = async (event) => {
        event.preventDefault();
        if (submitting.current || storageScope !== getMockStorageScope())
            return;
        if (flow) {
            if (!title.trim()) {
                setError('그림 제목을 입력해 주세요.');
                return;
            }
            if (thought.length > 200) {
                setNotice('떠오른 생각은 200자 이내로 입력해 주세요.');
                return;
            }
            submitting.current = true;
            setPending(true);
            setNotice('');
            try {
                await flow.onComplete({ title: title.trim(), note: thought.trim() });
            }
            catch {
                if (active.current)
                    setNotice('그림을 준비하지 못했어요. 입력 내용을 유지한 채 다시 시도해 주세요.');
            }
            finally {
                submitting.current = false;
                if (active.current)
                    setPending(false);
            }
            return;
        }
        const currentUpload = uploaded ?? (uploadKey ? completedUploads.get(uploadKey) : undefined);
        const currentRecordId = currentUpload?.recordId ?? currentUpload?.activityId;
        if (currentUpload && (!isValidId(currentUpload.drawingId) || !isValidId(currentRecordId))) {
            setNotice('그림은 업로드되었지만 저장 정보를 확인하지 못했어요. 다시 업로드하지 말고 관리자에게 문의해 주세요.');
            return;
        }
        if (!title.trim()) {
            setError('그림 제목을 입력해 주세요.');
            return;
        }
        if (thought.length > 200) {
            setNotice('떠오른 생각은 200자 이내로 입력해 주세요.');
            return;
        }
        if (!isPreview && !currentUpload && (!data?.topic?.topicId || !data.inputType)) {
            setNotice('그림 주제 정보를 찾을 수 없어요. 이전 화면에서 다시 시작해 주세요.');
            return;
        }
        submitting.current = true;
        setPending(true);
        setNotice('');
        try {
            const draft = { title: title.trim(), note: currentUpload?.note ?? thought.trim() };
            const draftId = data?.draftId ?? crypto.randomUUID();
            const detailsState = { ...data, draft, draftId, uploaded: currentUpload, storageScope };
            if (pickedPhoto instanceof Blob) {
                detailsState.previewPhoto = {
                    bytes: await pickedPhoto.arrayBuffer(),
                    type: pickedPhoto.type,
                };
                detailsState.photo = undefined;
            }
            if (!active.current || storageScope !== getMockStorageScope())
                return;
            await navigate(`${location.pathname}${location.search}`, {
                replace: true,
                state: detailsState,
            });
            if (!active.current || storageScope !== getMockStorageScope())
                return;
            let drawingId = currentUpload?.drawingId ?? Date.now();
            let recordId = currentRecordId;
            if (!isPreview && !currentUpload && data?.topic && data.inputType && photo instanceof Blob) {
                const token = isMoyangLoggedIn();
                if (getMockStorageScope(token) !== storageScope)
                    return;
                const body = new FormData();
                body.append('image', photo, photo instanceof File ? photo.name : 'drawing.jpg');
                const key = getUploadKey(storageScope, draftId);
                let upload = pendingUploads.get(key);
                if (!upload) {
                    upload = apiClient
                        .post('/api/drawings', body, {
                        params: {
                            inputType: data.inputType,
                            topicId: data.topic.topicId,
                            ...(thought.trim() ? { note: thought.trim() } : {}),
                        },
                    })
                        .then((response) => {
                        if (!response.data.success)
                            throw new Error('upload failed');
                        const result = response.data.data;
                        const saved = {
                            drawingId: isValidId(result?.drawingId) ? result.drawingId : undefined,
                            recordId: isValidId(result?.recordId) ? result.recordId : undefined,
                            ...draft,
                        };
                        completedUploads.set(key, saved);
                        return saved;
                    })
                        .finally(() => pendingUploads.delete(key));
                    pendingUploads.set(key, upload);
                }
                const saved = await upload;
                draft.note = saved.note;
                const validDrawingId = saved.drawingId;
                const validRecordId = saved.recordId;
                if (!active.current || storageScope !== getMockStorageScope())
                    return;
                await navigate(`${location.pathname}${location.search}`, {
                    replace: true,
                    state: {
                        ...detailsState,
                        uploaded: saved,
                    },
                });
                if (!validDrawingId || !validRecordId) {
                    setNotice('그림은 업로드되었지만 저장 정보를 확인하지 못했어요. 다시 업로드하지 말고 관리자에게 문의해 주세요.');
                    return;
                }
                drawingId = validDrawingId;
                recordId = validRecordId;
            }
            if (!active.current || storageScope !== getMockStorageScope())
                return;
            navigate(`/project/moyang/drawing/conversation`, {
                state: {
                    ...detailsState,
                    demoDrawing: isPreview,
                    ...(photo instanceof Blob && {
                        photo: undefined,
                        previewPhoto: undefined,
                    }),
                    drawing: {
                        drawingId,
                        topicId: data?.topic?.topicId,
                        title: title.trim(),
                        note: draft.note,
                        imageUrl: photo instanceof Blob ? undefined : previewImage,
                        previewPhoto: photo instanceof Blob ? detailsState.previewPhoto : undefined,
                    },
                    recordId: isPreview && photo instanceof Blob ? getMockPreviewRecordId(draftId) : recordId,
                },
            });
        }
        catch {
            if (active.current)
                setNotice('그림을 업로드하지 못했어요. 연결 상태와 입력 내용을 확인해 주세요.');
        }
        finally {
            submitting.current = false;
            if (active.current)
                setPending(false);
        }
    };
    return (<div className={styles.page}>
      <PageHeader title="" action="back" onNavigate={() => {
            active.current = false;
            if (flow)
                flow.onBack();
            else
                navigate(`${data?.inputType === 'CANVAS' ? '/project/moyang/drawing/canvas' : '/project/moyang/drawing/upload'}${location.search}`, { state: data });
        }}/>
      <form className={styles.form} onSubmit={submit} noValidate>
        <img ref={imageRef} src={isPreview && !(photo instanceof Blob) ? previewImage : undefined} className={`${styles.preview} ${(flow ? flow.inputType : data?.inputType) === 'CANVAS' ? styles.canvasPreview : ''}`} alt="선택한 그림 미리보기"/>
        <div className={styles.fields}>
          <Input id="drawing-title" label="오늘의 그림 제목" value={title} maxLength={flow ? 100 : undefined} error={error} onChange={(event) => {
            setTitle(event.target.value);
            flow?.onChange({ title: event.target.value, note: thought });
            setError('');
            if (!invalidUpload)
                setNotice('');
        }}/>
          <Input id="drawing-thought" label="그림을 그리며 떠오른 생각 (선택)" value={thought} maxLength={flow ? 200 : undefined} readOnly={Boolean(uploaded)} onChange={(event) => {
            setThought(event.target.value);
            flow?.onChange({ title, note: event.target.value });
        }}/>
          {uploaded && (<p className={styles.uploadedNote}>업로드한 그림의 생각은 수정할 수 없어요.</p>)}
        </div>
        <div className={styles.actions}>
          {notice && <p role="status">{notice}</p>}
          <Button type="submit" disabled={pending || invalidUpload}>
            {pending
            ? '그림을 올리고 있어요'
            : flow
                ? '그림 공유 준비하기'
                : '그림 이야기 시작하기'}
          </Button>
        </div>
      </form>
    </div>);
};
