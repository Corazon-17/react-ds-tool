import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, SelectBox, TextInput } from "@/components/inputs";
import { getActiveKey } from "@/stores/selector";
import { updateDataset } from "@/stores/datasetSlice";
import { PageComponent } from "@/types";
import { getNullVar, getValueByColumn, imputeColumn } from "@/utils/dataset";
import { Alert } from "@/components/utils";

export function Imputation({ dataset }: PageComponent) {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const nullVar = getNullVar(dataset);
  const [imputeOptions, setImputeOptions] = useState<string[]>([]);

  const [column, setColumn] = useState<string>(nullVar[0]);
  const [columnDtype, setColumnDtype] = useState<string>(
    typeof getValueByColumn(dataset, column).find((val) => val !== undefined)
  );
  const [option, setOption] = useState<string>(imputeOptions[0]);
  const [value, setValue] = useState<string>("");
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleImpute = () => {
    const newValue = imputeColumn(dataset, column, option, value);

    dispatch(
      updateDataset({
        key: active,
        value: newValue,
      })
    );

    setColumn(nullVar.length > 1 ? nullVar[1] : "");
    setAlert(<Alert text="Operation success !" type="success" />);
  };

  useEffect(() => {
    const values = getValueByColumn(dataset, column);
    const dtype = typeof values.find((val) => val !== undefined);

    setColumnDtype(dtype);
  }, [column]);

  useEffect(() => {
    setImputeOptions(
      columnDtype === "number"
        ? ["mean", "median", "mode", "value"]
        : ["mode", "value"]
    );
  }, [columnDtype]);

  useEffect(() => {
    setOption(imputeOptions[0]);
  }, [imputeOptions]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <SelectBox
          label="Select Column"
          options={nullVar}
          value={column}
          setValue={setColumn}
        />
        <SelectBox
          label="Impute Option"
          options={imputeOptions}
          value={option}
          setValue={setOption}
        />
        {option === "value" && (
          <TextInput label="Value" value={value} setValue={setValue} />
        )}
      </div>
      <Button onClick={handleImpute}>Submit</Button>
      {alert}
    </div>
  );
}
