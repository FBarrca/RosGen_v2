import React, { FC, useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { useAtom, useAtomValue } from "jotai";
import { debounce } from "lodash";

import TextBox from "./InputText/TextBox";
import { Renderer } from "./ROS/Renderer";
import { handleMultiTouch, handleWheel } from "src/hooks/useZoom";
import {
  stageAtom,
  canvasStateAtom,
  activeToolAtom,
} from "src/atoms/config_atoms";

interface Point {
  x: number;
  y: number;
}
interface KonvaLayerProps {
  width: number;
  height: number;
}

const KonvaLayer: FC<KonvaLayerProps> = ({ width, height }) => {
  const [stage, setCanvasStage] = useAtom(stageAtom);
  const stageRef = useRef<Konva.Stage>(null);

  const [canvasState, setCanvasState] = useAtom(canvasStateAtom);
  const activeTool = useAtomValue(activeToolAtom);
  const debouncedSetCanvasState = debounce(setCanvasState, 100);

  let lastDist = 0,
    lastCenter: Point | null = null;

  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
  };
  const syncCanvasState = () => {
    if (
      !stage ||
      (stage.scaleX() === canvasState.scale &&
        stage.x() === canvasState.position.x &&
        stage.y() === canvasState.position.y)
    )
      return;
    stage.scale({ x: canvasState.scale, y: canvasState.scale });
    stage.position({ x: canvasState.position.x, y: canvasState.position.y });
  };

  useEffect(syncCanvasState, [canvasState]);
  useEffect(() => {
    if (stageRef.current) setCanvasStage(stageRef.current);
  }, [stageRef]);

  //
  const [ScreenPos, setScreenPos] = useState<Point>({ x: 0, y: 0 });
  const [VisibleText, setVisibleText] = useState<boolean>(false);
  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const emptySpace = e.target === stage;
    if (!emptySpace) return;
    const pointerPos = stage.getRelativePointerPosition() || { x: 0, y: 0 };

    if (activeTool == "connection") return;
    setScreenPos(stage.getPointerPosition() as Point);
    setVisibleText(true);
  };
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (!emptySpace) return;
    setVisibleText(false);
  };

  const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
    const last_state = handleMultiTouch(
      e,
      debouncedSetCanvasState,
      lastDist,
      lastCenter
    );
    lastDist = last_state.lastDist;
    lastCenter = last_state.lastCenter;
  };
  return (
    <div>
      <Stage
        ref={stageRef}
        onDblClick={handleDoubleClick}
        onClick={handleClick}
        onContextMenu={(e) => e.evt.preventDefault()}
        onTouchMove={handleTouchMove}
        onTouchEnd={multiTouchEnd}
        onWheel={(e) => handleWheel(e, debouncedSetCanvasState)}
        width={width}
        height={height}
      >
        <Layer
          imageSmoothingEnabled={false}
        >
          <Renderer />
        </Layer>
      </Stage>
      {VisibleText && (
        <TextBox
          visible={VisibleText}
          position={ScreenPos}
          onExit={(e) => setVisibleText(false)}
        />
      )}
    </div>
  );
};

export default KonvaLayer;
