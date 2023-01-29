import { getGroup, getLowCardinality } from "@/utils/dataset";
import { useState } from "react";
import { NumberInput, SelectBox } from "@/components/inputs";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ApexDefaultOptions } from "@/utils";
import { filterWithoutKeys } from "@/utils/object";

export function PiePlot({ dataset }: { dataset: Array<{}> }) {
  const catOptions = getLowCardinality(dataset);

  const [catVar, setCatVar] = useState<string>(catOptions[0]);
  const [offset, setOffset] = useState<number>(1);
  const [cutout, setCutout] = useState<number>(0);

  const groupData = getGroup(dataset, catVar, "count");
  const categories = groupData.map((group) =>
    group.groupVal === undefined ? "null" : group.groupVal
  );
  const filteredData = groupData.map((data) =>
    filterWithoutKeys(data, ["groupVal"])
  );

  const series: ApexAxisChartSeries = filteredData.map(
    (data) => Object.values(data)[0]
  ) as ApexAxisChartSeries;
  const options: ApexOptions = {
    ...ApexDefaultOptions,
    labels: categories,
    plotOptions: {
      pie: {
        donut: {
          size: `${cutout}%`,
          labels: {
            show: cutout >= 50 ? true : false,
          },
        },
      },
    },
    stroke: {
      width: offset,
      colors: ["#18181b"],
    },
    title: {
      text: `${catVar} Pie Chart`,
      align: "center",
    },
    legend: {
      show: true,
      position: "bottom",
      offsetY: -2,
    },
    yaxis: {
      show: true,
    },
  };

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <SelectBox
          label="Categorical Variable"
          options={catOptions}
          value={catVar}
          setValue={setCatVar}
        />
        <NumberInput
          label="Offset"
          value={offset}
          setValue={setOffset}
          min={0}
          max={10}
          withButton
        />
        <NumberInput
          label="Cutout"
          value={cutout}
          setValue={setCutout}
          min={0}
          max={100}
          withButton
        />
      </div>
      <ReactApexChart
        series={series}
        options={options}
        type="donut"
        height={420}
      />
    </div>
  );
}
