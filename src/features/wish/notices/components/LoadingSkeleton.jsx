function SkeletonBlock({ className }) {
    return (<span aria-hidden="true" className={`block animate-pulse rounded-sm bg-gray-01 ${className}`}/>);
}
export function NoticeListSkeleton() {
    return (<ul aria-label="공지사항을 불러오는 중" className="px-[7px]" aria-busy="true">
      {Array.from({ length: 5 }, (_, index) => (<li key={index} className="grid min-h-[75px] grid-cols-[minmax(0,1fr)_44px] items-center border-b border-gray-01 pl-5">
          <span className="space-y-2">
            <SkeletonBlock className="h-3 w-24"/>
            <SkeletonBlock className="h-4 w-4/5"/>
          </span>
          <SkeletonBlock className="mx-auto size-5 rounded-full"/>
        </li>))}
    </ul>);
}
export function CardGridSkeleton({ label }) {
    return (<ul aria-label={`${label}을 불러오는 중`} aria-busy="true" className="grid grid-cols-2 gap-x-7 gap-y-7 px-3.5 pt-3 pb-8">
      {Array.from({ length: 4 }, (_, index) => (<li key={index} className="min-w-0">
          <SkeletonBlock className="aspect-square w-full"/>
          <SkeletonBlock className="mt-3 h-4 w-4/5"/>
          <SkeletonBlock className="mt-2 h-3 w-3/5"/>
        </li>))}
    </ul>);
}
export function DetailSkeleton({ label }) {
    return (<div aria-label={`${label}을 불러오는 중`} aria-busy="true" className="space-y-4">
      <SkeletonBlock className="h-7 w-4/5"/>
      <div className="flex justify-between">
        <SkeletonBlock className="h-4 w-20"/>
        <SkeletonBlock className="h-4 w-16"/>
      </div>
      <SkeletonBlock className="aspect-video w-full"/>
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-full"/>
        <SkeletonBlock className="h-4 w-11/12"/>
        <SkeletonBlock className="h-4 w-2/3"/>
      </div>
    </div>);
}
