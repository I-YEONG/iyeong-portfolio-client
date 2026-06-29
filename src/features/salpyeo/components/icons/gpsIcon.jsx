import gpsicon from "@/assets/salpyeo/icons/gps.png";
import gpsiconBold from "@/assets/salpyeo/icons/gps-bold.png";
import "./_index.css";

/**
 * GPS 버튼 컴포넌트
 */
const GpsIcon = ({ active }) => {
  return (
    <div
      className="iconsStyleClass"
      style={{
        backgroundColor: "var(--white)",
      }}>
      <div
        style={{
          backgroundImage: `url(${active ? gpsiconBold : gpsicon})`,
        }}>
        {/* icon */}
      </div>
    </div>
  );
};
export default GpsIcon;
