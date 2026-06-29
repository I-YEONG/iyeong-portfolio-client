import detalIcon from "@/assets/salpyeo/icons/detal.png";
import "./_index.css";

const DetalIcon = () => {
  return (
    <div
      className="iconsStyleClass"
      style={{
        backgroundColor: "var(--red-200)",
      }}>
      <div
        style={{
          backgroundImage: `url(${detalIcon})`,
        }}>
        {/* icon */}
      </div>
    </div>
  );
};
export default DetalIcon;
