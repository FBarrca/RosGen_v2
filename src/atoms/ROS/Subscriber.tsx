import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { Node } from "./Node";
type Sub = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position: { x: number; y: number };
  parentNode: string;
  topic: string;
};

export const SubAtomFamily = atomFamily(
  ({ title, parentNode, topic }: Sub) =>
    atom({
      title: title,
      position: { x: 0, y: 0 },
      parentNode: parentNode,
      topic: topic,
    }),
  (a, b) => a.id === b.id
);

export const allSubsAtom = atom<Sub[]>([]);
