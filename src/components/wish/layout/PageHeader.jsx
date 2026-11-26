import { IconChevronLeft } from '@tabler/icons-react';
/** 상태바를 제외한 공통 페이지 제목과 뒤로 가기 버튼을 표시한다. */
export function PageHeader({ title, onBack, backLabel = '뒤로 가기', className }) {
    return (<header className={[
            'relative grid min-h-14 grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2 bg-black px-3 py-1.5 shadow-[0_4px_10px_rgb(15_33_66/0.5)]',
            className,
        ]
            .filter(Boolean)
            .join(' ')}>
      <button type="button" onClick={onBack} aria-label={backLabel} className="flex size-11 items-center justify-center rounded-full text-white">
        <IconChevronLeft size={24} aria-hidden="true"/>
      </button>
      <h1 className="min-w-0 truncate text-center font-display text-xl leading-none font-normal tracking-normal text-[#E6E0FF] [text-shadow:0_0_5.8px_#7F8CFF]" title={title}>
        {title}
      </h1>
    </header>);
}
