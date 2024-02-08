// MyChartLine.vue
<template>
  <div>
    <canvas height="105px" ref="chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    data: Array,
    labels: Array,
  },
  data() {
    return {
      chart: null,
      chartData: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        // Set your chart options here
      },
    };
  },
  watch: {
    data(newData) {
      this.updateChartData(newData);
    },
  },
  methods: {
    initializeChart() {
      const ctx = this.$refs.chart.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.options,
      });
    },
    updateChartData(newData) {
      this.chart.data.datasets[0].data = newData;
      this.chart.update();
    },
  },
  mounted() {
    this.initializeChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
