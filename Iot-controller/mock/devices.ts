import { DeviceState } from "../interfaces/DeviceState";
import { DeviceType } from "../interfaces/DeviceType";

export function mock_devices() {
  return [
    {
      devid: 0x23,
      mac: "00:ff:ff:ff",
      type: DeviceType.Binary,
      state: DeviceState.Off
    },
    {
      devid: 0x32,
      mac: "00:2f:ff:ff",
      type: DeviceType.None,
      state: DeviceState.Unknown
    },
    {
      devid: 0x12,
      mac: "00:ff:f2:ff",
      type: DeviceType.Binary,
      state: DeviceState.On
    },
    {
      devid: 0x2,
      mac: "00:ff:ff:fa",
      type: DeviceType.None,
      state: DeviceState.None
    }
  ];
}
