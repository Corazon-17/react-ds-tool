import React, { useEffect, useState } from "react";
import { Button, CheckBox, RadioButton, TextInput } from "@/components/inputs";
import { Alert, ReactTable } from "@/components/utils";
import { getAllDatasetKeys } from "@/stores/selector";
import { useDispatch } from "react-redux";
import { addDataset } from "@/stores/datasetSlice";
import { UploadFile, GithubURL, ManualInput, SampleData } from "./ReadMethod";
import { Dataset } from "@/types";

export function Read() {
  const dispatch = useDispatch();

  const existedKeys = getAllDatasetKeys();
  const readMethods = [
    "Upload File",
    "Github URL",
    "Manual Input",
    "Sample Data",
  ];

  const [readMethod, setReadMethod] = useState<string>(readMethods[0]);
  const [datasetName, setDatasetName] = useState<string>("");
  const [dataset, setDataset] = useState<Dataset>([]);
  const [showSample, setShowSample] = useState<boolean>(false);
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const inputForm =
    readMethod == readMethods[0] ? (
      <UploadFile setDataset={setDataset} setName={setDatasetName} />
    ) : readMethod == readMethods[1] ? (
      <GithubURL setDataset={setDataset} />
    ) : readMethod == readMethods[2] ? (
      <ManualInput setDataset={setDataset} />
    ) : (
      <SampleData setDataset={setDataset} />
    );

  const handleSubmit = () => {
    const error =
      dataset.length === 0
        ? "No dataset found"
        : datasetName == ""
        ? "Dataset name cannot be empty"
        : existedKeys.includes(datasetName)
        ? "Dataset name already exist"
        : "";

    if (!error) {
      const newData = {
        key: datasetName,
        value: dataset,
      };

      dispatch(addDataset(newData));
      setAlert(<Alert text="New dataset added !" type="success" />);
    } else {
      setAlert(<Alert text={error} type="error" />);
    }
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-4">
      <RadioButton
        label="Read Method"
        options={readMethods}
        value={readMethod}
        setValue={setReadMethod}
      />

      <div className="grid lg:grid-cols-[1fr_150px] gap-3 items-start">
        {inputForm}

        <TextInput
          label="Dataset Name"
          value={datasetName}
          setValue={setDatasetName}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleSubmit}>Submit</Button>
        <CheckBox
          label="Show Sample"
          value={showSample}
          setValue={setShowSample}
        />
      </div>
      {alert}
      {showSample && <ReactTable data={dataset} pagination />}
    </div>
  );
}
