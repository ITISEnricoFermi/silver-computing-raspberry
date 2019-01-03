/**
 * Entry point del server
 */

// Setup event bus e mongoose
import { PushEvent } from "../config/bus";

// Setup udp socket
import { sendData } from "../udp/udpsocket";
import { IDevice, createIDevice } from "../Iot-controller/interfaces/IDevice";
export { sendData };

// Setup API
import { server } from "../api/server";
export { server };

// testing some things
import { mock_devices } from "../Iot-controller/mock/devices";

mock_devices().forEach(dev => {
  PushEvent("device-new", dev);
  setInterval(() => {
    PushEvent("device-alive", dev);
  }, 5000 + Math.random() * 1000);
});

let device: IDevice = createIDevice({
  devid: 57,
  mac: "AA:BB:CC:00:22:33",
  state: 2,
  type: 0
});

PushEvent("device-new", device);

setInterval(() => {
  // Clona il device altrimenti non funziona l'aggiornamento durante i test (per "più" informazioni vedere il messaggio di commit)
  let newdevice = createIDevice(device);
  newdevice.state = Math.ceil(Math.random() * 10);
  PushEvent("device-update", newdevice);
  device = newdevice;
}, 10000);

setInterval(() => {
  PushEvent("device-alive", device);
}, 5000);

// Test send data sulla raspberry pi
sendData("1", "AA:BB:CC:00:22:33", JSON.stringify({ h: 1 }));
setInterval(
  () => sendData("6", "AA:BB:CC:00:22:33", JSON.stringify(device)),
  10000
);
