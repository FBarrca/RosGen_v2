import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Node } from "./Node";
import { Topic } from "./Topic";
type Pub = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position: { x: number; y: number };
  parentTopic: string;
  node: string;
};

export const PubAtomFamily = atomFamily(
  ({ title, parentTopic, node }: Pub) =>
    atom({
      title: title,
      position: { x: 0, y: 0 },
      parentTopic: parentTopic,
      node: node,
    }),
  (a, b) => a.id === b.id
);

export const allPubsAtom = atom<Pub[]>([]);
