import React, { useState, useEffect, FC, useRef } from "react";
import { Stage, Layer,Rect } from "react-konva";
import Konva from "konva";
import { canvasStateAtom } from "atoms/config_atoms";
import { useAtom } from "jotai";
import { debounce } from "lodash";
import TextBox from "./InputText/TextBox";
// import { NodesRenderer } from "./ROS/Node/Node";
// import { TopicsRenderer } from "./ROS/Topic/Topic";
import { useZoom } from "hooks/useZoom";
import { useDoubleTap } from "hooks/useDoubleTap";
import { Renderer } from "./ROS/Renderer";

interface KonvaLayerProps {
  width: number;
  height: number;
}

// Find konva element by id
const findKonva = (id: string, stage: Konva.Stage) => {
  if (!stage) return;
  const konva = stage.findOne(`#${id}`);
  // return konva element if found
  if (konva) return konva;
    console.error(`Konva element with id ${id} not found`);
    return;
  
}

const KonvaLayer: FC<KonvaLayerProps> = ({ width, height }) => {
  const [canvasState, setCanvasState] = useAtom(canvasStateAtom);

  const stageRef = useRef<Konva.Stage>(null);
  const { handleWheel, handleMultiTouch, multiTouchEnd, isZooming } = useZoom(
    stageRef,
    canvasState,
    setCanvasState
  );
  const {
    ScreenPos,
    setScreenPos,
    VisibleText,
    setVisibleText,
    handleDoubleClick,
    handleClick,
  } = useDoubleTap(stageRef);

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

  const onEscape = function (action) {
    window &&
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          action();
        }
      });
  };

  // findKonva("l4XArd-C1DV8vLJTqUfRm", stageRef.current!);




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
        offsetX={-canvasState.position.x/2}
        offsetY={-canvasState.position.y/2}
      >
        <Layer>
          <Renderer />
        </Layer>
      </Stage>
      {VisibleText && (
        <TextBox
          stage = {stageRef.current!}
          position={ScreenPos}
          onExit={(e) => setVisibleText(false)}
        />
      )}
    </div>
  );
};

export default KonvaLayer;