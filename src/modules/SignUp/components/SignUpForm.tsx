import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Label, Button, Spinner } from "flowbite-react";
import useSignup from "../useSignup";
import SignUpSchema, { SignUpSchemaType } from "../schema";
import Link from "next/link";
import Text from "../../../components/Text";
import InputError from "../../../components/InputError";

export default function SignUpForm() {
  const { mutate, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignUpSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpSchemaType) => mutate(data);

  return (
    <>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Label htmlFor="username">Username</Label>
          <TextInput
            {...register("username")}
            id="username"
            placeholder="Name"
          />
          <InputError error={errors?.username} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <TextInput
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
          />
          <InputError error={errors?.password} />
        </div>
        <div>
          <Label htmlFor="confirm_password">Confirm password</Label>
          <TextInput
            {...register("confirmPassword")}
            id="confirm_password"
            type="password"
            placeholder="Confirm password"
          />
          <InputError error={errors?.confirmPassword} />
        </div>
        <Button type="submit" disabled={isLoading || !isValid}>
          {isLoading && <Spinner className="mr-2" />}
          Sign up
        </Button>
      </form>
      <div className="flex justify-between">
        <Text>Already have an account?</Text>
        <Link href="/login" passHref className="text-blue-500">
          Log in
        </Link>
      </div>
    </>
  );
}
