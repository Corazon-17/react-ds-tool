import { ReactTable } from "@/components/utils";
import { PageComponent } from "@/types";
import { getInformation } from "@/utils/dataset";

export function Information({ dataset }: PageComponent) {
  const numRows = dataset.length;
  const numCols = Object.keys(dataset[0]).length;
  const info = getInformation(dataset);
  const nString = info.filter((val) => val.dtype === "string").length;
  const nNumber = info.filter((val) => val.dtype === "number").length;

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">Dataset Information.</h3>
      <div>
        <p>
          RangeIndex: {numRows}, 0 to {numRows - 1}
        </p>
        <p>Data columns (total {numCols} columns)</p>
      </div>
      <ReactTable data={info} index="column" />
      <div>
        <p>
          dtypes: number{`(${nNumber})`}, string{`(${nString})`}
        </p>
        <p>Memory usage: {getMemUsage(dataset)}</p>
      </div>
    </div>
  );
}

const getMemUsage = (object: Object) => {
  const roughMemory = JSON.stringify(object).length;

  if (roughMemory < 1024) {
    return `${roughMemory} bytes`;
  } else if (roughMemory < 1024 * 1024) {
    return `${(roughMemory / 1024).toFixed(2)}+ KB`;
  } else {
    return `${(roughMemory / 1024 / 1024).toFixed(2)}+ MB`;
  }
};
