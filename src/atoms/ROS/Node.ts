// https://jotai.org/docs/utilities/family
import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";
import { allDevicesAtom } from "./Device";

export type Node = {
  id: string; // internal id (nanoid)
  deviceID?: string; // device the node belongs to
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
  if (!arg.deviceID) return; // DeviceID is required
  console.log("addNodeAtom", arg.deviceID);
  // Make sure the device exists
  const device = get(allDevicesAtom).find((d) => d.id === arg.deviceID);
  if (!device) return; // Device not found
  const id = nanoid();
  // Add the new id to allNodesAtom
  set(allNodesAtom, (prev) => [...prev, id]);
  // Create a new node in NodeAtomFamily with arg properties
  NodeAtomFamily({
    id,
    deviceID: arg.deviceID,
    title: "New Node",
    position: { x: 0, y: 0 },
    subscribedTopics: [],
    publishedTopics: [],
    ...arg,
  });
  return id;
});

export const updateNodePositionAtom = atom(
  null,
  (get, set, { id, position }) => {
    const node = get(NodeAtomFamily({ id }));
    node.position = position;
    set(NodeAtomFamily({ id }), node);
  }
);

export const addSubAtom = atom(
  null,
  (get, set, { nodeID, topic }: { nodeID: string; topic: string }) => {
    const node = get(NodeAtomFamily({ id: nodeID }));
    if (!node.subscribedTopics) return;
    // Check if the topic is already subscribed
    if (node.subscribedTopics.includes(topic)) return;
    node.subscribedTopics.push(topic);
    set(NodeAtomFamily({ id: nodeID }), node);
  }
);
export const addPubAtom = atom(
  null,
  (get, set, { nodeID, topic }: { nodeID: string; topic: string }) => {
    const node = get(NodeAtomFamily({ id: nodeID }));
    if (!node.publishedTopics) return;
    // Check if the topic is already published
    if (node.publishedTopics.includes(topic)) return;

    node.publishedTopics.push(topic);
    set(NodeAtomFamily({ id: nodeID }), node);
  }
);

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
