import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, MultiSelect } from "@/components/inputs";
import { getActiveKey } from "@/stores/selector";
import { updateDataset } from "@/stores/datasetSlice";
import { PageComponent } from "@/types";
import { getObjectKeys, objectFromArray } from "@/utils/object";
import { dropColumn } from "@/utils/dataset";
import { Alert } from "@/components/utils";

export function DropColumn({ dataset }: PageComponent) {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const columnOptions = Object.keys(dataset[0]);
  const [delColumns, setDelColumns] = useState<{}>(
    objectFromArray(columnOptions, false)
  );
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleDelete = () => {
    const columns = getObjectKeys(delColumns);
    const temp = dropColumn(dataset, columns);

    dispatch(
      updateDataset({
        key: active,
        value: temp,
      })
    );
    setAlert(<Alert text="Operation success !" type="success" />);

    const remaining = getObjectKeys(delColumns, false);
    setDelColumns(objectFromArray(remaining, false));
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <MultiSelect
        label="Select Columns"
        options={columnOptions}
        value={delColumns}
        setValue={setDelColumns}
      />
      <Button onClick={handleDelete}>Submit</Button>
      {alert}
    </div>
  );
}
