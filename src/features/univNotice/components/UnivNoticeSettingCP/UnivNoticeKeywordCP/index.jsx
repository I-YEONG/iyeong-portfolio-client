import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UnivNoticeKeywordCP = ({ kw, onDelete }) => {
  return (
    <div
      onClick={() => onDelete(kw)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.875rem",
        color: "var(--black-4)",
        border: "1px solid var(--black-3)",
        cursor: "pointer",
      }}>
      <span>{kw}</span>
      <span style={{ marginLeft: "4px", color: "var(--black-5)" }}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
    </div>
  );
};
export default UnivNoticeKeywordCP;
