import {
    getCatVar,
    getGroup,
    getNumVar,
    getValueByColumn,
  } from "@/utils/dataset";
  import { ApexDefaultOptions } from "@/utils";
  import { useState } from "react";
  import Chart from "react-apexcharts";
  import { ApexOptions } from "apexcharts";
  import { SelectBox } from "@/components/inputs";
  
  export function LinePlot({ dataset }: { dataset: Array<{}> }) {
    const numOptions = getNumVar(dataset);
    //   const catOptions = getCatVar(dataset);
  
    const [varX, setVarX] = useState<string>(numOptions[0]);
    const [varY, setVarY] = useState<string>(numOptions[0]);
    //   const [catVar, setCatVar] = useState<string>(catOptions[0]);
  
    const selectedX = getValueByColumn(dataset, varX);
    const selectedY = getValueByColumn(dataset, varY);
  
    const combined = selectedX.map((x, i) => ({x: x, y: selectedY[i]}));
    const sortedPair = combined.sort((a, b) => a.x - b.x)
    const scatterData = sortedPair.map(({x, y}) => [x, y])
  
    const series: ApexAxisChartSeries = [
      {
        name: "",
        data: scatterData,
      },
    ];
  
    const options: ApexOptions = {
      ...ApexDefaultOptions,
      title: {
        text: `${varY} by ${varX}`,
        align: "center",
      },
      stroke: {
        width: 3
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
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <Chart options={options} series={series} type="line" height={360} />
      </div>
    );
  }
  