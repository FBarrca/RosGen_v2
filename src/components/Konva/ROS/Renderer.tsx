import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { Rect } from "react-konva";
import { allTopicsAtom, TopicAtomFamily } from "src/atoms/ROS/Topic";
import Topic from "src/components/Konva/ROS/Topic/Topic";
import { allNodesAtom, addNodeAtom } from "src/atoms/ROS/Node";
import  Node  from "src/components/Konva/ROS/Node/Node";
import { stageAtom } from "src/atoms/config_atoms";
import Sub from "./Subs/Subscriber";
export const Renderer = () => {
  const stage = useAtomValue(stageAtom)
  const [Topics, setTopics] = useAtom(allTopicsAtom);
  const Nodes = useAtomValue(allNodesAtom);

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
          {/* <Sub nodeID="9HU7g5ZW9CsposmFkLZx2" topicID="SVCkB-ktifjPUzWJLa7xg" /> */}

      {Topics.map((topic) => (
        <Topic id={topic} key={topic}  />
      ))}
      {Nodes.map((node) => (
        <Node id={node} key={node}  />
      ))}
    </>
  );
};
