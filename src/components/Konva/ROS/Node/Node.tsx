import { useAtom, useSetAtom } from "jotai";
import { allNodesAtom, NodeAtomFamily,addNodeAtom } from "src/atoms/ROS/Node";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid"; 


const Node = ({ id }) => {
  const [node] = useAtom(NodeAtomFamily({ id }));
  console.log(node.id);
  const width = 260;
  const height = 100;

  return (
    <Group
      draggable
      id={node.id}
    >
      <Ellipse
        radiusX={width / 2}
        fill="white"
        radiusY={height / 2}
        x={node.position.x}
        y={node.position.y}
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
        text={"/" + node.title}
        x={node.position.x - width / 2}
        y={node.position.y - height / 2}
        fontSize={22}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Node;