import FoodMainLayOutFooter from "./FoodFooter";
import FoodMainLayOutHeader from "./FoodHeader";

const FoodMainLayOut = ({ children }) => {
  return (
    <div>
      <>
        <FoodMainLayOutHeader />
        {/* FIXME: 헤더 픽스 여부에 따라 스타일 조정  style={{ paddingTop: "70px" }}*/}
        <div>{children}</div>
        <FoodMainLayOutFooter />
      </>
    </div>
  );
};
export default FoodMainLayOut;
