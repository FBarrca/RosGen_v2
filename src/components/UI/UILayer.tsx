import React from 'react';
// import { Button } from 'antd';
import { FloatButton,Tooltip } from 'antd';
import { CompressOutlined, PlusOutlined,MinusOutlined  } from '@ant-design/icons';
import Sidebar from './SideBar/Sidebar';
import TopBar from './TopBar/TopBar';
import DevicesBar from './DevicesBar/DevicesBar';
const UILayer: React.FC = () => {


    return (

        <div>
            <TopBar/>
            <Sidebar/>
            <DevicesBar/>

            <FloatButton.Group shape="square" style={{}}>
            <FloatButton icon={<PlusOutlined />} />
            <FloatButton />
            <FloatButton icon={<MinusOutlined />} />
            </FloatButton.Group>
            <Tooltip title="Allign">
                <FloatButton shape="square" icon={<CompressOutlined />} style={{right: 80, borderRadius: "10px"}} />
            </Tooltip>
            
        </div>
    );
}

export default UILayer;
