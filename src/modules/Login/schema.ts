import { z, TypeOf } from "zod";

const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginSchemaType = TypeOf<typeof LoginSchema>;

export default LoginSchema;
