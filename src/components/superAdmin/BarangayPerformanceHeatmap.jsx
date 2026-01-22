"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BarangayHeatmap({ rows }) {
  const columns = [
    "Activity %",
    "Compliance %",
    "Recency (freshness)",
    "BNS Assigned",
  ];

  // Convert data to Apex Heatmap series format
  const series = rows.map((r) => ({
    name: r.barangay,
    data: [
      {
        x: "Activity %",
        y: r.activityPct,
        meta: `${r.last30Count} task(s) in last 30d`,
      },
      {
        x: "Compliance %",
        y: r.compliancePct,
        meta: `${r.completedTasks}/${r.totalTasks} completed`,
      },
      {
        x: "Recency (freshness)",
        y: r.recencyScore,
        meta: `${r.recencyDays} day(s) ago`,
      },
      {
        x: "BNS Assigned",
        y: r.bnsAssigned * 10,
        meta: `${r.bnsAssigned} BNS`,
      }, // scaled so it shows well
    ],
  }));

  const options = {
    chart: { toolbar: { show: true } },
    dataLabels: { enabled: false },
    xaxis: { type: "category", categories: columns },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 20, color: "#e6f4ea", name: "Very Low" }, // light green
            { from: 21, to: 40, color: "#b7e1cd", name: "Low" }, // soft green
            { from: 41, to: 60, color: "#80cfa9", name: "Medium" }, // medium green
            { from: 61, to: 80, color: "#4cb684", name: "High" }, // dark green
            { from: 81, to: 100, color: "#1b5e20", name: "Very High" }, // very dark green
          ],
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (_, opts) {
          const point =
            opts?.w?.config?.series?.[opts.seriesIndex]?.data?.[
              opts.dataPointIndex
            ];
          return point?.meta || "";
        },
      },
    },
    legend: { position: "bottom" },
    title: { text: "Barangay Performance Heatmap", align: "left" },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        type="heatmap"
        height={520}
        series={series}
        options={options}
      />
    </div>
  );
}
