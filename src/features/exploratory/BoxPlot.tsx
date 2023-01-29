import {
  getGroup,
  getLowCardinality,
  getNumVar,
  getStatistics,
  getValueByColumn,
} from "@/utils/dataset";
import { ApexDefaultOptions } from "@/utils";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { SelectBox } from "@/components/inputs";

export function BoxPlot({ dataset }: { dataset: Array<{}> }) {
  const numOptions = getNumVar(dataset);
  const catOptions = getLowCardinality(dataset);
  const orientOptions = ["Vertical", "Horizontal"];
  const [numVar, setNumVar] = useState<string>(numOptions[0]);
  // const [catVar, setCatVar] = useState<string>(catOptions[0]);
  const [orient, setOrient] = useState<string>(orientOptions[1]);

  const boxKeys = ["min", "25%", "50%", "75%", "max"];
  const statistics = getStatistics(dataset).filter(
    (stats) => stats.column === numVar
  )[0];
  
  const boxData = statistics
    ? boxKeys.map((key) => statistics[key as keyof typeof statistics])
    : [];

  const series: ApexAxisChartSeries = [
    {
      name: "box",
      data: [
        {
          x: numVar,
          y: boxData,
        },
      ],
    },
  ];

  const options: ApexOptions = {
    ...ApexDefaultOptions,
    title: {
      text: `${numVar} BoxPlot`,
      align: "center",
    },
    plotOptions: {
      bar: {
        horizontal: orient === "Vertical" ? false : true,
        barHeight: "50%",
      },
    },
    yaxis: {
      labels: {
        rotate: orient === "Vertical" ? 0 : -75,
        offsetX: orient === "Vertical" ? 0 : -20,
        offsetY: orient === "Vertical" ? 0 : -50,
      },
    },
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-4">
        {/* <SelectBox
            label="Categorical"
            options={catOptions}
            value={catVar}
            setValue={setCatVar}
          /> */}
        <SelectBox
          label="Numerical"
          options={numOptions}
          value={numVar}
          setValue={setNumVar}
        />
        <SelectBox
          label="Orientation"
          options={orientOptions}
          value={orient}
          setValue={setOrient}
        />
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="boxPlot"
        height={420}
      />
    </div>
  );
}
