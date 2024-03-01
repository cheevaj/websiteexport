<template>
    <div class="mt-2 pt-0 custom-font">
        <canvas height="100px" id="myChartUserCare"></canvas>
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
            const ctx = document.getElementById('myChartUserCare').getContext('2d');
            if (this.myChartUserCare) {
                this.myChartUserCare.destroy();
            }
            // Sort userTarget array by Time_Care in descending order
            const sortedUserTarget = this.userTarget.slice(0, this.userTarget.length - 1).sort((a, b) => b.Time_Care - a.Time_Care);

            // Extract labels from the sorted array
            const labels = sortedUserTarget.map(({ name }) => name);

            // Extract Time_Care values from the sorted array
            const valueCare = sortedUserTarget.map(item => item.Time_Care);

            // Filter out labels and corresponding values where Time_Care > 0
            const filteredLabels = labels.filter((label, index) => valueCare[index] > 0);
            const filteredValueCare = valueCare.filter(value => value > 0);

            // Get the maximum value of Time_Care
            const valueAll = Math.max(...filteredValueCare);
            const colorBK = [
                'rgb(255, 255, 0,0.8)',
                'rgb(51, 51, 51,0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
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
                'rgb(230, 230, 1)',
                'rgb(51, 51, 51,1)',
                'rgba(255, 206, 86, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
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
            const chartData = {
                labels: filteredLabels,
                datasets: [
                    {
                        label: 'Time Care Tplus > 5min',
                        data: filteredValueCare,
                        backgroundColor: colorBK,
                        borderColor: colorBD,
                    },
                ],
            };
            this.myChartBar = new Chart(ctx, {
                type: 'horizontalBar',
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
                                        ctx.fillText(data, bar._model.x + 5, bar._model.y + 8);
                                    }
                                });
                            });
                        },
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: valueAll + 2,
                                fontSize: 14,
                                fontColor: '#000',
                                fontFamily: 'Noto Sans Lao', // Set font family for x-axis labels
                            },
                        }], yAxes: [{
                            ticks: {
                                min: 0,
                                // max: valueAll[0] >= 5 ? valueAll[0] : valueAll[0] + 2,
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
  