import { ReactTable } from "@/components/utils";
import { PageComponent } from "@/types";
import { getCorrelation } from "@/utils/dataset";

export function Correlation({dataset}: PageComponent) {
  const correlation = getCorrelation(dataset);

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">Feature Correlation.</h3>
      <ReactTable data={correlation} index="column" />
    </div>
  );
}
