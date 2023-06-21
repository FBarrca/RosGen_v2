import { useAtom, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { Rect } from "react-konva";
import { allTopicsAtom, TopicAtomFamily } from "src/atoms/ROS/Topic";
import Topic from "src/components/Konva/ROS/Topic/Topic";
import { allNodesAtom, addNodeAtom } from "src/atoms/ROS/Node";
import  Node  from "src/components/Konva/ROS/Node/Node";

export const Renderer = () => {
  const [Topics, setTopics] = useAtom(allTopicsAtom);
  const [Nodes, setNodes] = useAtom(allNodesAtom);
  const addNode = useSetAtom(addNodeAtom);

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
      {Topics.map((topic) => (
        <Topic id={topic} />
      ))}
      {Nodes.map((node) => (
        <Node id={node} />
      ))}
    </>
  );
};
