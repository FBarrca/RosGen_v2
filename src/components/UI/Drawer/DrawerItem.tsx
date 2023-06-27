import { useAtom } from "jotai";
import React from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import styled from "styled-components";
import { Card as AntCard, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DrawerItemProps {
  title: string ;
  editable?: boolean;
  deletable?: boolean;
  content: string | React.ReactNode;
}


const StyledCard = styled(AntCard)`
  width: calc(100% - 10px);
  padding: 0px;
  margin: 5px;
//   border: 1px solid black;

  .ant-card-head {
    min-height: 0px;
    padding: 0px;
    padding-left: 10px;
  }
  .ant-card-head-title {
    font-size: 14px;
    padding: 2px;
  }
  .ant-card-body {
    padding: 10px;
    padding-left: 20px;
    max-width: 99%;   // Specify maximum width
    overflow-x: auto;  // Enable horizontal scrolling if content overflows
    // dont fold
    white-space: nowrap;
  }
`;

const StyledButton = styled(Button).attrs(() => ({
  type: "link",
  size: "small",
}))`
  margin-right: 10px;
`;

const DrawerItem: React.FC<DrawerItemProps> = ({
  title,
  editable,
  deletable,
  content,
}) => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);

  return (
    <StyledCard
      title={title + ":"}
      bordered={true}
      extra={
        <>
          {editable && <StyledButton icon={<EditOutlined />} />}
          {deletable && <StyledButton icon={<DeleteOutlined />} danger />}
        </>
      }
    >
      {content}
    </StyledCard>
  );
};

export default DrawerItem;
