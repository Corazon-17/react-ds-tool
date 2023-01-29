import { ReactTable } from "@/components/utils";
import { PageComponent } from "@/types";
import { getStatistics } from "@/utils/dataset";

export function Statistics({ dataset }: PageComponent) {
  const statistics = getStatistics(dataset);

  return (
    <div className="grid gap-2">
      <h3 className="font-bold">Descriptive Statistics.</h3>
      <ReactTable data={statistics} index="column" />
    </div>
  );
}
