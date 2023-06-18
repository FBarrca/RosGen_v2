import React, { useEffect } from "react";


import Sidebar from "./SideBar/Sidebar";
import TopBar from "./TopBar/TopBar";
import DevicesBar from "./DevicesBar/DevicesBar";
import ScaleBar from "./ScaleBar/ScaleBar";


const UILayer = ({ }) => { 
  return (
    <div>
      <TopBar />
      <Sidebar />
      <DevicesBar />
      <ScaleBar  />
    </div>
  );
};

export default UILayer;
