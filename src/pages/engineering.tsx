import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/components/layout";
import { getActiveDataset } from "@/stores/selector";
import { getRoute } from "@/utils";
import {
  AddModify,
  ChangeDtype,
  DropColumn,
  Encoding,
  Imputation,
  Scaling,
} from "@/features/engineering";

export function Engineering() {
  const dataset = getActiveDataset();

  const menus = [
    "Add/Modify",
    "Change Dtype",
    "Imputation",
    "Encoding",
    "Scaling",
    "Drop Column",
  ];

  return (
    <Routes>
      <Route element={<PageLayout menus={menus} />}>
        <Route index element={<Navigate to={getRoute(menus[0])} />} />
        <Route
          path={getRoute(menus[0])}
          element={<AddModify dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[1])}
          element={<ChangeDtype dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[2])}
          element={<Imputation dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[3])}
          element={<Encoding dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[4])}
          element={<Scaling dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[5])}
          element={<DropColumn dataset={dataset} />}
        />
      </Route>
    </Routes>
  );
}
