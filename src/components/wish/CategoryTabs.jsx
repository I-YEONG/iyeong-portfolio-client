import { Link } from 'react-router';
/** 안내 목록 사이를 이동하는 링크를 가로 스크롤 가능한 탐색 영역에 표시한다. */
export function CategoryTabs({ items, activeId, ariaLabel = '안내 카테고리', className, }) {
    return (<nav aria-label={ariaLabel} className={[
            'flex max-w-full min-w-0 scroll-px-1.5 gap-2 overflow-x-auto p-1.5 font-body text-sm',
            className,
        ]
            .filter(Boolean)
            .join(' ')}>
      {items.map(({ id, label, to }) => {
            const isActive = id === activeId;
            return (<Link key={id} to={to} aria-current={isActive ? 'page' : undefined} className={[
                    'inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-gray-01 px-4 py-2 leading-5 whitespace-nowrap',
                    isActive ? 'bg-gray-04 text-white' : 'bg-white text-black',
                ].join(' ')}>
            {label}
          </Link>);
        })}
    </nav>);
}
