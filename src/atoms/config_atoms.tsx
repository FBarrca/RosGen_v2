import { atom, } from "jotai";
import { atomWithReset } from 'jotai/utils'

export interface CanvasStateInterface {
  scale: number;
  position: { x: number; y: number };
}

export const canvasStateAtom = atomWithReset<CanvasStateInterface>({
  scale: 1,
  position: { x: 0, y: 0 },
});

type ActiveTool = "comment"| "connection" |"node" | "topic" | "service";

export const activeToolAtom = atom<ActiveTool>("node");