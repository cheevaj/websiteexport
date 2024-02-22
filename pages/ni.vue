<template>
  <div class="mt-2 pt-0 custom-font">
    <canvas height="100px" id="myChartLine"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    desserts: Array,
  },
  data() {
    return {
      datasetdatatime: [],
      myChartLine: null,
      i: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //   const index = {};
      //   const queuedDates = [];
      //   this.desserts.forEach(dessert => {
      //     const queuedDate = dessert.QUEUED_DATE.split(' ')[0]; // Extract date part only
      //     queuedDates.push(queuedDate); // Collecting dates
      //     const monthYear = queuedDate.split('-').slice(1).join('-'); // Getting month and year
      //     if (!index[monthYear]) {
      //       index[monthYear] = [];
      //     }
      //     index[monthYear].push(dessert);
      //   });

      //   // Get unique dates
      //   const uniqueDates = [...new Set(queuedDates)];

      //   const indexes = [];

      //   uniqueDates.forEach(date => {
      //     const firstIndex = this.desserts.findIndex(dessert => dessert.QUEUED_DATE.startsWith(date));
      //     indexes.push(firstIndex);
      //   });
      //   const Data = [];
      //   if (indexes.length >= 14) {
      //     for (let i = 0; i < indexes.length; i += 7) {
      //       const startIndex = indexes[i];
      //       const endIndex = (i + 7 < indexes.length) ? indexes[i + 7] - 1 : this.desserts.length - 1;
      //       const range = `${startIndex}-${endIndex}`;
      //       const datAll = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), '');
      //       const dataMaxD = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 20);
      //       const dataMaxC = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 5);
      //       Data.push({
      //         nameValueall: range,
      //         valueAll: datAll,
      //         valuemaxD: dataMaxD,
      //         valueminD: (datAll - dataMaxD),
      //         valuemaxC: dataMaxC,
      //         valueminC: (datAll - dataMaxC),
      //       });
      //     }
      //   } else {
      //     indexes.forEach((startIndex, i) => {
      //       const endIndex = (i < indexes.length - 1) ? indexes[i + 1] - 1 : this.desserts.length - 1;
      //       const range = `${startIndex}-${endIndex}`;
      //       const datAll = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), '');
      //       const dataMaxD = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 20);
      //       const dataMaxC = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 5);
      //       Data.push({
      //         nameValueall: range,
      //         valueAll: datAll,
      //         valuemaxD: dataMaxD,
      //         valueminD: (datAll - dataMaxD),
      //         valuemaxC: dataMaxC,
      //         valueminC: (datAll - dataMaxC),
      //       });
      //     });
      //   }
      //   this.datasetdatatime = Data;
      //   this.createChart();

      // },
      // calculateDatamin(data, threshold) {
      //   // Assuming "SERVICE_GROUP" is the key you want to filter on
      //   return data.reduce((sum, entry) => {
      //     if (threshold === 20) {
      //       if (entry.TIME_DO_TPLUS > threshold) {
      //         return sum + 1;
      //       }
      //     }
      //     else if (threshold === 5) {
      //       if (entry.TIME_CARE_TPLUS > threshold) {
      //         return sum + 1;
      //       }
      //     }
      //     else {
      //       return sum + 1
      //     }
      //     return sum;
      //   }, 0);
      // },
      // createChart() {
      //   const ctx = document.getElementById('myChartLine').getContext('2d');
      //   if (this.myChartLine) {
      //     this.myChartLine.destroy();
      //   }
      //   const labels = this.datasetdatatime.map(({ nameValueall }) => nameValueall);
      //   const valueAll = this.datasetdatatime.map(item => item.valueAll);

      //   const timeDOmin = this.datasetdatatime.map(item => item.valueminD);
      //   const timeCAREmin = this.datasetdatatime.map(item => item.valueminC);
      //   const timeDOmax = this.datasetdatatime.map(item => item.valuemaxD);
      //   const timeCAREmax = this.datasetdatatime.map(item => item.valuemaxC);

      //   const percentAll = valueAll.map((value, index) => {
      //     if (value === 0) {
      //       return 100;
      //     } else {
      //       return Number((value / valueAll[index] * 100).toFixed(2));
      //     }
      //   });

      //   const percentTimeDo = timeDOmin.map((value, index) => {
      //     if (value === 0) {
      //       return 100;
      //     } else {
      //       return Number((value / valueAll[index] * 100).toFixed(2));
      //     }
      //   });

      //   const percentTimeCare = timeCAREmin.map((value, index) => {
      //     if (value === 0) {
      //       return 100;
      //     } else {
      //       return Number((value / valueAll[index] * 100).toFixed(2));
      //     }
      //   });

      //   const chartData = {
      //     labels,
      //     datasets: [
      //       {
      //         type: 'line',
      //         data: timeDOmax,
      //         backgroundColor: 'transparent',
      //         borderColor: 'rgb(179, 0, 0)',
      //         borderWidth: 1,
      //       },
      //       {
      //         type: 'line',
      //         data: timeCAREmax,
      //         backgroundColor: 'transparent',
      //         borderColor: 'rgb(153, 0, 0)',
      //         borderWidth: 1,
      //       },
      //       {
      //         type: 'line',
      //         data: percentTimeDo,
      //         backgroundColor: 'transparent',
      //         borderColor: 'rgb(51, 31, 0)',
      //         borderWidth: 1,
      //       },
      //       {
      //         type: 'line',
      //         data: percentTimeCare,
      //         backgroundColor: 'transparent',
      //         borderColor: 'rgb(15, 61, 61)',
      //         borderWidth: 1,
      //       },
      //       {
      //         data: percentTimeDo,
      //         backgroundColor: 'rgba(255, 206, 86, 0.8)',
      //         borderColor: 'rgba(255, 206, 86, 1)',
      //         borderWidth: 1,
      //       },
      //       {
      //         label: 'Perfect',
      //         data: percentTimeCare,
      //         backgroundColor: 'rgba(75, 192, 192, 0.8)',
      //         borderColor: 'rgba(75, 192, 192, 1)',
      //         borderWidth: 1,
      //       },
      //       {
      //         type: 'line',
      //         label: 'Line Dataset',
      //         data: percentAll,
      //         backgroundColor: 'transparent',
      //         borderColor: 'rgba(54, 162, 235, 1)',
      //       },
      //     ],
      //     datasetData: [{
      //       data: percentTimeDo + '|' + percentTimeCare,
      //     }]
      //   };
      //   this.myChartLine = new Chart(ctx, {
      //     type: 'bar',
      //     data: chartData,
      //     options: {
      //       legend: { display: false },
      //       tooltips: { mode: 'index', intersect: false },
      //       animation: {
      //         duration: 1,
      //         onComplete: () => {
      //           const chartInstance = this.myChartLine;
      //           const ctx = chartInstance.ctx;
      //           ctx.font = Chart.helpers.fontString(
      //             Chart.defaults.global.defaultFontSize,
      //             Chart.defaults.global.defaultFontStyle,
      //             Chart.defaults.global.defaultFontFamily
      //           );
      //           ctx.textAlign = 'center';
      //           ctx.textBaseline = 'middle'; // Adjusted to middle for better alignment

      //           if (this.i) {
      //             chartInstance.data.datasets.forEach((dataset, i) => {
      //               const meta = chartInstance.getDatasetMeta(i);
      //               meta.data.forEach((bar, index) => {
      //                 const data = dataset.data[index];
      //                 if (data !== 0) {
      //                   ctx.fillText(data, bar._model.x, bar._model.y); // Adjusted positioning
      //                 }
      //               });
      //             });
      //           }
      //           else {
      //             chartData.datasetData.forEach((dataset, i) => {
      //               const meta = chartInstance.controller.getDatasetMeta(i);
      //               meta.data.forEach((bar, index) => {
      //                 const data = dataset.data[index];
      //                 ctx.fillText(data, bar._model.x, bar._model.y + 4);
      //               });
      //             });
      //           }
      //         },
      //       },
      //       scales: { xAxes: [{}], yAxes: [{ ticks: { beginAtZero: true } }] },
      //     },
      //   });


      const ctx = document.getElementById('myChart').getContext('2d');
      // Clear existing chart
      if (this.myChart) {
        this.myChart.destroy();
      }
      const colorBK = [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(25, 159, 64, 0.8)',
        'rgba(254, 19, 64, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(25, 159, 64, 0.8)',
        'rgba(254, 19, 64, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(25, 159, 64, 0.8)',
      ];
      const colorBD = [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(25, 159, 64, 1)',
        'rgba(254, 19, 64, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(25, 159, 64, 1)',
        'rgba(254, 19, 64, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(25, 159, 64, 1)',
      ];
      // let Data = [];
      // if (this.tabledisplay === 'Root Cause' && this.selectedItem === 0) {
      const valueData = this.dataset.map(item => item.valueData);
      const valueSms = this.dataset.map(item => item.valueSms);
      const valueVas = this.dataset.map(item => item.valueVas);
      const valueVoice = this.dataset.map(item => item.valueVoice);
      const Data = [
        {
          label: 'DATA',
          data: valueData,
          backgroundColor: colorBK[0],
          borderColor: colorBD[0],
          borderWidth: 1,
        },
        {
          label: 'SMS',
          data: valueSms,
          backgroundColor: colorBK[0],
          borderColor: colorBD[0],
          borderWidth: 1,
        },
        {
          label: 'VAS',
          data: valueVas,
          backgroundColor: colorBK[0],
          borderColor: colorBD[0],
          borderWidth: 1,
        },
        {
          label: 'VOICE',
          data: valueVoice,
          backgroundColor: colorBK[0],
          borderColor: colorBD[0],
          borderWidth: 1,
        },
      ];
      //     return Data;
      // }
      const chartData = {
        labels: this.names,
        datasets: (this.tabledisplay === 'Root Cause' && this.selectedItem === '// 0') ? Data : [{
          data: this.value, // (this.tabledisplay === 'Root Cause Report' && this.selectedItem === 0) ? Data :
          backgroundColor: colorBK,
          borderColor: colorBD,
          borderWidth: 1,
        }],
        datasetData: [{
          data: this.value,
        }]
      }
      // ----- Gracph value
      this.myChart = new Chart(ctx, {
        type: this.graphform,
        data: chartData, // -------- data of graph
        options: {
          legend: {
            display: this.graphform === '_',
          },
          hover: {
            animationDuration: 0
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          animation: {
            duration: 1,
            onComplete: () => {
              const chartInstance = this.myChart;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              if (this.graphform !== 'pie') {
                if (this.tabledisplay === 'Root Cause' && this.selectedItem === 0) {
                  chartData.datasetData.forEach((dataset, i) => {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                      const data = dataset.data[index];
                      ctx.fillText(data, bar._model.x, bar._model.y + 4);
                    });
                  });
                }
                else {
                  chartData.datasets.forEach((dataset, i) => {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                      const data = dataset.data[index];
                      ctx.fillText(data, bar._model.x, bar._model.y + 4);
                    });
                  });
                }
              }
            }
          },
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            }],
            xAxes: [{
              stacked: true,
              gridLines: {
                display: true
              },
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    },

  },
};
</script>
<style>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
  /* You can specify additional styles here */
}
</style>
