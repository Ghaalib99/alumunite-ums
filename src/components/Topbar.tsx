import { LucideBell, LucideMail, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";
import logo from "../assets/logo.png";

const Topbar = () => {
  const { setTheme } = useTheme();
  return (
    <div className="w-full h-16 bg-[#01796F] p-2 text-white fixed inset-0 z-[10]">
      <div className="pl-3 pr-4 w-full flex items-center justify-between h-full">
        <img src={logo} alt="" className="h-[180px]" />
        <div className="flex items-center mr-10 lg:mr-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent outline-none border-0 hover:text-secondary"
              >
                <Sun
                  size={50}
                  className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                  size={50}
                  className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            className="p-2 relative bg-transparent outline-none border-0 mx-2"
          >
            <LucideBell className="h-6 w-6" />
            <div className="h-2 w-2 bg-destructive rounded-full absolute right-[10px] top-2"></div>
          </Button>
          <Button
            variant="ghost"
            className="p-2 bg-transparent outline-none border-0 relative "
          >
            <LucideMail className="h-6 w-6" />
            <div className="h-2 w-2 bg-destructive rounded-full absolute right-1 top-2"></div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
