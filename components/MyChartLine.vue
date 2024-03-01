<template>
  <div class="pt-0">
    <canvas height="95px" id="myChartBar"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('myChartBar').getContext('2d');
      if (this.myChartBar) {
        this.myChartBar.destroy();
      }
      const datasetDataTimeSubset = this.datasetdatatime.slice(0, 4);
      const names = datasetDataTimeSubset.map(item => item.name);
      const valueAll = datasetDataTimeSubset.map(item => item.valueminall);
      const valueMaxD = datasetDataTimeSubset.map(item => item.valuemax);
      const valueMaxC = datasetDataTimeSubset.map(item => item.valuemaxC);
      const sumValue = datasetDataTimeSubset.map(item => item.valueall);
      const chartData =
      {
        labels: names,
        datasets: [
          {
            label: 'Perfect',
            data: valueAll,
            backgroundColor: '#ffff00',
            borderColor: 'rgb(230, 230, 1)',
            borderWidth: 1,
          },
          {
            label: 'Time Do Tplus',
            data: valueMaxD,
            backgroundColor: 'rgb(51, 51, 51,0.8)',
            borderColor: 'rgb(51, 51, 51,1)',
            borderWidth: 1,
          },
          {
            label: 'Time Care Tplus',
            data: valueMaxC,
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
        datasetData: [{
          data: sumValue,
        }]
      }
      this.myChartBar = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          legend: {
            display: true,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          animation: {
            duration: 1,
            onComplete: () => {
              const chartInstance = this.myChartBar;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              chartData.datasets.forEach((dataset, i) => {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index];
                  if (data !== 0) {
                    ctx.font = 'bold 14px Arial'; // Set the font size here
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  }
                });
              });
            },
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Noto Sans Lao', // Set font family for x-axis labels
              },
            }], yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Noto Sans Lao', // Set font family for y-axis labels
              }
            }]
          },
        },
      });
    },
  },
  props: {
    datasetdatatime: Array,
  },
  data() {
    return {
      myChartBar: null,
    };
  },
};
</script>