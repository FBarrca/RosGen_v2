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

export const activeToolAtom = atom<string>("select");

