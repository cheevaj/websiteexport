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
            // Perform element-wise subtraction to calculate value1 and value2
            const datasetDataTimeSubset = this.dataItem.slice(0, 4);
            const labels = datasetDataTimeSubset.map(({ grop }) => grop);
            const valueAll = datasetDataTimeSubset.map(({ valueminall }) => valueminall);
            const valueMaxD = datasetDataTimeSubset.map(({ valuemax }) => valuemax);
            const valueMaxC = datasetDataTimeSubset.map(({ valuemaxC }) => valuemaxC);
            const sumValue = datasetDataTimeSubset.map(({ valueall }) => valueall);
            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Perfect',
                        data: valueAll,
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Time Do Tplus',
                        data: valueMaxD,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
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
                datasetData: [{ data: sumValue }],
            };
            this.myChartBar = new Chart(ctx, {
                type: 'horizontalBar',
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
                { dataall: 190, nameValueall: 'D1', grop: 'DATA', valueall: 98, valuemax: 0, nameValuemaxC: 'DA1', valuemaxC: 2, valuemin: 180, valueminall: 96 },
                { dataall: 30, nameValueall: 'D2', grop: 'DATA', valueall: 39, valuemax: 19, nameValuemaxC: 'DA2', valuemaxC: 9, valuemin: 40, valueminall: 38 },
                { dataall: 10, nameValueall: 'S1', grop: 'SMS', valueall: 113, valuemax: 6, valuemaxC: 8, nameValuemaxC: 'SDA1', valuemin: 33, valueminall: 40 },
                { dataall: 10, nameValueall: 'VA1', grop: 'VAS', valueall: 113, valuemax: 6, valuemaxC: 8,nameValuemaxC: 'VDA1', valuemin: 33, valueminall: 40 },
            ],
        };
    },
};
</script>
