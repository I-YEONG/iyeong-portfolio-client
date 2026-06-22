import MainLayout from "..";
import { useAtomValue } from "jotai";
import bgImg from "@/assets/image/loginPage_gb.jpg";
import AlertCP from "@/features/careerhi/components/_common/alertCP";
import { isPcModeAtom } from "@/atoms/deviceAtoms";

const LoginLayout = ({ children, isAlertOpen = false, alertTitleText = "", alertButtonText = "", onAlertOk }) => {
  const isPc = useAtomValue(isPcModeAtom);

  return (
    <div>
      {isAlertOpen && <AlertCP titleText={alertTitleText} buttonText={alertButtonText} okButton={onAlertOk} />}
      <div className="w-full h-full" style={isAlertOpen ? { position: "absolute", top: 0, left: 0 } : {}}>
        <MainLayout>
          <div className="w-full h-[calc(100vh-5.125rem)] flex justify-between select-none overflow-y-hidden">
            {/* 왼쪽 배경 */}
            {isPc && (
              <div
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFF 109.46%), linear-gradient(0deg, rgba(224,245,255,0.39) 0%, rgba(224,245,255,0.39) 100%), url('${bgImg}')`,
                  backgroundColor: "lightgray",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-1/2 h-full flex flex-col justify-between text-right text-9xl text-white font-medium select-none">
                <p>Spread</p>
                <p>* your</p>
                <p>vision</p>
              </div>
            )}
            <div className={`${isPc ? "w-1/2" : "w-full"} h-full flexCenter relative overflow-y-auto`}>
              {/* 콘텐츠 */}
              <div className={`${isPc ? "w-1/2" : "w-full"} h-full flex flex-col gap-7 justify-center items-center relative`}>{children}</div>
            </div>
          </div>
        </MainLayout>
      </div>
    </div>
  );
};
export default LoginLayout;
