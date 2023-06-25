import { useAtom, useAtomValue } from "jotai";
import { allNodesAtom, NodeAtomFamily } from "../../../../atoms/ROS/Node";
import { Arrow, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";
// import { SubAtomFamily } from "src/atoms/ROS/Subscriber";
import ArrowComp from "../../Arrow/Arrow";
import { TopicAtomFamily } from "src/atoms/ROS/Topic";
import { findKonva } from "src/utils/findKonva";
import { stageAtom } from "src/atoms/config_atoms";
import {
  getAngle,
  getPointOnEllipse,
  getPointOnRectangle,
} from "../../Arrow/arrow_helpers";

const Pub = ({ nodeID, topicID }: { nodeID: string; topicID: string }) => {
  const stage = useAtomValue(stageAtom);
  // const node = findKonva(nodeID,stage)
  const topic = findKonva(topicID, stage);
  const nodeAtom = useAtomValue(NodeAtomFamily({ id: nodeID }));

  if (nodeAtom == undefined || topic == undefined) {
    console.log("undefined");
    return null;
  }
  // const nodePos = {x:node.x(),y:node.y()}
  const nodePos = { x: nodeAtom.position.x, y: nodeAtom.position.y };
  const topicPos = { x: topic.x() + 60, y: topic.y() + 30 };
  const angle = getAngle(nodePos, topicPos);
  console.log(
    `From: ${nodePos.x},${nodePos.y} To: ${topicPos.x},${topicPos.y}`
  );
  // console.log(node.id);
  return (
    <>
      <ArrowComp
        to={getPointOnEllipse(130, 50, nodePos.x, nodePos.y, angle)}
        from={getPointOnRectangle(120, 60, topicPos.x, topicPos.y, -angle)}
      />
    </>
  );
};

export default Pub;
