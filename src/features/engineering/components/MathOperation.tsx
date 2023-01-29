import { Button, CheckBox, NumberInput, SelectBox } from "@/components/inputs";
import { Alert, ReactTable } from "@/components/utils";
import { updateDataset } from "@/stores/datasetSlice";
import { getActiveKey } from "@/stores/selector";
import { Operator, PageComponent } from "@/types";
import {
  addColumn,
  colWithColOperation,
  colWithNumOperation,
  filterDataset,
  getNonNullVar,
  getValueByColumn,
} from "@/utils/dataset";
import { objectFromArray } from "@/utils/object";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface MathOperationProps extends PageComponent {
  colName: string;
}

export const MathOperation = ({ dataset, colName }: MathOperationProps) => {
  const dispatch = useDispatch();
  const active = getActiveKey();

  const numVar = getNonNullVar(dataset, "numerical");
  const operationOpt = ["Column With Column", "Column With Number"];
  const operators = ["+", "-", "x", "/", "**", "%"];

  const [operation, setOperation] = useState<string>(operationOpt[0]);
  const [var1, setVar1] = useState<string>(numVar[0]);
  const [var2, setVar2] = useState<string>(numVar[0]);
  const [operator, setOperator] = useState<string>(operators[0]);
  const [number, setNumber] = useState<number>(0);
  const [showSample, setShowSample] = useState<boolean>(false);
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const initial = getValueByColumn(dataset, var1);
  const result =
    operation === operationOpt[0]
      ? colWithColOperation(dataset, var1, var2, operator as Operator)
      : colWithNumOperation(dataset, var1, number, operator as Operator);
  const resultObj = result.map((val, i) =>
    objectFromArray(
      [`initial_${var1}`, colName ? colName : "-"],
      [initial[i], val]
    )
  );

  const handleSubmit = () => {
    const value = filterDataset(resultObj, [colName ? colName : "-"]);
    const newValue = addColumn(dataset, value);

    dispatch(
      updateDataset({
        key: active,
        value: newValue,
      })
    );

    setAlert(<Alert text={`Operation success !`} type="success" />);
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <SelectBox
        label="Operation"
        options={operationOpt}
        value={operation}
        setValue={setOperation}
      />
      <div className="grid sm:grid-cols-3 gap-2">
        <SelectBox
          label="Column 1"
          options={numVar}
          value={var1}
          setValue={setVar1}
        />
        <SelectBox
          label="Operator"
          options={operators}
          value={operator}
          setValue={setOperator}
        />
        {operation === operationOpt[0] ? (
          <SelectBox
            label="Column 2"
            options={numVar}
            value={var2}
            setValue={setVar2}
          />
        ) : (
          <NumberInput
            label="Enter Number"
            value={number}
            setValue={setNumber}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSubmit}>Submit</Button>
        <CheckBox
          label="Show Sample"
          value={showSample}
          setValue={setShowSample}
        />
      </div>
      {alert}
      {showSample && (
        <ReactTable data={resultObj.slice(0, 10)} className="w-min" />
      )}
    </div>
  );
};
