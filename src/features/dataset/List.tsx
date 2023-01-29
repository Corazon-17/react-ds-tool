import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, CheckBox, SelectBox } from "@/components/inputs";
import { ReactTable } from "@/components/utils";
import {
  getActiveDataset,
  getActiveKey,
  getAllDataset,
} from "@/stores/selector";
import { removeDataset, setActive } from "@/stores/datasetSlice";
import { Dataset } from "@/types";
import { downloadText, jsonToCSV } from "@/utils";

export function List() {
  const dispatch = useDispatch();

  const allDataset = getAllDataset();
  const listDataset = allDataset.map((dataset) => ({
    Name: dataset.key,
    Rows: dataset.value.length,
    Columns: Object.keys(dataset.value[0]).length,
  }));

  const datasetOptions = allDataset.map((obj) => obj.key);
  const [selected, setSelected] = useState<string>(getActiveKey());
  const [dataset, setDataset] = useState<Dataset>([{}]);
  const [show, setShow] = useState<boolean>(false);

  const deleteDataset = () => {
    dispatch(removeDataset(selected));
    const currentOptions = datasetOptions.filter((opt) => opt != selected);

    if (currentOptions.length > 0) {
      setSelected(currentOptions[0]);
    } else {
      setSelected("");
      setDataset([{}]);
    }
  };

  const downloadDataset = () => {
    if (dataset.length > 1) {
      const csv = jsonToCSV(dataset);
      downloadText(`${selected}.csv`, csv);
    }
  };

  useEffect(() => {
    if (selected === "" && datasetOptions.length > 0) {
      setSelected(datasetOptions[0]);
    }

    try {
      dispatch(setActive(selected));

      const activeDataset = getActiveDataset(selected, allDataset);
      setDataset(activeDataset);
    } catch {}
  }, [selected]);

  return (
    <div className="grid gap-4 overflow-auto">
      {listDataset.length > 0 && (
        <ReactTable data={listDataset} className="max-h-48" />
      )}

      <div className="grid gap-2">
        <div className="grid gap-2">
          <SelectBox
            label="Select Dataset"
            options={datasetOptions}
            value={selected}
            setValue={setSelected}
            className="w-full min-w-max"
          />
          <div className="flex justify-between">
            <Button onClick={downloadDataset}>Download</Button>
            <Button className="bg-red-600" onClick={deleteDataset}>
              Delete
            </Button>
          </div>
        </div>

        <CheckBox label="Show Sample" value={show} setValue={setShow} />
      </div>

      {dataset && show && <ReactTable data={dataset} pagination />}
    </div>
  );
}
