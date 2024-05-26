import { type SensorData } from "../Sensor/types";

export type DashboardSensorData = Pick<
  SensorData,
  "aqius" | "city" | "id" | "location_x" | "location_y" | "main" | "name"
>;

export type DashboardSensors = {
  sensors: DashboardSensorData[];
};
