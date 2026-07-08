import UnivNoticeToggleCP from "../../_common/UnivNoticeToggleCP";
import "./style.css";
import "@/styles/univNotice.global.css";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <FontAwesomeIcon
          icon={faTrash}
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
