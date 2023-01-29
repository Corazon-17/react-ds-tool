import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaTools } from "react-icons/fa";
import { CgMenuOreos } from "react-icons/cg";
import { useState } from "react";
import { Theme, ValueSetter } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { getRoute } from "@/utils";

const menus = [
  "Dataset",
  "Dataframe",
  "Exploratory Data",
  "Feature Engineering",
  "Pipeline",
  "Model Building",
];

interface TopNavProps {
  theme: Theme;
  setTheme: ValueSetter<Theme>;
}

export default function TopNav({ theme, setTheme }: TopNavProps) {
  const [expand, setExpand] = useState<boolean>(false);
  const location = useLocation();
  const current = location.pathname.split("/")[1];

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header className="grid fixed top-0 w-full bg-decor-primary text-white z-50">
      <div className="flex z-50 w-full justify-between items-center h-14 px-3 md:px-4 lg:px-6 border-b">
        <button
          className="text-xl md:hidden"
          onClick={() => setExpand(!expand)}
        >
          <CgMenuOreos />
        </button>

        <Link to="" className="flex gap-2 items-center">
          <FaTools />
          <span className="text-xl text-center font-mono font-bold tracking-widest">
            DS Tool
          </span>
        </Link>

        <div className="flex justify-between gap-4">
          <nav className="hidden md:flex md:text-sm lg:text-base text-center items-center">
            {menus.map((menu, i) => {
              const route = getRoute(menu);

              return (
                <Link
                  to={route}
                  key={i}
                  className={`px-1.5 py-1 mx-0.5 rounded ${
                    route === current
                      ? "bg-decor-secondary"
                      : "hover:bg-decor-secondary"
                  }`}
                >
                  {menu}
                </Link>
              );
            })}
          </nav>

          <button className="text-xl" onClick={handleTheme}>
            {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
          </button>
        </div>
      </div>

      <div
        className={`block md:hidden relative z-10 duration-500 ${
          expand ? "h-60" : "h-0"
        }`}
      >
        <div
          className={`flex flex-col items-center duration-500 ${
            expand ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {menus.map((menu, i) => {
            const route = getRoute(menu);

            return (
              <Link
                key={i}
                to={route}
                onClick={() => setExpand(false)}
                className={`flex justify-center w-full text-lg py-1.5 duration-500 
                ${expand ? "opacity-100" : "opacity-0"} ${
                  route === current
                    ? "bg-decor-secondary"
                    : "hover:bg-decor-secondary"
                }`}
              >
                {menu}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
