<template>
  <div class="mt-2 pt-0 custom-font">
    <canvas height="95px" id="myChartLine"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: {
    desserts: Array,
    mount: Boolean,
  },
  data() {
    return {
      dataTable: [],
      datasetdatatime: [],
      myChartLine: null,
      itemTable: {},
      Data: [],
      showDate: false,
    };
  },
  mounted() {
    this.getData();
    this.$emit('chartBarData', this.dataTable, this.itemTable);
    if (this.showDate) {
      setInterval(() => {
        console.log('hello');
      }, 100);
    }
  },
  methods: {
    getData() {
      // console.log(this.mount)
      if (!Array.isArray(this.desserts)) {
        console.error('Desserts data is not an array.');
        return;
      }
      const index = {};
      const queuedDates = [];
      this.desserts.forEach(dessert => {
        if (!dessert || !dessert.QUEUED_DATE) {
          console.error('Invalid dessert data:', dessert);
          return; // Skip processing this dessert
        }
        const queuedDate = dessert.QUEUED_DATE.split(' ')[0]; // Extract date part only
        queuedDates.push(queuedDate); // Collecting dates
        const monthYear = queuedDate.split('-').slice(1).join('-'); // Getting month and year
        if (!index[monthYear]) {
          index[monthYear] = [];
        }
        index[monthYear].push(dessert);
      });

      // Get unique dates
      const uniqueDates = [...new Set(queuedDates)];

      const indexes = [];
      uniqueDates.forEach(date => {
        const firstIndex = this.desserts.findIndex(dessert => dessert.QUEUED_DATE.startsWith(date));
        indexes.push(firstIndex);
      });
      const Data = [];

      const uniqueMonthsYears = new Set();
      queuedDates.forEach(date => {
        const [day, month, year] = date.split('-');

        uniqueMonthsYears.add(`${month}-${year}-${day}`);
      });

      const numberOfUniqueMonths = uniqueMonthsYears.size;
      const daysInMonths = [];
      uniqueMonthsYears.forEach(monthYear => {
        const [month, year] = monthYear.split('-');
        const daysInMonth = new Date(year, month, 0).getDate();
        daysInMonths.push(daysInMonth);
      });
      if ((numberOfUniqueMonths >= 2) && indexes.length >= 58) {
        for (let i = 0; i < indexes.length; i++) {
          const startIndex = indexes[i];
          const daysInMonth = daysInMonths[i % numberOfUniqueMonths]; // Get the number of days in the current month
          const endIndex = (i + daysInMonth < indexes.length) ? indexes[i + daysInMonth] - 1 : this.desserts.length - 1;
          const queuedStart = this.desserts[startIndex].QUEUED_DATE.split(' ')[0]; // Extract start date part only
          const queuedEnd = this.desserts[endIndex].QUEUED_DATE.split(' ')[0]; // Extract end date part only
          const range = `${queuedStart}|${queuedEnd}`;
          const datAll = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), '');
          const dataMaxD = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 20);
          const dataMaxC = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 5);
          Data.push({
            nameValueall: range,
            valueAll: datAll,
            valuemaxD: dataMaxD,
            valueminD: (datAll - dataMaxD),
            valuemaxC: dataMaxC,
            valueminC: (datAll - dataMaxC),
          });
          i += daysInMonth - 1; // Increment i by the number of days in the current month
        }
      }
      else if (indexes.length > 7) {
        for (let i = 0; i < indexes.length; i += 7) {
          const startIndex = indexes[i];
          const endIndex = (i + 7 < indexes.length) ? indexes[i + 7] - 1 : this.desserts.length - 1;
          const queuedStart = this.desserts[startIndex].QUEUED_DATE.split(' ')[0]; // Extract start date part only
          const queuedEnd = this.desserts[endIndex].QUEUED_DATE.split(' ')[0]; // Extract end date part only
          // console.log(queuedStart, queuedEnd);
          const range = `${queuedStart}|${queuedEnd}`;
          const datAll = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), '');
          const dataMaxD = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 20);
          const dataMaxC = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 5);
          Data.push({
            nameValueall: range,
            valueAll: datAll,
            valuemaxD: dataMaxD,
            valueminD: (datAll - dataMaxD),
            valuemaxC: dataMaxC,
            valueminC: (datAll - dataMaxC),
          });
        }
        // return indexes;
      }
      else {
        indexes.forEach((startIndex, i) => {
          const endIndex = (i < indexes.length - 1) ? indexes[i + 1] - 1 : this.desserts.length - 1;
          const queuedStart = this.desserts[startIndex].QUEUED_DATE.split(' ')[0]; // Extract start date part only
          // const queuedEnd = this.desserts[endIndex].QUEUED_DATE.split(' ')[0]; // Extract end date part only
          // console.log(queuedStart);
          const range = `${queuedStart}`;
          const datAll = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), '');
          const dataMaxD = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 20);
          const dataMaxC = this.calculateDatamin(this.desserts.slice(startIndex, endIndex + 1), 5);
          Data.push({
            nameValueall: range,
            valueAll: datAll,
            valuemaxD: dataMaxD,
            valueminD: (datAll - dataMaxD),
            valuemaxC: dataMaxC,
            valueminC: (datAll - dataMaxC),
          });
        });
      }

      this.datasetdatatime = Data;
      const percentMinC = Data.map((item) => {
        if (item.valueAll === 0) {
          return 100;
        } else {
          return Number((item.valueminC / item.valueAll * 100).toFixed(2));
        }
      });
      const percentMinD = Data.map((item) => {
        if (item.valueAll === 0) {
          return 100;
        } else {
          return Number((item.valueminD / item.valueAll * 100).toFixed(2));
        }
      });
      this.dataTable = Data.map((item, index) => {
        const targetC = percentMinC[index] >= 99.5;
        const targetD = percentMinD[index] >= 99.5;
        return {
          nameValueall: item.nameValueall,
          valueAll: item.valueAll,
          valuemaxD: item.valuemaxD,
          valueminD: item.valueminD,
          valuemaxC: item.valuemaxC,
          valueminC: item.valueminC,
          percentMinC: percentMinC[index] + '%',
          percentMinD: percentMinD[index] + '%',
          targetC,
          targetD,

        };
      });
      const valueAll = this.datasetdatatime.reduce((acc, item) => acc + item.valueAll, 0);
      const timeDOmin = this.datasetdatatime.reduce((acc, item) => acc + item.valueminD, 0);
      const timeCAREmin = this.datasetdatatime.reduce((acc, item) => acc + item.valueminC, 0);
      const timeDOmax = this.datasetdatatime.reduce((acc, item) => acc + item.valuemaxD, 0);
      const timeCAREmax = this.datasetdatatime.reduce((acc, item) => acc + item.valuemaxC, 0);
      // const percentD = this.dataTable.reduce((acc, item) => acc + item.percentMinD, 0) / this.dataTable.length;
      // const percentC = this.dataTable.reduce((acc, item) => acc + item.percentMinC, 0) / this.dataTable.length;

      this.itemTable = {
        allValueAll: valueAll,
        allTimeDOmin: timeDOmin,
        allTimeDOmax: timeDOmax,
        allTimeCAREmin: timeCAREmin,
        allTimeCAREmax: timeCAREmax,
        // percentMinC: percentC,
        // percentMinD: percentD,
      };
      this.createChart(indexes);
      this.createChart(indexes);
    },
    calculateDatamin(data, threshold) {
      // Assuming "SERVICE_GROUP" is the key you want to filter on
      return data.reduce((sum, entry) => {
        if (threshold === 20) {
          if (entry.TIME_DO_TPLUS > threshold) {
            return sum + 1;
          }
        }
        else if (threshold === 5) {
          if (entry.TIME_CARE_TPLUS > threshold) {
            return sum + 1;
          }
        }
        else {
          return sum + 1
        }
        return sum;
      }, 0);
    },
    createChart(indexes) {
      const ctx = document.getElementById('myChartLine').getContext('2d');
      if (this.myChartLine) {
        this.myChartLine.destroy();
      }
      const labels = this.datasetdatatime.map(({ nameValueall }) => nameValueall);
      const valueAll = this.datasetdatatime.map(item => item.valueAll);
      // this.Data = valueAll;
      // console.log(this.Data)
      const timeDOmin = this.datasetdatatime.map(item => item.valueminD);
      const timeCAREmin = this.datasetdatatime.map(item => item.valueminC);
      const timeDOmax = this.datasetdatatime.map(item => item.valuemaxD);
      const timeCAREmax = this.datasetdatatime.map(item => item.valuemaxC);
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
          return Number((value / valueAll[index] * 100).toFixed(2));
        }
      });
      const percentTimeDoMax = timeDOmax.map((value, index) => {
        if (value === 0) {
          return 0;
        } else {
          return Number((value / valueAll[index] * 100).toFixed(2));
        }
      });
      const percentTimeCareMax = timeCAREmax.map((value, index) => {
        if (value === 0) {
          return 0;
        } else {
          return Number((value / valueAll[index] * 100).toFixed(2));
        }
      });
      const percentTimeCare = timeCAREmin.map((value, index) => {
        if (value === 0) {
          return 100;
        } else {
          return Number((value / valueAll[index] * 100).toFixed(2));
        }
      });
      const percent = [];
      for (let i = 0; i < percentTimeDo.length; i++) {
        percent.push(`${percentTimeDo[i]}%|${percentTimeCare[i]}%`); // Concatenate with "|"
      }
      this.Data = percent;

      const chartData = {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Time Care >5min',
            data: percentTimeCareMax,
            backgroundColor: 'transparent',
            borderColor: 'rgb(255, 51, 0)',
            borderWidth: 2,
          },
          {
            type: 'line',
            label: 'Time Care ≤5min',
            data: percentTimeCare,
            backgroundColor: 'transparent',
            borderColor: 'rgb(255, 51, 153)',
          },
          {
            type: 'bar',
            label: '(%) of ≤5min',
            data: percentTimeCare,
            backgroundColor: 'rgb(51, 51, 51,0.8)',
            borderColor: 'rgb(51, 51, 51,1)',
          },
          {
            type: 'line',
            label: 'Time Do >20min',
            data: percentTimeDoMax,
            backgroundColor: 'transparent',
            borderColor: 'rgb(0, 204, 0)',
          },

          {
            label: 'Time Do ≤20min',
            type: 'line',
            data: percentTimeDo,
            backgroundColor: 'transparent',
            borderColor: 'rgb(0, 0, 0,1)',
            borderWidth: 2,
          },
          {
            type: 'bar',
            label: '(%) of ≤20min',
            data: percentTimeDo,
            backgroundColor: 'rgb(255, 255, 0,0.8)',
            borderColor: 'rgb(230, 230, 0)',
          },

          {
            type: 'line',
            label: 'Target',
            data: percentAll,
            backgroundColor: indexes.length === 1 ? 'rgba(26, 117, 255, 0.8)' : 'transparent',
            borderColor: 'rgba(26, 117, 255, 1)',
            borderWidth: 3.5,
          },
        ],
      };

      this.myChartLine = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          legend: {
            display: true, labels: {
              // padding: 14,
              fontSize: 12,
              fontColor: '#000',
              fontFamily: 'Arial',
              fontStyle: 'bold', // Apply bold style
            },
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const datasetLabel = dataset.label || '';
                const value = tooltipItem.yLabel;
                if (dataset.borderColor === 'rgb(255, 51, 0)' || dataset.borderColor === 'rgb(0, 204, 0)') {
                  return datasetLabel + ': ' + value + '%';
                } else {
                  return datasetLabel + ': ' + value + '%';
                }
              }
            }
          },
          animation: {
            duration: 1,
            onComplete: () => {
              const chartInstance = this.myChartLine;
              const ctx = chartInstance.ctx;
              ctx.font = Chart.helpers.fontString(
                Chart.defaults.global.defaultFontSize,
                Chart.defaults.global.defaultFontStyle,
                Chart.defaults.global.defaultFontFamily,
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              chartInstance.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chartInstance.getDatasetMeta(datasetIndex);
                if (dataset.type === 'bar' && !meta.hidden) {
                  meta.data.forEach((bar, index) => {
                    const data = dataset.data[index];
                    if (data !== 0) {
                      ctx.font = 'bold 14px Arial';
                      ctx.fillStyle = dataset.label === '(%) of ≤5min' ? '#000' : 'rgb(255, 153, 0)';
                      ctx.fillText(data + '%', bar._model.x, bar._model.y - 5);
                    }
                  });
                }
              });
            },

          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Noto Sans Lao', // Set font family for x-axis labels
              },
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                max: 120,
                fontSize: 14,
                fontColor: '#000',
                fontFamily: 'Noto Sans Lao', // Set font family for y-axis labels
                callback: function (value) {
                  return value + '%';
                }
              }
            }]
          },
        },
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
