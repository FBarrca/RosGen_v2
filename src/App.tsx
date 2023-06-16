import { Button, ConfigProvider, theme } from 'antd';
import React from 'react';

import KonvaLayer from './components/Konva/KonvaLayer';
import UILayer from './components/UI/UILayer';

const App: React.FC = () => {

  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
       <div style={{position: 'relative',
      background: '#ffffff',
      }}>
        <KonvaLayer/>
        <UILayer/>
      </div>
    </ConfigProvider>
  );
  }

export default App;
