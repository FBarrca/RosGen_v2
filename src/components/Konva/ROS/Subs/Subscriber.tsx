import { useAtom } from "jotai";
import { allNodesAtom, NodeAtomFamily } from "../../../../atoms/ROS/Node";
import { Rect,Text } from "react-konva";
import { nanoid } from "nanoid";

export const SubsRenderer = () => {
  const [Nodes,setNodes ] = useAtom(allNodesAtom);
  const add = (e:any) => {
    console.log("add");
    // e.preventDefault();
    const title = "test";
    const id = nanoid();
    NodeAtomFamily({ id });
    setNodes((prev) => [...prev, id]);
  };
  return (
    <>
    <Rect onClick={(e) => add(e)} fill="yellow"width={100}
          height={100}/>
      {Nodes.map((node) => (
        <Sub id={node} />
      ))}
    </>
  );
};


const Sub = ({id}) => {
    const [node, ] = useAtom(NodeAtomFamily({ id }));
    console.log(node.id);
    return(
        <Text
          key={node.id}
          text={node.id}
          x={node.position.x}
          y={node.position.y}
          width={100}
          height={100}
          fill="red"
        />
    )
}

