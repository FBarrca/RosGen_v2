import React,{useState, useRef} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload,Input } from 'antd';
import LoadButton from './LoadButton';

const TopBar: React.FC = () => {
    return (
    <div>
        <LoadButton/>
      
       
    </div>
);
}
export default TopBar;

