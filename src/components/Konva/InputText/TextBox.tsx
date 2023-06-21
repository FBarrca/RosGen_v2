import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import Konva from 'konva';
import type { InputProps, InputRef } from 'antd/lib/input'; // Correct type import
import { useAtomValue, useSetAtom } from 'jotai';
import { activeToolAtom } from 'src/atoms/config_atoms';
import { addNodeAtom } from 'src/atoms/ROS/Node';
import { addTopicAtom } from 'src/atoms/ROS/Topic';

interface TextBoxProps {
    stage: Konva.Stage;
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
// Find konva element by id
const findKonva = (id: string, stage: Konva.Stage): Konva.Node => {
    if (!stage) return;
    const konva = stage.findOne(`#${id}`);
    // return konva element if found
    if (konva) return konva;
      console.error(`Konva element with id ${id} not found`);
      return;
    
  }
  
const TextBox: React.FC<TextBoxProps>  = ({position, stage, onExit}) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    const addNode = useSetAtom(addNodeAtom);
    const addTopic = useSetAtom(addTopicAtom);

    // get value of tool atom
    const activeTool = useAtomValue(activeToolAtom);
    // Get focus on mount
    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current!.focus({
            cursor: 'start',
          });
    }, [])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (activeTool === 'node') {
            // call addNode with no args
           const newNodeID = addNode({title:value});
              // find konva element by id
            if(!newNodeID) return;
            const konva = findKonva(newNodeID, stage);
            konva.position({x: position.x, y: position.y});
            
        } else if (activeTool === 'topic') {
            const newNodeID = addTopic({title:value});
            // find konva element by id
          if(!newNodeID) return;
          const konva = findKonva(newNodeID, stage);
          konva.position({x: position.x, y: position.y});
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
