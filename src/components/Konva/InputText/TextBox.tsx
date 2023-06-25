import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import Konva from 'konva';
import type { InputProps, InputRef } from 'antd/lib/input'; // Correct type import
import { useAtomValue, useSetAtom } from 'jotai';
import { activeToolAtom, stageAtom } from 'src/atoms/config_atoms';
import { addNodeAtom, addSubAtom } from 'src/atoms/ROS/Node';
import { addTopicAtom } from 'src/atoms/ROS/Topic';
// import { addSubAtom } from 'src/atoms/ROS/Subscriber';
import { findKonva } from 'src/utils/findKonva.ts';

interface TextBoxProps {
    visible: boolean;
    position: {
        x: number;
        y: number;
    }
    onExit: InputProps['onPressEnter'];
}

const onEscape = function (action) {
    window && window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            action();
        };
    });
}

  
const TextBox: React.FC<TextBoxProps>  = ({visible,position, onExit}) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const stage = useAtomValue(stageAtom);

    const addNode = useSetAtom(addNodeAtom);
    const addTopic = useSetAtom(addTopicAtom);
    const addSub = useSetAtom(addSubAtom);

    // get value of tool atom
    const activeTool = useAtomValue(activeToolAtom);

    // if (visible ==false) return (<></>);

    // Get focus on mount
    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current!.focus({
            cursor: 'start',
          });
    }, [])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        const pointerPosition = stage.getRelativePointerPosition();
        if (activeTool === 'node') {
            // call addNode with no args
           const newNodeID = addNode({title:value, position: pointerPosition});
              // find konva element by id
            if(!newNodeID) return;
            const konva = findKonva(newNodeID, stage);
            // konva.position({x: pointerPosition.x, y: pointerPosition.y});
            
        } else if (activeTool === 'topic') {
            const newNodeID = addTopic({title:value});
            // find konva element by id
          if(!newNodeID) return;
          const konva = findKonva(newNodeID, stage);
          konva.position({x: pointerPosition.x, y: pointerPosition.y});
        } else if (activeTool === 'connection') {
            // addSub({})
            const newSub = addSub({nodeID:"sh4aqSk4K98oV1h3_WvO1",topic: "vnSvf7_SIvUtkfnYA1vf0"});

        }


        setValue('');
        if (onExit)
        onExit(e);
    }
    
    onEscape((e: React.KeyboardEvent<HTMLInputElement>) => {
        setValue('');
        if (onExit)
        onExit(e);
    })

    return(
        <div style={{ position: 'absolute', left: position.x, top: position.y-10 }}>
            <Input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} placeholder="Type the name" bordered={false} onPressEnter  = {handleEnter}  />
        </div>
    )
}

export default TextBox;
