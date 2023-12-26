<template>
    <v-card class="mx-auto text-center mx-2" color="#ffff00" dark>
        <v-row>
            <v-col cols="2" class="pa-0">
                <v-card class="mx-auto" max-width="300" tile>
                    <v-list shaped>
                        <v-subheader>TABLE</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <v-list-item v-for="(item, i) in itemsshowdata" :key="i">
                                <v-list-item-content @click="changeGraph">
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
                                <v-col cols="10" sm="9">
                                    <v-container>
                                        <canvas id="myChart"></canvas>
                                    </v-container>
                                </v-col>
                                <v-col cols="2" sm="3" class="my-12">
                                    <v-card-text>
                                        <div v-for="(item, index) in dataset" :key="index">
                                            <h4 v-if="item.value !== 0" class="my-4" :style="{ color: tablecolors[index] }">
                                                {{ item.value }}
                                            </h4>
                                        </div>
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
                                <v-col v-if="!loading" cols="6" sm="8">
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
            datavalue: 0,
            dataallvalue: 0,
            datad1value: 0,
            datad2value: 0,
            datad4value: 0,
            datad5value: 0,
            datad6value: 0,
            dataothervalue: 0,
            smsvalue: 0,
            dataset: [],
            tablename: '',
            tabledataall: 0,
            item: [],
            itemsshowdata: [
                { text: 'DATA TICKET' },
                { text: 'DATA' },
                { text: 'SMS' },
                { text: 'VAS' },
                { text: 'VOICE' },
            ],
            tablecolors: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
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
            i: true,
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
                if (this.selectedItem === 0) {
                    this.datavalue = this.calculateDataValue(this.desserts, 'DATA');
                    this.datad1value = this.calculateDataValue(this.desserts, 'SMS');
                    this.datad2value = this.calculateDataValue(this.desserts, 'VAS');
                    this.datad3value = this.calculateDataValue(this.desserts, 'VOICE');
                    this.dataothervalue = this.datavalue + this.datad1value + this.datad2value + this.datad3value;
                    this.tablename = 'All';
                    this.tabledataall = this.dataothervalue;
                    this.names = ['DATA', 'SMS', 'VAS', 'VOICE'];
                    this.value = [this.datavalue, this.datad1value, this.datad2value, this.datad3value];
                    const percentages = this.value.map(value => {
                        if (value === 0 || value === null) {
                            return '0%';
                        }
                        return ((value / this.dataothervalue) * 100).toFixed(2) + '%';
                    });
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: percentages[index]
                    }));
                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                if (this.selectedItem === 1) {
                    this.dataallvalue = this.calculateDataValue(this.desserts, 'DATA');
                    //
                    this.datad1value = this.calculateDataD1Value(this.desserts, 'DATA', 'D1_CONNCET INTERNET ບໍ່ໄດ້');
                    this.datad2value = this.calculateDataD1Value(this.desserts, 'DATA', 'D2_DATA ໝົດໄວ');
                    this.datad3value = this.calculateDataD1Value(this.desserts, 'DATA', 'D3_INTERNET ຊ້າ');
                    this.dataothervalue = this.dataallvalue - this.datad1value - this.datad2value - this.datad3value;
                    this.tablename = 'DATA All';
                    this.tabledataall = this.dataallvalue;
                    this.names = ['D1_CONNCET INTERNET ບໍ່ໄດ້', 'D2_DATA ໝົດໄວ', 'D3_INTERNET ຊ້າ', 'Other'];
                    this.value = [this.datad1value, this.datad2value, this.datad3value, this.dataothervalue];
                    const percentages = this.value.map(value => ((value / this.dataallvalue) * 100).toFixed(2));
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: `${percentages[index]}%`,
                    }));
                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                if (this.selectedItem === 2) {
                    this.dataallvalue = this.calculateDataValue(this.desserts, 'SMS');
                    this.datad1value = this.calculateDataD1Value(this.desserts, 'SMS', 'S3_ຮັບ SMS ບໍ່ໄດ້');
                    this.datad2value = this.calculateDataD1Value(this.desserts, 'SMS', 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ');
                    this.datad3value = this.calculateDataD1Value(this.desserts, 'SMS', 'S6_ເຮັດທຸລະກຳຜ່ານ BANK ແລ້ວບໍ່ໄດ້ OTP CODE');
                    this.datad4value = this.calculateDataD1Value(this.desserts, 'SMS', 'SMS');
                    this.dataothervalue = this.dataallvalue - (this.datad1value + this.datad2value + this.datad3value + this.datad4value);
                    this.tablename = 'SMS All';
                    this.tabledataall = this.dataallvalue;
                    this.names = ['S3_ຮັບ SMS ບໍ່ໄດ້', 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ', 'S6_ເຮັດທຸລະກຳຜ່ານ BANK ແລ້ວບໍ່ໄດ້ OTP CODE', 'sms', 'Other'];
                    this.value = [this.datad1value, this.datad2value, this.datad3value, this.datad4value, this.dataothervalue];
                    const percentages = this.value.map(value => {
                        if (value === 0 || value === null) {
                            return '0%';
                        }
                        return ((value / this.dataallvalue) * 100).toFixed(2) + '%';
                    });
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: percentages[index]
                    }));
                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                if (this.selectedItem === 3) {
                    this.dataallvalue = this.calculateDataValue(this.desserts, 'VAS');

                    this.datad1value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)');
                    this.datad2value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້');
                    this.datad3value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້');
                    this.datad4value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້​');
                    this.datad5value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້');
                    this.datad6value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້');
                    this.dataothervalue = this.dataallvalue - (this.datad1value + this.datad2value + this.datad3value + this.datad4value + this.datad5value + this.datad6value);
                    this.tablename = 'VAS All';
                    this.tabledataall = this.dataallvalue;
                    this.names = ['VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້', 'Other'];
                    this.value = [this.datad1value, this.datad2value, this.datad3value, this.datad4value, this.datad5value, this.datad6value, this.dataothervalue];
                    const percentages = this.value.map(value => {
                        if (value === 0 || value === null) {
                            return '0%';
                        }
                        return ((value / this.dataallvalue) * 100).toFixed(2) + '%';
                    });
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: percentages[index]
                    }));
                }
                if (this.selectedItem === 4) {
                    this.dataallvalue = this.calculateDataValue(this.desserts, 'VOICE');

                    this.datad1value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້');
                    this.datad2value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V2_ມີ​ສັນຍານ​ໂທ​ອອກບໍ່​ໄດ້');
                    this.datad3value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V3_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າບໍ່​ໄດ້');
                    this.datad4value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້​');
                    this.datad5value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້');
                    this.datad6value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້');
                    this.dataothervalue = this.dataallvalue - (this.datad1value + this.datad2value + this.datad3value + this.datad4value + this.datad5value + this.datad6value);
                    this.dataothervalue = this.dataallvalue - (this.datad1value + this.datad2value + this.datad3value + this.datad4value + this.datad5value + this.datad6value);
                    this.tablename = 'VOICE All';
                    this.tabledataall = this.dataallvalue;
                    this.names = ['VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້', 'Other'];
                    this.value = [this.datad1value, this.datad2value, this.datad3value, this.datad4value, this.datad5value, this.datad6value, this.dataothervalue];
                    const percentages = this.value.map(value => {
                        if (value === 0 || value === null) {
                            return '0%';
                        }
                        return ((value / this.dataallvalue) * 100).toFixed(2) + '%';
                    });
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: percentages[index]
                    }));

                }
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
        calculateDataD1Value(data, serviceGroup, serviceGroupD1, serviceGroupD2) {
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
            this.i = false;
        },
        changeGraph() {
            this.i = true;
            this.graphType();
        },

        graphType() {
            // Set up the initial interval
            this.intervalId = setInterval(() => {
                if (this.i) {
                    this.getData();
                    // Clear the current interval
                    clearInterval(this.intervalId);
                    // Set up a new interval for the next cycle
                    this.setupInterval();
                }
            }, 1000);
        },

        setupInterval() {
            // Set up a new interval when this.i is true
            this.intervalId = setInterval(() => {
                if (this.i) {
                    this.getData();
                    // Clear the current interval
                    clearInterval(this.intervalId);
                    // Set up a new interval for the next cycle
                    this.setupInterval();
                }
            }, 1000);
        }

    },
    mounted() {
        this.graphType();
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
  