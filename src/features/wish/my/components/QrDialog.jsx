import { IconRefresh } from '@tabler/icons-react';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect } from 'react';
import { trackEvent } from '@/features/wish/shared/lib/analytics';
import { useQrToken } from '../hooks/useQrToken';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/** 0:59 형태로 남은 시간을 표시한다. */
function formatRemaining(seconds) {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
/**
 * 축제 QR 팝업 (Figma 1297:4955)
 *
 * 토큰은 60초마다 바뀌므로 남은 시간을 같이 보여주고,
 * 사용자가 직접 갱신할 수도 있다.
 */
export function QrDialog({ profile, onClose }) {
    const { token, remainingSeconds, isPending, isError, refresh } = useQrToken(true);
    useEffect(() => {
        trackEvent('QR_PAGE_VIEW', { route: '/my' });
    }, []);
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title="QR 코드" height="139.695cqw" onClose={onClose}>
        <p className="absolute top-[38.168cqw] left-1/2 w-[37.913cqw] -translate-x-1/2 text-center text-[4.071cqw] font-semibold text-purple">
          {profile.name} <span className="text-[3.562cqw] font-normal">({profile.studentNo})</span>
        </p>
        <p className="absolute top-[45.038cqw] left-1/2 w-[37.913cqw] -translate-x-1/2 text-center text-[3.562cqw] font-semibold text-purple">
          {profile.department}
        </p>

        {/*
         * 스캐너는 QR 주변 여백(quiet zone)으로 코드 범위를 잡는다.
         * 시안에는 검은 테두리가 있지만 여백을 먹어 인식률을 떨어뜨려서 뺐다.
         */}
        <div className="absolute top-[53.944cqw] left-[17.557cqw] size-[50.382cqw] bg-white">
          {token ? (<QRCodeSVG value={token} level="M" marginSize={4} className="size-full"/>) : (<p className="flex size-full items-center justify-center text-[3.053cqw] text-gray-04">
              {isError ? 'QR을 불러오지 못했습니다.' : isPending ? '불러오는 중…' : ''}
            </p>)}
        </div>
        <p className="absolute top-[104cqw] w-full text-center font-body text-[12px] font-semibold text-red">데모용 QR · 실제 사용 불가</p>

        <p className="absolute top-[106.87cqw] left-1/2 -translate-x-1/2 text-[3.562cqw] font-semibold text-red">
          {formatRemaining(remainingSeconds)}
        </p>

        <button type="button" onClick={refresh} className="absolute top-[114.504cqw] left-[31.043cqw] h-[4.326cqw] w-[21.628cqw]">
          <IconRefresh aria-hidden className="absolute top-[1.272cqw] left-0 size-[2.545cqw] text-gray-04"/>
          <span className="absolute top-0 left-[calc(50%+2.29cqw)] -translate-x-1/2 text-[3.053cqw] font-medium whitespace-nowrap text-gray-04 underline">
            남은 시간 갱신
          </span>
        </button>
      </DialogFrame>
    </DialogOverlay>);
}
