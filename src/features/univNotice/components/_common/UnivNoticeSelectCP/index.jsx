import "./style.css";

const UnivNoticeSelectCP = ({ dataList = [], value = "", univnoticeTitle = "", onChangeFunc }) => {
  // 데이터에서 value와 label을 추출하는 헬퍼 함수
  const getItemValue = (item) => item?.id ?? item?.value ?? item;
  const getItemLabel = (item) => item?.label ?? item?.name ?? item;

  return (
    <div className="selectCP">
      <p>{univnoticeTitle}</p>

      <select className="custom-select" value={value ?? ""} onChange={(e) => onChangeFunc(e.target.value)}>
        {/* 선택된 값이 없을 때 보여줄 기본 placeholder */}
        <option value="" disabled hidden>
          선택
        </option>

        {/* 리스트 렌더링 */}
        {dataList.map((item, idx) => (
          <option key={idx} value={getItemValue(item)}>
            {getItemLabel(item)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UnivNoticeSelectCP;
