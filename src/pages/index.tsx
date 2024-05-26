import { Alert, Spinner, Tabs } from "flowbite-react";
import { type NextPage } from "next";
import { useAuthResource } from "../hooks/useSession";
import SensorsList from "../modules/Sensors";
import { TableCellsIcon, MapIcon } from "@heroicons/react/24/solid";
import useSensorsList from "../modules/Sensors/useSensorsList";
import SensorsMap from "../modules/Sensors/components/SensorsMap";

const Home: NextPage = () => {
  useAuthResource();

  const { data: sensors, isLoading, error } = useSensorsList();

  if (error) {
    return <Alert color="failure">Error loading sensors</Alert>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="container">
      <Tabs.Group style="underline">
        <Tabs.Item title="Map" icon={MapIcon}>
          <div className="h-[75vh] w-full">
            <SensorsMap data={sensors} />
          </div>
        </Tabs.Item>
        <Tabs.Item title="Grid" icon={TableCellsIcon}>
          <SensorsList data={sensors!} />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Home;
