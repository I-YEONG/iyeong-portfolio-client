import { css } from "@emotion/react";

export const domoRecsResultStyle = (isPc) =>
  css({
    overflowY: "hidden",
    height: "100%",

    // =============
    //    PC 스타일
    // =============
    "& .recsResultPage": {
      display: "flex",
      width: "100%",
      height: "calc(100% - min(12vh, 89px))",
      overflow: "hidden",
    },

    "& .recsResult_list": {
      // 미디어 쿼리 대체
      width: isPc ? "36%" : "100%",
      maxWidth: isPc ? "640px" : "100%",
      // height: "calc(100%-89px)",

      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      zIndex: 10,
      backgroundColor: "var(--black-0)",
    },

    "& .recsResult_header": {
      marginBottom: "clamp(0.5vw, 1vw, 2.5rem)",
      backgroundColor: "white",
    },

    "& .recsResult_back-button": {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      display: "flex",
      alignItems: "center",
      color: "var(--domo-main-color)",
    },

    "& .recsResult_back-button .logo-text": {
      fontFamily: "dxpop",
      fontSize: "24px",
      fontWeight: "bold",
      marginLeft: "5px",
    },

    "& .list_header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "clamp(0.5vw, 1vw, 2.5rem)",
    },

    "& .list_header_title": {
      fontSize: "clamp(1.5rem, 1.4vw, 2.5rem)",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    "& .list_header_title span": {
      color: "var(--domo-main-color)",
    },

    "& .list_header_backBtn": {
      backgroundColor: "var(--domo-point-color-2)",
      border: "none",
      maxWidth: "124px",
      maxHeight: "56px",
      padding: "2rem 0",
      width: "100%",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)",
      fontWeight: 600,
      color: "var(--domo-point-color-2-2)",
      fontFamily: "pre-semibold",
    },

    "& .list_header_backBtn:hover": {
      backgroundColor: "var(--domo-point-color-2)",
      color: "var(--domo-point-color-2-2)",
    },

    "& .list_items": {
      overflowY: "auto",
      overflowX: "hidden",
      flex: 1,
      height: "100%",
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      marginTop: "10px",
    },

    "& .list_item": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "25px",
      position: "relative",
    },

    "& .item_number": {
      minWidth: "25px",
      fontSize: "40px",
      fontWeight: 400,
      marginRight: "16px",
      flex: 0.01,
      color: "var(--domo-main-color)",
      fontFamily: "pre-regular",
    },

    "& .item_card": {
      cursor: "pointer",
      display: "flex",
      flex: 0.95,
      backgroundColor: "white",
      border: "1px solid #eee",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    },

    "& .item_card:hover": {
      backgroundColor: "whitesmoke",
    },

    "& .item_content": {
      display: "flex",
      padding: "20px",
      flexGrow: 1,
      alignItems: "center",
      height: "100%",
      width: "100%",
    },

    "& .item_img": {
      width: "clamp(3rem, 4vw, 6rem)",
      height: "clamp(3rem, 4vw, 6rem)",
      borderRadius: "50%",
      fontSize: "clamp(1.4rem, 2vw, 2.5rem)",
      backgroundColor: "var(--domo-point-color-2)",
      color: "var(--domo-point-color-2-2)",
      marginRight: "18px",
      flexShrink: 0,
    },

    "& .item_info": {
      minWidth: 0,
      flexGrow: 1,
    },

    "& .item_name": {
      fontWeight: 600,
      fontSize: "clamp(1.2rem, 1.25vw, 1.3rem)",
      marginBottom: "6px",
      fontFamily: "pre-semibold",
      color: "#2c2f33",
    },

    "& .item_address": {
      fontSize: "clamp(0.8rem, 0.8vw, 1rem)",
      color: "#b7bbcf",
      marginBottom: "12px",
      fontFamily: "pre-medium",
    },

    "& .item_benefit": {
      fontSize: "clamp(0.75rem, 0.75vw, 0.9rem)",
      backgroundColor: "#dbeeff",
      color: "var(--domo-main-color)",
      borderRadius: "12px",
      display: "inline-block",
      fontFamily: "pre-regular",
      padding: "10px",
    },

    "& .item_dots": {
      backgroundColor: "#eff0f5",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      height: "100%",
      width: "clamp(3rem, 4vw, 4rem)",
      borderRadius: "20px",
      marginLeft: "16px",
    },

    "& .item_dots:hover": {
      backgroundColor: "#e6e8f5",
    },

    "& .item_dots span": {
      width: "6px",
      height: "6px",
      backgroundColor: "#b7bbcf",
      borderRadius: "50%",
    },

    "& .list_footer": {
      paddingTop: "clamp(3vh, 5vh, 8vh)",
    },

    "& .list_footer-btn": {
      color: "white",
      backgroundColor: "var(--domo-main-color)",
      width: "100%",
      height: "12vh",
      maxHeight: "88px",
      borderRadius: "20px",
      fontSize: "clamp(1.2rem, 1.5vw, 2rem)",
      fontFamily: "pre-semibold",
      fontWeight: 600,
      cursor: "pointer",
    },

    "& .list_footer-btn:hover": {
      backgroundColor: "#004690",
    },

    "& .recsResult_map": {
      flexGrow: 1,
    },

    "& .recsResult_fallback": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      textAlign: "center",
    },

    "& .recsResult_fallback p": {
      fontSize: "24px",
      color: "#333",
      marginBottom: "24px",
    },

    "& .recsResult_fallback button": {
      padding: "12px 26px",
      fontSize: "18px",
      fontWeight: "bold",
      backgroundColor: "var(--domo-main-color)",
      color: "var(--black-0)",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
    },

    "& .recsResult_fallback button:hover": {
      backgroundColor: "#0056b3",
    },

    "& > .recsResultPage": {
      marginTop: "min(12vh, 89px)",
    },

    // 미디어 쿼리 대체
    "& + header": {
      display: isPc ? "block" : "none",
    },

    // =============
    //  모바일 스타일
    // =============
    ".isMobile": {
      width: "100%",
      height: "calc(100vh - min(12vh, 89px)) !important",
      overflow: "hidden !important",
    },

    "& .isMobile .recsResult_header": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "64px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16px",
    },

    "& .isMobile .recsResult_map": {
      zIndex: 95,
      position: "absolute",
      top: "60px",
      left: 0,
      width: "100%",
      height: "60vh",
    },

    "& .isMobile .recsResult_resizable": {
      zIndex: "997 !important",
      width: "100% !important",
      height: "100%",
      position: "absolute !important",
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },

    "& .isMobile .recsResult_resizable > div": {
      backgroundColor: "var(--black-0)",
      borderRadius: "30px 30px 0 0",
      boxShadow: "0 0 10px -4px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
    },

    "& .isMobile .recsResult_resizable .recsResult_resizable_controller": {
      width: "25%",
      height: "4px",
      borderRadius: "999px",
      margin: "12px auto",
      backgroundColor: "var(--black-2)",
    },

    "& .isMobile .recsResult_list": {
      padding: "1rem 24px",
    },

    "& .isMobile .list_header_title": {
      fontSize: "1.4rem",
      fontFamily: "pre-semibold",
    },

    "& .isMobile .list_header_backBtn": {
      backgroundColor: "var(--domo-point-color-2)",
      border: "none",
      width: "25%",
      height: "56px",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: 600,
      color: "var(--domo-point-color-2-2)",
      fontFamily: "pre-semibold",
    },

    "& .isMobile .list_items": {
      overflowY: "auto",
      maxHeight: "45vh",
    },

    "& .isMobile .list_item .item_number": {
      fontSize: "1.6rem",
      flex: 0.1,
    },

    "& .isMobile .list_item .item_card .item_content": {
      padding: "10px 20px",
      flex: 1,
    },

    "& .isMobile .list_item .item_card .item_img": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "var(--domo-point-color-2-2)",
      width: "56px",
      height: "56px",
      padding: "12px",
    },

    "& .isMobile .list_item .item_dots": {
      width: "45px !important",
    },

    "& .isMobile .list_item .item_card .item_content, & .isMobile .list_item .item_dots": {
      minHeight: "135px",
      maxHeight: "145px",
    },

    "& .isMobile .list_item .item_card .item_info .item_name": {
      fontSize: "1rem",
    },

    "& .isMobile .list_item .item_card .item_info .item_address": {
      fontSize: "0.8rem",
    },

    "& .isMobile .list_item .item_card .item_info .item_benefit": {
      padding: "8px 12px",
      fontSize: "0.8rem",
    },

    "& .isMobile .list_footer-btn": {
      color: "white",
      backgroundColor: "var(--domo-main-color)",
      width: "90%",
      height: "5vh",
      borderRadius: "20px",
      fontSize: "16px",
      fontFamily: "pre-semibold",
      fontWeight: 600,
      cursor: "pointer",
      position: "absolute",
      left: "50%",
      bottom: "2vh",
      transform: "translateX(-50%)",
      zIndex: 999,
    },

    // =============
    //   공통 유틸
    // =============
    "& .none": {
      display: "none",
    },

    // =============
    //    모달
    // =============
    "& .modal_content": {
      padding: "0 !important",
      minHeight: "38vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      justifyContent: "space-between",
      minWidth: "unset !important",
    },

    "& .modal_content_ > div:nth-child(1)": {
      width: "100%",
      height: "40%",
      minHeight: "128px",
      backgroundColor: "var(--domo-point-color-2)",
      borderRadius: "24px 24px 0 0",
      padding: "24px 48px",
      overflow: "visible",
      position: "relative",
    },

    "& .modal_content_ > div:nth-child(1) > p": {
      width: "100%",
      textAlign: "end",
    },

    "& .modal_content_ > div:nth-child(1) .icon": {
      cursor: "pointer",
      color: "var(--black-5)",
      backgroundColor: "#ffffff8a",
      display: "inline-block",
      width: "24px",
      minWidth: "24px",
      height: "24px",
      minHeight: "24px",
      padding: "12px",
      borderRadius: "50%",
    },

    "& .modal_content_ > div:nth-child(1) > div": {
      position: "absolute",
      width: "124px",
      minWidth: "124px",
      height: "124px",
      minHeight: "124px",
      top: "50%",
      backgroundColor: "var(--black-0)",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",
      color: "var(--domo-point-color-2-2)",
      border: "4px solid var(--domo-point-color-2)",
    },

    "& .modal_content_ > div:nth-child(2)": {
      padding: "72px 48px 24px",
    },

    "& .modal_content_ > div:nth-child(2) > p:nth-child(1)": {
      fontFamily: "pre-semibold",
      fontSize: "clamp(1.5rem, 1.5vw, 2rem)",
    },

    "& .modal_content_ > div:nth-child(2) > p:nth-child(2)": {
      margin: "12px 0 20px",
      fontSize: "clamp(1.2rem, 1vw, 1.4rem)",
      color: "var(--black-4)",
      fontFamily: "pre-regular",
    },

    "& .modal_content_ > div:nth-child(2) > p:nth-child(3)": {
      fontSize: "clamp(1rem, 1vw, 1.2rem)",
      color: "var(--domo-main-color)",
      backgroundColor: "#dbeeff",
      fontFamily: "pre-regular",
      borderRadius: "12px",
      padding: "10px 12px",
      display: "inline",
    },

    "& .modal_content_ > div:nth-child(3)": {
      padding: "24px 48px",
      height: "126px",
      textAlign: "center",
    },

    "& .modal_background > div > div:nth-child(1)": {
      marginBottom: "unset !important",
    },

    "& .item_name, & .item_address, & .item_benefit": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    "& .modal_content_2": {
      padding: "48px 48px",
    },

    "& .modal_content_2 > p": {
      fontFamily: "pre-semibold",
      fontSize: "clamp(1rem, 1.5vw, 1.6rem)",
      marginBottom: "16px",
      lineHeight: 1.4,
    },

    "& .modal_content_2 > div:nth-child(2)": {
      width: "100%",
      height: "120px",
      display: "flex",
      padding: "0 20px",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      borderRadius: "12px",
      border: "1px solid var(--black-2)",
    },

    "& .modal_content_2 > div:nth-child(3)": {
      height: "64px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
    },

    "& .modal_content_2 > div:nth-child(3) > div": {
      height: "100%",
      width: "100%",
      borderRadius: "12px",
      flex: 1,
      fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    "& .modal_content_2 > div:nth-child(3) > div:nth-child(1)": {
      backgroundColor: "var(--black-1)",
      cursor: "pointer",
      color: "var(--black-2)",
    },

    "& .modal_content_2 > div:nth-child(3) > div:nth-child(2)": {
      backgroundColor: "var(--domo-main-color)",
      cursor: "pointer",
      color: "var(--black-0)",
    },
  });
