import { useState } from "react";
import { FoodCard, FoodCardContent, FoodCardHeader, FoodCardTitle, FoodCardDescription, FoodBadge, FoodButtonCP } from "@/features/food/components";
import { Camera, Upload, X } from "lucide-react";
// Foodinput import가 누락되어 있다면 상황에 맞게 추가해주세요.
// import { Foodinput } from "@/components/Foodui/Foodinput";

const FoodPhotoUploadCP = ({ formData, setFormData }) => {
  const [dragActive, setDragActive] = useState(false);

  // ✅ 업로드 기능을 끄고 켤 수 있는 제어 변수 (현재 켜짐 방지를 위해 true로 고정)
  const isUploadDisabled = true;

  /**
   * 이미 업로드된 사진 + 새로 업로드된 사진이 5장을 넘지 않도록 제한.
   */
  const handleFileUpload = (files) => {
    if (isUploadDisabled) return; // 기능이 꺼져있으면 업로드 차단

    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - formData.photos.length);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newFiles],
      }));
    }
  };

  /**
   * 사진 삭제 함수
   */
  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  /**
   * 드래그 이벤트 핸들러
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUploadDisabled) return; // 드래그 시각 효과 차단

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /**
   * 파일 드롭 이벤트 핸들러
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isUploadDisabled) return; // 파일 드롭 차단

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <>
      <FoodCard className="border-solid shadow-lg border-brown-dark">
        <FoodCardHeader>
          <FoodCardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-brown-main" />
            <span>사진 첨부</span>
          </FoodCardTitle>
          <FoodCardDescription>
            {isUploadDisabled ? "현재 사진 업로드 기능이 비활성화되어 있습니다." : "푸드트럭 사진을 첨부해주세요 (최대 5장)"}
          </FoodCardDescription>
        </FoodCardHeader>
        <FoodCardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isUploadDisabled
                ? "border-gray-300 bg-gray-50 opacity-60 cursor-not-allowed" // 비활성화 스타일
                : dragActive
                  ? "border-brown-4 bg-brown-3"
                  : "border-gray-4 hover:border-brown-4"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}>
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-4" />
            <p className="mb-2 text-gray-6">
              {isUploadDisabled ? "사진 업로드 기능이 일시적으로 중단되었습니다" : "사진을 드래그하거나 클릭하여 업로드하세요"}
            </p>
            {!isUploadDisabled && <p className="mb-4 text-sm text-gray-5">JPG, PNG 파일 (최대 10MB, 5장까지)</p>}

            <Foodinput
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="photo-upload"
              disabled={isUploadDisabled} // input 비활성화
            />
            <FoodButtonCP
              className={`w-32 mx-auto ${isUploadDisabled ? "cursor-not-allowed" : ""}`}
              onClick={() => {
                if (!isUploadDisabled) document.getElementById("photo-upload")?.click();
              }}
              disabled={isUploadDisabled || formData.photos.length >= 5} // 버튼 비활성화
            >
              파일 선택
            </FoodButtonCP>
          </div>

          {/* 업로드된 사진 미리보기 */}
          {formData.photos.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-3 font-medium">업로드된 사진 ({formData.photos.length}/5)</h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                      alt={`업로드된 사진 ${index + 1}`}
                      className="object-cover w-full h-24 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 -top-2 -right-2 group-hover:opacity-100">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1">
                      <FoodBadge variant="secondary" className="text-xs">
                        {(photo.size / 1024 / 1024).toFixed(1)}MB
                      </FoodBadge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </FoodCardContent>
      </FoodCard>
    </>
  );
};

export default FoodPhotoUploadCP;
