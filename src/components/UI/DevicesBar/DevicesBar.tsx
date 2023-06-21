import React, { FC, useEffect, useState, useContext } from "react";
import { Button, Card, List, Row, Col } from "antd";
import DeviceButton from "./DeviceButton";
// import colorPallete from "../../../constants/colorPallete.json";
import styled from "styled-components";
import "./DevicesBar.css";
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

const devices = {
  selected: 0,
  list: [
    {
      color: "#f44336",
      name: "Device 1",
      id: 0,
    },
    {
      color: "#f44336",
      name: "Device 1",
      id: 0,
    },
  ],
};

const setDevices = (devices: any) => {
  console.log("setDevices", devices);
};

const StyledCard = styled(Card)`
  .ant-card-head {
    background-color: #f3f3f4;
    padding: 0;
    width: 100%;
    border: 0.5px solid #d9d9d9;
    height: 60px;
    border-radius: 10px;
  }
  .antd-card {
    background-color: #f3f3f4;
    border: 0.5px solid #d9d9d9;
    border-radius: 10px;
  }
  .ant-card-body {
    padding: 0;
    width: 100%;
  }
  .ant-card-actions {
    background-color: #f3f3f4;
    width: 100%;
`;

const DevicesBar: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);
  const [mode, setMode] = useState<"view" | "edit"|"none"|"delete">("view");

  const removeDevice = (id: number) => {
    console.log(`Device with id ${id} removed.`);
    // remove the device from your state here
  };

  const editDevice = (id: number, newName: string) => {
    console.log(`Device with id ${id} edited. New name: ${newName}`);
    // update the device in your state here
  };
  useEffect(() => {
    const handleResize = () => {
      if (visible) {
        setVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [visible]);

  return (
    <StyledCard
      className={`devices-container${visible ? " expanded" : ""}`}
      style={{
        width: visible ? "170px" : "60px",
        right: visible ? 10 : -0,
      }}
      title={
        <Row wrap={false}>
          <Col style={{ marginLeft: "-4px" }}>
            <Button
              type="ghost"
              shape="circle"
              icon={visible ? <LeftOutlined /> : <RightOutlined />}
              onClick={() => setVisible(!visible)}
            />
          </Col>
          <Col style={{ marginLeft: "-4px", paddingRight: "0px" }}>
            <DesktopOutlined
              style={{
                fontSize: "1.2rem",
                position: "relative",
                top: "6px",
              }}
            />
          </Col>
          <Col
            className={visible ? "" : "fade-out"}
            style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          >
            Devices:
          </Col>
        </Row>
      }
      actions={
        visible
          ? [
              <PlusOutlined
                key="setting"
                onClick={() => {
                  setMode("none");
                  // addDevice();
                }}
              />,
              <EditOutlined key="edit" onClick={() => setMode("edit")} />,
              <DeleteOutlined key="delete" onClick={() => setMode("delete")} />,
            ]
          : []
      }
    >
      {
        // CONTENT
        visible && (
          <div className="slide-down">
            <List
              size="small"
              dataSource={devices.list}
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
              renderItem={(item) => (
                <DeviceButton
                  key={item.id}
                  color={item.color}
                  name={item.name}
                  id={item.id}
                  onChange={(color) => {
                    console.log(color);
                    item.color = color;
                    setDevices({
                      ...devices,
                    });
                  }}
                  onClick={() => {
                    setSelectedDevice(item.id);
                    setDevices({
                      ...devices,
                      selected: item.id,
                    });
                  }}
                  selected={item.id === selectedDevice}
                  onClickDelete={(e: any, id: number) => removeDevice(id)}
                  onClickEdit={(newName: string) =>
                    editDevice(item.id, newName)
                  }
                  mode={mode}
                />
              )}
            />
          </div>
        )
      }
    </StyledCard>
  );
};

export default DevicesBar;
