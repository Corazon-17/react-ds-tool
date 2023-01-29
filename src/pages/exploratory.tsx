import { Navigate, Route, Routes } from "react-router-dom";
import { PageLayout } from "@/components/layout";
import { getActiveDataset } from "@/stores/selector";
import { getRoute } from "@/utils";
import {
  BarPlot,
  BoxPlot,
  CountPlot,
  Histogram,
  LinePlot,
  PiePlot,
  ScatterPlot,
} from "@/features/exploratory";

export function Exploratory() {
  const dataset = getActiveDataset();

  const menus = [
    "Bar Plot",
    "Pie Plot",
    "Count Plot",
    "Histogram",
    "Box Plot",
    "Scatter Plot",
    "Line Plot",
  ];

  return (
    <Routes>
      <Route element={<PageLayout menus={menus} />}>
        <Route index element={<Navigate to={getRoute(menus[0])} />} />
        <Route
          path={getRoute(menus[0])}
          element={<BarPlot dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[1])}
          element={<PiePlot dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[2])}
          element={<CountPlot dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[3])}
          element={<Histogram dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[4])}
          element={<BoxPlot dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[5])}
          element={<ScatterPlot dataset={dataset} />}
        />
        <Route
          path={getRoute(menus[6])}
          element={<LinePlot dataset={dataset} />}
        />
      </Route>
    </Routes>
  );
}
