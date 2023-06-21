import { useAtom } from "jotai";
import { allNodesAtom, NodeAtomFamily } from "atoms/ROS/Node";
import { Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid";

export const NodesRenderer = () => {
  const [Nodes, setNodes] = useAtom(allNodesAtom);
  const add = (e: any) => {
    console.log("add");
    // e.preventDefault();
    const title = "test";
    const id = nanoid();
    NodeAtomFamily({ id });
    setNodes((prev) => [...prev, id]);
  };
  return (
    <>
      <Rect onClick={(e) => add(e) } onTap={(e) => add(e)} fill="yellow" width={100} height={100} />
      {Nodes.map((node) => (
        <Node id={node} />
      ))}
    </>
  );
};

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
