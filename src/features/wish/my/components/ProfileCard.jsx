/** 카드 안 각 줄의 캔버스 기준 top (Figma 1437:2695 내부, 헤더 아래 기준) */
const ROW_TOPS = ['55.725cqw', '66.667cqw', '77.354cqw', '88.295cqw', '98.968cqw', '109.911cqw'];
/** 내 학적 정보 카드 (Figma 1437:2695 Rectangle 118) */
export function ProfileCard({ profile }) {
    const rows = [
        { label: '이       름', value: profile.name },
        { label: '학       번', value: profile.studentNo },
        { label: '학       과', value: profile.department },
        { label: '학       년', value: profile.grade },
        { label: '재학여부', value: profile.enrollment },
        { label: '전화번호', value: profile.phone },
    ];
    return (<>
      <div className="absolute top-[47.837cqw] left-[3.562cqw] h-[75.827cqw] w-[92.875cqw] rounded-[3.053cqw] border border-gray-01 bg-[rgba(220,226,237,0.16)]"/>

      <dl className="absolute inset-0">
        {rows.map((row, index) => (<div key={row.label}>
            <dt className="absolute left-[10.433cqw] text-[4.071cqw] font-semibold whitespace-pre text-white" style={{ top: ROW_TOPS[index] }}>
              {row.label}
            </dt>
            <dd className="absolute left-[35.623cqw] text-[3.562cqw] font-normal text-white" style={{ top: ROW_TOPS[index] }}>
              {row.value}
            </dd>
          </div>))}
      </dl>
    </>);
}
