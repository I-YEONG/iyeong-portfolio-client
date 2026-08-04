import { useNavigate } from "react-router-dom";

import "./style.css";
import { useCallback, useEffect } from "react";
import { useInput } from "@/hooks/useInput";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import { UnivNoticeButtonCP, UnivNoticeInputCP } from "@/features/univNotice/components";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useAuth } from "@/hooks/useAuth";

const UnivNoticeDeviceAppendPage = () => {
  const { isPc, setMobileMode } = useDeviceMode();
  const { login } = useAuth();
  const nav = useNavigate();
  const [code, onChangeCode, setCode] = useInput("A85PY");

  const onClickRegister = () => {
    // const onClickRegister = useCallback(
    // async (e) => {
    // e.preventDefault();
    // try {
    //   if (code.trim() === "") {
    //     alert("코드를 입력해 주세요");
    //     return;
    //   }
    //   if (code.length !== 6) {
    //     alert("코드는 6자리입니다");
    //     return;
    //   }

    //   // 1. 모바일의 fcm 토큰, 기기 이름, id(있으면) 호출
    //   sendToApp("FCM_TOKEN", null, async (responseData) => {
    //     if (responseData.success) {
    //       try {
    //         const loginData = {
    //           fcm_token: responseData.token,
    //           device_name: responseData.name,
    //           device_id: responseData.device_id || null,
    //           code: code,
    //         };

    //         // 2. QR 로그인 호출
    //         const res = await userLoginAtCode(loginData);

    //         if (!res) {
    //           alert("코드가 올바르지 않거나 만료되었습니다\n 다시 시도해 주세요");
    //           return;
    //         }

    //         // 3. 성공 시 로그인 처리 및 모바일에 리프레시 토큰 및 디바이스 id 저장
    //         if (!res?.device_id || !res?.refresh_token) {
    //           alert("오류가 발생했습니다\n 나중에 다시 시도해 주세요");
    //         } else {
    //           sendToApp("REFRESH_TOKEN", { refresh_token: res.refresh_token, device_id: res.device_id }, (tokenData) => {
    //             if (tokenData.success) {
    //               nav("/");
    //             } else {
    //               alert("리프레시 토큰 저장에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
    //               // 리프레시 토큰 저장 실패 시 등록된 기기 삭제
    //               DeviceDelete(res.device_id)
    //                 .then(() => {
    //                   setCode("");
    //                 })
    //                 .catch(() => {
    //                   setCode("");
    //                 });
    //             }
    //           });
    //         }
    //       } catch (err) {
    //         alert("네트워크 오류\n 나중에 다시 시도해 주세요.");
    //       }
    //     } else {
    //       alert("오류가 발생했습니다\n 나중에 다시 시도해 주세요");
    //     }
    //   });
    // } catch (err) {
    //   alert("네트워크 오류\n 나중에 다시 시도해 주세요.");
    //   return;
    // }

    // 2. 위의 데이터를 포함하여/qr/login 호출
    // 3. 성공 시 로그인 처리 및 모바일에 리프레시 토큰 및 디바이스 id 저장
    login();
    nav("/project/univnotice");
    // },
    // [code],
  };

  useEffect(() => {
    setTimeout(() => {
      if (isPc) {
        alert("모바일에서만 접근 가능합니다\n 모바일 모드로 변경됩니다");
        setMobileMode();
      }
    }, 200);
  }, [isPc]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClickRegister(e);
    }
  };
  return (
    <UnivNoticeLogoLayout>
      <section className="deviceAppendPage flexCenter" style={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        <div className="deviceAppendPage-content">
          <div>{/* 이미지 */}</div>
          <p>
            <span>웹 사이트</span>에서 설정하던
            <br />
            내용을 <span>모바일 앱</span>에 불러옵니다
          </p>
          <div className="inputBox">
            <UnivNoticeInputCP value={code} onChange={onChangeCode} placeholder="화면에 있는 코드를 입력" onKeyDown={onEnter} />
          </div>
          <div>
            <div onClick={onClickRegister}>
              <UnivNoticeButtonCP bgColor="--domo-point-color-1">로그인 및 기기 등록</UnivNoticeButtonCP>
            </div>
            <p className="terms" onClick={() => nav("/project/univnotice/terms")}>
              <span>넘어갈 시 개인정보 처리 방침과 이용 약관에 동의함으로 간주합니다.</span>
            </p>
          </div>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeDeviceAppendPage;
