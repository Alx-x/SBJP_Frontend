import { Card, Progress } from "flowbite-react";
import Link from "next/link";
import Text from "../../../components/Text";
import { PollutantMap } from "../../Sensor/types";
import { DashboardSensorData } from "../types";

const getAqiusColors = (aqius: number) => {
  if (aqius > 0 && aqius < 51) {
    return "green";
  }
  if (aqius > 50 && aqius < 101) {
    return "yellow";
  }
  if (aqius > 100 && aqius < 151) {
    return "yellow";
  }
  if (aqius > 150 && aqius < 201) {
    return "red";
  }
  if (aqius > 200 && aqius < 301) {
    return "purple";
  }
  if (aqius > 300) {
    return "indigo";
  }
  return "blue";
};

export default function SensorCard({
  name,
  city,
  aqius,
  main,
  id,
}: DashboardSensorData) {
  const percentage = (Math.abs(Number(aqius) - 500) / 500) * 100;
  return (
    <Link href={`/sensor/${id}`} passHref>
      <Card className="h-full transition-colors hover:bg-gray-200 hover:dark:bg-gray-700">
        <div>
          <Text as="h5" className="font-semibold">
            {name}
          </Text>
          <Text className="text-sm font-light">{city || ""}</Text>
        </div>
        <div>
          <Text className="font-medium">Pollutant: {PollutantMap[main]}</Text>
          <Progress
            progress={percentage}
            color={getAqiusColors(aqius || 0)}
            label={`Air quality: ${aqius || "-"}`}
            labelPosition="outside"
          />
        </div>
      </Card>
    </Link>
  );
}
