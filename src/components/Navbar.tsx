import { GitHubLogoIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import NewModeToggle from "./ModeToggle";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    setIsLogin(false);
    navigate("/");
  };
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      setIsLogin(true);
    }
  });
  return (
    <nav className="flex w-[80%]  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-md dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-50 pr-2 pl-8 py-2  items-center justify-between space-x-4 ">
      <a className="" href="/">
        🔗
      </a>
      <div className="hidden  justify-start items-center gap-1 sm:flex">
        {isLogin ? (
          <>
            <Button variant="transparent" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        ) : (
          ""
        )}
        <a href="https://github.com/mspatel18" target="_blank">
          <Button
            variant="transparent"
            className="flex gap-1 justify-center items-center"
          >
            <GitHubLogoIcon scale={20} /> Github
          </Button>
        </a>
        {/* <Button variant="transparent"></Button> */}
        <div className="flex ">
          <NewModeToggle />
        </div>
      </div>
      <div className="sm:hidden flex gap-6 bg-background/10 ">
        <div className="flex ">
          <NewModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HamburgerMenuIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            // alignOffset={-10}
            className="sm:hidden mt-2 "
          >
            {isLogin ? (
              <>
                <DropdownMenuItem>
                  <Button
                    variant="transparent"
                    onClick={() => handleLogout()}
                    className="flex gap-1 justify-center items-center"
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </>
            ) : (
              ""
            )}
            <DropdownMenuItem>
              <a href="https://github.com/mspatel18" target="_blank">
                <Button
                  variant="transparent"
                  className="flex gap-1 justify-center items-center"
                >
                  <GitHubLogoIcon scale={20} /> Github
                </Button>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
