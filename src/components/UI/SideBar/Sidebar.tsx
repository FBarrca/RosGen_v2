import "./Sidebar.css";
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
} from "@ant-design/icons"
import { styled } from "styled-components";
import { useAtom } from 'jotai';
import { activeToolAtom } from "src/atoms/config_atoms";

const options = [
  {
    label: "Add Comment",
    value: "comment",
    icon: <FileAddTwoTone />,
    toggle: true,
  },
  {
    label: "Connections",
    value: "connection",
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
];


const Sidebar: FC = () => {
  // use tool activeToolAtom
  const [activeTool, setActiveTool] = useAtom(activeToolAtom);

  return (
    <div className="sidebar-parent">
    <Card className="sidebar-card" 
    bodyStyle={{
      padding: 10,
      paddingTop: 0,
    }}
    >
      {options.map((option) => (
        <SidebarButton
          key={option.value}
          icon={option.icon}
          // @ts-ignore
          onClick={() => {setActiveTool(option.value);}}
          label={option.label}
          option={option.value}
          selected={option.value === activeTool}
        />
      ))}
    </Card>
    </div>
  );
};

export default Sidebar;