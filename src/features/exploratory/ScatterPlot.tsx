import {
  getCatVar,
  getGroup,
  getNumVar,
  getValueByColumn,
} from "@/utils/dataset";
import { ApexDefaultOptions } from "@/utils";
import { binArray } from "@/utils/array";
import { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { NumberInput, SelectBox } from "@/components/inputs";

export function ScatterPlot({ dataset }: { dataset: Array<{}> }) {
  const numOptions = getNumVar(dataset);
  //   const catOptions = getCatVar(dataset);

  const [markerSize, setMarkerSize] = useState<number>(4);
  const [varX, setVarX] = useState<string>(numOptions[0]);
  const [varY, setVarY] = useState<string>(numOptions[0]);
  //   const [catVar, setCatVar] = useState<string>(catOptions[0]);

  const selectedX = getValueByColumn(dataset, varX);
  const selectedY = getValueByColumn(dataset, varY);
  const scatterData = selectedX.map((x, i) => [x, selectedY[i]]);

  const series: ApexAxisChartSeries = [
    {
      name: "",
      data: scatterData,
    },
  ];

  /** 
   * Added some options to improve performance.
   * Reference: https://github.com/apexcharts/apexcharts.js/issues/214#issuecomment-1013146142
   */
  const options: ApexOptions = {
    ...ApexDefaultOptions,
    title: {
      text: `Scatterplot of ${varX} vs ${varY}`,
      align: "center",
    },
    chart: {
      animations: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: "straight"
    },
    xaxis: {
      decimalsInFloat: 2,
      title: {
        text: varX,
        offsetY: 85,
      },
      tickAmount: 10,
      labels: {
        formatter: (val: string) => parseFloat(val).toFixed(2),
      },
    },
    yaxis: {
      title: {
        text: varY,
      },
    },
  };

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-4">
        <SelectBox
          label="X Variable"
          options={numOptions}
          value={varX}
          setValue={setVarX}
        />
        <SelectBox
          label="Y Variable"
          options={numOptions}
          value={varY}
          setValue={setVarY}
        />
        <NumberInput
          label="Marker Size"
          value={markerSize}
          setValue={setMarkerSize}
          min={0}
          max={10}
          withButton
        />
      </div>
      <Chart
        options={{ ...options, markers: { size: markerSize } }}
        series={series}
        type="scatter"
        height={420}
      />
    </div>
  );
}
