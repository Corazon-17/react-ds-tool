import { MultiSelect } from "@/components/inputs";
import { ReactTable } from "@/components/utils";
import { Dataset, PageComponent } from "@/types";
import { filterDataset } from "@/utils/dataset";
import { getObjectKeys, objectFromArray } from "@/utils/object";
import { useEffect, useState } from "react";

export function Display({ dataset }: PageComponent) {
  const columns = Object.keys(dataset[0]);

  const [filterCols, setFilterCols] = useState<{}>(
    objectFromArray(columns, true)
  );
  const [filteredDataset, setFilteredDataset] = useState<Dataset>(dataset);

  useEffect(() => {
    const selectedCols = getObjectKeys(filterCols, true);
    const filtered = filterDataset(dataset, selectedCols);

    setFilteredDataset(filtered);
  }, [filterCols]);

  return (
    <div className="grid gap-2">
      <MultiSelect
        label="Filter Columns"
        value={filterCols}
        setValue={setFilterCols}
        options={columns}
      />
      <ReactTable data={filteredDataset} pagination />
    </div>
  );
}
