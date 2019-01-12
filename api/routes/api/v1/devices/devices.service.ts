import { DeviceType } from "../../../../../Iot-controller/interfaces/DeviceType";
import { DeviceCounter } from "../../../../../udp/manager/devicecounter";
import { toClientDev } from "../../../../utils/utils";
import { PushEvent } from "../../../../../config/bus";
import {
  IDevice,
  createIDevice
} from "../../../../../Iot-controller/interfaces/IDevice";
import DeviceState from "../../../../../Iot-controller/interfaces/DeviceState";

/**
 * Funzione wrapper attorno alla funzione findById nel namespace DeviceCounter
 * @see {@link DeviceCounter}
 * @param devid Id del dispositivo da trovare
 */
const findDeviceById: (devid: number) => any = async (devid: number) => {
  return toClientDev(await DeviceCounter.findById(devid));
};

/**
 * Cambia lo stato di un dispositivo
 * @throws {Error} se non riesce a cambiarne lo stato
 * @param id Id del dispositivo da aggiornare
 * @param state nuovo stato del dispositivo
 */
const changeDeviceState = async (
  id: number,
  state: number
): Promise<IDevice> => {
  let device = createIDevice(await findDeviceById(id));
  PushEvent("change-state", device, state);
  device.state = DeviceState.Busy;
  return device;
};

/**
 * Funzione wrapper attorno alla funzione getAll nel namespace DeviceCounter
 * @returns {Promise<IDevice[]>}
 */
const getAllActiveDevices = async () =>
  (await DeviceCounter.getAll()).map(toClientDev);

/**
 * Cerca un dispositivo e ne restituisce lo stato in quel momento
 * @param devid Id del dispositivo da trovare
 * @returns {DeviceState}
 */
const getDeviceState = async (devid: number) => {
  let dev = await findDeviceById(devid);
  return dev.state;
};

export {
  changeDeviceState,
  DeviceType,
  getAllActiveDevices,
  getDeviceState,
  findDeviceById
};
