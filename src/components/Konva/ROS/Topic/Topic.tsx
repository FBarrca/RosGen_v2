import { useAtom } from "jotai";
import { allTopicsAtom, TopicAtomFamily } from "src/atoms/ROS/Topic";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";


const Topic = ({ id }) => {
  const [topic] = useAtom(TopicAtomFamily({ id }));
  console.log(topic.id);
  const width = 120;
  const height = 60;

  return (
    <Group
      draggable
      id={topic.id}
    >
      <Rect
        width={width}
        fill="white"
        height={height}
        x={topic.position.x}
        y={topic.position.y}
        // strokeEnabled={true}
        stroke={ "black"}
        //shadow
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.3}
        // onContextMenu={(e) => { e.evt.preventDefault(); console.log('right click'); }}
      />
      <Text
        width={width}
        height={height}
        text={"/" + topic.title}
        x={topic.position.x}
        y={topic.position.y }
        fontSize={22}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Topic;