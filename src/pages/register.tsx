import { Link } from "react-router";
import Button from "../components/button";
import Input from "../components/input";
import Text from "../components/text";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <form className="bg-muted-background/20 backdrop-blur-xs p-6 flex flex-col gap-3 max-w-md w-full">
        <Text variant="title">Register</Text>
        <Input placeholder="Full Name..." />
        <Input placeholder="Email..." />
        <Input placeholder="Password..." />
        <Input placeholder="Confirm Password..." />
        <Button variant="primary">Register</Button>

        <Link to={"/login"} className="self-start">
          <Button variant="link" className="">
            Already have an account, login ?
          </Button>
        </Link>
      </form>
    </div>
  );
}
