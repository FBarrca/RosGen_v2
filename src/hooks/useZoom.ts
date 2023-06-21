import { useState } from 'react';
import Konva from 'konva';
import { debounce } from "lodash";

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SPEED_FACTOR = 1.1;

export function useZoom(stageRef, canvasState, setCanvasState) {
  const [isZooming, setIsZooming] = useState<boolean>(false);
  let lastDist = 0;
  let lastCenter = null;
  
  const debouncedSetCanvasState = debounce(setCanvasState, 100);
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {

  };
  const handleMultiTouch = (e: Konva.KonvaEventObject<TouchEvent>) => {

  };
  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
    setIsZooming(false);
  };
  return { handleWheel, handleMultiTouch, multiTouchEnd, isZooming };
}