// https://jotai.org/docs/utilities/family
import React from "react";
import { Radio } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { atom, Provider, useAtom, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { nanoid } from "nanoid";
// import { allSubsAtom } from "./Subscriber";
export type Topic = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  position?: { x: number; y: number };
};

// 1st arg: atom constructor we always need to pass an id but
// 2nd arg: when comparing two atoms, look at the id property to see if they are the same
export const TopicAtomFamily = atomFamily(
  ({ id }: Topic) => atom({id:id, title: "title", position: { x: 0, y: 0 } }),
  (a, b) => a.id === b.id
);

// atom with all the ids of the topics 
export const allTopicsAtom = atom<string[]>([]);


// export const allTopicSubs = (topic) => atom((get) => {
//     const allSubs = get(allSubsAtom);
//     return allSubs.filter((sub) => sub.topic === topic.id);
// });
    

export const addTopicAtom = atom(
    null,
    (get, set, arg?: Partial<Topic>) => {
      const id = nanoid();
      // Add the new id to allNodesAtom
      set(allTopicsAtom, (prev) => [...prev, id]);
      // Create a new node in NodeAtomFamily with arg properties
      TopicAtomFamily({ id, title: "New topic", position: { x: 0, y: 0 }, ...arg });
      return id;
    }
  );
  

//  To call use   const [item, setItem] = useAtom(todoAtomFamily({ id }));

// To add a new topic
// const id = nanoid();
// TopicAtomFamily({ id, title });
// setTodos((prev) => [...prev, id]);jota
