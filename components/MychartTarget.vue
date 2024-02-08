<template>
    <div>
        <v-card flat class="mx-auto text-center" color="#ffff00" dark>
            <!-- ... (Content for loading state, graph, and data tables) -->
            <v-sheet color="#fff">
                <canvas height="105px" id="myChart"></canvas>
                <div class="px-1">
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </div>
                <v-row>
                    <v-col
                        v-if="(!loading && (tabledisplay === 'Customer Complaint' || tabledisplay === 'Root Cause Report'))"
                        cols="12" sm="7" md="7" class="px-0 py-0">
                        <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                            <h4 style="color: #b3b300;">DATA TABLE</h4>
                            <v-simple-table dense flat fixed-header class="table-container"
                                :height="dataset.length >= 4 ? '192px' : null"
                                :max-height="dataset.length < 4 ? '192px' : null">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center" style="color: #ffff00;">
                                                Row Labels
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                Count of SERVICE GROUP
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                percentages(%)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in dataset" :key="item.name"
                                            :style="{ color: item.name === 'Other' ? '#ffff00' : '#ffff' }">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.value }}</td>
                                            <td>{{ item.percentage }}</td>
                                        </tr>
                                        <tr style="background-color: #ffff00;">
                                            <td style="color: #000;">
                                                <h4>
                                                    {{ tablename }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    {{ tabledataall }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    100%
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-col>
                    <v-col v-if="(!loading && tabledisplay === 'Root Cause')" cols="12" sm="7" md="7" class="px-0 py-0">
                        <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                            <h4 style="color: #b3b300;">DATA TABLE</h4>
                            <v-simple-table dense flat fixed-header class="table-container"
                                :height="dataset.length >= 4 ? '192px' : null"
                                :max-height="dataset.length < 4 ? '192px' : null">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center" style="color: #ffff00;">
                                                Row Labels
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                Count of SERVICE GROUP
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                percentages(%)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in dataset" :key="item.name">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.value }}</td>
                                            <td>{{ item.percentage }}</td>
                                        </tr>
                                        <tr style="background-color: #ffff00;">
                                            <td style="color: #000;">
                                                <h4>
                                                    {{ tablename }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    {{ tabledataall }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    100%
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" sm="5" md="5" class="px-0 py-0">
                        <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                            <h4 style="color: #b3b300;">TABLE TIME</h4>
                            <v-simple-table dense flat fixed-header class="table-container"
                                :height="dataset.length >= 4 ? '192px' : null"
                                :max-height="dataset.length < 4 ? '192px' : null">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center" style="color: #ffff00;">
                                                Ticket/KPI
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                ≤ 20m
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                &gt; 20m
                                            </th>
                                            <th class="text-center" style="color:#ffff00;">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in datasetdatatime" :key="item.name">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item.valuemin }}</td>
                                            <td>{{ item.valuemax }}</td>
                                            <td>{{ item.dataall }}</td>
                                        </tr>
                                        <tr style="background-color: #ffff00;">
                                            <td style="color: #000;">
                                                <h4>
                                                    percent(%)
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>

                                                    L(20m):{{ percenmin }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    H(20m):{{ percenmax }}
                                                </h4>
                                            </td>
                                            <td style="color: #000;">
                                                <h4>
                                                    100%
                                                </h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-card>
    </div>
</template>
<script>
import Chart from 'chart.js';
export default {
    props: {
        v: Array,
        n: Array,
    },
    data() {
        return {
            graphform: 'bar',
            dataset: [],
            data_desserts: [],
            datasetdatatime: [],
            tabledisplay: 'Customer Complaint',
        };
    },
    methods: {
        // -------- Function Graph 
        graphShow() {
            const ctx = document.getElementById('myChart').getContext('2d');
            // Clear existing chart
            if (this.myChart) {
                this.myChart.destroy();
            }
            const chartData = {
                labels: this.n,
                datasets: [{
                    data: this.v,
                    backgroundColor: [
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
                    ],
                    borderColor: [
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
                    ],
                    borderWidth: 1,
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
                                chartData.datasets.forEach((dataset, i) => {
                                    const meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach((bar, index) => {
                                        const data = dataset.data[index];
                                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                    });
                                });
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
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
            this.i = false;
        },
    },
    mounted() {
        this.graphShow();
    },
}
</script>
<style scoped>
.table-container {
    max-height: 350px;
    overflow-y: auto;
}

.table-container ::-webkit-scrollbar {
    width: 2px;
}

.table-container ::-webkit-scrollbar-thumb {
    background-color: #ffff00;
    border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
    background-color: #ffff00;
    border-radius: 4px;
}

@media only screen and (max-width: 980px) {
    .grid {
        display: none;
    }

    /* Update the 'show' property to false for screen width less than or equal to 1600px */
    :root {
        --showstrygraph-value: false;
    }
}

/* Use the custom property to set the 'show' property */
.grid {
    display: var(--showstrygraph-value, grid);
}
</style>
  