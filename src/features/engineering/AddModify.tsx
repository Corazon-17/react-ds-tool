import { useState } from "react";
import { SelectBox, TextInput } from "@/components/inputs";
import { PageComponent } from "@/types";
import { ExtractText, MathOperation } from "./components";

export function AddModify({ dataset }: PageComponent) {
  const allColumns = Object.keys(dataset[0]);
  const typeOptions = ["Add", "Modify"];
  const methodOptions = [
    "Math Operation",
    "Extract Text",
    "Group Numerical",
    "Group Categorical",
  ];

  const [type, setType] = useState<string>("Add");
  const [column, setColumn] = useState<string>(allColumns[0]);
  const [method, setMethod] = useState<string>(methodOptions[0]);

  const form =
    method === methodOptions[0] ? (
      <MathOperation dataset={dataset} colName={column} />
    ) : method === methodOptions[1] ? (
      <ExtractText dataset={dataset} colName={column} />
    ) : (
      ""
    );

  return (
    <div className="grid gap-4">
      <div className="grid sm: grid-cols-3 gap-x-2 gap-y-4">
        <SelectBox
          label="Operation"
          options={typeOptions}
          value={type}
          setValue={setType}
        />
        {type === "Add" ? (
          <TextInput label="Column Name" value={column} setValue={setColumn} />
        ) : (
          <SelectBox
            label="Select Column"
            options={allColumns}
            value={column}
            setValue={setColumn}
          />
        )}
        <SelectBox
          label="Method"
          options={methodOptions}
          value={method}
          setValue={setMethod}
        />
      </div>
      {form}
    </div>
  );
}
