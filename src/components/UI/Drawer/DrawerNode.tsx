// import { Col, Drawer, Row } from "antd";
import { useAtom, useAtomValue } from "jotai";
import React, { useContext, useEffect } from "react";
import { drawerStateAtom } from "src/atoms/config_atoms";
import styled from "styled-components";
import { Col, Row as AntRow, Row, Select } from "antd";
import DrawerItem from "./DrawerItem";
import { NodeAtomFamily } from "src/atoms/ROS/Node";
import { allDevicesAtom } from "src/atoms/ROS/Device";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { atomFamily } from "node_modules/jotai/utils";
import { TopicAtomFamily, allTopicsAtom } from "src/atoms/ROS/Topic";

const StyledRow = styled(AntRow)`
  color: black;

  .ant-col {
    border: 1px solid black;
  }
`;
interface DrawerNodeProps {
  id: string;
}
const SubscriberComponent = ({ id }) => {
  const [topic] = useAtom(TopicAtomFamily({ id }));

  return (
    <div>
      {topic.title}
    </div>
  );
};
const PublisherComponent = ({ id }) => {
  const [topic] = useAtom(TopicAtomFamily({ id }));

  return (
    <div>
      {topic.title} 
    </div>
  );
};

const DrawerNode: React.FC<DrawerNodeProps> = ({ id }) => {
  const [drawerState, setDrawerState] = useAtom(drawerStateAtom);

  const [node, setNode] = useAtom(NodeAtomFamily({ id }));
  const allDevices = useAtomValue(allDevicesAtom);
  console.log(node);

  return (
    // center horizontally
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
                defaultValue={node.deviceID}
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
          <DrawerItem
            title="Subscribers"
            content={node.subscribedTopics.map((topic) => {
              return <SubscriberComponent id={topic} key={topic} />; //useAtomValue(TopicAtomFamily({id:topic}))
            })}
            editable
          />
        </Col>
        <Col span={12}>
          <DrawerItem
            title="Publishers"
            content={node.publishedTopics.map((topic) => {
              return <PublisherComponent id={topic}  key={topic} />; //useAtomValue(TopicAtomFamily({id:topic}))
            })}
            editable
          />
        </Col>
      </Row>

      <Row style={{ flex: 1 }}>
        <Col span={24}>
          <DrawerItem
            title="Code"
            style={{ height: "97 %" }}
            content={
              <CodeEditor
                value={"CODE"}
                language="py"
                placeholder="Please enter JS code."
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  height: "calc(100% - 30px)",
                  borderRadius: 5,
                }}
              />
            }
          />
        </Col>
      </Row>
    </div>
  );
};
export default DrawerNode;
