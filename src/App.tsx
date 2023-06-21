import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, theme } from "antd";

import UILayer from "./components/UI/UILayer";
import KonvaLayer from "./components/Konva/KonvaLayer";
import { Provider } from "jotai";

const App: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return (
    <Provider>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <div
          style={{ position: "relative", background: "#ffffff", ...dimensions }}
        >
          <KonvaLayer width={dimensions.width} height={dimensions.height} />
          <UILayer/>
        </div>
      </ConfigProvider>
    </Provider>
  );
};
export default App;
