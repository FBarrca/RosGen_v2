import { Button, Drawer } from "antd";
import { useAtom, useSetAtom } from "jotai";
import React from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import { DeleteOutlined } from "@ant-design/icons";
import DrawerNode from "./DrawerNode";
import styled from "styled-components";
import { deleteNodeAtom } from "src/atoms/ROS/Node";
import { set } from "lodash";
import { useResetAtom } from "jotai/utils";



const StyledDrawer = styled(Drawer)`
  
  .ant-drawer-body {
    padding-top: 5px;
    // center horizontally
    display: flex;
    justify-content: center;
  }

`;
const InfoDrawer: React.FC = () => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);
  const deleteNode = useSetAtom(deleteNodeAtom);
  const resetDrawer = useResetAtom(drawerStateAtom);
  if (!drawerState.viewingType) return null;

  const name =
    drawerState.viewingType.charAt(0).toUpperCase() +
    drawerState.viewingType.slice(1);

  const handleClose = () => {
    setDrawerState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = () => {

    const prevdrawer = drawerState;
 
    switch (drawerState.viewingType) {
      case "node":
        deleteNode(drawerState.viewingID);
        break;

      default:
        break;
    }
    resetDrawer();
  };


  const renderContent = () => {
    switch (drawerState.viewingType) {
      case "node":
        return <DrawerNode id={drawerState.viewingID}/>;
      case "topic":
        return <div>Edge</div>;
      case "subscriber":
        return <div>Graph</div>;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <StyledDrawer
      title={name}
      placement="right"
      onClose={handleClose}
      open={drawerState.isOpen}
      extra={
        <>
          {
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          }
        </>
      }
    >
      {renderContent()}
    </StyledDrawer>
  );
};

export default InfoDrawer;
