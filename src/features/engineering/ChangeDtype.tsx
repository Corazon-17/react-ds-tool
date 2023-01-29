import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, SelectBox } from "@/components/inputs";
import { getActiveKey } from "@/stores/selector";
import { updateDataset } from "@/stores/datasetSlice";
import { PageComponent } from "@/types";
import { changeDtype, getInformation } from "@/utils/dataset";
import { Alert } from "@/components/utils";

export function ChangeDtype({ dataset }: PageComponent) {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const information = getInformation(dataset);
  const columns = information.map((info) => `${info.column} (${info.dtype})`);
  const dtypeOptions = ["string", "number", "boolean"];

  const [selected, setSelected] = useState<string>(columns[0]);
  const [targetDtype, setTargetDtype] = useState<string>("string");
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleChange = () => {
    const selectedCol = selected.split(" ")[0];
    const newValue = changeDtype(dataset, [selectedCol], [targetDtype]);

    dispatch(
      updateDataset({
        key: active,
        value: newValue,
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
      <div className="grid sm:grid-cols-2 gap-2">
        <SelectBox
          label="Select Column"
          options={columns}
          value={selected}
          setValue={setSelected}
        />
        <SelectBox
          label="Target Dtype"
          options={dtypeOptions}
          value={targetDtype}
          setValue={setTargetDtype}
        />
      </div>
      <Button onClick={handleChange}>Submit</Button>
      {alert}
    </div>
  );
}
