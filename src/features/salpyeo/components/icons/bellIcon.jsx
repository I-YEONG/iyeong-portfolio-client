import bellIcon from "@/assets/salpyeo/icons/bell.png";
import "./_index.css";

const BellIcon = () => {
  return (
    <div
      className="iconsStyleClass"
      style={{
        backgroundColor: "var(--orange)",
      }}>
      <div
        style={{
          backgroundImage: `url(${bellIcon})`,
        }}>
        {/* icon */}
      </div>
    </div>
  );
};
export default BellIcon;
