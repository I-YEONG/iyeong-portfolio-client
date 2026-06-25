import { useAtomValue } from "jotai";
import HeaderMobile from "./Header_Mobile";
import HeaderPc from "./Header_PC";
import { isPcModeAtom } from "@/atoms/deviceAtoms";
import "@/styles/careerhi.global.css";

const MainLayout = ({ children, mobile_block = false, page = "main" }) => {
  const isPc = useAtomValue(isPcModeAtom);

  if (!isPc) {
    return (
      <main className="relative w-full h-full bg-white">
        <div className={`w-full ${mobile_block ? "h-9/10" : "h-full"} px-8 relative overflow-y-auto`}>{children}</div>
        {mobile_block && <HeaderMobile page={page} />}
      </main>
    );
  }

  return (
    <main className="w-full h-full">
      <HeaderPc />
      {children}
    </main>
  );
};
export default MainLayout;
