<template>
    <v-card class="mx-auto text-center mx-2" color="#ffff00" dark>
        <v-row>
            <v-col cols="2" class="pa-0">
                <v-card class="mx-auto" max-width="300" tile>
                    <v-list shaped>
                        <v-subheader>TABLE</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <v-list-item v-for="(item, i) in itemsshowdata" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="10" class="pa-0">
                <v-card-text class="pa-1">
                    <v-sheet color="#fff">
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
                                <v-col v-if="!loading" cols="12" sm="5">
                                    <v-card-text style="color: #000000;">
                                        <v-simple-table dense flat class="table-container table-title-hiegth">
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="text-center" style="color: #ffff00;">
                                                           Row Labels
                                                        </th>
                                                        <th class="text-center" style="color:#ffff00;">
                                                            Count of SERVICE GROUP
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
                        <v-card-text style="background-color: rgba(255, 206, 86,0.1);">
                            <v-row>
                                <v-col cols="6" sm="4" class=" mt-4 by-4">
                                    <v-row class="fill-height" align="center">
                                        <v-item-group mandatory>
                                            <v-row>
                                                <v-item v-for="(item, i) in itemsbuton" :key="i"
                                                    v-slot="{ active, toggle }">
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
                                                            <small
                                                                :style="{ color: graphform === item.name ? '#000' : '#fff' }">
                                                                {{ item.name }}</small>
                                                        </v-card>
                                                    </v-btn>
                                                </v-item>
                                            </v-row>
                                        </v-item-group>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" md="8" class="py-4">
                                    <v-card-text style="color: #ffff00; background-color: #000;">
                                        <v-row>
                                            <v-col cols="4" style="background-color: #ffff00; color:#000;">
                                                <v-card-actions>
                                                    <span>GRANDTOTAL : </span>
                                                    <h3> {{ grandtotal }}</h3>

                                                </v-card-actions>
                                            </v-col>
                                            <v-col cols="4" style="background-color: #ffff00; color:#000;">
                                                <v-card-actions> 
                                                    <h3> VAS- </h3>
                                                    <span>MAX : </span>
                                                    <h3> {{ grandtotal }}</h3>
                                                </v-card-actions>
                                            </v-col>
                                            <v-col cols="4" style="background-color: #ffff00; color:#000;">
                                                <v-card-actions>
                                                    <h3> SMS-</h3>
                                                    <span>MIN :</span>
                                                    <h3> {{ grandtotal }}</h3>
                                                </v-card-actions>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-sheet>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    props: {
        desserts: Array,
    },
    data() {
        return {

            datacang: true,
            fill: false,
            loading: true,
            datad1value: 0,
            datad2value: 0,
            datad3value: 0,

            smss3value: 0,
            smss5value: 0,
            smssmsvalue: 0,
            smsothervalue: 0,

            vasva1value: 0,
            vasva2value: 0,
            vasva4value: 0,
            vasva6value: 0,
            vasva17value: 0,
            vasvaothervalue: 0,
            vasva29value:0,

            voicev1value: 0,
            voiceothervalue: 0,

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
            itemsbuton: [
                { icon: 'mdi-chart-bar', name: 'bar' },
                { icon: 'mdi-chart-areaspline-variant', name: 'line' },
                { icon: 'mdi-chart-pie', name: 'pie' },
            ],
            graphform: 'bar',
            graphstyle,
            radius: 2,
            value: [],
            names: [],
            width: 1.5,
        };
    },
    methods: {
        showgraph(name) {
            this.graphform = name;
            this.graphShow();
        },
        getData() {
            try {
                // Calculate values based on SERVICE_GROUP
                this.datavalue = this.calculateDataValue(this.desserts, 'DATA');
                this.vasvalue = this.calculateDataValue(this.desserts, 'VAS');
                this.voicevalue = this.calculateDataValue(this.desserts, 'VOICE');
                this.smsvalue = this.calculateDataValue(this.desserts, 'SMS');

                this.grandtotal = this.datavalue + this.vasvalue + this.voicevalue + this.smsvalue;


                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                this.datad1value = this.calculateDataD1Value(this.desserts, 'DATA' , 'D1_CONNCET INTERNET ບໍ່ໄດ້');
                this.datad2value = this.calculateDataD1Value(this.desserts, 'DATA' , 'D2_DATA ໝົດໄວ');
                this.datad3value = this.calculateDataD1Value(this.desserts, 'DATA' , 'D3_INTERNET ຊ້າ');

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                this.smss3value = this.calculateDataD1Value(this.desserts, 'SMS' , 'S3_ຮັບ SMS ບໍ່ໄດ້');
                this.smss5value = this.calculateDataD1Value(this.desserts, 'SMS' , 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ');
                this.smssmsvalue = this.calculateDataD1Value(this.desserts, 'SMS' , 'SMS');
                this.smsothervalue = this.smsvalue - (this.smss3value + this.smss5value + this.smssmsvalue) ;

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                this.vasva1value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)'); 
                this.vasva2value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້');
                this.vasva4value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້');
                this.vasva6value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້​');
                this.vasva17value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້');
                this.vasva29value = this.calculateDataD1Value(this.desserts, 'VAS' , 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້');
                this.vasvaothervalue = this.vasvalue - (this.vasva1value + this.vasva2value + this.vasva4value + this.vasva6value + this.vasva17value + this.vasva29value) ;

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                this.voicev1value = this.calculateDataD1Value(this.desserts, 'VOICE' , 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້'); 
                this.voiceothervalue = this.voicevalue - (this.voicev1value) ;

                this.names = ['DATA', 'VAS', 'VOICE', 'SMS'];
                this.value = [this.datavalue, this.vasvalue, this.voicevalue, this.smsvalue];
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                }));
                // console.log('h', this.dataset)
                if (this.desserts === undefined) {
                    console.error('Response is undefined');
                    throw new Error('Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed, e.g., show an error message to the user
                throw error;
            }
            this.graphShow();
            this.loading = false;
            // console.log('titt', this.desserts)
            // console.log('other', this.vasvaothervalue)
            // console.log('d1', this.vasva1value)
            // console.log('d2', this.vasva2value)
            // console.log('d3', this.vasva4value)
            // console.log('d3', this.vasva17value)
            // console.log('all', this.vasva1value + this.vasva2value + this.vasva4value + this.smsothervalue)
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
        calculateDataD1Value(data, serviceGroup, serviceGroupD1) {
            // Assuming "SERVICE_GROUP" is the key you want to filter on
            return data.reduce((sum, entry) => {
                if ((entry.SERVICE_GROUP === serviceGroup) && (entry.CLASSIFICATION === serviceGroupD1)) {
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

    },
    mounted() {
        this.intervalId = setInterval(() => {
            // if (!this.dataFetched) {
            this.getData();
            // this.dataFetched = true; // Set the flag to indicate that data has been fetched
            // }
        }, 3200);
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
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

.resizable {
    cursor: ew-resize;
}

.table-hiegth {
    max-height: 350px;
    overflow-y: auto;
}

.table-title-hiegth {
    max-height: 350px;
    overflow-y: auto;
}
</style>
  