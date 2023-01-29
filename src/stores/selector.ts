import type { DatasetObject } from "./datasetSlice";

import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Dataset } from "@/types";

export const getAllDataset = (): DatasetObject[] => {
  const allDataset = useSelector((state: RootState) => state.dataset.data);

  return allDataset;
};

export const getAllDatasetKeys = (): string[] => {
  const allDataset = getAllDataset();
  const allDatasetKeys = allDataset.map((data) => data.key);

  return allDatasetKeys;
};

export const getActiveKey = (): string => {
  const active = useSelector((state: RootState) => state.dataset.active);

  return active;
};

export const getActiveDataset = (
  activeKey?: string,
  allDataset?: DatasetObject[]
): Dataset => {
  if (allDataset && activeKey) {
    var activeDataset = allDataset.filter((data) => data.key === activeKey);
  } else {
    const allDataset = getAllDataset();
    const activeKey = getActiveKey();

    var activeDataset = allDataset.filter((data) => data.key === activeKey);
  }

  if (activeDataset.length > 0) {
    return activeDataset[0].value;
  }

  return [{}];
};
