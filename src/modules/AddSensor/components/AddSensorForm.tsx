import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Label, Button, Spinner, Tabs } from "flowbite-react";
import useAddSensor from "../useAddSensor";
import AddSensorSchema, { AddSensorSchemaType } from "../schema";
import { useState } from "react";
import InputError from "../../../components/InputError";
import PickOnMap from "../../../components/PickOnMap";
import { MapPinIcon, PencilIcon } from "@heroicons/react/24/solid";
import ApiKeyModal from "./ApiKeyModal";

export default function AddSensorForm() {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const { mutate, isLoading, isSuccess, data } = useAddSensor();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<AddSensorSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(AddSensorSchema),
  });

  const mapPickHandler = (lat: number, lng: number) => {
    setValue("location_y", lat, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("location_x", lng, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: AddSensorSchemaType) =>
    mutate(data, {
      onSuccess() {
        setApiKeyModalOpen(true);
      },
    });

  return (
    <>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="name">Sensor name</Label>
          <TextInput
            {...register("name")}
            id="name"
            placeholder="New sensor name"
          />
          <InputError error={errors?.name} />
        </div>
        <div>
          <Label>Location</Label>
          <Tabs.Group style="underline">
            <Tabs.Item
              className="h-60 w-max"
              title="Pick on map"
              icon={MapPinIcon}
            >
              <div className="h-96 w-full">
                <PickOnMap setLocation={mapPickHandler} />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Type in" icon={PencilIcon}>
              <Label htmlFor="location_x">Longitude</Label>
              <TextInput
                {...register("location_x")}
                id="location_x"
                type="number"
                step={0.000000000000001}
                placeholder="X axis"
              />
              <InputError error={errors?.location_x} />
              <Label className="mt-4" htmlFor="location_y">
                Latitude
              </Label>
              <TextInput
                {...register("location_y")}
                id="location_y"
                type="number"
                step={0.000000000000001}
                placeholder="Y axis"
              />
              <InputError error={errors?.location_y} />
            </Tabs.Item>
          </Tabs.Group>
        </div>
        <Button type="submit" disabled={isLoading || !isValid || isSuccess}>
          {isLoading && <Spinner className="mr-2" />}
          Add new sensor
        </Button>
      </form>
      <ApiKeyModal
        apiKey={data?.api_key}
        modalOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />
    </>
  );
}
