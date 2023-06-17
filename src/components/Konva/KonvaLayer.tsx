import React, { useState, useEffect, FC } from "react";
import { Stage, Layer, Image } from "react-konva";
import Konva from "konva";

// Constants for min and max zoom
const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const ZOOM_SPEED_FACTOR = 1.1;

interface KonvaLayerProps {
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
  const [stageScale, setStageScale] = useState<number>(1);
  const [stagePos, setStagePos] = useState<Point>({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState<boolean>(false);

  let lastDist = 0;
  let lastCenter: Point | null = null;

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    if (!e.evt.ctrlKey) return;

    e.evt.preventDefault();

    window.requestAnimationFrame(() => {
      const stage = e.target.getStage();
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

      setStageScale(newScale);
      setStagePos({
        x: -(mousePointTo.x - pointerPos.x / newScale) * newScale,
        y: -(mousePointTo.y - pointerPos.y / newScale) * newScale,
      });
    });
  };

  const handleMultiTouch = (e: Konva.KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();

    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = e.target.getStage();

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

        var scale = stage.scaleX() * (dist / lastDist);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);
        stage.batchDraw();
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
    if (isZooming) stage.stopDrag();
  };

  return (
    <Stage
      scaleX={stageScale}
      scaleY={stageScale}
      x={stagePos.x}
      y={stagePos.y}
      onTouchMove={handleMultiTouch}
      onTouchEnd={multiTouchEnd}
      onWheel={handleWheel}
      width={width}
      height={height}
    >
      <Layer>
        <Image
          image={image}
          width={120}
          height={120}
          draggable={true}
          onDragStart={handleDragStart}
        />
      </Layer>
    </Stage>
  );
};

export default KonvaLayer;
