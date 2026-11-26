import { BOOTH_FILTER_CHIPS } from '../lib/category';
/** 시안 1692:6619의 칩 줄. 화면보다 넓어서 가로로 넘겨 본다. */
export function BoothFilterChips({ value, onChange }) {
    return (<div role="tablist" aria-label="부스 종류" className="flex [scrollbar-width:none] gap-[10px] overflow-x-auto px-[15px] [&::-webkit-scrollbar]:hidden">
      {BOOTH_FILTER_CHIPS.map(({ id, label }) => {
            const isActive = id === value;
            return (<button key={id} type="button" role="tab" aria-selected={isActive} onClick={() => onChange(id)} className={[
                    'h-9 shrink-0 rounded-full px-[18px] font-display text-[14px] font-semibold whitespace-nowrap',
                    isActive
                        ? 'bg-gradient-to-b from-blue to-[#00bfea] text-white'
                        : 'border border-gray-02 bg-white text-gray-04',
                ].join(' ')}>
            {label}
          </button>);
        })}
    </div>);
}
