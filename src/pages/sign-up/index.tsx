import { Card } from "flowbite-react";
import Text from "../../components/Text";
import SignUpForm from "../../modules/SignUp/components/SignUpForm";

export default function SignupPage() {
  return (
    <Card className="w-full md:w-1/2">
      <Text>Create new account</Text>
      <SignUpForm />
    </Card>
  );
}
