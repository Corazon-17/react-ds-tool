import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, MultiSelect, SelectBox } from "@/components/inputs";
import { getActiveKey } from "@/stores/selector";
import { updateDataset } from "@/stores/datasetSlice";
import { PageComponent } from "@/types";
import { getObjectKeys, objectFromArray } from "@/utils/object";
import { getNumVar, scaleDataset } from "@/utils/dataset";
import { Alert } from "@/components/utils";

export function Scaling({ dataset }: PageComponent) {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const columnOptions = getNumVar(dataset)
  const methodOptions = ["Standard Scaler", "Min-Max Scaler", "Robust Scaler"];

  const [scalingCols, setScalingCols] = useState<{}>(
    objectFromArray(columnOptions, false)
  );
  const [method, setMethod] = useState<string>(methodOptions[1]);
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleScale = () => {
    const columns = getObjectKeys(scalingCols);
    const scalingMethod =
      method === "Standard Scaler"
        ? "standard"
        : method === "Min-Max Scaler"
        ? "minmax"
        : "robust";

    const scaledData = scaleDataset(dataset, columns, scalingMethod);

    dispatch(
      updateDataset({
        key: active,
        value: scaledData,
      })
    );

    setAlert(<Alert text="Operation success !" type="success" />);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-[70%_30%] gap-2">
        <MultiSelect
          label="Select Columns"
          options={columnOptions}
          value={scalingCols}
          setValue={setScalingCols}
        />
        <SelectBox
          label="Scaling Method"
          options={methodOptions}
          value={method}
          setValue={setMethod}
        />
      </div>
      <Button onClick={handleScale}>Submit</Button>
      {alert}
    </div>
  );
}
