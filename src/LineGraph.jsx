import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
    y: {
      ticks: {
        callback: function (value) {
          return numeral(value).format("0a");
        },
      },
    },
  },
};

function LineGraph({ casesType = "cases" }) {
  const [chartData, setChartData] = useState([]);

  const buildChartData = (data) => {
    const chart = [];
    let lastDataPoint;

    Object.entries(data[casesType]).forEach(([date, value]) => {
      if (lastDataPoint) {
        chart.push({
          x: new Date(date),
          y: value - lastDataPoint,
        });
      }
      lastDataPoint = value;
    });

    return chart;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
      );
      const data = await res.json();

      const formattedData = buildChartData(data);
      console.log("GRAPH DATA:", formattedData); // debug
      setChartData(formattedData);
    };

    fetchData();
  }, [casesType]);

  return (
    <div style={{ height: "300px" }}>
      <Line
        data={{
          datasets: [
            {
              data: chartData,
              borderColor: "#CC1034",
              backgroundColor: "rgba(204,16,52,0.4)",
              fill: true,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default LineGraph;