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
      const valueAll = datasetDataTimeSubset.map(item => item.dataall);
      // const valueMaxD = datasetDataTimeSubset.map(item => item.valuemax);
      // const valueMaxC = datasetDataTimeSubset.map(item => item.valuemaxC);

      // Calculate timeDOmin and timeCAREmin for each item
      const timeDOmin = datasetDataTimeSubset.map(item => item.dataall - item.valuemax);
      const timeCAREmin = datasetDataTimeSubset.map(item => item.dataall - item.valuemaxC);
      const percentAll = valueAll.map((value, index) => {
        if (value === 0) {
          return 100; // If timeCAREmin is 0, return 100
        } else {
          return Number((value / valueAll[index] * 100).toFixed(2)); // Calculate percentage for each item and round to 2 decimal places
        }
      });
      console.log(percentAll)

      const percentTimeDo = timeDOmin.map((value, index) => {
        if (value === 0) {
          return 100; // If timeDOmin is 0, return 100
        } else {
          return Number((value / (valueAll[index]) * 100).toFixed(2)); // Calculate percentage for each item
        }
      });
      const percentTimeCare = timeCAREmin.map((value, index) => {
        if (value === 0) {
          return 100 + '%'; // If timeCAREmin is 0, return 100
        } else {
          return Number((value / (valueAll[index]) * 100).toFixed(2)); // Calculate percentage for each item
        }
      });
      const chartData = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Time Do Tplus',
            data: percentTimeCare,
            backgroundColor: 'transparent', // Set the background color to transparent for line data
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Time Do Tplus',
            data: percentTimeDo,
            backgroundColor: 'transparent', // Set the background color to transparent for line data
            borderColor: '#000',
            borderWidth: 1,
          },
          {
            label: 'Perfect',
            data: percentTimeCare,
            backgroundColor: 'rgba(54, 162, 235, 1)', // Set transparent background for values less than 50
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Time Care Tplus',
            data: percentTimeDo,
            backgroundColor: 'rgba(255, 206, 86, 1)', // Set the background color to transparent for line data
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
          {
            type: 'line',
            label: 'Line Dataset',
            data: percentAll,
            backgroundColor: 'transparent', // Set the background color to transparent for line data
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
        datasetData: [{ data: valueAll }],
      };
      this.myChartBar = new Chart(ctx, {
        type: 'bar', // You can change the default chart type here if needed
        data: chartData,
        options: {
          legend: { display: false },
          tooltips: { mode: 'index', intersect: false },
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
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
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
        { dataall: 100, nameValueall: 'D1', grop: 'DATA', valuemax: 10, nameValuemaxC: 'DA1', valuemaxC: 20, valuemin: 80, valueminall: 50 },
        { dataall: 200, nameValueall: 'D2', grop: 'DATA', valuemax: 100, nameValuemaxC: 'DA2', valuemaxC: 100, valuemin: 50, valueminall: 200 },
        { dataall: 80, nameValueall: 'S1', grop: 'SMS', valuemax: 40, nameValuemaxC: 'SDA1', valuemaxC: 50, valuemin: 30, valueminall: 70 },
        { dataall: 90, nameValueall: 'VA1', grop: 'VAS', valuemax: 60, nameValuemaxC: 'VDA1', valuemaxC: 80, valuemin: 30, valueminall: 40 },
      ],
    };
  },
};
</script>
