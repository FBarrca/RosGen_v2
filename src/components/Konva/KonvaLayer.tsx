import React, { useState, useEffect, FC, useRef } from "react";
import { Stage, Layer, Image, Rect } from "react-konva";
import Konva from "konva";
import { stageAtom, canvasStateAtom, activeToolAtom } from "src/atoms/config_atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { debounce } from "lodash";
import TextBox from "./InputText/TextBox";
import { Renderer } from "./ROS/Renderer";
import { handleMultiTouch, handleWheel } from "src/hooks/useZoom";



interface KonvaLayerProps {
  width: number;
  height: number;
}

const KonvaLayer: FC<KonvaLayerProps> = ({ width, height }) => {
  const [stage,setCanvasStage] = useAtom(stageAtom);
  const stageRef = useRef<Konva.Stage>(null);

  const [canvasState, setCanvasState] = useAtom(canvasStateAtom);
  const activeTool = useAtomValue(activeToolAtom);
  const debouncedSetCanvasState = debounce(setCanvasState, 100);
  let lastDist = 0;
  let lastCenter: Point | null = null;
  const multiTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
  };

  // Update canvas state if aton is changed
  useEffect(() => {
    if (!stage) return;
    if (stage.scaleX() !== canvasState.scale) {
      stage.scale({ x: canvasState.scale, y: canvasState.scale });
      // stage.batchDraw();
    }
    if (
      stage.x() !== canvasState.position.x ||
      stage.y() !== canvasState.position.y
    ) {
      stage.position({
        x: canvasState.position.x,
        y: canvasState.position.y,
      });
      // stage.batchDraw();
    }
  }, [canvasState]);

  useEffect(() => {
    if (!stageRef.current) return;
    setCanvasStage(stageRef.current);
  }, [stageRef]);

  // 
  const [ScreenPos, setScreenPos] = useState<Point>({ x: 0, y: 0 });
  const [VisibleText, setVisibleText] = useState<boolean>(false);
  const handleDoubleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const emptySpace = e.target ===stage;
    if (!emptySpace) return;
    const pointerPos = stage.getRelativePointerPosition() || { x: 0, y: 0 };
    
    if (activeTool == "connection") return;
    setScreenPos((stage.getPointerPosition() as Point));
    setVisibleText(true);
  };
  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (!emptySpace) return;
    setVisibleText(false);
  };

  const handleTouchMove = (e: Konva.KonvaEventObject<TouchEvent>) => {
    const last_state = handleMultiTouch(e, debouncedSetCanvasState, lastDist, lastCenter)
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
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={multiTouchEnd}
        onWheel={(e) => handleWheel(e, debouncedSetCanvasState)}
        width={width}
        height={height}
      >
        <Layer>
        <Renderer/>
        </Layer>
      </Stage>
      {VisibleText &&<TextBox
          visible={VisibleText}
          position={ScreenPos}
          onExit={(e) => setVisibleText(false)}
        />}
    </div>
  );
};

export default KonvaLayer;