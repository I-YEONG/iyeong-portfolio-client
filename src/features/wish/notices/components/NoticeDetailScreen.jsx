import { IconDownload } from '@tabler/icons-react';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useNotice } from '../hooks/useNotices';
import { formatDate, isImageAttachment, isVideoAttachment, withNoticePrefix } from '../utils';
import { DetailPageLayout } from './DetailPageLayout';
import { FeedbackBlock } from './FeedbackBlock';
import { DetailSkeleton } from './LoadingSkeleton';
export function NoticeDetailScreen({ noticeId }) {
    const noticeQuery = useNotice(noticeId);
    return (<DetailPageLayout backTo={ROUTES.NOTICES}>
      {!Number.isInteger(noticeId) || noticeId <= 0 ? (<FeedbackBlock message="잘못된 공지사항 주소입니다."/>) : null}
      {noticeQuery.isPending && Number.isInteger(noticeId) && noticeId > 0 ? (<DetailSkeleton label="공지사항"/>) : null}
      {noticeQuery.isError ? (<FeedbackBlock message="공지사항을 불러오지 못했습니다." onRetry={() => void noticeQuery.refetch()}/>) : null}
      {noticeQuery.data ? (<article className="py-3">
          <h2 className="text-xl leading-normal font-semibold text-black">
            {withNoticePrefix(noticeQuery.data.title)}
          </h2>
          <div className="mt-4 flex items-center justify-between text-sm font-light text-gray-04">
            <time dateTime={noticeQuery.data.createdAt ?? undefined}>
              {formatDate(noticeQuery.data.createdAt)}
            </time>
            <span>{noticeQuery.data.authorName}</span>
          </div>
          {noticeQuery.data.media.length ? (<div className="mt-4 space-y-3">
              {noticeQuery.data.media.map((attachment, index) => isVideoAttachment(attachment.contentType, attachment.url) ? (<video key={attachment.id ?? `${attachment.url}-${index}`} aria-label={attachment.originalFilename || noticeQuery.data.title} controls preload="metadata" className="block w-full rounded-sm border border-gray-01 bg-black">
                    <source src={attachment.url} type={attachment.contentType || undefined}/>
                    동영상을 재생할 수 없습니다.
                  </video>) : isImageAttachment(attachment.contentType, attachment.url) ? (<img key={attachment.id ?? `${attachment.url}-${index}`} src={attachment.url} alt={index === 0 ? noticeQuery.data.title : ''} className="block w-full rounded-sm border border-gray-01 object-cover"/>) : (<a key={attachment.id ?? `${attachment.url}-${index}`} href={attachment.url} className="block min-h-11 text-sm text-blue underline">
                    {attachment.originalFilename || '첨부 미디어 열기'}
                  </a>))}
            </div>) : null}
          <p className="mt-4 text-base leading-normal whitespace-pre-line text-purple">
            {noticeQuery.data.content}
          </p>
          {noticeQuery.data.files.length ? (<section className="mt-6 border-t border-gray-01 pt-4" aria-labelledby="notice-files">
              <h3 id="notice-files" className="text-sm font-semibold text-purple">
                첨부파일
              </h3>
              <ul className="mt-2 space-y-2">
                {noticeQuery.data.files.map((file, index) => (<li key={file.id ?? `${file.url}-${index}`}>
                    <a href={file.url} download className="flex min-h-11 items-center gap-2 text-sm text-blue underline">
                      <IconDownload size={18} aria-hidden="true"/>
                      <span className="min-w-0 truncate">
                        {file.originalFilename || `첨부파일 ${index + 1}`}
                      </span>
                    </a>
                  </li>))}
              </ul>
            </section>) : null}
        </article>) : null}
    </DetailPageLayout>);
}
