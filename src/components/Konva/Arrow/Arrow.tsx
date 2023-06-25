import { useAtom, useSetAtom } from "jotai";
import { allNodesAtom, NodeAtomFamily,addNodeAtom } from "src/atoms/ROS/Node";
import { Arrow, Ellipse, Group, Rect, Text } from "react-konva";
import { nanoid } from "nanoid"; 

interface Point {
    x: number;
    y: number;
    }   

const ArrowComp = ({ from ,to }:{from:Point,to:Point}) => {
  
  return (
    <Arrow 
    x = {from.x}
    y = {from.y}
    points={[0,0,to.x-from.x,to.y-from.y]}
    // points={[from.x,from.y,to.x,to.y]}
    stroke="black"
    fill="black"
    strokeWidth={2}
    pointerLength={10}
    />
  );
};

export default ArrowComp;