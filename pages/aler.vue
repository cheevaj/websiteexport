<template>
    <v-card class="mx-auto text-center" color="#ffff00" dark>
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
                                        <h3 style="color: black;">24-06-2023</h3>
                                        <h2 class="mx-4" style="color: #000000;"><span style="color: #7d7d15;">To</span>
                                        </h2>
                                        <h3 style="color: black;">24-06-2023</h3>
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
                            <v-card flat style="background-color: #ffffff; height: 350px;">
                                <v-progress-circular style="top:36%" :width="7" :size="65"
                                    indeterminate></v-progress-circular>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="7">
                            <div>
                                <canvas id="myChart"></canvas>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="5">
                            <v-card-text style="color: #000000;">
                                <v-simple-table dense flat>
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
                                            <tr v-for="item in desserts" :key="item.name">
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.calories }}</td>
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
                                <!-- <v-switch v-model="fill" label="Filled"></v-switch> -->
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                            <v-slider v-model="width" label="Width" min="1" max="4.5" step="0.1" thumb-label></v-slider>
                        </v-col>
                        <v-col cols="6" class="pl-12">
                            <v-row class="fill-height" align="center">
                                <v-item-group mandatory>
                                    <v-row>
                                        <v-item v-for="(item, i) in items" :key="i" v-slot="{ active, toggle }">
                                            <v-btn text style="background-color: transparent; color: transparent;"
                                                @click="showgraph(item.graphform)">
                                                <v-card flat :style="{
                                                    background: graphstyle[0],
                                                    border: '2px solid',
                                                    borderColor: active ? '#000' : 'white'
                                                }" class="text-center pa-1" @click="toggle">
                                                    <v-icon size="35"
                                                        :style="{ color: graphform === item.graphform ? '#000' : '#fff' }">
                                                        {{ item.icon }}
                                                    </v-icon>
                                                    <small
                                                        :style="{ color: graphform === item.graphform ? '#000' : '#fff' }">{{
                                                            item.name }}</small>
                                                </v-card>
                                            </v-btn>
                                        </v-item>
                                    </v-row>
                                </v-item-group>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                            <v-slider v-model="radius" label="Radius" min="0" max="10" thumb-label style="b"></v-slider>
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
    data: () => ({
        fill: false,
        loading: true,
        datavalue: 0,
        grandtotal: 0,
        voicevalue: 0,
        vasvalue: 0,
        smsvalue: 0,
        desserts: [
            {
                name: 'Frozen Yogurt',
                calories: 159,
            },
            {
                name: 'Ice cream sandwich',
                calories: 237,
            },
            {
                name: 'Eclair',
                calories: 262,
            },
            {
                name: 'Cupcake',
                calories: 305,
            },
            {
                name: 'Gingerbread',
                calories: 356,
            },
            {
                name: 'Jelly bean',
                calories: 375,
            },
            {
                name: 'Lollipop',
                calories: 392,
            },
            {
                name: 'Honeycomb',
                calories: 408,
            },
            {
                name: 'Donut',
                calories: 452,
            },
            {
                name: 'KitKat',
                calories: 518,
            },
        ],
        item: [],
        date: new Date(
            Date.now() - 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
        )
            .toISOString()
            .substr(0, 10), // + 'T00:00:00.000Z',
        dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10), // + 'T00:00:00.000Z',
        items: [
            { icon: 'mdi-chart-bar', name: 'Bar', graphform: 'bar' },
            { icon: 'mdi-chart-areaspline-variant', name: 'Variant', graphform: 'line' },
            { icon: 'mdi-chart-pie', name: 'Pie', graphform: 'pie' },
        ],
        graphform: 'bar',
        graphstyle,
        // graphform: 'bar',
        radius: 2,
        value: [],
        names: [],
        width: 1.5,
    }),
    mounted() {
        this.getData();
        // this.showgraph(this.graphform);
    },
    methods: {
        showgraph(graphform) {
            this.graphform = graphform;
            this.graphShow();
            console.log(this.graphform)
        },
        async getData() {
            this.loading = true;

            try {
                const startDate = this.date;
                const endDate = this.dates;
                const res = await this.$axios.$get(
                    `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
                        startDate
                    )}&endDate=${encodeURIComponent(endDate)}`
                );

                // Calculate values based on SERVICE_GROUP
                this.datavalue = this.calculateDataValue(res, 'DATA');
                this.vasvalue = this.calculateDataValue(res, 'VAS');
                this.voicevalue = this.calculateDataValue(res, 'VOICE');
                this.smsvalue = this.calculateDataValue(res, 'SMS');
                this.grandtotal = this.datavalue + this.vasvalue + this.voicevalue + this.smsvalue;

                this.names = ['DATA', 'VAS', 'VOICE', 'SMS'];
                this.value = [this.datavalue, this.vasvalue, this.voicevalue, this.smsvalue];

                console.log('datavalue', this.datavalue);
                console.log('vasvalue', this.vasvalue);
                console.log('voicevalue', this.voicevalue);
                console.log('smsvalue', this.smsvalue);
                console.log('all', this.grandtotal);
                console.log('Response:', res);
                if (res === undefined) {
                    console.error('Response is undefined');
                    return 'Response is undefined';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed, e.g., show an error message to the user
            }
            this.graphShow();
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
            this.loading = false;
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new this.$Chart(ctx, {
                type: this.graphform,
                data: {
                    labels: this.names,
                    datasets: [
                        {
                            label:' of Votes',
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
            console.log(myChart);
        },
    }
}
</script>
<style scoped>
.v-progress-circular {
    margin: 1rem;
    color: #ffff00;
}
</style>
  