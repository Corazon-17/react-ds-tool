import { useState } from "react";
import { MultiSelect } from "@/components/inputs";
import { ReactTable } from "@/components/utils";
import { PageComponent } from "@/types";
import { getObjectKeys, objectFromArray } from "@/utils/object";
import { getDuplicate } from "@/utils/dataset";

export function Duplicate({ dataset }: PageComponent) {
  const allColumns = Object.keys(dataset[0]);

  const [columns, setColumns] = useState<{}>(objectFromArray(allColumns, true));
  const duplicated = getDuplicate(dataset, getObjectKeys(columns, true));

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">Duplicated Data By Columns.</h3>
      <MultiSelect
        label="Select columns"
        options={allColumns}
        value={columns}
        setValue={setColumns}
      />
      {duplicated.length > 0 && <ReactTable data={duplicated} pagination />}
    </div>
  );
}
