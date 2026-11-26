import { PageHeader } from '@/components/wish/layout/PageHeader';
import { StampBackdrop } from './StampBackdrop';
import { StampBoard } from './StampBoard';
/** 부스 스탬프 화면. 데이터와 별 배정 정책은 호출부에서 전달한다. */
export function StampPageContent({ slots, onBack, status }) {
    return (<div className="min-h-dvh w-full overflow-x-clip bg-main-01">
      <PageHeader title="부스 스탬프" onBack={onBack} backLabel="마이페이지로 돌아가기" className="relative z-10 min-h-[63px] border-b border-white/[0.17] bg-black shadow-none"/>
      {status ? (<div className="relative z-30 bg-black px-4 py-3 text-center font-body text-sm text-white">
          {status}
        </div>) : null}
      <main className="@container relative aspect-[393/739] w-full font-display">
        <StampBackdrop />
        <p className="absolute top-[12.468cqw] left-1/2 z-10 w-max -translate-x-1/2 text-center text-[4.58cqw] leading-[1.5] font-light text-[#ADAEFF] [text-shadow:0_0_10px_#645CFF]">
          부스 체험 후 <span className="text-[#FA9EFF]">QR을 스캔</span>하고
          <br />
          별자리를 완성해보세요!
        </p>
        {slots ? <StampBoard slots={slots}/> : null}
      </main>
    </div>);
}
