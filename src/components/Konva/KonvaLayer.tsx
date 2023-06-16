import React, { useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const KonvaLayer: React.FC = () => {
  const handleRightClick = useCallback((event:any) => {
    event.evt.preventDefault(); // Prevent the default action
    // Your custom logic for opening the menu goes here
    console.log('Right-click!');
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Rect
        x={20}
        y={20}
        width={100}
        height={100}
        fill="red"
        draggable
        onContextMenu={handleRightClick}
      />
    </Layer>
  </Stage>
  );
}

export default KonvaLayer
