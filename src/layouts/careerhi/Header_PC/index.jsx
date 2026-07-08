import LogoCP from "@/features/careerhi/components/_common/logoCP";
import "./style.css";
import { useAuth } from "@/hooks/useAuth";

const HeaderPc = () => {
  const { isLogin, login } = useAuth();

  return (
    <header className="w-full h-20.5 bg-gray-100 justify-between items-center px-[2vw] select-none relative z-800 flex">
      <LogoCP />
      {isLogin && (
        <div className="flex items-center gap-3">
          <div className="w-fit h-9 bg-point-text rounded-[3.75rem] text-white px-4 select-none B3_bold flex items-center ">사용자님</div>
          <span className="B3">어서오세요!</span>
        </div>
      )}
      {!isLogin && (
        <div onClick={() => login()} className="w-fit h-9 bg-point-text rounded-[3.75rem] text-white px-4 select-none cursor-pointer B3_bold flex items-center">
          로그인이 필요합니다
        </div>
      )}
    </header>
  );
};
export default HeaderPc;
