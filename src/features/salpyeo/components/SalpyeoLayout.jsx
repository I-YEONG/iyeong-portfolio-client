import "@/styles/salpyeo.global.css";

const SalpyeoLayout = ({ children }) => {
  return (
    // <div css={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
    <div className="app-container">
      <div className="scroll-area">{children}</div>
      {/* </div> */}
    </div>
  );
};
export default SalpyeoLayout;
