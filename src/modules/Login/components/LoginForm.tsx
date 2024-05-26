import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Label, Button, Spinner } from "flowbite-react";
import useLogin from "../useLogin";
import LoginSchema, { LoginSchemaType } from "../schema";
import Link from "next/link";
import { useRouter } from "next/router";
import useSession from "../../../hooks/useSession";
import Text from "../../../components/Text";
import InputError from "../../../components/InputError";

export default function LoginForm() {
  const router = useRouter();
  const session = useSession();
  const { mutate, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) =>
    mutate(data, {
      onSuccess() {
        session.checkToken();
        router.push(
          router.query?.path ? decodeURI(router.query?.path as string) : "/"
        );
      },
    });

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
            placeholder="Your username"
          />
          <InputError error={errors?.username} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <TextInput
            {...register("password")}
            id="password"
            type="password"
            placeholder="Your password"
          />
          <InputError error={errors?.password} />
        </div>
        <Button type="submit" disabled={isLoading || !isValid}>
          {isLoading && <Spinner className="mr-2" />}
          Log in
        </Button>
      </form>
      <div className="flex justify-between">
        <Text>Don't have an account?</Text>
        <Link href="/sign-up" passHref className="text-blue-500">
          Sign up
        </Link>
      </div>
    </>
  );
}
