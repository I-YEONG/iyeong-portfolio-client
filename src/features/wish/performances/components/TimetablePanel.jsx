import { useState } from 'react';
import { PerformanceDetailDialog } from './PerformanceDetailDialog';
const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
});
function formatTime(value) {
    if (!value || Number.isNaN(new Date(value).getTime()))
        return '--:--';
    return formatter.format(new Date(value));
}
function formatTimeRange(performance) {
    return `${formatTime(performance.startsAt)} - ${formatTime(performance.endsAt)}`;
}
function isHiddenCelebrityPerformance(performance) {
    return performance.category === 'CELEBRITY' && formatTimeRange(performance) === '22:00 - 23:00';
}
function getStartTime(performance) {
    const time = performance.startsAt ? Date.parse(performance.startsAt) : Number.NaN;
    return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time;
}
function getStageTimeRange(performances) {
    if (performances.length === 0)
        return null;
    const startsAt = performances[0]?.startsAt ?? null;
    const endsAt = performances.at(-1)?.endsAt ?? null;
    return `${formatTime(startsAt)} - ${formatTime(endsAt)}`;
}
function displayName(performance) {
    const teamName = performance.teamName || '공연팀';
    return performance.category === 'INDIVIDUAL' ? `(개인) ${teamName}` : teamName;
}
function StageSection({ title, performances, onSelect }) {
    const timeRange = getStageTimeRange(performances);
    return (<section className="mt-8">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[14px] text-white">
        <span className="h-px bg-white/45"/>
        <div className="flex items-center gap-4 font-display font-semibold">
          <span>{timeRange ?? '--:-- - --:--'}</span>
          <span>{title}</span>
        </div>
        <span className="h-px bg-white/45"/>
      </div>
      <div className="mt-6 space-y-3">
        {performances.map((performance) => (<div key={performance.id ?? `${performance.teamName}-${performance.startsAt}`} className="grid grid-cols-[104px_1fr] gap-3 text-[14px] leading-5 text-white">
            <time className="font-display font-light">{formatTimeRange(performance)}</time>
            {onSelect && performance.id !== null ? (<button type="button" onClick={() => onSelect(performance)} className="min-h-6 truncate text-right font-display font-light underline decoration-white underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {displayName(performance)}
              </button>) : (<span className="truncate text-right font-display font-light">
                {displayName(performance)}
              </span>)}
          </div>))}
      </div>
    </section>);
}
export function TimetablePanel({ performances, isPending }) {
    const [selectedPerformanceId, setSelectedPerformanceId] = useState(null);
    const timetablePerformances = (performances ?? []).filter((performance) => (performance.category === 'INDIVIDUAL' ||
        performance.category === 'CLUB' ||
        performance.category === 'CELEBRITY') &&
        !isHiddenCelebrityPerformance(performance));
    const sortedPerformances = timetablePerformances.toSorted((first, second) => getStartTime(first) - getStartTime(second));
    const studentPerformances = sortedPerformances.filter(({ category }) => category === 'INDIVIDUAL' || category === 'CLUB');
    const celebrityPerformances = sortedPerformances.filter(({ category }) => category === 'CELEBRITY');
    return (<>
      <div role="region" aria-label="공연 타임테이블" className="mx-3 rounded-[10px] bg-[rgba(9,11,47,0.28)] px-7 pt-8 pb-10">
        <div className="space-y-3 text-[14px] leading-5 text-white">
          <div className="grid grid-cols-[104px_1fr] gap-3">
            <time className="font-display font-light">14:32 - 15:30</time>
            <span className="text-right font-display font-light">학생 및 외부인 입장</span>
          </div>
          <div className="grid grid-cols-[104px_1fr] gap-3">
            <time className="font-display font-light">15:30 - 15:48</time>
            <span className="text-right font-display font-light">개회식</span>
          </div>
        </div>

        {isPending ? (<div className="grid h-44 place-items-center" role="status">
            <span aria-label="타임테이블을 불러오고 있습니다" className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-main-01"/>
          </div>) : (<>
            <StageSection title="학생무대" performances={studentPerformances} onSelect={(performance) => setSelectedPerformanceId(performance.id)}/>
            <StageSection title="연예인 무대" performances={celebrityPerformances} onSelect={(performance) => setSelectedPerformanceId(performance.id)}/>
          </>)}
      </div>
      <p className="mx-3 mt-3 px-2 text-center text-[12px] leading-[18px] font-medium break-keep text-white [text-shadow:0_1px_3px_rgba(9,11,47,0.7)]">
        타임테이블의 시간은 예정된 시간일 뿐 현장 진행 상황에 따라 조정될 수 있습니다.
      </p>

      {selectedPerformanceId !== null && (<PerformanceDetailDialog performanceId={selectedPerformanceId} onClose={() => setSelectedPerformanceId(null)}/>)}
    </>);
}
