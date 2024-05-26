import { Alert, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useAuthResource } from "../../hooks/useSession";
import useSensorDetails from "../../modules/Sensor/useSensorDetails";
import SensorDetails from "../../modules/Sensor/components/SensorDetails";

export default function SensorDetailsPage() {
  useAuthResource();

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useSensorDetails(id as string);

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex items-center justify-center">
          <Spinner size="xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return <Alert color="failure">Couldn't load sensor details</Alert>;
  }

  return (
    <div className="container">
      <SensorDetails data={data} />
    </div>
  );
}
