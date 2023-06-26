// import { Col, Drawer, Row } from "antd";
import { useAtom } from "jotai";
import React, { useContext, useEffect } from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import styled from "styled-components";
import { Col, Row as AntRow, Row, Select } from "antd";
import DrawerItem from "./DrawerItem";
import { NodeAtomFamily } from "src/atoms/ROS/Node";

const StyledRow = styled(AntRow)`
  color: black;

  .ant-col {
    border: 1px solid black;
  }
`;

const DrawerNode: React.FC = ({ id }: { id: string }) => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);

  const [node, setNode] = useAtom(NodeAtomFamily({ id }));

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
            title="Devices"
            content={
              <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                // onChange={handleChange}
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
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
