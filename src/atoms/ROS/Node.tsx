// https://jotai.org/docs/utilities/family
import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";
import { allSubsAtom } from "./Subscriber";
export type Node = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position?: { x: number; y: number };
};

export const NodeAtomFamily = atomFamily(
  (node: Node) => atom({ ...node }),
  (a, b) => a.id === b.id
);


// atom with all the ids of the nodes
export const allNodesAtom = atom<string[]>([]);

// Write only atom to add a new node
export const addNodeAtom = atom(
  null,
  (get, set, arg?: Partial<Node>) => {
    const id = nanoid();
    // Add the new id to allNodesAtom
    set(allNodesAtom, (prev) => [...prev, id]);
    // Create a new node in NodeAtomFamily with arg properties
    NodeAtomFamily({ id, title: "New Node", position: { x: 0, y: 0 }, ...arg });
    return id;
  }
);

export const allNodeSubs = (node) =>
  atom((get) => {
    const allSubs = get(allSubsAtom);
    return allSubs.filter((sub) => sub.parentNode === node.id);
  });

//  To call use   const [item, setItem] = useAtom(todoAtomFamily({ id }));

// To add a new node
// const id = nanoid();
// NodeAtomFamily({ id, title });
// setTodos((prev) => [...prev, id]);jota
