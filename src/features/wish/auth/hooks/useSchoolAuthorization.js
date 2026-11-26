export function useSchoolAuthorization() {
  return { start: () => window.alert('데모에서는 학교 계정 인증을 진행하지 않습니다.'), isStarting: false };
}
