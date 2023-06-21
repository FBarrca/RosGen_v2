import { useAtom } from "jotai";
import { allTopicsAtom, TopicAtomFamily } from "atoms/ROS/Topic";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";

export const TopicsRenderer = () => {
  const [Topics, setTopics] = useAtom(allTopicsAtom);
  const add = (e: any) => {
    console.log("add");
    // e.preventDefault();
    const title = "test";
    const id = nanoid();
    TopicAtomFamily({ id });
    setTopics((prev) => [...prev, id]);
  };
  return (
    <>
      <Rect onClick={(e) => add(e)} onTap={(e) => add(e) } x={100} y={100} fill="green" width={100} height={100} />
      {Topics.map((topic) => (
        <Topic id={topic} />
      ))}
    </>
  );
};

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
