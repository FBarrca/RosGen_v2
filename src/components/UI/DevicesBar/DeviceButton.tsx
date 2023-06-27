import React, { useRef, useState, useCallback } from "react";
import { Popover, List, Button, Typography, Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";

import { HexColorPicker } from "react-colorful";
import useClickOutside from "./useClickOutside";
import { c } from "node_modules/jotai-devtools/dist/useAtomsDevtools-f8e164e7";
import { useAtom, useSetAtom } from "jotai";
import { currentDeviceAtom, deleteDeviceAtom, updateColorAtom, updateTitleAtom } from "src/atoms/ROS/Device";
import { selectAtom } from "node_modules/jotai/utils";

const { Text } = Typography;
interface DeviceButtonProps {
  index: number;
  id: string;
  title: string;
  color: string;
  selected: boolean;
  editing: boolean;
  deleting: boolean;
}
const DeviceButton: React.FC<DeviceButtonProps> = (props) => {
  const popover: any = useRef();
  const [isOpen, toggle] = useState(false);

  // console.log(props.index);
  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);
  const setColor = useSetAtom(updateColorAtom)
  const setTitle = useSetAtom(updateTitleAtom)
  const [selectedDevice, setSelectedDevice] = useAtom(currentDeviceAtom)


  const deleteDevice = useSetAtom(deleteDeviceAtom)
  const colorPickerComponent = (
    <HexColorPicker
      color={props.color}
      onChange={(color) => {
        setColor({id: props.id, color: color})
      }}
    />
  );

  const titleComponent = props.editing ? 
    <Input defaultValue={props.title} size="small" 
    onChange={(e) => 
      setTitle({id: props.id, title: e.target.value})
    } /> 
    : props.title;



    const deleteButton = (props.deleting && props.id != "default" ) ? (
      <Button
        type="text"
        icon={<DeleteOutlined />}
        size="small"
        onClick={() => 
        deleteDevice(props.id)
      }
      />
    ) : null;
  return (
    <List.Item 
    style={(selectedDevice === props.id) ? { backgroundColor: "#e9ecef" } : {backgroundColor: "#ffffff"}}
    extra={deleteButton}  
    onClick={() => setSelectedDevice(props.id)}
    >
      <List.Item.Meta
        avatar={
          <div className="picker">
            <Popover
              content={colorPickerComponent}
              title="Pick a new color"
              trigger="click"
              placement="leftTop"
            >
              <div
                className="swatch"
                style={{ backgroundColor: props.color }}
              />
            </Popover>
          </div>
        }
        title={titleComponent}
      />
    </List.Item>
  );
};

export default DeviceButton;
