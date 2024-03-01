<template>
    <div class="mt-2 pt-0 custom-font">
        <canvas height="95px" id="myChartUser"></canvas>
    </div>
</template>
  
<script>
import Chart from 'chart.js';

export default {
    props: {
        userTarget: Array,
    },
    data() {
        return {

        };
    },
    mounted() {
        this.createChart();
        // this.$emit('chartBarData', this.dataTable, this.itemTable);
    },
    methods: {
        createChart() {
            // console.log('dataof', this.userTarget)
            const ctx = document.getElementById('myChartUser').getContext('2d');
            if (this.myChartUser) {
                this.myChartUser.destroy();
            }
            const labels = this.userTarget.slice(0, this.userTarget.length - 1).map(({ name }) => name);
            const valueCare = this.userTarget.slice(0, this.userTarget.length - 1).map(item => item.Time_Care);
            const valueAll = this.userTarget.slice(this.userTarget.length - 1, this.userTarget.length).map(item => item.Time_Do) >=
                this.userTarget.slice(this.userTarget.length - 1, this.userTarget.length).map(item => item.Time_Care) ?
                this.userTarget.slice(this.userTarget.length - 1, this.userTarget.length).map(item => item.Time_Do) :
                this.userTarget.slice(this.userTarget.length - 1, this.userTarget.length).map(item => item.Time_Care)
            const valueDo = this.userTarget.slice(0, this.userTarget.length - 1).map(item => item.Time_Do);
            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Time Do Tplus > 5min',
                        data: valueDo,
                        backgroundColor: 'rgb(255, 255, 0,0.8)',
                        borderColor: 'rgb(255, 255, 0,1)',
                    },
                    {
                        label: 'Time Care Tplus > 20min',
                        data: valueCare,
                        backgroundColor: 'rgb(51, 51, 51,0.8)',
                        borderColor: 'rgb(51, 51, 51,1)',
                    },
                ],
            };
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
                                max: labels.length >= 4 ? labels.length : 3, // Set the maximum number of ticks to display
                                fontSize: 14,
                                fontColor: '#000',
                                fontFamily: 'Noto Sans Lao', // Set font family for x-axis labels
                            },
                        }], yAxes: [{
                            ticks: {
                                max: valueAll[0] >= 5 ? valueAll[0] : valueAll[0] + 5,
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
};
</script>
<style>
.custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
    /* You can specify additional styles here */
}
</style>
  