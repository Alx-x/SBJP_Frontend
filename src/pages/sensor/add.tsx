import { Card } from "flowbite-react";
import Text from "../../components/Text";
import { useAuthResource } from "../../hooks/useSession";
import AddSensor from "../../modules/AddSensor";

export default function AddSensorPage() {
  useAuthResource();

  return (
    <Card className="w-full xl:w-2/3">
      <Text>Add new sensor</Text>
      <AddSensor />
    </Card>
  );
}
