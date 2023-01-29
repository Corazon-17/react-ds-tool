import { PageLayout } from "@/components/layout";
import { getRoute } from "@/utils";
import { Navigate, Route, Routes } from "react-router-dom";

export function Pipeline() {
  const menus = ["Coming Soon"];

  return (
    <Routes>
      <Route element={<PageLayout menus={menus} />}>
        <Route index element={<Navigate to={getRoute(menus[0])} />} />
        <Route path={getRoute(menus[0])} element={<span>Coming Soon</span>} />
      </Route>
    </Routes>
  );
}
