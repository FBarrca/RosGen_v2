// import { Col, Drawer, Row } from "antd";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext, useEffect } from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import styled from "styled-components";
import { Col, Row as AntRow, Row, Select } from "antd";
import DrawerItem from "./DrawerItem";
import { NodeAtomFamily } from "src/atoms/ROS/Node";
import { allDevicesAtom } from "src/atoms/ROS/Device";

const StyledRow = styled(AntRow)`
  color: black;

  .ant-col {
    border: 1px solid black;
  }
`;
interface DrawerNodeProps {
    id: string;
}

const DrawerNode: React.FC<DrawerNodeProps> = ({ id }) => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);

  const [node, setNode] = useAtom(NodeAtomFamily({ id }));
  const allDevices = useAtomValue(allDevicesAtom);
  console.log(node);
  return (
    // center horizontally
    <div style={{}}>
      <Row>
        <Col span={12}>
          <DrawerItem title="Node name" content={node.title} editable />
        </Col>
        <Col span={12}>
          <DrawerItem title="ID " content={node.id} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DrawerItem
            title="Running on Device"
            content={
              <Select
                defaultValue= {node.deviceID}
                style={{ width: "98%" }}
                // onChange={handleChange}
                options={[
                
                  ...allDevices.map((device) => ({
                    label: device.title,
                    value: device.id,
                  })),
                ]}
              />
            }
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <DrawerItem title="Subscribers" content={node.title} editable />
        </Col>
        <Col span={12}>
          <DrawerItem title="Publishers" content={node.id} editable />
        </Col>
      </Row>
    </div>
  );
};
export default DrawerNode;
