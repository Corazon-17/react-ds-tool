import { PageLayout } from "@/components/layout";
import { Read, List, Split } from "@/features/dataset";
import { getRoute } from "@/utils";
import { Navigate, Route, Routes } from "react-router-dom";

export function Dataset() {
  const menus = ["Dataset List", "Read Dataset", "Split Dataset"];

  return (
    <Routes>
      <Route element={<PageLayout menus={menus} />}>
        <Route index element={<Navigate to={getRoute(menus[0])} />} />
        <Route path={getRoute(menus[0])} element={<List />} />
        <Route path={getRoute(menus[1])} element={<Read />} />
        <Route path={getRoute(menus[2])} element={<Split />} />
      </Route>
    </Routes>
  );
}
