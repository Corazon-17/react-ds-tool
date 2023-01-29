import { useState } from "react";
import { SelectBox } from "@/components/inputs";
import { ReactTable } from "@/components/utils";
import { PageComponent } from "@/types";
import { getGroup } from "@/utils/dataset";

export function Group({dataset}: PageComponent) {
  const groupOptions = Object.keys(dataset[0])
  const aggOptions = ["count", "mean", "std", "min", "25%", "50%", "75%", "max"]
  const [group, setGroup] = useState<string>(groupOptions[0])
  const [agg, setAgg] = useState<string>(aggOptions[0])

  const groupData = getGroup(dataset, group, agg);

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">Group Dataset By Column.</h3>
      <div className="grid sm:grid-cols-2 gap-2">
        <SelectBox label="Group By" options={groupOptions} value={group} setValue={setGroup} />
        <SelectBox label="Aggregate Function" options={aggOptions} value={agg} setValue={setAgg} />
      </div>
      <ReactTable data={groupData} index="groupVal" pagination />
    </div>
  );
}
