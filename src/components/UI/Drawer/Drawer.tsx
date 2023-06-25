import { Drawer } from "antd";
import { useAtom } from "jotai";
import React, { useContext, useEffect } from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";

const InfoDrawer: React.FC = () => {

    const [drawerState, setDrawerState]= useAtom(drawerStateAtom);

return (

    <Drawer title="Basic Drawer" placement="right"  open={drawerState.isOpen}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
)
};
export default InfoDrawer;