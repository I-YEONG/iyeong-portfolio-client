import UnivNoticeToggleCP from "../../_common/UnivNoticeToggleCP";
import "./style.css";
import "@/styles/univNotice.global.css";
const UnivNoticeDeviceCP = ({ device, onChangeActive, onDeleteDevice }) => {
  const onChangeActiveFunc = (value) => {
    onChangeActive(device.id, value);
  };

  return (
    <div className="deviceCp univnoticeFlexBetween">
      <div>{device?.name}</div>
      <div className="icon univnoticeFlexBetween">
        {/* <DeleteOutlineIcon
          className="trash"
          onClick={() => {
            onDeleteDevice(device.id);
          }}
        /> */}
        {/* <FontAwesomeIcon icon={faTrash} /> */}
        <FontAwesomeIcon icon="fa-solid fa-trash" />
        <UnivNoticeToggleCP value={device.is_active} onClickFun={onChangeActiveFunc} />
      </div>
    </div>
  );
};
export default UnivNoticeDeviceCP;
