import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useNavigate } from "react-router-dom";
const SignUpModal = () => {
  const { toast } = useToast();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // console.log(BASE_URL);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const parseRes = await response.json();
      if (parseRes.authtoken) {
        localStorage.setItem("authtoken", parseRes.authtoken);
        // setAuth(true);
        navigate("/dashboard");
        toast({
          description: "Registered Successfully",
        });
      } else {
        // setAuth(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Sign Up</Button>
        {/* <HoverBorderGradient
          containerClassName="rounded-lg"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-8"
        >
          Sign Up
        </HoverBorderGradient> */}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Create an account to start creating and sharing links.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="input"
            />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="input"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input"
            />
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
        {/* <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader> */}
      </DialogContent>
    </Dialog>
  );
};
export default SignUpModal;
