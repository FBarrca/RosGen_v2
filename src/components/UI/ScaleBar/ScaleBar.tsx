import React from 'react';
import {  PlusOutlined, MinusOutlined, CompressOutlined } from "@ant-design/icons";
import { Tooltip, FloatButton } from 'antd'; 
import { canvasStateAtom } from 'atoms/config_atoms';
import { useAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils'
const ScaleBar = () => {
    const [canvasState, setCanvasState] = useAtom(canvasStateAtom);
    // restore canvas state
    const defaultCanvasState = useResetAtom(canvasStateAtom)
    const zoomIn = () => {
        setCanvasState((oldCanvasState) => {
            const newScale = oldCanvasState.scale * 1.1;
            return { ...oldCanvasState, scale: newScale };
        }
        );
    };
    const zoomOut = () => {
        setCanvasState((oldCanvasState) => {
            const newScale = oldCanvasState.scale / 1.1;
            return { ...oldCanvasState, scale: newScale };
        }
        );
    };
  return (
    <>
      <FloatButton.Group shape="square" style={{}}>
        <FloatButton icon={<PlusOutlined />} onClick={zoomIn}/>
        <FloatButton description={`${Math.round(canvasState.scale * 100)}%`} />
        <FloatButton icon={<MinusOutlined />} onClick={zoomOut}/>
      </FloatButton.Group>
      <Tooltip title="Align">
        <FloatButton
          shape="square"
          icon={<CompressOutlined />}
          style={{ right: 80, borderRadius: "10px" }}
            onClick={defaultCanvasState}
        />
      </Tooltip>
    </>
  );
};

export default ScaleBar;
