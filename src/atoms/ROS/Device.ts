import { atom, Getter } from "jotai";
import { atomFamily, atomWithDefault, atomWithReset } from "jotai/utils";
import { nanoid } from "nanoid";
import { allNodesAtom, NodeAtomFamily } from "./Node";

export type Device = {
  id: string; // internal id (nanoid)
  title?: string; // Visible title
  color?: string;
};

// Define default devices
const defaultDevices: Device[] = [
  {
    id: "default",
    title: "Main Device",
    color: "#000000",
  },
];

// Create atom with default value
export const allDevicesAtom = atomWithDefault(() => defaultDevices);

// Now use the helper function as default value for currentDeviceAtom
export const currentDeviceAtom = atomWithReset<string>("default");


// Update the color porperty of a device by id on allDevicesAtom// Define a function that will set the color for a device
export const updateColorAtom = atom(null, (get, set, { id, color }) => {
  set(allDevicesAtom, (prevDevices) => {
    const devices = [...prevDevices]; // Create a new array to avoid mutating the previous state
    const deviceIndex = devices.findIndex((d) => d.id === id);
    if (deviceIndex !== -1) {
      devices[deviceIndex].color = color; // Update the color property directly
    }
    return devices;
  });
});

export const updateTitleAtom = atom(null, (get, set, { id, title }) => {
  set(allDevicesAtom, (prevDevices) => {
    const devices = [...prevDevices]; // Create a new array to avoid mutating the previous state
    const deviceIndex = devices.findIndex((d) => d.id === id);
    if (deviceIndex !== -1) {
      devices[deviceIndex].title = title; // Update the color property directly
    }
    return devices;
  });
});

// When deleting a device, migrate all nodes using that device to the default device
export const deleteDeviceAtom = atom(null, (get, set, id: string) => {
  set(allDevicesAtom, (prevDevices) => {
    const devices = [...prevDevices]; // Create a new array to avoid mutating the previous state
    const deviceIndex = devices.findIndex((d) => d.id === id);
    if (deviceIndex !== -1) {
        // Change the device of all nodes using the deleted device
        set(allNodesAtom, (prevNodes) => {
            const nodes = [...prevNodes];
            nodes.forEach((nodeID) => {
                const node = get(NodeAtomFamily({ id: nodeID }));
                if (node.deviceID === id) {
                    node.deviceID = "default";
                }
            });
            return nodes;
        });

      devices.splice(deviceIndex, 1); // Remove the device from the array
    }
    return devices;
  });
});
