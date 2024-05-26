import { z, TypeOf } from "zod";

const AddSensorSchema = z.object({
  name: z.string().min(3, {
    message: "Sensor name must be at least 3 characters long",
  }),
  location_x: z.preprocess(
    (a) => parseFloat(a as string),
    z
      .number({
        required_error: "Longitude cannot be empty",
      })
      .min(-180)
      .max(180)
  ),
  location_y: z.preprocess(
    (a) => parseFloat(a as string),
    z
      .number({
        required_error: "Latitude cannot be empty",
      })
      .min(-180)
      .max(180)
  ),
});

export type AddSensorSchemaType = TypeOf<typeof AddSensorSchema>;

export default AddSensorSchema;
