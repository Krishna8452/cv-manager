import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.register(CategoryScale);

const applicants = [
  { name: "John", status: "pending" },
  { name: "Jane", status: "approved" },
  { name: "Mike", status: "approved" },
  { name: "Sarah", status: "pending" },
  { name: "Tom", status: "approved" },
];

function LegendChart({ dataList }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const countByStatus = dataList.reduce(
      (count, applicant) => {
        count[applicant.status] += 1;
        return count;
      },
      { pending: 0, hired: 0 }
    );

    const chartData = {
      labels: ["Pending", "Approved"],
      datasets: [
        {
          data: [countByStatus.pending, countByStatus.hired],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    const chart = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
}

export default LegendChart;
