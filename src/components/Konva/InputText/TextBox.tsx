import React, { useEffect, useState, useRef } from 'react';
import { Input } from 'antd';
import type { InputProps, InputRef } from 'antd/lib/input'; // Correct type import

interface TextBoxProps {
    position: {
        x: number;
        y: number;
    }
    hidden?: boolean;
    onPressEnter: InputProps['onPressEnter'];
}

const TextBox: React.FC<TextBoxProps>  = ({position, hidden, onPressEnter}) => {
    const [value, setValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    useEffect(() => {
        // Clear the input
        if (!inputRef.current) return;
        // setValue('');
        inputRef.current!.focus({
            cursor: 'start',
          });
    }, [position])

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setValue('');
        if (onPressEnter)
            onPressEnter(e);
    }
    return(
        <div style={{ position: 'absolute', left: position.x, top: position.y-10 }}>
            <Input ref={inputRef} value={value} onChange={e => setValue(e.target.value)} placeholder="Type the name" bordered={false} onPressEnter  = {handleEnter}  />
        </div>
    )
}

export default TextBox;
