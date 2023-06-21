import { useState } from 'react';
import Konva from 'konva';

export function useDoubleTap(stageRef) {
  const [rects, setRects] = useState([]);
  const [ScreenPos, setScreenPos] = useState({ x: 0, y: 0 });
  const [VisibleText, setVisibleText] = useState(false);

  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {

  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
};

return { rects, setRects, ScreenPos, setScreenPos, VisibleText, setVisibleText, handleDoubleClick, handleClick };
}