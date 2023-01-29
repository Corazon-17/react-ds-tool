import { getGroup, getLowCardinality } from "@/utils/dataset";
import { ApexDefaultOptions } from "@/utils";
import { useState } from "react";
import { SelectBox } from "@/components/inputs";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { filterWithoutKeys } from "@/utils/object";

export function CountPlot({ dataset }: { dataset: Array<{}> }) {
  const catOptions = getLowCardinality(dataset);
  const orientOptions = ["Vertical", "Horizontal"];
  const [catVar, setCatVar] = useState<string>(catOptions[0]);
  const [orient, setOrient] = useState<string>(orientOptions[0]);

  const groupData = getGroup(dataset, catVar, "count");
  const categories = groupData.map((data) =>
    data.groupVal === undefined ? "null" : data.groupVal
  );
  const filteredData = groupData.map((data) =>
    filterWithoutKeys(data, ["groupVal"])
  );

  const series: ApexAxisChartSeries = [
    {
      name: "",
      data: filteredData.map((data) => Object.values(data)[0]) as number[],
    },
  ];

  const options: ApexOptions = {
    ...ApexDefaultOptions,
    title: {
      text: `${catVar} Count`,
      align: "center",
      offsetY: 10,
      offsetX: 15,
    },
    plotOptions: {
      bar: {
        horizontal: orient === "Vertical" ? false : true,
        distributed: true,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: categories,
      tickPlacement: "between",
      title: {
        text: orient === "Vertical" ? catVar : "count",
        offsetY: orient === "Vertical" ? 85 : 0,
      },
    },
    yaxis: {
      title: {
        text: orient === "Vertical" ? "count" : catVar,
      },
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
        <SelectBox
          label="Orientation"
          options={orientOptions}
          value={orient}
          setValue={setOrient}
        />
      </div>
      <ReactApexChart
        series={series}
        options={options}
        type="bar"
        height={360}
      />
    </div>
  );
}
