import { WritableAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  allNodesAtom,
  NodeAtomFamily,
  addNodeAtom,
  updateNodePositionAtom,
  addSubAtom,
} from "src/atoms/ROS/Node";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";
import { findKonva } from "src/utils/findKonva";
import Sub from "src/components/Konva/ROS/Subs/Subscriber";
import {
  activeToolAtom,
  addNodeConnectionAtom,
  connectionAtom,
  resetConnectionAtom,
  stageAtom,
} from "src/atoms/config_atoms";
import { useEffect } from "react";
import { add } from "lodash";

const Node = ({ id }) => {
  const [node] = useAtom(NodeAtomFamily({ id }));
  const stage = useAtomValue(stageAtom);

  console.log(node.subscribedTopics);
  const activeTool = useAtomValue(activeToolAtom);

  const connection = useAtomValue(connectionAtom);
  const resetConnection = useSetAtom(resetConnectionAtom);
  const addNodeConnection = useSetAtom(addNodeConnectionAtom);
  const addSub = useSetAtom(addSubAtom);

  const updateNodePosition = useSetAtom(updateNodePositionAtom);
  // console.log(node.id);
  const width = 260;
  const height = 100;
  const SubscribedTopics = node.subscribedTopics; // node.subscribedTopics;
  const PublishedTopics = node.publishedTopics;
  const handleDrag = (e) => {
    // console.log(e);
    updateNodePosition({
      id: node.id,
      position: { x: e.target.x(), y: e.target.y() },
    });
    stage.draw();
  };

  const handleClick = (e) => {
    if (activeTool !== "connection") return;
    
    // console.log(e);
    
    const complete = addNodeConnection(id);
    if (!complete) return;
    console.log(`Node: ${id} Topic: ${complete}`);;
    addSub({ nodeID: id, topic: complete });

  console.log(node.subscribedTopics)
    resetConnection();
  };
  
  return (
    <>
      <Group
        draggable
        id={node.id}
        onDragMove={(e) => {
          handleDrag(e);
        }}
        x={node.position.x}
        y={node.position.y}
        onClick={(e) => {
          handleClick(e);
        }}
        onTap={(e) => {
          handleClick(e);
        }}
        _useStrictMode
      >
        <Ellipse
        onClick={(e) => {
          handleClick(e);
        }}
          radiusX={width / 2}
          fill="white"
          radiusY={height / 2}
          // strokeEnabled={true}
          stroke={ node.id === connection.node ? "red" : "black"}
          //shadow
          shadowColor="rgba(210, 210, 210, 0.9)"
          shadowBlur={24}
          shadowOffsetX={10}
          shadowOffsetY={5}
          // onContextMenu={(e) => { e.evt.preventDefault(); console.log('right click'); }}
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

      {SubscribedTopics.map((topic) => {
    console.log(topic);
    return (
      <Sub nodeID={node.id} topicID={topic} />
    )
})}
      {/* {PublishedTopics.forEach((topic) => (
      
    
    ))} } */}
    </>
  );
};

export default Node;

