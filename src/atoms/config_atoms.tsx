import { WritableAtom, atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import Konva from "konva";

export interface CanvasStateInterface {
  scale: number;
  position: { x: number; y: number };
}

export const canvasStateAtom = atomWithReset<CanvasStateInterface>({
  scale: 1,
  position: { x: 0, y: 0 },
});

export const stageAtom = atomWithReset<Konva.Stage | null>(null);

type ActiveTool = "comment" | "connection" | "node" | "topic" | "service";

export const activeToolAtom = atom<ActiveTool>("node");


interface connectionAtomInterface {
  node: string | null;
  topic: string | null;
}

export const connectionAtom = atomWithReset<connectionAtomInterface>({
  node: null,
  topic: null,
});

export const addNodeConnectionAtom = atom(null, (get, set, nodeID: string) => {
  
  set(connectionAtom, (prev) => ({ ...prev, node: nodeID }));
  const connection = get(connectionAtom);
  if (connection.topic == null) return false;
  return connection.topic;
});


export const addTopicConnectionAtom = atom(null, (get, set, topicID: string) => {
  set(connectionAtom, (prev) => ({ ...prev, topic: topicID }));
  const connection = get(connectionAtom);
  if (connection.node == null) return false;
  return connection.node;
});


//  force update

export const forceUpdateAtom = atom<boolean>(false)

export const toggleForceUpdateAtom = atom(null, (get, set) => {
  set(forceUpdateAtom, (prev) => !prev);
}
)

