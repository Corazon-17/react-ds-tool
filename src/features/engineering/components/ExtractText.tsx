import { Button, CheckBox, SelectBox, TextInput } from "@/components/inputs";
import { Alert, ReactTable } from "@/components/utils";
import { updateDataset } from "@/stores/datasetSlice";
import { getActiveKey } from "@/stores/selector";
import { PageComponent } from "@/types";
import {
  addColumn,
  extractText,
  filterDataset,
  getCatVar,
  getValueByColumn,
} from "@/utils/dataset";
import { objectFromArray } from "@/utils/object";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ExtractTextProps extends PageComponent {
  colName: string;
}

export const ExtractText = ({ dataset, colName }: ExtractTextProps) => {
  const dispatch = useDispatch();
  const active = getActiveKey();
  const catVar = getCatVar(dataset);

  const [regex, setRegex] = useState<string>("");
  const [column, setColumn] = useState<string>(catVar[0]);
  const [showSample, setShowSample] = useState<boolean>(false);
  const [result, setResult] = useState<string[]>([]);
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const initial = getValueByColumn(dataset, column);
  const resultObj = result.map((val, i) =>
    objectFromArray([column, colName ? colName : "-"], [initial[i], val])
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
    try {
      const res = extractText(dataset, column, regex);
      setResult(res);
    } catch {}
  }, [regex]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-2 ">
        <SelectBox
          label="Extract From"
          options={catVar}
          value={column}
          setValue={setColumn}
        />
        <TextInput
          label="Regular Expression"
          value={regex}
          setValue={setRegex}
        />
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
      {showSample && <ReactTable data={resultObj} pagination />}
    </div>
  );
};
