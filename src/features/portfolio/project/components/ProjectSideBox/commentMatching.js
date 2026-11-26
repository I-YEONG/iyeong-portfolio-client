import { matchPath } from 'react-router-dom';

export const getCommentsForPath = (comments, path) => {
  const hasExactMatch = comments.some((comment) => comment.detailUrl === path);
  return comments.filter(({ detailUrl }) =>
    detailUrl === '*' || detailUrl === path ||
    (!hasExactMatch && detailUrl?.includes('/:') && matchPath({ path: detailUrl, caseSensitive: true, end: true }, path)),
  ).sort((a, b) => a.sort - b.sort);
};
