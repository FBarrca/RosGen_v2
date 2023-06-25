import { useAtomValue } from "jotai";
import { NodeAtomFamily } from "../../../../atoms/ROS/Node";
import ArrowComp from "../../Arrow/Arrow";
import { findKonva } from "src/utils/findKonva";
import { stageAtom } from "src/atoms/config_atoms";
import {
  getAngle,
  getPointOnEllipse,
  getPointOnRectangle,
} from "../../Arrow/arrow_helpers";

const Sub = ({ nodeID, topicID }: { nodeID: string; topicID: string }) => {
  const stage = useAtomValue(stageAtom);
  // const node = findKonva(nodeID,stage)
  const topic = findKonva(topicID, stage);
  const nodeAtom = useAtomValue(NodeAtomFamily({ id: nodeID }));

  if (nodeAtom == undefined || topic == undefined) {
    console.log("undefined");
    return null;
  }
  const nodePos = { x: nodeAtom.position.x, y: nodeAtom.position.y };
  const topicPos = { x: topic.x() + 60, y: topic.y() + 30 };
  const angle = getAngle(nodePos, topicPos);

  return (
    <>
      <ArrowComp
        from={getPointOnEllipse(130, 50, nodePos.x, nodePos.y, angle)}
        to={getPointOnRectangle(120, 60, topicPos.x, topicPos.y, -angle)}
      />
    </>
  );
};

export default Sub;
