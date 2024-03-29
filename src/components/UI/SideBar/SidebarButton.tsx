import React from "react";
import { Button, Tooltip } from "antd";

interface SideButtonProps {
  icon: React.ReactNode;
  onClick: React.Dispatch<React.SetStateAction<string | null>>;
  option: string | null;
  label: string;
  selected: boolean;
}
const SidebarButton: React.FC<SideButtonProps> = ({ icon, onClick, option, label, selected }) => (
  <div>
    <Tooltip title={label} placement="right" mouseEnterDelay={0.5}>
      <Button
        style={{
          borderRadius: "5px",
          marginTop: "10px",
          background: selected ? "#a0d6fd" : "", 
          borderColor: selected ? "#1677fe" : "",
          borderWidth: selected ? "2px" : "" 
        }}
        onClick={() => {
          onClick(option); //setSidebarOption(option);
        }}
        size="large"
        icon={icon}
      />
    </Tooltip>
  </div>
);

export default SidebarButton;
