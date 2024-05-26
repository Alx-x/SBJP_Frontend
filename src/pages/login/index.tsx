import { Card } from "flowbite-react";
import Text from "../../components/Text";
import LoginForm from "../../modules/Login/components/LoginForm";

export default function LoginPage() {
  return (
    <Card className="w-full md:w-1/2">
      <Text>Log in</Text>
      <LoginForm />
    </Card>
  );
}
