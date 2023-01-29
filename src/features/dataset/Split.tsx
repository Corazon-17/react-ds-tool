import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  CheckBox,
  NumberInput,
  SelectBox,
  TextInput,
} from "@/components/inputs";
import { splitDataset } from "@/utils/dataset";
import { addDataset, DatasetObject } from "@/stores/datasetSlice";
import { getAllDataset, getAllDatasetKeys } from "@/stores/selector";
import { Alert } from "@/components/utils";

export function Split() {
  const dispatch = useDispatch();

  const globalDataset = getAllDataset();
  const datasetOptions = getAllDatasetKeys();
  if (datasetOptions.length < 1) {return <div>No Dataset Found</div>}

  const [selected, setSelected] = useState<string>(datasetOptions[0] || "");
  const [trainName, setTrainName] = useState<string>(`${selected}_train`);
  const [testName, setTestName] = useState<string>(`${selected}_test`);
  const [testSize, setTestSize] = useState<number>(0.2);
  const [shuffle, setShuffle] = useState<boolean>(true);
  const [alert, setAlert] = useState<React.ReactNode>(null);

  const handleSplit = () => {
    const error = datasetOptions.includes(trainName)
      ? "Train name already exist"
      : datasetOptions.includes(testName)
      ? "Test name already exist"
      : null;

    if (!error) {
      const dataset = globalDataset.filter(({ key }) => key == selected)[0]
        .value;
      const [train, test] = splitDataset(dataset, testSize, shuffle);

      const trainData: DatasetObject = {
        key: trainName,
        value: train,
      };
      const testData: DatasetObject = {
        key: testName,
        value: test,
      };

      dispatch(addDataset(trainData));
      dispatch(addDataset(testData));

      setAlert(<Alert text="Success" type="success" />);
    } else {
      setAlert(<Alert text={error} type="error" />);
    }
  };

  useEffect(() => {
    setTrainName(`${selected}_train`);
    setTestName(`${selected}_test`);
  }, [selected]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(null), 3000);
    }
  }, [alert]);

  return (
    <div className="grid gap-2">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 items-center">
        <SelectBox
          label="Select Dataset"
          options={datasetOptions}
          value={selected}
          setValue={setSelected}
        />
        <TextInput
          label="Train Name"
          value={trainName}
          setValue={setTrainName}
        />
        <TextInput label="Test Name" value={testName} setValue={setTestName} />
        <NumberInput
          label="Test Size"
          value={testSize}
          setValue={setTestSize}
          min={0}
          max={1}
          step={0.1}
          withButton
        />
      </div>
      <div className="mt-2 flex gap-2">
        <Button onClick={handleSplit}>Submit</Button>
        <CheckBox label="Shuffle" value={shuffle} setValue={setShuffle} />
      </div>
      {alert}
    </div>
  );
}
