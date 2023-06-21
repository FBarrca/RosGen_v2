// https://jotai.org/docs/utilities/family
import React from "react";
import { Radio } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";
import { allSubsAtom } from "./Subscriber";
export type Node = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position?: { x: number; y: number };
};

// 1st arg: atom constructor we always need to pass an id but
// 2nd arg: when comparing two atoms, look at the id property to see if they are the same
export const NodeAtomFamily = atomFamily(
  ({ id }: Node) => atom({id:id, title: "title", position: { x: 0, y: 0 } }),
  (a, b) => a.id === b.id
);

// atom with all the ids of the nodes 
export const allNodesAtom = atom<string[]>([]);


export const allNodeSubs = (node) => atom((get) => {
    const allSubs = get(allSubsAtom);
    return allSubs.filter((sub) => sub.parentNode === node.id);
});
    



//  To call use   const [item, setItem] = useAtom(todoAtomFamily({ id }));

// To add a new node
// const id = nanoid();
// NodeAtomFamily({ id, title });
// setTodos((prev) => [...prev, id]);jota
