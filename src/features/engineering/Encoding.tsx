import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, LabeledInput, SelectBox } from "@/components/inputs";
import { getActiveKey } from "@/stores/selector";
import { updateDataset } from "@/stores/datasetSlice";
import { PageComponent } from "@/types";
import {
  encodeOneHot,
  encodeOrdinal,
  encodeTarget,
  getCatVar,
  getNumVar,
  getValueByColumn,
} from "@/utils/dataset";
import { Alert } from "@/components/utils";

export function Encoding({ dataset }: PageComponent) {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const columnOptions = getCatVar(dataset);
  const targetOptions = getNumVar(dataset);
  const methodOptions = [
    "One-Hot Encoding",
    "Ordinal Encoding",
    "Target Encoding",
  ];

  const [encodingCol, setEncodingCol] = useState<string>(columnOptions[0]);
  const [targetCol, setTargetCol] = useState<string>(targetOptions[0]);
  const [method, setMethod] = useState<string>(methodOptions[0]);
  const [ordinalObj, setOrdinalObj] = useState<{}>({});
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleEncode = () => {
    const newValue =
      method === methodOptions[0]
        ? encodeOneHot(dataset, encodingCol)
        : method === methodOptions[1]
        ? encodeOrdinal(dataset, encodingCol, ordinalObj)
        : encodeTarget(dataset, encodingCol, targetCol);

    dispatch(
      updateDataset({
        key: active,
        value: newValue,
      })
    );

    setAlert(<Alert text="Operation success !" type="success" />);
  };

  useEffect(() => {
    if (method === "Ordinal Encoding") {
      const uniqueValues = new Set(getValueByColumn(dataset, encodingCol));
      const initObj = Object.fromEntries(
        [...uniqueValues].map((val, i) => [val, i])
      );
      setOrdinalObj(initObj);
    }
  }, [encodingCol, method]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        <SelectBox
          label="Select Column"
          options={columnOptions}
          value={encodingCol}
          setValue={setEncodingCol}
        />
        <SelectBox
          label="Select Method"
          options={methodOptions}
          value={method}
          setValue={setMethod}
        />
        {method === "Target Encoding" && (
          <SelectBox
            label="Select Target"
            options={targetOptions}
            value={targetCol}
            setValue={setTargetCol}
          />
        )}
        {method === "Ordinal Encoding" && (
          <LabeledInput
            label="Define Order"
            value={ordinalObj}
            setValue={setOrdinalObj}
          />
        )}
      </div>
      <Button onClick={handleEncode}>Submit</Button>
      {alert}
    </div>
  );
}
