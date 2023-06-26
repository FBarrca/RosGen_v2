import { Col, Drawer, Row } from "antd";
import { useAtom } from "jotai";
import React, { useContext, useEffect } from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";

const DrawerNode: React.FC = () => {

    const [drawerState, setDrawerState]= useAtom(drawerStateAtom);

return (
<>
<Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    
</>
)
};
export default DrawerNode;