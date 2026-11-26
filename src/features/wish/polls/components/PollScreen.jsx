import { IconHome, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import { Link, generatePath, useLocation, useNavigate, useParams, useSearchParams, } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import background from '@/assets/wish/polls/poll-background.png';
import headerStar from '@/assets/wish/polls/header-star.png';
import chevronWhite from '@/assets/wish/polls/chevron-white.svg';
import chevronGray from '@/assets/wish/polls/chevron-gray.svg';
import { PendingRelease } from '@/components/wish/PendingRelease';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { usePoll, usePollGate, usePolls } from '../hooks/usePollQueries';
import { usePollsRelease } from '../hooks/usePollsRelease';
import { canSubmit, filterPolls, formatPollTime } from '../lib/polls';
import { POLLS_RELEASE_AT } from '../lib/release';
import { PollDialog } from './PollDialog';
const navigationItems = [
    { id: 'booths', label: '부스 지도', to: ROUTES.BOOTHS, icon: <IconMapPin stroke={2}/> },
    {
        id: 'performances',
        label: '연예인 공개',
        to: ROUTES.PERFORMANCES,
        icon: <IconMicrophone2 stroke={2}/>,
    },
    { id: 'letters', label: '축하 편지', to: ROUTES.LETTERS, icon: <IconMail stroke={2}/> },
    { id: 'polls', label: '투표', to: ROUTES.POLLS, icon: <img src={voteIcon} alt=""/> },
    { id: 'bamboo', label: '대나무숲', to: ROUTES.BAMBOO, icon: <IconMessageCircle stroke={2}/> },
    { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome stroke={2}/> },
];
const states = [
    { state: 'OPEN', label: '진행중' },
    { state: 'ENDED', label: '마감' },
    { state: 'UPCOMING', label: '투표 예정' },
];
function GateNotice({ stage, retry }) {
    if (stage === 'waiting')
        return (<p role="status">
        사용자 정보를 확인하는 중입니다.{' '}
        <button className="underline" onClick={retry}>
          다시 시도
        </button>
      </p>);
    if (stage === 'login')
        return (<p>
        로그인 후 투표할 수 있습니다.{' '}
        <Link className="underline" to={ROUTES.LOGIN}>
          로그인하기
        </Link>
      </p>);
    if (stage === 'verify')
        return (<p>
        학생 인증 후 투표할 수 있습니다.{' '}
        <Link className="underline" to={ROUTES.MY}>
          학생 인증하기
        </Link>
      </p>);
    return (<p role="alert">
      사용자 정보를 불러오지 못했습니다.{' '}
      <button className="underline" onClick={retry}>
        다시 시도
      </button>
    </p>);
}
function PollCard({ poll }) {
    const detailPath = generatePath(ROUTES.POLL_DETAIL, { id: String(poll.id) });
    const origin = `from=${poll.state}`;
    const status = poll.state === 'OPEN' ? '진행중' : poll.state === 'ENDED' ? '마감' : '예정';
    const showResults = poll.state === 'ENDED' || (poll.state === 'OPEN' && !canSubmit(poll) && poll.resultAvailable);
    const action = poll.state === 'UPCOMING'
        ? '응원 예정'
        : showResults
            ? '결과 보기'
            : canSubmit(poll)
                ? '응원 하기'
                : '투표 완료';
    const target = showResults ? `${detailPath}?view=results&${origin}` : `${detailPath}?${origin}`;
    return (<li className={`min-w-0 rounded-[20px] border bg-white/20 py-[14px] pr-[17px] pl-[19px] text-white ${poll.state === 'UPCOMING' ? 'border-gray-02' : 'border-white'}`}>
      <Link to={target} data-poll-id={poll.id} className="grid min-h-[74px] grid-cols-[minmax(0,1fr)_56px] gap-2">
        <div className="min-w-0">
          <h2 className="min-w-0 font-display text-[20px] leading-[29px] font-medium break-words text-[#e6e0ff] [text-shadow:0_2px_2px_rgb(0_0_0/0.49)]">
            {poll.title}
          </h2>
          <div className="mt-[23px] flex min-w-0 flex-wrap items-center gap-2 font-display text-[14px] leading-5 font-normal">
            <div className="flex shrink-0 gap-[5px] font-body text-[12px] leading-[14px] font-normal">
              <span className={`rounded-full px-[10px] py-1 ${poll.state === 'OPEN' ? 'bg-[#3d94ff] text-white' : poll.state === 'ENDED' ? 'bg-gray-04 text-white' : 'bg-white text-gray-04'}`}>
                {status}
              </span>
              <span className={`rounded-full px-[10px] py-1 ${poll.state === 'UPCOMING' ? 'bg-white text-gray-04' : poll.state === 'ENDED' || poll.hasSubmitted ? 'bg-gray-04 text-white' : 'bg-gray-01 text-gray-04'}`}>
                {poll.state === 'UPCOMING'
            ? '투표 예정'
            : poll.hasSubmitted
                ? '투표 완료'
                : poll.state === 'ENDED'
                    ? '투표 마감'
                    : '투표 가능'}
              </span>
            </div>
            {poll.state === 'ENDED' ? (<span className="text-gray-04">투표 마감</span>) : (<time dateTime={poll.startsAt} className="whitespace-nowrap">
                {formatPollTime(poll.startsAt)}~
              </time>)}
          </div>
        </div>
        <div className={`flex flex-col items-center justify-center text-center font-display text-[14px] leading-5 font-normal whitespace-nowrap ${poll.state === 'UPCOMING' ? 'text-gray-02' : 'text-white'}`}>
          <img src={poll.state === 'UPCOMING' ? chevronGray : chevronWhite} alt=""/>
          <span>{action}</span>
        </div>
      </Link>
    </li>);
}
function ReleasedPollScreen({ detailId }) {
    const gate = usePollGate();
    const navigate = useNavigate();
    const location = useLocation();
    const [params] = useSearchParams();
    const focusedReturnKey = useRef(null);
    const [filter, setFilter] = useState(() => {
        const origin = params.get('from');
        return origin === 'ENDED' || origin === 'UPCOMING' ? origin : 'OPEN';
    });
    const enabled = gate.stage === 'ready';
    const list = usePolls(gate.sessionVersion, enabled);
    const id = detailId && /^[1-9]\d*$/.test(detailId) && Number.isSafeInteger(Number(detailId))
        ? Number(detailId)
        : null;
    const detail = usePoll(id, gate.sessionVersion, enabled && Boolean(detailId));
    const pollError = list.error ?? detail.error;
    const effectiveGate = pollError instanceof ApiError && pollError.status === 401
        ? 'login'
        : pollError instanceof ApiError &&
            pollError.status === 403 &&
            pollError.code === 'SCHOOL_VERIFICATION_REQUIRED'
            ? 'verify'
            : gate.stage;
    const visible = filterPolls(list.data ?? [], filter);
    useEffect(() => {
        const returnFocus = location.state?.pollFocus;
        if (!returnFocus ||
            focusedReturnKey.current === location.key ||
            gate.stage !== 'ready' ||
            list.isPending)
            return;
        const trigger = document.querySelector(`[data-poll-id="${returnFocus.id}"]`) ??
            document.querySelector(`[data-poll-filter="${returnFocus.state}"]`);
        if (trigger) {
            trigger.focus({ preventScroll: true });
            focusedReturnKey.current = location.key;
        }
    }, [gate.stage, list.isPending, location.key, location.state]);
    return (<main className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-black bg-cover bg-center text-white" style={{ backgroundImage: `url(${background})` }}>
      <header className="shrink-0 px-[14px] pt-[max(85px,calc(env(safe-area-inset-top)+75px))] text-center">
        <div className="relative mx-auto h-[27px] w-[28px]">
          <img src={headerStar} alt="" className="absolute -top-[10px] -left-[10px] max-w-none"/>
        </div>
        <h1 className="mt-2 font-display text-[24px] leading-[35px] font-medium text-[#adaeff] [text-shadow:0_0_10px_#645cff]">
          무대 응원
        </h1>
        <p className="mt-5 font-display text-[16px] leading-[23px] font-light text-[#adaeff] [text-shadow:0_0_4px_#00eaff]">
          여러분의 WISH를 담아 무대에 투표해주세요!
        </p>
      </header>
      <div className="mt-[34px] flex shrink-0 gap-2 px-[14px] font-display text-[14px] leading-5 font-semibold" role="group" aria-label="투표 상태">
        {states.map(({ state, label }) => (<button key={state} type="button" data-poll-filter={state} aria-pressed={filter === state} onClick={() => setFilter(state)} className={`min-h-9 rounded-full px-[18px] ${filter === state ? 'bg-[#3d94ff] text-white' : 'border border-gray-02 bg-white text-gray-04'}`}>
            {label}
          </button>))}
      </div>
      <div className="mt-[22px] min-h-0 flex-1 overflow-y-auto overscroll-contain px-[14px] pb-6">
        {effectiveGate !== 'ready' ? (<GateNotice stage={effectiveGate} retry={gate.retry}/>) : list.isPending ? (<p role="status">투표를 불러오는 중입니다.</p>) : list.isError ? (<p role="alert">
            투표를 불러오지 못했습니다.{' '}
            <button className="underline" onClick={() => void list.refetch()}>
              다시 시도
            </button>
          </p>) : visible.length ? (<ul className="space-y-[10px]">
            {visible.map((poll) => (<PollCard key={poll.id} poll={poll}/>))}
          </ul>) : (<p role="status">
            {states.find((item) => item.state === filter)?.label}인 투표가 없습니다.
          </p>)}
      </div>
      <BottomNavigation items={navigationItems} activeId="polls" className="mb-[max(26px,calc(env(safe-area-inset-bottom)+26px))] shrink-0"/>
      {detailId &&
            effectiveGate === 'ready' &&
            (id === null ? (<div role="alert" className="absolute inset-0 z-40 grid place-items-center bg-black/70">
            <div>
              올바르지 않은 투표 주소입니다.{' '}
              <Link className="underline" to={ROUTES.POLLS}>
                목록으로
              </Link>
            </div>
          </div>) : detail.isPending ? (<div role="status" className="absolute inset-0 z-40 grid place-items-center bg-black/70">
            투표를 불러오는 중입니다.
          </div>) : detail.isError ? (<div role="alert" className="absolute inset-0 z-40 grid place-items-center bg-black/70">
            <div className="text-center">
              {detail.error instanceof ApiError && detail.error.status === 404
                    ? '투표를 찾을 수 없습니다.'
                    : '투표를 불러오지 못했습니다.'}
              <div className="mt-3">
                <Link className="underline" to={ROUTES.POLLS}>
                  목록으로
                </Link>
                {!(detail.error instanceof ApiError && detail.error.status === 404) && (<button className="ml-3 underline" onClick={() => void detail.refetch()}>
                    다시 시도
                  </button>)}
              </div>
            </div>
          </div>) : (detail.data && (<PollDialog key={`${gate.sessionVersion}:${id}`} poll={detail.data} sessionVersion={gate.sessionVersion} initialMode={params.get('view') === 'results' ? 'results' : 'vote'} onClose={() => {
                    const origin = params.get('from');
                    const state = origin === 'ENDED' || origin === 'UPCOMING' ? origin : 'OPEN';
                    navigate(`${ROUTES.POLLS}?from=${state}`, {
                        state: { pollFocus: { id, state } },
                    });
                }}/>)))}
    </main>);
}
export function PollScreen({ detail = false }) {
    const released = usePollsRelease();
    const { id } = useParams();
    if (!released)
        return (<PendingRelease title="투표" message="투표 서비스는" releaseAt={POLLS_RELEASE_AT} activeNavigationId="polls"/>);
    return <ReleasedPollScreen detailId={detail ? (id ?? '') : undefined}/>;
}
