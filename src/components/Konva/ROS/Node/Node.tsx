import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  NodeAtomFamily,
  updateNodePositionAtom,
  addPubAtom,
} from "src/atoms/ROS/Node";
import { Ellipse, Group, Text } from "react-konva";
import Sub from "src/components/Konva/ROS/Subs/Subscriber";
import {
  activeToolAtom,
  addNodeConnectionAtom,
  connectionAtom,
  drawerStateAtom,
  forceUpdateAtom,
  toggleForceUpdateAtom,
} from "src/atoms/config_atoms";
import { useResetAtom } from "jotai/utils";
import Pub from "../Pub/Publisher";
import { useRef } from "react";

const Node = ({ id }) => {
  const [node] = useAtom(NodeAtomFamily({ id }));
  const width = 260;
  const height = 100;

  // Rerender the arrows at drag
  const updateState = useAtomValue(forceUpdateAtom);
  const foceUpdate = useSetAtom(toggleForceUpdateAtom);
  const updateNodePosition = useSetAtom(updateNodePositionAtom);
  const handleDrag = (e) => {
    updateNodePosition({
      id: node.id,
      position: { x: e.target.x(), y: e.target.y() },
    });
    foceUpdate();
  };

  // Add connection between nodes
  const activeTool = useAtomValue(activeToolAtom);

  const connection = useAtomValue(connectionAtom);
  const resetConnection = useResetAtom(connectionAtom);

  const addNodeConnection = useSetAtom(addNodeConnectionAtom);
  const addPub = useSetAtom(addPubAtom);

  const handleClick = (e) => {
    if (activeTool !== "connection") return;

    const complete = addNodeConnection(id);
    if (!complete) return;
    addPub({ nodeID: id, topic: complete });

    resetConnection();
  };

  // To open the drawer
  const setDrawer = useSetAtom(drawerStateAtom);

  const handleRightClick = (e) => {
    e.evt.preventDefault();
    console.log("right click");
    setDrawer({ isOpen: true, viewingID: id, viewingType: "node" });
  };
  const holdTimeoutRef = useRef(null);
  const handleTouchStart = (e) => {
    holdTimeoutRef.current = setTimeout(() => {
      console.log("hold");
      setDrawer({ isOpen: true, viewingID: id, viewingType: "node" });
    }, 500); // adjust the hold duration (ms)
  };
  const handleTouchEnd = (e) => {
    clearTimeout(holdTimeoutRef.current);
  };
  const handleDragStart = (e) => {
    clearTimeout(holdTimeoutRef.current);  // prevent hold event
  };
  return (
    <>
      <Group
        draggable
        id={node.id}
        onDragMove={handleDrag}
        x={node.position.x}
        y={node.position.y}
        onClick={handleClick}
        onTap={handleClick}
        onContextMenu={handleRightClick}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Ellipse
          radiusX={width / 2}
          fill="white"
          radiusY={height / 2}
          stroke={node.id === connection.node ? "red" : "black"}
          shadowColor="rgba(210, 210, 210, 0.9)"
          shadowBlur={24}
          shadowOffsetX={10}
          shadowOffsetY={5}
        />
        <Text
          width={width}
          height={height}
          text={"/" + node.title}
          x={-width / 2}
          y={0 - height / 2}
          fontSize={22}
          align="center"
          verticalAlign="middle"
        />
      </Group>

      {node.subscribedTopics.map((topic) => {
        return (
          <Sub
            nodeID={node.id}
            topicID={topic}
            key={"Sub_" + node.id + topic}
          />
        );
      })}

      {node.publishedTopics.map((topic) => {
        return (
          <Pub
            nodeID={node.id}
            topicID={topic}
            key={"Pub_" + node.id + topic}
          />
        );
      })}
    </>
  );
};

export default Node;
