import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";

const NewModeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <Button variant="transparent" onClick={() => setTheme("light")}>
          {/* <SunIcon
            stroke="white"
            className=" absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          /> */}
          {/* <span>light</span> */}
          <Sun className="absolute h-[1.2rem] w-[1.2rem] transition-all " />
        </Button>
      ) : (
        <Button variant="transparent" onClick={() => setTheme("dark")}>
          {/* <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
          {/* <span>dark</span> */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all " />
        </Button>
      )}

      {/* <Toggle
        onPressedChange={(isPressed: boolean) => {
          setTheme(isPressed ? "light" : "dark");
        }}
      >
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">Toggle theme</span>
      </Toggle> */}
    </>
  );
};

export default NewModeToggle;
