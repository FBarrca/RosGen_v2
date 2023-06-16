import React, { FC, useContext, useEffect } from "react";
import { Card } from "antd";
import SidebarButton from "./SidebarButton";
import {
  InfoCircleOutlined,
  NodeIndexOutlined,
  ExportOutlined,
  BorderlessTableOutlined,
  EllipsisOutlined,
  FolderAddTwoTone,
  FileAddTwoTone,
  PlusCircleTwoTone,
  PlusSquareTwoTone,
} from "@ant-design/icons";


const options = [

  {
    label: "Information Drawer",
    value: "drawer",
    icon: <InfoCircleOutlined />,
    toggle: true,
  },
  {
    label: "Add Comment",
    value: "comment",
    icon: <FileAddTwoTone />,
    toggle: true,
  },
  {
    label: "Connections",
    value: "connect",
    icon: <NodeIndexOutlined />,
    toggle: true,
  },
  {
    label: "Add Node",
    value: "node",
    icon: <PlusCircleTwoTone />,
    toggle: true,
  },
  {
    label: "Add Topic",
    value: "topic",
    icon: <PlusSquareTwoTone />,
    toggle: true,
  },
  {
    label: "Add Service",
    value: "service",
    icon: <FolderAddTwoTone />,
    toggle: true,
  },
  {
    label: "Export",
    value: "export",
    icon: <ExportOutlined />,
    toggle: false,
  },
  {
    label: "Other options",
    value: "other",
    icon: <EllipsisOutlined style={{ fontSize: "16px", color: "#08c" }} />,
    toggle: false,
  },
];

const Sidebar: FC = () => {

  return  (
    // Centered vertically stick to the left
    <Card style={{
      position: 'absolute', 
      top: '50%', 
      left: 0, 
      marginLeft: '10px',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: "5px 8px 24px 5px rgba(233, 233, 233, 0.9)",
      // hsl(0, 0%, 92%) as background color
      backgroundColor: "#f3f3f4",
      // add border
      border: "0.5px solid #d9d9d9",
      borderRadius: "20px",
    }}
    bodyStyle={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "0px", paddingBottom: "10px" }}
>
    {options.map((option) => (
            <SidebarButton
              key={option.value}
              icon={option.icon}
              onClick={() => {}}
              label={option.label}
              option={option.value}
              selected={false}
            />
          ))}

    </Card>
  );
};
export default Sidebar;
