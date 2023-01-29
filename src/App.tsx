import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import {
  Dataframe,
  Dataset,
  Engineering,
  Exploratory,
  Home,
  Model,
  Pipeline,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dataset/*" element={<Dataset />} />
        <Route path="dataframe/*" element={<Dataframe />} />
        <Route path="exploratory-data/*" element={<Exploratory />} />
        <Route path="feature-engineering/*" element={<Engineering />} />
        <Route path="pipeline/*" element={<Pipeline />} />
        <Route path="model-building/*" element={<Model />} />
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
