import { Button, Drawer } from "antd";
import { useAtom } from "jotai";
import React from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import { DeleteOutlined } from "@ant-design/icons";
import DrawerNode from "./DrawerNode";

const InfoDrawer: React.FC = () => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);
  // Type capitalized
  if (!drawerState.viewingType) return null;

  const name =
    drawerState.viewingType.charAt(0).toUpperCase() +
    drawerState.viewingType.slice(1);

  const handleClose = () => {
    setDrawerState((prev) => ({ ...prev, isOpen: false }));
  };

  const renderContent = () => {
    switch (drawerState.viewingType) {
      case "node":
        return <DrawerNode />;
      case "topic":
        return <div>Edge</div>;
      case "subscriber":
        return <div>Graph</div>;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <Drawer
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
              // onClick={}
            >
              Delete
            </Button>
          }
        </>
      }
    >
      {renderContent()}
    </Drawer>
  );
};

export default InfoDrawer;
