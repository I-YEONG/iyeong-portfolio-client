import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { imageModalOpenAtom, imageModalUrlAtom } from "@/atoms/imageModalAtoms";
import { imageModalCss } from "./ImageModal.styles";

// import { useSetAtom } from "jotai";
// import { imageModalOpenAtom, imageModalUrlAtom } from "@/atoms/imageModalAtoms";

// const openModal = useSetAtom(imageModalOpenAtom);
// const setUrl = useSetAtom(imageModalUrlAtom);

// setUrl(imageUrl);
// openModal(true);

const ImageModal = () => {
  const [isOpen, setIsOpen] = useAtom(imageModalOpenAtom);
  const [imageUrl, setImageUrl] = useAtom(imageModalUrlAtom);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setImageUrl("");
    setIsZoomed(false);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.scrollTop += event.deltaY;
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div css={imageModalCss} role="dialog" aria-modal="true" onClick={handleClose} data-lenis-prevent>
      <div className={`dialog${isZoomed ? " zoomed" : ""}`} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close" onClick={handleClose}>
          Close
        </button>
        <div className="image-wrap" onWheel={handleWheel} data-lenis-prevent>
          <img src={imageUrl} alt="project detail" className={isZoomed ? "is-zoomed" : ""} onClick={() => setIsZoomed((prev) => !prev)} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
