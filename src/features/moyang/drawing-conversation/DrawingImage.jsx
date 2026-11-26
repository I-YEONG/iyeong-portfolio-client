import { useEffect, useRef } from 'react';
import { useMoyangImage } from '@/features/moyang/hooks/useMoyangImage';
export const DrawingImage = ({ previewPhoto, src, ...props }) => {
    const protectedPath = src?.startsWith('/api/drawings/') ? src : undefined;
    const image = useMoyangImage(protectedPath);
    const imageRef = useRef(null);
    useEffect(() => {
        if (!previewPhoto)
            return;
        const photo = new Blob([previewPhoto.bytes], { type: previewPhoto.type });
        const url = URL.createObjectURL(photo);
        if (imageRef.current)
            imageRef.current.src = url;
        return () => URL.revokeObjectURL(url);
    }, [previewPhoto]);
    if (protectedPath && image === null)
        return <span>그림을 불러올 수 없어요</span>;
    return (<img ref={imageRef} src={previewPhoto ? undefined : protectedPath ? (image ?? undefined) : src} {...props}/>);
};
