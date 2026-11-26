import { Link } from 'react-router';
/** 목적지와 이용자 상태는 사용하는 화면에서 전달하는 공통 하단 메뉴다. */
export function BottomNavigation({ items, activeId, variant = 'paid', ariaLabel = '주요 메뉴', className, }) {
    return (<nav aria-label={ariaLabel} className={[
            'isolate mx-auto flex h-[70px] w-[calc(100%_-_28px)] max-w-[365px] items-center overflow-hidden rounded-full bg-white/[0.01] px-3 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.3)] backdrop-blur-sm',
            className,
        ]
            .filter(Boolean)
            .join(' ')}>
      {items.map(({ id, label, to, icon }) => {
            const isActive = id === activeId;
            return (<Link key={id} to={to} aria-current={isActive ? 'page' : undefined} className="relative grid min-h-11 min-w-11 flex-1 place-items-center rounded-full text-white">
            {isActive && (<span aria-hidden="true" className={[
                        'pointer-events-none absolute -z-10 size-[50px] rounded-full blur-[19px]',
                        variant === 'paid' ? 'bg-main-01' : 'bg-main-02',
                    ].join(' ')}/>)}
            <span aria-hidden="true" className="pointer-events-none grid size-[26px] place-items-center drop-shadow-[0_0_5.8px_rgb(20_74_132/0.7)] [&>img]:size-full [&>svg]:size-full">
              {icon}
            </span>
            <span className="sr-only">{label}</span>
          </Link>);
        })}
    </nav>);
}
