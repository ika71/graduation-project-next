"use client";

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

interface Props {
  evalItemAvgList: EvalItemAvg[];
}

interface EvalItemAvg {
  id: number;
  name: string;
  avg: number | null;
}

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const DeviceDetailChart = (props: Props) => {
  const { evalItemAvgList } = props;

  const data = {
    type: "radar",
    labels: evalItemAvgList.map((evalItemAvg) => evalItemAvg.name),
    datasets: [
      {
        label: "평점",
        data: evalItemAvgList.map((evalItemAvg) => evalItemAvg.avg),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        min: 0,
        max: 5,
      },
    ],
  };
  const options = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5,
      },
    },
  };
  if (evalItemAvgList.length < 3) return <></>;
  return <Radar data={data} options={options} />;
};

export default DeviceDetailChart;
