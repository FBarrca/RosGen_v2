import { WritableAtom, atom } from "jotai";
import { atomWithReset } from "jotai/utils";
import Konva from "konva";

export interface CanvasStateInterface {
  scale: number;
  position: { x: number; y: number };
}

// Canvas position for panning and zooming
export const canvasStateAtom = atomWithReset<CanvasStateInterface>({
  scale: 1,
  position: { x: 0, y: 0 },
});

// Stores the Konva.Stage instance mainly so we can acess Konva nodes through .find()
export const stageAtom = atomWithReset<Konva.Stage | null>(null);

// Stores the tool from Sidebar that is currently active
type ActiveTool = "comment" | "connection" | "node" | "topic" | "service";
export const activeToolAtom = atom<ActiveTool>("node");

// Used for the connection tool, stores the id of the node or topic that is currently selected
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
export const addTopicConnectionAtom = atom(
  null,
  (get, set, topicID: string) => {
    set(connectionAtom, (prev) => ({ ...prev, topic: topicID }));
    const connection = get(connectionAtom);
    if (connection.node == null) return false;
    return connection.node;
  }
);

//  force update all components that read this atom used because atomFamily does not update when the atom is updated
export const forceUpdateAtom = atom<boolean>(false);
export const toggleForceUpdateAtom = atom(null, (get, set) => {
  set(forceUpdateAtom, (prev) => !prev);
});

export interface drawerAtomInterface {
  isOpen: boolean;
  viewingID: string | null;
  viewingType: "node" | "topic" | "subscriber" | "publisher" | null;
}
// Used to store the drawer states
export const drawerStateAtom = atomWithReset<drawerAtomInterface>({
  isOpen: false,
  viewingID: null,
  viewingType: null,
});
