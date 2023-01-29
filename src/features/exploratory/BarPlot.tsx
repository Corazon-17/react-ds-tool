import { getGroup, getLowCardinality, getNumVar } from "@/utils/dataset";
import { ApexDefaultOptions } from "@/utils";
import { useState } from "react";
import { SelectBox } from "@/components/inputs";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { Dataset } from "@/types";

export function BarPlot({ dataset }: { dataset: Dataset }) {
  const numOptions = getNumVar(dataset);
  const catOptions = getLowCardinality(dataset);
  const orientOptions = ["Vertical", "Horizontal"];
  const [numVar, setNumVar] = useState<string>(numOptions[0]);
  const [catVar, setCatVar] = useState<string>(catOptions[0]);
  const [orient, setOrient] = useState<string>(orientOptions[0]);

  const groupData = getGroup(dataset, catVar, "mean");
  const categories = groupData.map((group) => group.groupVal);

  type GroupType = keyof typeof groupData[0];
  const series: ApexAxisChartSeries = [
    {
      name: "",
      data: groupData.map((data) => data[numVar as GroupType]),
    },
  ];

  const options: ApexOptions = {
    ...ApexDefaultOptions,
    title: {
      text: `${catVar} Bar Plot`,
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
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: categories,
      tickPlacement: "between",
      title: {
        text: orient === "Vertical" ? catVar : numVar,
        offsetY: orient === "Vertical" ? 85 : 0,
      },
    },
    yaxis: {
      title: {
        text: orient === "Vertical" ? numVar : catVar,
      },
      decimalsInFloat: 2,
    },
  };

  return (
    <div className="grid gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <SelectBox
          label="Numerical Variable"
          options={numOptions}
          value={numVar}
          setValue={setNumVar}
        />
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
