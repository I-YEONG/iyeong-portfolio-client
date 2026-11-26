import { PendingRelease } from '@/components/wish/PendingRelease';
import { BOOTHS_RELEASE_AT, BoothMapScreen, useBoothsRelease } from '@/features/wish/booths';
export default function BoothsPage() {
    const released = useBoothsRelease();
    // 공개 전에는 지도를 그리지 않아 부스 목록과 네이버 지도 SDK를 요청하지 않는다.
    if (!released) {
        return (<PendingRelease title="부스 지도" message="MAP은" releaseAt={BOOTHS_RELEASE_AT} singleLine activeNavigationId="booths"/>);
    }
    return <BoothMapScreen />;
}
