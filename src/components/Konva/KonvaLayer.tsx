import React, { useState, useEffect, FC, useRef } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import Konva from "konva";
import { canvasStateAtom } from "atoms/config_atoms";
import { useAtom } from "jotai";

import { debounce } from "lodash";
// import { useDoubleClick } from "@zattoo/use-double-click";
import TextBox from "./InputText/TextBox";
// import RenderNodes from "./ROS/Node/Node";
import { NodesRenderer } from "./ROS/Node/Node";
import { TopicsRenderer } from "./ROS/Topic/Topic";

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SPEED_FACTOR = 1.1;

interface KonvaLayerProps {
  // onScaleChange: (scale: number) => void;
  width: number;
  height: number;
}

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




const KonvaLayer: FC<KonvaLayerProps> = ({ width, height }) => {



  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isZooming, setIsZooming] = useState<boolean>(false);

  // const [scale, setScale] = useState(1);
  const [canvasState, setCanvasState] = useAtom(canvasStateAtom);

  const debouncedSetCanvasState = debounce(setCanvasState, 100);
  let lastDist = 0;
  let lastCenter: Point | null = null;
  const stageRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    if (!stageRef.current?.scaleX) return;
    if (stageRef.current?.scaleX() !== canvasState.scale) {
      stageRef.current?.scale({ x: canvasState.scale, y: canvasState.scale });
      stageRef.current?.batchDraw();
    }
    if (
      stageRef.current?.x() !== canvasState.position.x ||
      stageRef.current?.y() !== canvasState.position.y
    ) {
      stageRef.current?.position({
        x: canvasState.position.x,
        y: canvasState.position.y,
      });
      stageRef.current?.batchDraw();
    }
  }, [canvasState]);

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    // if (!e.evt.ctrlKey) return;

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
        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        var newScale = stage.scaleX() * (dist / lastDist);

        stage.scaleX(newScale);
        stage.scaleY(newScale);

        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * newScale + dx,
          y: newCenter.y - pointTo.y * newScale + dy,
        };
        stage.position(newPos);
        stage.batchDraw();
        // debouncedSetScale(newScale);
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


  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    if (isZooming) stage.stopDrag();
  };

  const [rects, setRects] = useState<Point[]>([]);

  const [ScreenPos, setScreenPos] = useState<Point>({ x: 0, y: 0 });
  const [VisibleText, setVisibleText] = useState<boolean>(false);
  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const emptySpace = e.target ===stage;
    if (!emptySpace) return;
    const pointerPos = stage.getRelativePointerPosition() || { x: 0, y: 0 };
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


  return (
    <div>
      <Stage
        ref={stageRef}
        onDblClick={handleDoubleClick}
        onClick={handleClick}
        onContextMenu={(e) => e.evt.preventDefault()}
        onTouchMove={handleMultiTouch}
        onTouchEnd={multiTouchEnd}
        onWheel={handleWheel}
        width={width}
        height={height}
      >
        <Layer>
          <TopicsRenderer/>
          <NodesRenderer/>
        </Layer>
      </Stage>
      {VisibleText &&  <TextBox position={ScreenPos} onPressEnter = {(e) =>setVisibleText(false)}/>
}
    </div>
  );
};

export default KonvaLayer;
