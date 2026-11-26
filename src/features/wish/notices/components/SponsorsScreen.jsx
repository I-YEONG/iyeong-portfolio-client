import { useState } from 'react';
import { useSponsors } from '../hooks/useSponsors';
import { FeedbackBlock } from './FeedbackBlock';
import { InformationPageLayout } from './InformationPageLayout';
import { CardGridSkeleton } from './LoadingSkeleton';
import { SponsorDetailDialog } from './SponsorDetailDialog';
export function SponsorsScreen() {
    const sponsorsQuery = useSponsors();
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    return (<InformationPageLayout activeId="sponsors">
      {sponsorsQuery.isPending ? <CardGridSkeleton label="협찬사"/> : null}
      {sponsorsQuery.isError ? (<FeedbackBlock message="협찬사를 불러오지 못했습니다." onRetry={() => void sponsorsQuery.refetch()}/>) : null}
      {sponsorsQuery.data?.length === 0 ? (<FeedbackBlock message="등록된 협찬사가 없습니다."/>) : null}
      {sponsorsQuery.data?.length ? (<ul className="grid grid-cols-2 gap-x-7 gap-y-7 px-3.5 pt-3 pb-8">
          {sponsorsQuery.data.map((sponsor) => (<li key={sponsor.id} className="min-w-0">
              <button type="button" onClick={() => setSelectedSponsor(sponsor)} aria-label={`${sponsor.name} 상세보기`} aria-haspopup="dialog" className="block w-full min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main-02">
                <span className="block aspect-square w-full overflow-hidden rounded-sm bg-gray-01">
                  {sponsor.imageUrl ? (<img src={sponsor.imageUrl} alt="" className="size-full object-cover" loading="lazy"/>) : (<span className="flex size-full items-center justify-center text-sm text-gray-04">
                      이미지 없음
                    </span>)}
                </span>
                <span className="mt-3 block truncate text-base text-black">{sponsor.name}</span>
                {sponsor.description ? (<span className="mt-1 block truncate text-sm font-light text-gray-04">
                    {sponsor.description}
                  </span>) : null}
                <span className="mt-1 block font-body text-sm text-main-02 underline underline-offset-4">
                  상세보기
                </span>
              </button>
            </li>))}
        </ul>) : null}
      {selectedSponsor ? (<SponsorDetailDialog sponsor={selectedSponsor} onClose={() => setSelectedSponsor(null)}/>) : null}
    </InformationPageLayout>);
}
