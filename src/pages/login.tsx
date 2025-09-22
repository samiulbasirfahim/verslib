import { Link } from "react-router";
import Button from "../components/button";
import Input from "../components/input";
import Text from "../components/text";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <form className="bg-muted-background/20 backdrop-blur-xs p-6 flex flex-col gap-3 max-w-md w-full">
        <Text variant="title">Login</Text>
        <Input placeholder="Email..." />
        <Input placeholder="Password..." />
        <Button variant="link" className="text-end self-end">
          Forget your Password
        </Button>
        <Button variant="primary">Login</Button>
        <Link to={"/register"}>
          <Button variant="link" className="">
            Don't have an account, register ?
          </Button>
        </Link>
      </form>
    </div>
  );
}
