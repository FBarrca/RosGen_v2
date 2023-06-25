// https://jotai.org/docs/utilities/family
import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";

export type Node = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position?: { x: number; y: number };
  subscribedTopics?: string[];
  publishedTopics?: string[];
};

export const NodeAtomFamily = atomFamily(
  (node: Node) => atom({ ...node }),
  (a, b) => a.id === b.id
);

// atom with all the ids of the nodes
export const allNodesAtom = atom<string[]>([]);

// Write only atom to add a new node
export const addNodeAtom = atom(null, (get, set, arg?: Partial<Node>) => {
  const id = nanoid();
  // Add the new id to allNodesAtom
  set(allNodesAtom, (prev) => [...prev, id]);
  // Create a new node in NodeAtomFamily with arg properties
  NodeAtomFamily({
    id,
    title: "New Node",
    position: { x: 0, y: 0 },
    subscribedTopics: [],
    publishedTopics: [],
    ...arg,
  });
  return id;
});

export const updateNodePositionAtom = atom(null, (get, set, { id, position }) => {
  const node = get(NodeAtomFamily({ id }));
  node.position = position;
  set(NodeAtomFamily({ id }), node);
});


export const addSubAtom = atom(null, (get, set, { nodeID, topic }: { nodeID: string, topic: string }) => {
  const node = get(NodeAtomFamily({ id: nodeID }))
  if (node.subscribedTopics) {
    node.subscribedTopics.push(topic)
    set(NodeAtomFamily({ id: nodeID }), node)
  }
});
export const addPubAtom = atom(null, (get, set, { nodeID, topic }: { nodeID: string, topic: string }) => {
  const node = get(NodeAtomFamily({ id: nodeID }))
  if (node.publishedTopics) {
    node.publishedTopics.push(topic)
    set(NodeAtomFamily({ id: nodeID }), node)
  }
});


// return if a node is publishes to a topic
// export const PublishedTopic = (topic) =>
//   atom((get) => {
//     const allNodes = get(allNodesAtom);
//     return allNodes.filter((node) =>
//       get(NodeAtomFamily({ id: node })).publishedTopics.has(topic)
//     );
//   });

// // Returns if a node is subscribed to a topic
// export const SubscribedTopic = (topic) =>
//   atom((get) => {
//     const allNodes = get(allNodesAtom);
//     return allNodes.filter((node) =>
//       get(NodeAtomFamily({ id: node })).subscribedTopics.has(topic)
//     );
//   });


// 