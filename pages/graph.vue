<template>
    <v-card class="mx-auto text-center" color="#ffff00" dark>
        <!-- <div>{{ desserts }}</div> -->
        <v-card-text class="pa-1">
            <v-sheet color="#fff">
                <v-card-text class="pa-0">
                    <div class="text-left" style="background-color: #ffffff;">
                        <v-card-actions class="py-1">
                            <v-btn fab x-small text style="background-color: #000000" @click="$router.go(-1)">
                                <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
                            </v-btn>
                            <v-card-text class="text-center pa-0">
                                <v-list-item-action class="pa-0">
                                    <v-card-actions class="py-1">
                                        <h3 style="color: black;">{{ dateontable }}</h3>
                                        <h2 class="mx-4" style="color: #000000;"><span style="color: #7d7d15;">To</span>
                                        </h2>
                                        <h3 style="color: black;">{{ datesontable }}</h3>
                                    </v-card-actions>
                                </v-list-item-action>
                            </v-card-text>
                        </v-card-actions>
                    </div>
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </v-card-text>
                <v-card-text class="pb-0">
                    <v-row>
                        <v-col v-if="loading" cols="12">
                            <v-card flat style="background-color: #ffffff; height: 300px;">
                                <v-progress-circular style="top:36%" :width="7" :size="65"
                                    indeterminate></v-progress-circular>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="7">
                            <div>
                                <canvas id="myChart"></canvas>
                            </div>
                            <v-divider style="background-color: #363636;"></v-divider>

                            <v-card-text style="color: #ffffff; background-color: #000000;">
                                <v-row>
                                    <v-col cols="6" class="red">
                                        <span>hi</span>
                                    </v-col>
                                    <v-col cols="6" class="red">

                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-col>
                        <v-col v-if="!loading" cols="12" sm="5">
                            <v-card-text style="color: #000000;">
                                <v-simple-table dense flat class="table-container table-title-hiegth">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-center" style="color: #ffff00;">
                                                    Name
                                                </th>
                                                <th class="text-center" style="color:#ffff00;">
                                                    Calories
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item in dataset" :key="item.name">
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.value }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card-text>
                <div class="px-1">
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </div>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" class="pl-12">
                            <v-row class="fill-height" align="center">
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                            <v-slider v-model="width" label="Width" min="1" max="4.5" step="0.1" thumb-label></v-slider>
                        </v-col>
                        <v-col cols="6" class="pl-12 mb-4">
                            <v-row class="fill-height" align="center">
                                <v-item-group mandatory>
                                    <v-row>
                                        <v-item v-for="(item, i) in itemsbuton" :key="i" v-slot="{ active, toggle }">
                                            <v-btn text style="background-color: transparent; color: transparent;"
                                                @click="showgraph(item.name)">
                                                <v-card flat :style="{
                                                    background: graphstyle[0],
                                                    border: '2px solid',
                                                    borderColor: active ? '#000' : 'white'
                                                }" class="text-center pa-1" @click="toggle">
                                                    <v-icon size="35"
                                                        :style="{ color: graphform === item.name ? '#000' : '#fff' }">
                                                        {{ item.icon }}
                                                    </v-icon>
                                                    <small :style="{ color: graphform === item.name ? '#000' : '#fff' }">
                                                        {{ item.name }}</small>
                                                </v-card>
                                            </v-btn>
                                        </v-item>
                                    </v-row>
                                </v-item-group>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0 mb-6">
                            <v-card :flat="tabledata" class="mx-auto text-center" style="background-color: #ffffff;"
                                :width="tabledata ? '240' : '80%'" tile @mouseenter="tabledata = false"
                                @mouseleave="tabledata = true">
                                <div v-if="tabledata">
                                    <v-card-text class="pa-0" v-for="(item, index) in itemsshowdata" :key="index"
                                        style="background-color: #ffff00; border-radius: 30px;">
                                        <v-card-text class="pa-2" v-if="index === selectedItem" style="{
                                                    background-color: #ffff00;
                                                    border: 2px solid;
                                                    border-radius:30px;
                                                    border-color:#000;
                                                    color:#000;
                                                }">

                                            <h4>
                                                Table of {{ item.text }}
                                            </h4>
                                        </v-card-text>
                                    </v-card-text>
                                </div>
                                <div v-if="!tabledata" style="position: inherit; z-index:100; bottom: 10%;">
                                    <v-card-text class="pa-0" v-for="(item, index) in itemsshowdata" :key="index"
                                        style="background-color: #000000;">
                                        <v-card-text class="pa-2" v-if="index === selectedItem" style="{
                                        background-color: #ffff00;
                                                    border: 2px solid;
                                                    border-color:#ffff00;
                                                    color:#ffff00;
                                                }">
                                            Data table {{ item.text }}
                                        </v-card-text>
                                    </v-card-text>
                                    <v-divider style="background-color:#ffff00;"></v-divider>
                                    <v-list rounded style="background-color: #333333;">
                                        <v-slide-group v-model="selectedItem" active-class="yellow" show-arrows>
                                            <v-slide-item v-for="(item, index) in itemsshowdata" :key="index"
                                                v-slot="{ active, toggle }">
                                                <v-card flat
                                                    :style="{ backgroundColor: active ? undefined : '#000', color: active ? '#000' : '#ffff' }"
                                                    class="ma-1 pa-2" style="border-radius: 30px;" @click="toggle">
                                                    <v-row class="fill-height" align="center" justify="center">
                                                        <v-scale-transition>
                                                            <v-list-item>
                                                                <v-list-item-title
                                                                    :style="{ color: active ? '#000' : '#ffff' }">
                                                                    {{ item.text }}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </v-scale-transition>
                                                    </v-row>
                                                </v-card>
                                            </v-slide-item>
                                        </v-slide-group>
                                        <v-list-item-group v-model="selectedItem" color="yellow">
                                            <v-slide-item v-for="(item, index) in itemsshowdata" :key="index">
                                            </v-slide-item>
                                        </v-list-item-group>
                                    </v-list>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-sheet>
        </v-card-text>
        <v-card-text>
            <div class=" font-thin" style="color: #fff;">
                Sales Last 24h
            </div>
            <div class="text-h5 font-thin" style="color: black;">
                Sales Last 24h
            </div>
        </v-card-text>
        <v-card-text class="py-0">
            <v-divider style="background-color: black;"></v-divider>
        </v-card-text>
    </v-card>
</template>
<script>
const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    // props: {
    //   dessertdata: Array,
    // },
    data() {
        return {
            // dessertdata:[],
            desserts: this.$route.params.desserts,
            dateontable: this.$route.params.date,
            datesontable: this.$route.params.dates,
            tabledata: true,
            fill: false,
            loading: true,
            datavaluenew1: 0,
            datavaluenew2: 0,
            datavalue: 0,
            grandtotal: 0,
            voicevalue: 0,
            vasvalue: 0,
            smsvalue: 0,
            dataset: [],
            item: [],
            itemsshowdata: [
                { text: 'Real-Time' },
                { text: 'Audience' },
                { text: 'Conversions' },
                { text: 'Conversions' },
                { text: 'Conversions' },
            ],
            selectedItem: 0,
            date: new Date(
                Date.now() - 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10), // + 'T00:00:00.000Z',
            dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10), // + 'T00:00:00.000Z',
            itemsbuton: [
                { icon: 'mdi-chart-bar', name: 'bar' },
                { icon: 'mdi-chart-areaspline-variant', name: 'line' },
                { icon: 'mdi-chart-pie', name: 'pie' },
            ],
            graphform: 'bar',
            graphstyle,
            // graphform: 'bar',
            radius: 2,
            value: [],
            names: [],
            width: 1.5,
        };
    },
    mounted() {
        this.getData();
        // this.showgraph(this.graphform);
    },
    methods: {
        showgraph(name) {
            this.graphform = name;
            this.graphShow();
        },
        getData() {
            console.log('dta1', this.dateontable)
            console.log('dat2', this.datesontable)
            try {
                // Calculate values based on SERVICE_GROUP
                this.datavalue = this.calculateDataValue(this.desserts, 'DATA');
                this.vasvalue = this.calculateDataValue(this.desserts, 'VAS');
                this.voicevalue = this.calculateDataValue(this.desserts, 'VOICE');
                this.smsvalue = this.calculateDataValue(this.desserts, 'SMS');
                this.grandtotal = this.datavalue + this.vasvalue + this.voicevalue + this.smsvalue;

                this.names = ['DATA', 'VAS', 'VOICE', 'SMS'];
                this.value = [this.datavalue, this.vasvalue, this.voicevalue, this.smsvalue];

                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                }));
                // console.log('h', this.dataset)
                if (this.desserts === undefined) {
                    console.error('Response is undefined');
                    return 'Response is undefined';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed, e.g., show an error message to the user
            }
            this.graphShow();
            this.loading = false;
            // console.log('ti', this.graphform)
        },

        calculateDataValue(data, serviceGroup) {
            // Assuming "SERVICE_GROUP" is the key you want to filter on
            return data.reduce((sum, entry) => {
                if (entry.SERVICE_GROUP === serviceGroup) {
                    // Adjust the logic based on the field you want to sum
                    return sum + 1;
                }
                return sum;
            }, 0);
        },
        graphShow() {
            const ctx = document.getElementById('myChart').getContext('2d');
            // Clear existing chart
            if (this.myChart) {
                this.myChart.destroy();
            }

            this.myChart = new this.$Chart(ctx, {
                type: this.graphform,
                data: {
                    labels: this.names,
                    datasets: [
                        {
                            label: ' of Votes',
                            data: this.value,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });
        },
    }
}
</script>
<style scoped>
.v-progress-circular {
    margin: 1rem;
    color: #ffff00;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
}

.table-container {
    max-height: 450px;
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

.resizable {
    cursor: ew-resize;
}

.table-hiegth {
    max-height: 474px;
    overflow-y: auto;
}

.table-title-hiegth {
    max-height: 400px;
    overflow-y: auto;
}
</style>
