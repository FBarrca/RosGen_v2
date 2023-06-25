import { useAtomValue } from "jotai";
import { allTopicsAtom } from "src/atoms/ROS/Topic";
import Topic from "src/components/Konva/ROS/Topic/Topic";
import { allNodesAtom } from "src/atoms/ROS/Node";
import Node from "src/components/Konva/ROS/Node/Node";

export const Renderer = () => {
  const Topics = useAtomValue(allTopicsAtom);
  const Nodes = useAtomValue(allNodesAtom);
  return (
    <>
      {Nodes.map((node) => (
        <Node id={node} key={node} />
      ))}
      {Topics.map((topic) => (
        <Topic id={topic} key={topic} />
      ))}
    </>
  );
};
