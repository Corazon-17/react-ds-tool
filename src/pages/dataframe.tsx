import { PageLayout } from "@/components/layout";
import {
  Correlation,
  Display,
  Duplicate,
  Group,
  Information,
  Statistics,
} from "@/features/dataframe";

import { getActiveDataset } from "@/stores/selector";
import { getRoute } from "@/utils";
import { Navigate, Route, Routes } from "react-router-dom";

export function Dataframe() {
  const dataset = getActiveDataset();
  const menus = [
    "Display",
    "Information",
    "Statistics",
    "Correlation",
    "Duplicate",
    "Group",
  ];

  return (
    <Routes>
      <Route element={<PageLayout menus={menus} />}>
        <Route index element={<Navigate to={getRoute(menus[0])} />} />
        <Route
          path={getRoute(menus[0])}
          element={<Display dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[1])}
          element={<Information dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[2])}
          element={<Statistics dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[3])}
          element={<Correlation dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[4])}
          element={<Duplicate dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[5])}
          element={<Group dataset={dataset} />}
        />
      </Route>
    </Routes>
  );
}
