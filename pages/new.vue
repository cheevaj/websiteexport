<template>
  <div class="pt-0">
    <canvas height="100px" id="myChartApp"></canvas>
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
      const ctx = document.getElementById('myChartApp').getContext('2d');
      if (this.myChartBar) {
        this.myChartBar.destroy();
      }
      const datasetDataTimeSubset = this.dataItem.slice(0, 4);
      const labels = datasetDataTimeSubset.map(({ grop }) => grop);
      const valueAll = datasetDataTimeSubset.map(({ dataall }) => dataall);
      const timeDOmin = datasetDataTimeSubset.map(({ dataall, valuemax }) => dataall - valuemax);
      const timeCAREmin = datasetDataTimeSubset.map(({ dataall, valuemaxC }) => dataall - valuemaxC);
      const percentAll = valueAll.map((value, index) => {
        if (value === 0) {
          return 100;
        } else {
          return Number((value / valueAll[index] * 100).toFixed(2));
        }
      });
      const percentTimeDo = timeDOmin.map((value, index) => {
        if (value === 0) {
          return 100;
        } else {
          return Number((value / (valueAll[index]) * 100).toFixed(2));
        }
      });
      const percentTimeCare = timeCAREmin.map((value, index) => {
        if (value === 0) {
          return 100 + '%';
        } else {
          return Number((value / (valueAll[index]) * 100).toFixed(2));
        }
      });
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Perfect',
            data: percentAll,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            type: 'bar',
            data: percentTimeDo,
            backgroundColor: 'transparent',
            borderColor: 'rgb(179, 0, 0)',
            borderWidth: 1,
          },
          {
            label: 'Time Do Tplus',
            data: percentTimeDo,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Time Care Tplus',
            data: percentTimeCare,
            backgroundColor: 'rgba(255, 206, 86, 0.8)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      }
      this.myChartBar = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          legend: {
            display: false,
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
              ctx.textBaseline = 'middle'; // Adjusted to middle for better alignment
              chartData.datasets.forEach((dataset, i) => {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index];
                  if (data !== 0) {
                    ctx.fillText(data, bar._model.x, bar._model.y); // Adjusted yPos for better positioning
                  }
                });
              });
            },
          },
          scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
        },
      });
    },
  },
  data() {
    return {
      myChartApp: null,
      dataItem: [
        { dataall: 100, nameValueall: 'D1', grop: 'ການກາກນ່ເນຮ່ກ', valuemax: 10, nameValuemaxC: 'DA1', valuemaxC: 20, valuemin: 80, valueminall: 50 },
        { dataall: 200, nameValueall: 'D2', grop: 'DATA', valuemax: 100, nameValuemaxC: 'DA2', valuemaxC: 100, valuemin: 50, valueminall: 200 },
        { dataall: 80, nameValueall: 'S1', grop: 'SMS', valuemax: 40, nameValuemaxC: 'SDA1', valuemaxC: 50, valuemin: 30, valueminall: 70 },
        { dataall: 90, nameValueall: 'VA1', grop: 'VAS', valuemax: 60, nameValuemaxC: 'VDA1', valuemaxC: 80, valuemin: 30, valueminall: 40 },
      ],
    };
  },

};
</script>
