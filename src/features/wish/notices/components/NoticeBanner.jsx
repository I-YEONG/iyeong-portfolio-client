import { generatePath, Link } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { getBannerImage, withNoticePrefix } from '../utils';
export function NoticeBanner({ notice }) {
    const image = getBannerImage(notice);
    return (<Link to={generatePath(ROUTES.NOTICE_DETAIL, { id: String(notice.id) })} className="group relative block h-[90px] overflow-hidden bg-black text-white" aria-label={`${withNoticePrefix(notice.title)} 상세 보기`}>
      {image ? (<img src={image.url} alt="" className="size-full object-cover transition-transform group-hover:scale-[1.02]"/>) : (<span className="absolute inset-0 bg-main-02"/>)}
      <span className="absolute inset-x-0 bottom-0 h-[46px] bg-gradient-to-b from-[#0000] to-[#000]"/>
      <span className="absolute inset-x-5 bottom-2 truncate font-display text-base font-medium">
        {withNoticePrefix(notice.title)}
      </span>
    </Link>);
}
