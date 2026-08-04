import { FoodButtonCP } from "@/features/food/components";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FoodError404Page = () => {
  const nav = useNavigate();
  return (
    <section className="foodFlexCenter" style={{ height: "100%", width: "100%", backgroundColor: "white" }}>
      <div className="foodFlexCol" style={{ alignItems: "center", gap: "1rem" }}>
        <FontAwesomeIcon icon={faBan} style={{ fontSize: "6rem", color: "rgb(238, 81, 81)" }} />
        <h1 style={{ fontSize: "3rem", fontWeight: "700" }}>404 ERROR</h1>
        <h3 style={{ fontSize: "1rem", color: "gray" }}>존재하지 않는 페이지 입니다.</h3>
        <div onClick={() => nav("/project/foodmap/")}>
          <FoodButtonCP>메인화면</FoodButtonCP>
        </div>
      </div>
    </section>
  );
};
export default FoodError404Page;
