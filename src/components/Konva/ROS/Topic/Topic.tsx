import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { allTopicsAtom, TopicAtomFamily } from "src/atoms/ROS/Topic";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";
import { activeToolAtom, addTopicConnectionAtom, connectionAtom, drawerStateAtom, toggleForceUpdateAtom } from "src/atoms/config_atoms";
import { addSubAtom } from "src/atoms/ROS/Node";
import { useResetAtom } from "jotai/utils";

const Topic = ({ id }) => {
  const [topic] = useAtom(TopicAtomFamily({ id }));
  // console.log(topic.id);

  const setDrawer = useSetAtom(drawerStateAtom);
  const activeTool = useAtomValue(activeToolAtom);
  const foceUpdate = useSetAtom(toggleForceUpdateAtom);

  const connection = useAtomValue(connectionAtom);
  const resetConnection = useResetAtom(connectionAtom);
  const addSub = useSetAtom(addSubAtom);

  const addTopicConnection = useSetAtom(addTopicConnectionAtom);

  const width = 120;
  const height = 60;

  const handleClick = (e) => {
    if (activeTool !== "connection") return;
    
    console.log(e);
    
    const complete = addTopicConnection(id);
    if (!complete) return;
    addSub({ nodeID: complete, topic: id });
    resetConnection();
  };

  const handleRightClick = (e) => {
    e.evt.preventDefault();
    console.log("right click");
    setDrawer({ isOpen: true, viewingID: id,viewingType:"topic"});
  };

  return (
    <Group 
    draggable 
    id={topic.id}
    x = {topic.position.x-width/2}
    y = {topic.position.y -height/2}
    onDragMove={foceUpdate}
    onClick={handleClick}
    onTap={handleClick}
    onContextMenu={handleRightClick}
    >
      <Rect
        width={width}
        fill="white"
        height={height}
        strokeEnabled={true}
        stroke={ topic.id === connection.topic ? "red" : "black"}
        //shadow
        shadowColor="rgba(210, 210, 210, 0.9)"
        shadowBlur={24}
        shadowOffsetX={5}
        shadowOffsetY={8}
      />
      <Text
        width={width}
        height={height}
        text={"/" + topic.title}
        fontSize={22}

        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Topic;
