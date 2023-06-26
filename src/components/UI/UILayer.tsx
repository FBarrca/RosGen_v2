
import Sidebar from "./SideBar/Sidebar";
import TopBar from "./TopBar/TopBar";
import DevicesBar from "./DevicesBar/DevicesBar";
import ScaleBar from "./ScaleBar/ScaleBar";
import InfoDrawer from "./Drawer/Drawer";



const UILayer = ({ }) => { 
  return (
    <>
      <TopBar />
      <Sidebar />
      <DevicesBar />
      <ScaleBar  />
      <InfoDrawer/>
    </>
  );
};

export default UILayer;
