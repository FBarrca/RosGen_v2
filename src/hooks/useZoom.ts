import { useState } from 'react';
import Konva from 'konva';
import { debounce } from "lodash";

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SPEED_FACTOR = 1.1;

interface Point {
    x: number;
    y: number;
  }
  
  function getDistance(p1: Point, p2: Point) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  
  function getCenter(p1: Point, p2: Point) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  
  

  
export function useZoom(stageRef, canvasState, setCanvasState) {
    const [isZooming, setIsZooming] = useState<boolean>(false);
    let lastDist = 0;
    let lastCenter = null;
    
    const debouncedSetCanvasState = debounce(setCanvasState, 100);
  
    const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();
  
      window.requestAnimationFrame(() => {
        const stage: any = e.target.getStage();
        const oldScale = stage.scaleX();
        const pointerPos = stage.getPointerPosition() || { x: 0, y: 0 };
  
        const mousePointTo = {
          x: pointerPos.x / oldScale - stage.x() / oldScale,
          y: pointerPos.y / oldScale - stage.y() / oldScale,
        };
  
        const newScale =
          e.evt.deltaY > 0
            ? Math.min(oldScale * ZOOM_SPEED_FACTOR, MAX_SCALE)
            : Math.max(oldScale / ZOOM_SPEED_FACTOR, MIN_SCALE);
  
        stage.scaleX(newScale);
        stage.scaleY(newScale);
  
        var newPos = {
          x: -(mousePointTo.x - pointerPos.x / newScale) * newScale,
          y: -(mousePointTo.y - pointerPos.y / newScale) * newScale,
        };
  
        stage.position(newPos);
        stage.batchDraw();
  
        debouncedSetCanvasState({
          scale: newScale,
          position: newPos,
        });
      });
    };
  
    const handleMultiTouch = (e: Konva.KonvaEventObject<TouchEvent>) => {
      e.evt.preventDefault();
  
      var touch1 = e.evt.touches[0];
      var touch2 = e.evt.touches[1];
      const stage = e.target.getStage();
      if (!stage) return;
      if (touch1 && touch2) {
        setIsZooming(true);
  
        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };
  
        const newCenter = getCenter(p1, p2);
        const dist = getDistance(p1, p2);
  
        if (lastCenter && lastDist) {
          var pointTo = {
            x: (newCenter.x - stage.x()) / stage.scaleX(),
            y: (newCenter.y - stage.y()) / stage.scaleX(),
          };
  
          var newScale = stage.scaleX() * (dist / lastDist);
  
          stage.scaleX(newScale);
          stage.scaleY(newScale);
  
          var dx = newCenter.x - lastCenter.x;
          var dy = newCenter.y - lastCenter.y;
  
          var newPos = {
            x: newCenter.x - pointTo.x * newScale + dx,
            y: newCenter.y - pointTo.y * newScale + dy,
          };
          stage.position(newPos);
          stage.batchDraw();
  
          debouncedSetCanvasState({
            scale: newScale,
            position: newPos,
          });
        }
        lastDist = dist;
        lastCenter = newCenter;
      }
    };
  
    const multiTouchEnd = () => {
      lastCenter = null;
      lastDist = 0;
      setIsZooming(false);
    };
  
    return { handleWheel, handleMultiTouch, multiTouchEnd, isZooming };
  }
  