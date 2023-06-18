import React from 'react';
import {  PlusOutlined, MinusOutlined, CompressOutlined } from "@ant-design/icons";
import { Tooltip, FloatButton } from 'antd'; 
import { canvasStateAtom } from '../../../atoms/config_atoms';
import { useRecoilState, useResetRecoilState } from 'recoil';

const ScaleBar = () => {
    const [canvasState, setCanvasState] = useRecoilState(canvasStateAtom);
    // restore canvas state
    const defaultCanvasState = useResetRecoilState(canvasStateAtom);
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
