import { setActive } from "@/stores/datasetSlice";
import {
  getActiveDataset,
  getActiveKey,
  getAllDatasetKeys,
} from "@/stores/selector";
import { getCatVar, getNullVar, getNumVar } from "@/utils/dataset";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SelectBox } from "../inputs";
import { ListCard } from "../utils";

export default function Helper() {
  const active = getActiveKey();
  const listKeys = getAllDatasetKeys();
  const dataset = getActiveDataset();

  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string>(active);

  const nullVar = getNullVar(dataset);
  const catVar = getCatVar(dataset);
  const numVar = getNumVar(dataset);

  useEffect(() => {
    try {
      dispatch(setActive(selected));
    } catch {}
  }, [selected]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-auto w-full px-2 pt-4 pb-16">
      <SelectBox
        label="Active Dataset"
        value={selected}
        setValue={setSelected}
        options={listKeys}
      />
      <ListCard label="Numerical Variables" list={numVar} />
      <ListCard label="Categorical Variables" list={catVar} />
      <ListCard label="Missing Values" list={nullVar} />
      <div>
        <label className="font-bold">Note</label>
        <textarea className="h-48 w-full p-2 text-black outline-none" />
      </div>
    </div>
  );
}
