import { getRoute, splitAndCapitalize } from "@/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import Helper from "./Helper";

interface PageLayoutProps {
  menus: string[];
}

export function PageLayout({ menus }: PageLayoutProps) {
  const location = useLocation();
  const path = location.pathname.split("/");

  return (
    <div className="flex flex-col md:flex-row relative justify-between w-full md:pr-48 md:pl-40">
      <div className="flex justify-start relative z-20 w-full md:w-max h-max md:h-full">
        <div
          className="flex md:hidden fixed top-14 h-20 w-full items-center justify-center 
            bg-background-primary dark:bg-background-dark"
        >
          <div
            className="flex w-full h-12 justify-between rounded-xl 
            bg-decor-primary text-white overflow-x-auto divide-x"
          >
            {menus.map((menu, i) => {
              const route = getRoute(menu);

              return (
                <Link
                  key={i}
                  to={route}
                  className={`flex w-full justify-center items-center px-2 whitespace-nowrap
                  ${
                    path[2] === route
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

        <aside className="hidden md:flex fixed top-14 left-0 h-screen w-40 bg-decor-primary text-white">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap justify-center text-center w-full mb-4 py-8 font-bold tracking-widest border-b">
              {path[1].toUpperCase()}
            </div>

            {menus.map((menu, i) => {
              const route = getRoute(menu);

              return (
                <Link
                  key={i}
                  to={route}
                  className={`flex w-full px-6 py-2 whitespace-nowrap
                    ${
                      path[2] === route
                        ? "bg-decor-secondary"
                        : "hover:bg-decor-secondary"
                    }`}
                >
                  {menu}
                </Link>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="w-full md:w-full h-full p-4 md:pt-8 mt-16 md:mt-0">
        <div className="md:w-[50vw] mx-auto">
          <h2 className="text-2xl font-bold mb-2">{splitAndCapitalize(path[2], "-")}</h2>
          <Outlet />
        </div>
      </div>

      <div className="hidden md:flex fixed top-14 right-0 h-screen w-48 border-l border-white">
        <Helper />
      </div>
    </div>
  );
}
