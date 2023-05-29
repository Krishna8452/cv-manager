import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
Chart.register(CategoryScale);


function LegendChart({ dataList }) {
  console.log(dataList,'yes')
  const chartRef = useRef(null);
  const applicants =dataList
  ;
  console.log(applicants,"  ds")
  useEffect(() => {
       
    const countByStatus = applicants.reduce(
      (count, dataList) => {
        count[dataList.status] += 1;
        return count;
      },
      { shortListed: 0, first_interview: 0, second_interview: 0, pending: 0, hired: 0 }
    );

    const chartData = {
      labels: ["shortListed", "first_interview","second_interview","pending","hired"],
      datasets: [
        {
          data: [countByStatus.shortListed, countByStatus.first_interview, countByStatus.second_interview, countByStatus.pending, countByStatus.hired],
          backgroundColor: ["#f44336", "#66f2e4","#bc62e3","#5beb6c","#f55698"],
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
