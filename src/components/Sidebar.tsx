import { File, Home, Menu, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 right-4 z-50 p-2 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </Button>

      <div
        className={`h-screen w-72 fixed inset-0 bg-popover z-[9] transform transition-transform lg:translate-x-0 border-gray-300  border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 mt-[100px]">
          <Command className="text-sm">
            <CommandList>
              <CommandGroup heading="" className="text-sm">
                <div className="h-4"></div>
                {navItems.map((navItem) => {
                  const isActive = location.pathname === navItem.url;
                  return (
                    <Link
                      key={navItem.id}
                      to={navItem.url}
                      className={`w-full mx-auto font-bold text-sm flex items-center gap-2 cursor-pointer ${
                        isActive ? "bg- text-" : ""
                      }`}
                    >
                      <CommandItem
                        className={`w-full mx-auto font-bold text-sm flex items-center gap-2 mb-3 hover:bg-slate-200 cursor-pointer ${
                          isActive ? "bg-primary text-white" : ""
                        }`}
                      >
                        {navItem.icon}
                        <span>{navItem.name}</span>
                      </CommandItem>
                    </Link>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const navItems = [
  {
    id: 1,
    name: "Home",
    icon: <Home className="mr-2 h-5 w-5" />,
    url: "/",
  },
  {
    id: 2,
    name: "Add User",
    icon: <PlusCircle className="mr-2 h-5 w-5" />,
    url: "/add-user",
  },
  {
    id: 3,
    name: "Manage User",
    icon: <File className="mr-2 h-5 w-5" />,
    url: "/manage-user",
  },
];
