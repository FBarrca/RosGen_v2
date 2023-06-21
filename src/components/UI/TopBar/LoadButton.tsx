import React, { useState, useRef } from "react";
import {
  Button,
  Card,
  Divider,
  Space,
  Typography,
  Tooltip,
  Dropdown,
  MenuProps,
} from "antd";
import { ExportOutlined, MenuOutlined } from "@ant-design/icons";
import "./TopBar.css";

const items: MenuProps["items"] = [
  {
    label: "New network",
    key: "new",
    icon: <ExportOutlined />,
  },
  {
    label: "Load network",
    key: "load",
    icon: <ExportOutlined />,
  },
  {
    label: "Save network",
    key: "save",
    icon: <ExportOutlined />,
  },
];

const TopBar: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState("Hola caracola");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleMenuClick = ({ key }:
    { item: React.ReactInstance, key: string, keyPath: string[], domEvent: Event}
    ) => {
    switch (key) {
      case "new":
        // Perform action for 1st item
        console.log("1st item clicked");
        break;
      case "load":
        // Perform action for 1st item
        ref.current?.click();
        break;
      case "save":
        // Perform action for 2nd item
        console.log("2nd item clicked");
        break;
      default:
        console.log("No action");
        break;
    }
  };

  // Disable typescript error
// @ts-ignore
  const menuProps = {
    items,
    onClick: () => {handleMenuClick},
  };
  const ref = useRef<HTMLInputElement>(null);
  const [editableStr, setEditableStr] = useState("This is an editable text.");
  return (
    <Card
      className="card-container"
      bodyStyle={{
        paddingLeft: "10px",
        paddingRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <Space direction="horizontal">
        <Dropdown menu={menuProps}>
          <Button className="card-button">
            <MenuOutlined />
          </Button>
        </Dropdown>
        <Divider
          className="divider"
          type="vertical"
          style={{ height: "30px", width: 5 }}
        />
        <Typography.Text
          className="editable-text"
          editable={{
            onChange: setEditableStr,
            tooltip: false,
            autoSize: { minRows: 1, maxRows: 1 },
          }}
          style={{ height: "20px" }}
        >
          {editableStr}
        </Typography.Text>
        <Divider
          className="divider"
          type="vertical"
          style={{ height: "30px", width: 5 }}
        />
        <Tooltip title="Export to code">
          <Button className="card-button">
            <ExportOutlined />
          </Button>
        </Tooltip>
      </Space>
      <input
        type="file"
        ref={ref}
        onChange={changeHandler}
        style={{ display: "none" }}
      />
    </Card>
  );
};
export default TopBar;
