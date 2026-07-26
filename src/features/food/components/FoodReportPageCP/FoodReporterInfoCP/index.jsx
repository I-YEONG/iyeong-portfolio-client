import { forwardRef } from "react";
import { FoodCard, FoodCardHeader, FoodCardTitle, FoodCardContent, FoodLabel, FoodInput, FoodCardDescription } from "@/features/food/components";

const FoodReporterInfoCP = forwardRef(({ formData, handleInputChange, errors }, refs) => {
  /** 전화번호는 숫자만 입력되도록 처리 */
  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    handleInputChange("reporterPhone", value);
  };

  return (
    <FoodCard className="cards">
      <FoodCardHeader>
        <FoodCardTitle>제보자 정보</FoodCardTitle>
        <FoodCardDescription>검토 결과 안내를 위한 연락처를 입력해주세요</FoodCardDescription>
      </FoodCardHeader>
      <FoodCardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <FoodLabel htmlFor="reporterName">이름 *</FoodLabel>
            <FoodInput
              className="mt-2 border border-solid"
              id="reporterName"
              placeholder="홍길동"
              value={formData.reporterName}
              onChange={(e) => handleInputChange("reporterName", e.target.value)}
              required
            />
            {errors.reporterName && <span className="text-sm text-red-500">{errors.reporterName}</span>}
          </div>
          <div>
            <FoodLabel htmlFor="reporterPhone">연락처(숫자만) *</FoodLabel>
            <FoodInput
              className="mt-2 border border-solid"
              id="reporterPhone"
              type="tel"
              placeholder="01012345678"
              value={formData.reporterPhone}
              onChange={handlePhoneInput}
              maxLength={11}
              required
            />
            {errors.reporterPhone && <span className="text-sm text-red-500">{errors.reporterPhone}</span>}
          </div>
        </div>

        <div>
          <FoodLabel htmlFor="reporterEmail">이메일 *</FoodLabel>
          <FoodInput
            className="mt-2 border border-solid"
            id="reporterEmail"
            type="email"
            placeholder="example@email.com"
            value={formData.reporterEmail}
            onChange={(e) => handleInputChange("reporterEmail", e.target.value)}
            required
          />
          {errors.reporterEmail && <span className="text-sm text-red-500">{errors.reporterEmail}</span>}
        </div>
      </FoodCardContent>
    </FoodCard>
  );
});

export default FoodReporterInfoCP;
