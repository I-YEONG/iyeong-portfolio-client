import UnivNoticeToggleCP from "../../_common/UnivNoticeToggleCP";
import "./style.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const UnivNoticeDeviceCP = ({ device, onChangeActive, onDeleteDevice }) => {
  const onChangeActiveFunc = (value) => {
    onChangeActive(device.id, value);
  };

  return (
    <div className="deviceCp flexBetween">
      <div>{device?.name}</div>
      <div className="icon flexBetween">
        <DeleteOutlineIcon
          className="trash"
          onClick={() => {
            onDeleteDevice(device.id);
          }}
        />
        <UnivNoticeToggleCP value={device.is_active} onClickFun={onChangeActiveFunc} />
      </div>
    </div>
  );
};
export default UnivNoticeDeviceCP;
