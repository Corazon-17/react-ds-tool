import {
  getCatVar,
  getGroup,
  getNumVar,
  getValueByColumn,
} from "@/utils/dataset";
import { ApexDefaultOptions } from "@/utils";
import { useState } from "react";
import { CheckBox, NumberInput, SelectBox } from "@/components/inputs";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { binArray } from "@/utils/array";

export function Histogram({ dataset }: { dataset: Array<{}> }) {
  const numOptions = getNumVar(dataset);
  //   const catOptions = getCatVar(dataset);
  const [numVar, setNumVar] = useState<string>(numOptions[0]);
  //   const [catVar, setCatVar] = useState<string>(catOptions[0]);
  const [nBins, setNBins] = useState<number>(8);

  const selectedData = getValueByColumn(dataset, numVar).filter(
    (val) => val === 0 || val
  );
  const binResult = binArray(selectedData, nBins);

  const series: ApexAxisChartSeries = [
    {
      name: "",
      type: "column",
      data: binResult.value,
    },
    {
      name: "",
      type: "line",
      data: binResult.value,
    },
  ];

  const options: ApexOptions = {
    ...ApexDefaultOptions,
    chart: {
      type: "bar",
      background: "#18181b",
    },
    title: {
      text: `${numVar} Histogram`,
      align: "center",
      offsetY: 10,
      offsetX: 15,
    },
    plotOptions: {
      bar: {
        columnWidth: "100%",
      },
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      // type: "category",
      categories: binResult.label,
      tickPlacement: "between",
      decimalsInFloat: 2,
      title: {
        text: numVar,
        offsetY: 180,
      },
    },
    yaxis: {
      title: {
        text: "count",
      },
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
        {/* <SelectBox
            label="Categorical Variable"
            options={catOptions}
            value={catVar}
            setValue={setCatVar}
          /> */}
        <NumberInput
          label="Number of Bins"
          value={nBins}
          setValue={setNBins}
          min={1}
          max={20}
          withButton
        />
      </div>
      <ReactApexChart
        series={series}
        options={options}
        type="line"
        height={360}
      />
    </div>
  );
}
