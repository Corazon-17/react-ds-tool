import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Theme } from "@/types";
import TopNav from "./TopNav";

export function Layout() {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div className={`${theme}`}>
      <div
        className="flex min-h-screen bg-background-primary font-roboto
        dark:bg-background-dark dark:text-white duration-500"
      >
        <TopNav theme={theme} setTheme={setTheme} />
        <main className="flex w-screen pt-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
