import { useQueryClient } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import Text from "../../../components/Text";
import { DashboardSensors } from "../types";
import { SENSORS_LIST_KEY } from "../useSensorsList";
import SensorCard from "./SensorCard";

export default function SensorsGrid({ data }: { data?: DashboardSensors }) {
  const queryClient = useQueryClient();
  const refetchSensors = () => queryClient.refetchQueries([SENSORS_LIST_KEY]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Text as="h1" className="text-2xl font-semibold">
          Sensors list
        </Text>
        <Button onClick={refetchSensors}>Refetch</Button>
      </div>
      <div className="grid auto-rows-max gap-4 md:grid-cols-5">
        {data?.sensors.map((sensor) => (
          <SensorCard key={sensor.name} {...sensor} />
        ))}
      </div>
    </div>
  );
}
