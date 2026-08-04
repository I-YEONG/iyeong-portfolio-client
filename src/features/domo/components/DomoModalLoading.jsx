import { useEffect } from "react";

const DomoModalLoading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <section className="modal_background flexCenter">
      <div>
        <div className="modal_dots"></div>
        <div className="modal_dots"></div>
        <div className="modal_dots"></div>
      </div>
    </section>
  );
};
export default DomoModalLoading;
