<template>
  <div class="pt-0">
    <canvas height="100px" id="myChartBar"></canvas>
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
      // Perform element-wise subtraction to calculate value1 and value2
      console.log(this.datasetdatatime)
      const names = this.datasetdatatime.map(item => item.name);
      const valueAll = this.datasetdatatime.map(item => item.valueminall);
      const valueMaxD = this.datasetdatatime.map(item => item.valuemax);
      const valueMaxC = this.datasetdatatime.map(item => item.valuemaxC);
      this.myChartBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: names,
          datasets: [
            {
              data: valueAll,
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              data: valueMaxD,
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              data: valueMaxC,
              backgroundColor: 'rgba(255, 206, 86, 0.8)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            }],
          },
          // Add afterDraw hook to draw numbers on top of bars
          // This function will be called after the chart is drawn
          // It will draw the values on top of each bar
          afterDraw: (chart) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(2); // Get the meta for the 'Vall' dataset (index 2)
            meta.data.forEach((bar, index) => {
              const data = chart.data.datasets[2].data[index]; // Get the data from the 'Vall' dataset
              const model = bar._model;
              ctx.save();
              ctx.fillStyle = 'black'; // Color of the text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              ctx.fillText(data, model.x, model.y - 5); // Draw the value on top of the bar
              ctx.restore();
            });
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
