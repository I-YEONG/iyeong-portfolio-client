export function FeedbackBlock({ message, onRetry }) {
    return (<div className="flex min-h-40 flex-col items-center justify-center gap-3 px-6 text-center font-body text-sm text-gray-04">
      <p>{message}</p>
      {onRetry ? (<button type="button" onClick={onRetry} className="min-h-11 rounded-full border border-gray-01 px-5 py-2 font-medium text-purple">
          다시 시도
        </button>) : null}
    </div>);
}
