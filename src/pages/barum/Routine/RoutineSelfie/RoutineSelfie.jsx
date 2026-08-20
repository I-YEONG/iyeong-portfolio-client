import { useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { BarumBarButton, BarumLeftButton } from "@/components/barum";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routineSelfieLayoutStyle, routineSelfieStyle } from "./RoutineSelfie.style";
import { BarumBasicLayout } from "@/layouts";
import { BarumRoutineCamera } from "@/features/barum/Routine/components";
import { useRoutineImageUpload } from "@/features/barum/Routine/hooks/useRoutineImageUpload";
import { createSelfiePreview, routineSelfieAtom } from "@/atoms/selfieAtom";

const RoutineSelfie = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef(null);
  const cameraCaptureRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const setSelfieAtom = useSetAtom(routineSelfieAtom);

  const { mutate: uploadRoutineImage } = useRoutineImageUpload();

  const cameraParam = searchParams.get("camera");

  const saveSelfiePreview = (file, sourceType) => {
    if (!file) {
      return;
    }

    const previewUrl = createSelfiePreview(file);

    setSelfieAtom({
      file,
      previewUrl,
      storagePath: "",
      isUploaded: false,
      sourceType,
      uploadedAt: new Date().toISOString(),
    });
  };

  const handleUploadImage = (file) => {
    if (!file || isUploading) {
      return;
    }

    saveSelfiePreview(file, "upload");
    setIsUploading(true);

    uploadRoutineImage(
      { file, purpose: "SELFIE" },
      {
        onSuccess: ({ storagePath }) => {
          setIsUploading(false);
          const imagePath = storagePath || "mock-user/2026-08-14.jpg";
          setSelfieAtom((prev) => ({
            ...prev,
            storagePath: imagePath,
            isUploaded: true,
          }));
          nav(`/routine/create/loading?img_path=${encodeURIComponent(imagePath)}`);
        },
        onError: () => {
          setIsUploading(false);
        },
      },
    );
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      handleUploadImage(selectedFile);
    }
    event.target.value = "";
  };

  const handleCapture = async () => {
    if (!cameraCaptureRef.current) {
      return;
    }

    const file = await cameraCaptureRef.current();
    if (file) {
      handleUploadImage(file);
      const previewUrl = createSelfiePreview(file);
      setSelfieAtom((prev) => ({
        ...prev,
        previewUrl,
        sourceType: "camera",
      }));
    }
  };

  const handleSkip = () => {
    nav("/project/barum/routine/create/loading?img=none");
  };

  return (
    <BarumBasicLayout styleObj={routineSelfieLayoutStyle}>
      <header>
        <span onClick={() => nav(-1)}>
          <BarumLeftButton />
        </span>
        <p>선택 단계예요</p>
      </header>
      <section css={routineSelfieStyle}>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />

        <p className="title">
          오늘 피부를
          <br />한 장 남겨볼까요
        </p>
        <BarumRoutineCamera captureRef={cameraCaptureRef} onCapture={handleUploadImage} />
        <p className="caption">사진은 나만 볼 수 있어요</p>
        {cameraParam !== "none" && (
          <div className="button-box">
            <div
              className="text"
              css={{ cursor: isUploading ? "not-allowed" : "pointer", opacity: isUploading ? 0.5 : 1 }}
              onClick={() => fileInputRef.current?.click()}>
              사진 불러오기
            </div>
            <div className="button" onClick={handleCapture} css={{ opacity: isUploading ? 0.5 : 1 }}>
              <div></div>
            </div>
            <div className="text">{/* 공간용 */}</div>
          </div>
        )}
        {cameraParam === "none" && (
          <div className="select-button">
            <BarumBarButton clickFun={() => fileInputRef.current?.click()}>사진 선택</BarumBarButton>
          </div>
        )}
      </section>
      <nav>
        <BarumBarButton colorTheme="white" clickFun={handleSkip}>
          오늘은 건너 뛰기
        </BarumBarButton>
      </nav>
    </BarumBasicLayout>
  );
};
export default RoutineSelfie;
