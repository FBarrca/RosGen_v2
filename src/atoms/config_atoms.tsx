import { atom, RecoilState } from 'recoil';

export interface CanvasStateInterface {
scale: number;
position: { x: number; y: number };
}

export const canvasStateAtom: RecoilState<CanvasStateInterface> = atom({
key: 'canvasStateAtom',
default: {
scale: 1,
position: { x: 0, y: 0 },
},
});

export const activeToolAtom: RecoilState<string>= atom({
key: 'activeToolAtom',
default: 'select',
});