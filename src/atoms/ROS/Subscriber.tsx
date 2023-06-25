// import { atom, Provider, useAtom, useSetAtom } from "jotai";
// import { atomFamily } from "jotai/utils";
// import { nanoid } from "nanoid";
// type Sub = {
//   id: string; // internal id (nanoid)
//   parentNode: string;
//   topic: string;
// };

// export const SubAtomFamily = atomFamily(
//   ({ id, parentNode, topic }: Sub) =>
//     atom({
//       id: id,
//       parentNode: parentNode,
//       topic: topic,
//     }),
//   (a, b) => a.id === b.id
// );

// export const allSubsAtom = atom<string[]>([]);

// // Write only atom to add a new node
// export const addSubAtom = atom(
//   null,
//   (get, set, node:string, topic:string) => {
//     const id = nanoid();
//     if allNodeSubs(node)
//     // Add the new id to allNodesAtom
//     set(allSubsAtom, (prev) => [...prev, id]);
//     // Create a new node in NodeAtomFamily with arg properties
//     SubAtomFamily({ id, parentNode: node, topic: topic });
//     return id;
//   }
// );


// export const allNodeSubs = (node) =>
//   atom((get) => {
//     const allSubs = get(allSubsAtom);
//     const [node] = useAtom();

//     return allSubs.filter((sub) => get(SubAtomFamily({ sub })).id === node.id);
//   });