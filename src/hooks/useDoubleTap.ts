import { useState } from 'react';
import Konva from 'konva';

interface Point {
    x: number;
    y: number;
  }

export function useDoubleTap(stageRef) {
  const [ScreenPos, setScreenPos] = useState({ x: 0, y: 0 });
  const [VisibleText, setVisibleText] = useState(false);

  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const emptySpace = e.target === stage;
    if (!emptySpace) return;
    const pointerPos = stage.getPointerPosition() || { x: 0, y: 0 };

    // get screen coordinates
    const screenPos = stage.getPointerPosition();
    
    setScreenPos((screenPos as Point));
    setVisibleText(true);
    console.log(screenPos);
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (!emptySpace) return;
    setVisibleText(false);
  };

  return { ScreenPos, setScreenPos, VisibleText, setVisibleText, handleDoubleClick, handleClick };
}
