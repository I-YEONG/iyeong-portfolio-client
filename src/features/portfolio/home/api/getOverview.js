export const getOverview = async () => {
  // 실제 환경: const response = await axios.get('/api/v1/profile');
  // return response.data;

  // 테스트용 가짜 데이터 반환
  return {
    name: "김개발",
    role: "Frontend Developer",
    bio: "사용자 경험을 중시하는 프론트엔드 개발자입니다.",
    githubUrl: "https://github.com/...",
  };
};
