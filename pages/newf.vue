<template>
    <div class="chart-container">
        <canvas id="myChartA"></canvas>
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
            const ctx = document.getElementById('myChartA');

            // Sample data based on your image (replace with your actual data)
            const labels = ['ການກາກນເນຣກ', 'DATA', 'SMS', 'VAS'];
            const datasets = [
                {
                    label: 'Male',
                    data: [30, 50, 80, 40],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue for male
                    borderColor: 'rgba(54, 162, 235, 1)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Female',
                    data: [70, 90, 60, 40],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Pink for female
                    borderColor: 'rgba(255, 99, 132, 1)',
                    stack: 'Stack 0'
                }
            ];

            // Create the chart configuration
            const config = {
                type: 'bar',
                data: {
                    labels,
                    datasets
                },
                options: {
                    scales: {
                        x: {
                            stacked: false,
                            ticks: {
                                font: {
                                    weight: 'bold'
                                },
                                callback: function (value, index) {
                                    // Get the category label
                                    const categoryLabel = this.chart.data.labels[index];
                                    // Return the category label
                                    return categoryLabel;
                                }
                            }
                        },
                        x2: {
                            position: 'bottom', // position at the bottom
                            grid: {
                                display: false
                            },
                            ticks: {
                                callback: function (value, index) {
                                    const labels = ['Male', 'Female'];
                                    return labels[index % labels.length];
                                }
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            display: false // Hide the legend
                        },
                        tooltip: {
                            // Customize tooltip content to display both group and element labels
                            callbacks: {
                                label: function (context) {
                                    const datasetLabel = context.dataset.label;
                                    const dataLabel = labels[context.dataIndex];
                                    const value = context.parsed.y;
                                    return `${dataLabel}: ${datasetLabel} (${value})`;
                                }
                            }
                        }
                    }
                }
            };

            // Create the chart
            return new Chart(ctx, config);
        }
    }
};
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 600px; /* Adjust width as needed */
}
</style>
