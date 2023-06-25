import {  useAtom, useAtomValue, useSetAtom } from "jotai";
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
  forceUpdateAtom,
  stageAtom,
  toggleForceUpdateAtom,
} from "src/atoms/config_atoms";
import { useResetAtom } from "jotai/utils";
import Pub from "../Pub/Publisher";


const Node = ({ id }) => {
  const [node] = useAtom(NodeAtomFamily({ id }));
  const stage = useAtomValue(stageAtom);
  const updateState = useAtomValue(forceUpdateAtom);
  const foceUpdate = useSetAtom(toggleForceUpdateAtom);

  console.log(node.subscribedTopics);
  const activeTool = useAtomValue(activeToolAtom);

  const connection = useAtomValue(connectionAtom);
  const resetConnection = useResetAtom(connectionAtom);

  const addNodeConnection = useSetAtom(addNodeConnectionAtom);
  const addPub = useSetAtom(addPubAtom);

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
    foceUpdate();
  };

  const handleClick = (e) => {
    if (activeTool !== "connection") return;
    
    // console.log(e);
    
    const complete = addNodeConnection(id);
    if (!complete) return;
    console.log(`Node: ${id} Topic: ${complete}`);;
    addPub({ nodeID: id, topic: complete });

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

{PublishedTopics.map((topic) => {
    console.log(topic);
    return (
      <Pub nodeID={node.id} topicID={topic} />
    )
})}
    </>
  );
};

export default Node;

