<template>
    <v-card class="mx-auto text-center mx-2" color="#ffff00" dark>
        <v-row>
            <v-col cols="2" class="py-0 pl-2 pr-0">
                <v-card class="mx-auto pb-4" max-width="300" tile>
                    <v-subheader style="color: #ffff00;">TABLE | GRAPH</v-subheader>
                    <v-menu flat transition="slide-x-transition" bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn style=" width: 99%; border-radius: 0%; background-color: #ffff00; color: #000;" dark
                                v-bind="attrs" v-on="on">
                                MENU TABLE
                            </v-btn>
                        </template>
                        <v-list flat class="pt-0" style="background-color: #ffffe6;">
                            <v-card-text class="text-center" style="background-color:#000; color: #ffff00;">
                                <h3>TABLE</h3>
                            </v-card-text>
                            <v-divider style="background-color: #000;" />
                            <v-list-item class="ma-0 py-0 pl-0 pr-2" style="width: 100%;"
                                @click="changeGraph('Customer complaint')" @mouseenter="expand = 'btn-1'"
                                @mouseleave="expand = ''">
                                <v-btn class="pl-2 pr-3 " text
                                    style="width: 100%; color:#000; border-top-right-radius: 50px; border-bottom-right-radius: 50px;"
                                    :style="{ backgroundColor: expand === 'btn-1' ? 'rgb(255, 255, 0)' : '#ffffe6' }">
                                    Customer complaint
                                </v-btn>
                            </v-list-item>
                            <v-list-item class="ma-0 py-0 pl-0 pr-2" style="width: 100%;">
                                <v-btn class="px-2 " text
                                    style="width: 100%; color:#000; border-top-right-radius: 50px; border-bottom-right-radius: 50px;"
                                    :style="{ backgroundColor: expand === 'btn-2' ? 'rgb(255, 255, 0)' : '#ffffe6' }"
                                    @click="changeGraph('Root Cause')" @mouseenter="expand = 'btn-2'"
                                    @mouseleave="expand = ''">
                                    Root Cause
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
                <v-divider style="background-color: #ffff00;"></v-divider>
                <v-card v-if="tabledisplay === 'Customer complaint'" class="mx-auto" max-width="300" tile>
                    <v-list shaped>
                        <v-subheader style="color: #ffff00;">{{ tabledisplay }}</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <v-list-item v-for="(item, i) in itemdatacustomer" :key="i">
                                <v-list-item-content @click="changeGraph('Customer complaint')">
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <v-card v-if="tabledisplay === 'Root Cause'" class="mx-auto" max-width="300" tile>
                    <v-list shaped>
                        <v-subheader style="color: #ffff00;">{{ tabledisplay }}</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <v-list-item v-for="(item, i) in itemdatacustomer" :key="i">
                                <v-list-item-content @click="changeGraph('Root Cause')">
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <v-card-text class="mt-2" style="color: #000;">
                    <h4>STYLE GRAPH</h4>
                </v-card-text>
                <v-divider style="background-color: #000;" />
                <v-col cols="12" sm="12" md="12" class="mt-4 by-4 px-2 ">
                    <v-row class="fill-height pl-2" align="center">
                        <v-item-group mandatory>
                            <v-col v-for="(item, i) in itemsbuton" :key="i">
                                <v-item v-slot="{ active, toggle }">
                                    <v-btn text class="pa-2" style="background-color: transparent; color: transparent;"
                                        @click="showgraph(item.name)">
                                        <v-card flat :style="{
                                            background: graphstyle[0],
                                            border: '2px solid',
                                            borderColor: active ? '#000' : 'white'
                                        }" class="text-center pa-1" @click="toggle">
                                            <v-icon size="35"
                                                :style="{ color: graphform === item.name ? '#000' : '#fff' }">{{ item.icon
                                                }}</v-icon>
                                            <small :style="{ color: graphform === item.name ? '#000' : '#fff' }">{{
                                                item.name }}</small>
                                        </v-card>
                                    </v-btn>
                                </v-item>
                            </v-col>
                        </v-item-group>
                    </v-row>
                </v-col>
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
                                <v-col :cols="showvalue ? 10 : 12" :sm="showvalue ? 9 : 12">
                                    <v-container>
                                        <canvas id="myChart"></canvas>
                                    </v-container>
                                </v-col>
                                <v-col v-if="showvalue" cols="2" sm="6" md="3" class="my-12">
                                    <v-card-text>
                                        <div v-for="(item, index) in dataset" :key="index">
                                            <h4 v-if="item.value !== 0" class="my-4"
                                                :style="{ color: index <= 9 ? tablecolors[index] : '#4d4d00' }">
                                                {{ item.value }} <span style="color: #000;">|</span> {{ item.percentage }}
                                            </h4>
                                            <v-divider style="background-color: #ffff00;"></v-divider>
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
                                <v-col v-if="(!loading && tabledisplay === 'Customer complaint')" cols="6" sm="7" md="7"
                                    class="px-0 py-0">
                                    <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                        <h4 style="color: #b3b300;">DATA TABLE</h4>
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
                                <v-col v-if="(!loading && tabledisplay === 'Root Cause')" cols="12" sm="7" md="7"
                                    class="px-0 py-0">
                                    <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                        <h4 style="color: #b3b300;">DATA TABLE</h4>
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
                                <v-col cols="12" sm="5" md="5" class="px-0 py-0">
                                    <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                        <h4 style="color: #b3b300;">TABLE TIME</h4>
                                        <v-simple-table dense flat class="table-container table-title-hiegth">
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="text-center" style="color: #ffff00;">
                                                            Ticket/KPI
                                                        </th>
                                                        <th class="text-center" style="color:#ffff00;">
                                                            Time ≤ 20m </th>
                                                        <th class="text-center" style="color:#ffff00;">
                                                            Time > 20m
                                                        </th>
                                                        <th class="text-center" style="color:#ffff00;">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="item in datasetdatatime" :key="item.name">
                                                        <td>{{ item.name }}</td>
                                                        <td>{{ item.valuemax }}</td>
                                                        <td>{{ item.valuemin }}</td>
                                                        <td>{{ item.dataall }}</td>
                                                    </tr>
                                                    <tr style="background-color: #ffff00;">
                                                        <td style="color: #000;">
                                                            <h4>
                                                                percentages(%)
                                                            </h4>
                                                        </td>
                                                        <td style="color: #000;">
                                                            <h4>
                                                                {{ percenmax }}
                                                            </h4>
                                                        </td>
                                                        <td style="color: #000;">
                                                            <h4>
                                                                {{ percenmin }}
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
            expand: 'btn-1',
            tabledisplay: 'Customer complaint',
            datacang: true,
            showvalue: true,
            loading: true,
            percenmin: 0,
            percenmax: 0,
            dataset: [],
            datasetdatatime: [],
            tablename: '',
            tabledataall: 0,
            item: [],
            itemdatacustomer: [
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
                'rgba(25, 159, 64, 1)',
                'rgba(254, 19, 64, 1)',
                'rgba(255, 159, 164, 1)',
                'rgba(125, 139, 144, 1)',
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
                // if (this.tabledisplay === 'Customer complaint') {
                const datamin = this.calculateDatamin(this.desserts, 'DATA', 20);
                const datavalue = this.calculateDataValue(this.desserts, 'DATA');
                const datamax = datavalue - datamin;
                const dataminsms = this.calculateDatamin(this.desserts, 'SMS', 20);
                const datavaluesms = this.calculateDataValue(this.desserts, 'SMS');
                const datamaxsms = datavaluesms - dataminsms;
                const dataminvas = this.calculateDatamin(this.desserts, 'VAS', 20);
                const datavaluevas = this.calculateDataValue(this.desserts, 'VAS');
                const datamaxvas = datavaluevas - dataminvas;
                const dataminvoi = this.calculateDatamin(this.desserts, 'VOICE', 20);
                const datavaluevoi = this.calculateDataValue(this.desserts, 'VOICE');
                const datamaxvoi = datavaluevoi - dataminvoi;
                const allDT = datavalue + datavaluevoi + datavaluesms + datavaluevas;
                const minDT = dataminsms + datamin + dataminvoi + dataminvas;
                const percentmin = (((minDT / allDT) * 100).toFixed(2) + '%');
                this.percenmin = percentmin;
                const maxDT = datamaxsms + datamax + datamaxvoi + datamaxvas;
                const percentmax = (((maxDT / allDT) * 100).toFixed(2) + '%');
                this.percenmax = percentmax;
                // const dataothervalue = datad1value + datad2value + datad3value + datad4value;
                const dataObjects = [
                    { name: 'DATA', valuemax: datamax, valuemin: datamin, dataall: datavalue },
                    { name: 'SMS', valuemax: datamaxsms, valuemin: dataminsms, dataall: datavaluesms },
                    { name: 'VAS', valuemax: datamaxvas, valuemin: dataminvas, dataall: datavaluevas },
                    { name: 'VOICE', valuemax: datamaxvoi, valuemin: dataminvoi, dataall: datavaluevoi },
                ];
                const names = dataObjects.map(item => item.name);
                const valuemax = dataObjects.map(item => item.valuemax);
                const valuemin = dataObjects.map(item => item.valuemin);
                const dataall = dataObjects.map(item => item.dataall);
                this.datasetdatatime = names.map((item, index) => ({
                    name: item,
                    valuemin: valuemin[index],
                    valuemax: valuemax[index],
                    dataall: dataall[index],
                }));
                if (this.selectedItem === 0) {
                    const datavalue = this.calculateDataValue(this.desserts, 'DATA');
                    const datad1value = this.calculateDataValue(this.desserts, 'SMS');
                    const datad2value = this.calculateDataValue(this.desserts, 'VAS');
                    const datad3value = this.calculateDataValue(this.desserts, 'VOICE');
                    const dataothervalue = datavalue + datad1value + datad2value + datad3value;
                    this.tablename = 'All';
                    this.tabledataall = dataothervalue;
                    this.names = ['DATA', 'SMS', 'VAS', 'VOICE'];
                    this.value = [datavalue, datad1value, datad2value, datad3value];
                    const percentages = this.value.map(value => {
                        if (value === 0 || value === null) {
                            return '0%';
                        }
                        return ((value / dataothervalue) * 100).toFixed(2) + '%';
                    });
                    this.dataset = this.names.map((item, index) => ({
                        name: item,
                        value: this.value[index],
                        percentage: percentages[index]
                    }));
                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA
                if (this.selectedItem === 1) {
                    const dataallvalue = this.calculateDataValue(this.desserts, 'DATA');
                    if (this.tabledisplay === 'Root Cause') {
                        const datad1value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP036_ລູກຄ້າ', 'TP036_','TP038_Customer Capture 2G') // 'TP036_ລູກຄ້າຈັບສັນຍານ 2G ແນະນໍາລູກຄ້າລີເລັດມືຖືແລ້ວລອງໄໝ່'
                        const datad2value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP006_Cell is very High PRB', 'TP005_', 'High PRB')
                        const datad3value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP002_ເບີ', 'TP002_Number')
                        const datad4value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP027_ສະຖານີມີບັນຫາ', 'TP027_')
                        const datad5value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP018_Customer used old Beeline SIM', 'TP018_')
                        const datad6value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP005_Customer usage up Over Packet','usage up Over Packet')
                        // const datad7value = this.calculateDataD2Value(this.desserts, 'DATA', 'TP005_ລູກຄ້າຢູ່', 'TP005_') // TP005_ລູກຄ້າຢູ່
                        const dataothervalue = dataallvalue - datad1value - datad2value - datad3value - datad4value - datad5value - datad6value;
                        this.tablename = 'DATA All';
                        this.tabledataall = dataallvalue;
                        const dataObjects = [
                            { name: 'Number Was Operational', value: datad3value },
                            { name: 'Customer Capture 2G signal', value: datad1value },
                            { name: 'High PRB', value: datad2value },
                            // { name: 'Customers in high usage areas or full channels.', value: datad7value },
                            { name: 'Sites were down in that area', value: datad4value },
                            { name: 'Usage Old Beeline SIM', value: datad5value },
                            { name: 'Usage Up Package Already', value: datad6value },
                            { name: 'Other', value: dataothervalue }
                        ];
                        // Sort the dataObjects array based on the value property in descending order
                        // dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.map(item => item.name);
                        this.value = dataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const datad1value = this.calculateDataD1Value(this.desserts, 'DATA', 'D1_CONNCET INTERNET ບໍ່ໄດ້');
                        const datad2value = this.calculateDataD1Value(this.desserts, 'DATA', 'D2_DATA ໝົດໄວ');
                        const datad3value = this.calculateDataD1Value(this.desserts, 'DATA', 'D3_INTERNET ຊ້າ');
                        const dataothervalue = dataallvalue - datad1value - datad2value - datad3value;
                        this.tablename = 'DATA All';
                        this.tabledataall = dataallvalue;
                        const dataObjects = [
                            { name: 'D1_CONNCET INTERNET ບໍ່ໄດ້', value: datad1value },
                            { name: 'D2_DATA ໝົດໄວ', value: datad2value },
                            { name: 'D3_INTERNET ຊ້າ', value: datad3value },
                            { name: 'Other', value: dataothervalue }
                        ];
                        // Sort the dataObjects array based on the value property in descending order
                        // dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.map(item => item.name);
                        this.value = dataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION SMS
                if (this.selectedItem === 2) {
                    const dataallvalue = this.calculateDataValue(this.desserts, 'SMS');
                    // Root cause
                    if (this.tabledisplay === 'Root Cause') {
                        const datad1value = this.calculateDataD2Value(this.desserts, 'SMS', 'No SMSMT in HSS');
                        const datad2value = this.calculateDataD2Value(this.desserts, 'SMS', 'Number Was Operational(Sugestion to Setting SMS Center)');
                        const datad3value = this.calculateDataD2Value(this.desserts, 'SMS', 'Received SMS(They did not check SMS)');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value);
                        this.tablename = 'SMS All';
                        this.tabledataall = dataallvalue;
                        const dataObjects = [
                            { name: 'No SMSMT in HSS', value: datad1value },
                            { name: 'Number Was Operational(Sugestion to Setting SMS Center)', value: datad2value },
                            { name: 'Received SMS(They did not check SMS)', value: datad3value },
                            { name: 'Other', value: dataothervalue }
                        ];
                        // Sort the dataObjects array based on the value property in descending order
                        // dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.map(item => item.name);
                        this.value = dataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const datad1value = this.calculateDataD1Value(this.desserts, 'SMS', 'S3_ຮັບ SMS ບໍ່ໄດ້');
                        const datad2value = this.calculateDataD1Value(this.desserts, 'SMS', 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ');
                        const datad3value = this.calculateDataD1Value(this.desserts, 'SMS', 'S6_ເຮັດທຸລະກຳຜ່ານ BANK ແລ້ວບໍ່ໄດ້ OTP CODE');
                        const datad4value = this.calculateDataD1Value(this.desserts, 'SMS', 'SMS');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value + datad4value);
                        this.tablename = 'SMS All';
                        this.tabledataall = dataallvalue;
                        this.names = ['S3_ຮັບ SMS ບໍ່ໄດ້', 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ', 'S6_ເຮັດທຸລະກຳຜ່ານ BANK ແລ້ວບໍ່ໄດ້ OTP CODE', 'sms', 'Other'];
                        this.value = [datad1value, datad2value, datad3value, datad4value, dataothervalue];
                        const percentages = this.value.map(value => {
                            if (value === 0 || value === null) {
                                return '0%';
                            }
                            return ((value / dataallvalue) * 100).toFixed(2) + '%';
                        });
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: percentages[index]
                        }));
                    }

                }

                // Calculate values based on SERVICE_GROUP CLASSIFICATION
                if (this.selectedItem === 3) {
                    const dataallvalue = this.calculateDataValue(this.desserts, 'VAS');
                    if (this.tabledisplay === 'Root Cause') {
                        const datad1value = this.calculateDataD2Value(this.desserts, 'VAS', 'Money Was Deducted by Games');
                        const datad2value = this.calculateDataD2Value(this.desserts, 'VAS', 'Money Was Deducted by Loan Money');
                        const datad3value = this.calculateDataD2Value(this.desserts, 'VAS', 'Money Was Deducted by Package Service');
                        const datad4value = this.calculateDataD2Value(this.desserts, 'VAS', 'Money Was Deducted by SMS');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value + datad4value);
                        this.tablename = 'VAS All';
                        this.tabledataall = dataallvalue;
                        const dataObjects = [
                            { name: 'Money Was Deducted by Games', value: datad1value },
                            { name: 'Money Was Deducted by Loan Money', value: datad2value },
                            { name: 'Money Was Deducted by Package Service', value: datad3value },
                            { name: 'Money Was Deducted by SMS', value: datad4value },
                            { name: 'Other', value: dataothervalue }
                        ];
                        // Sort the dataObjects array based on the value property in descending order
                        // dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.map(item => item.name);
                        this.value = dataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const datad1value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)');
                        const datad2value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້');
                        const datad3value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້');
                        const datad4value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້​');
                        const datad5value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້');
                        const datad6value = this.calculateDataD1Value(this.desserts, 'VAS', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value + datad4value + datad5value + datad6value);
                        this.tablename = 'VAS All';
                        this.tabledataall = dataallvalue;
                        this.names = ['VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້', 'Other'];
                        this.value = [datad1value, datad2value, datad3value, datad4value, datad5value, datad6value, dataothervalue];
                        const percentages = this.value.map(value => {
                            if (value === 0 || value === null) {
                                return '0%';
                            }
                            return ((value / dataallvalue) * 100).toFixed(2) + '%';
                        });
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: percentages[index]
                        }));
                    }

                }
                if (this.selectedItem === 4) {
                    const dataallvalue = this.calculateDataValue(this.desserts, 'VOICE');
                    if (this.tabledisplay === 'Root Cause') {
                        const datad1value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Blocking on their Mobile');
                        const datad2value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Call to Invalid Number');
                        const datad3value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Customer Capture 2G signal');
                        const datad4value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Customer turn off Mobile');
                        const datad5value = this.calculateDataD2Value(this.desserts, 'VOICE', 'In Corrected UCSI Template');
                        const datad6value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Number Was Barring in HSS');
                        const datad7value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Number Was IDLE Status in OCS');
                        const datad8value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Number Was Operational');
                        const datad9value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Number was suspended in OCS');
                        const datad0value = this.calculateDataD2Value(this.desserts, 'VOICE', 'SIM WASLOCKED PROVIDED PIN&PUK');
                        const datad11value = this.calculateDataD2Value(this.desserts, 'VOICE', 'Life Cycle Was Expired');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value + datad4value + datad5value + datad6value + datad7value + datad8value + datad9value + datad0value + datad11value);
                        this.tablename = 'VOICE All';
                        this.tabledataall = dataallvalue;
                        const dataObjects = [
                            { name: 'Blocking on their Mobile', value: datad1value },
                            { name: 'Call to Invalid Number', value: datad2value },
                            { name: 'Customer Capture 2G signal', value: datad3value },
                            { name: 'Customer turn off Mobile', value: datad4value },
                            { name: 'In Corrected UCSI Template', value: datad5value },
                            { name: 'Number Was Barring in HSS', value: datad6value },
                            { name: 'Number Was IDLE Status in OCS', value: datad7value },
                            { name: 'Number Was Operational', value: datad8value },
                            { name: 'Number was suspended in OCS', value: datad9value },
                            { name: 'SIM WASLOCKED PROVIDED PIN&PUK', value: datad0value },
                            { name: 'Life Cycle Was Expired', value: datad11value },
                            { name: 'Other', value: dataothervalue }
                        ];
                        // Sort the dataObjects array based on the value property in descending order
                        // dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.map(item => item.name);
                        this.value = dataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {

                        const datad1value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້');
                        const datad2value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V2_ມີ​ສັນຍານ​ໂທ​ອອກບໍ່​ໄດ້');
                        const datad3value = this.calculateDataD1Value(this.desserts, 'VOICE', 'V3_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າບໍ່​ໄດ້');
                        const datad4value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້​');
                        const datad5value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້');
                        const datad6value = this.calculateDataD1Value(this.desserts, 'VOICE', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້');
                        const dataothervalue = dataallvalue - (datad1value + datad2value + datad3value + datad4value + datad5value + datad6value);
                        this.tablename = 'VOICE All';
                        this.tabledataall = dataallvalue;
                        this.names = ['VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)', 'VA2_ຕື່ມເງິນ ບໍ່ໄດ້', 'VA4_ສະໝັກ PACKAGE ບໍ່ໄດ້', 'VA6_ສະໝັກ ແລະ ຍົກເລີກ ບໍລິການເສີມບໍ່​ໄດ້', 'VA17_ກວດເງີນຜ່ານໜ້າຈໍບໍ່ໄດ້', 'VA29_ເບີໃໝ່ນຳໃຊ້ບໍ່ໄດ້', 'Other'];
                        this.value = [datad1value, datad2value, datad3value, datad4value, datad5value, datad6value, dataothervalue];
                        const percentages = this.value.map(value => {
                            if (value === 0 || value === null) {
                                return '0%';
                            }
                            return ((value / dataallvalue) * 100).toFixed(2) + '%';
                        });
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: percentages[index]
                        }));
                    }

                };

                // }
                // else if(this.tabledisplay==='Root Cause'){

                // }
                // else {
                //     console.log('Error data not faut ')
                // }
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
        calculateDataD2Value(data, serviceGroup, serviceGroupD1, serviceGroupD2,serviceGroupD3) {
            return data.reduce((sum, entry) => {
                const description = entry.WORKLONG_DESCRIPTOIN || '';
                // Check if description contains either serviceGroupD1 or serviceGroupD2
                if ((entry.SERVICE_GROUP === serviceGroup) &&
                    (description.includes(serviceGroupD1) || description.includes(serviceGroupD2) || description.includes(serviceGroupD3))) {
                    return sum + 1;
                }
                return sum;
            }, 0);
        },
        calculateDatamin(data, serviceGroup, threshold) {
            // Assuming "SERVICE_GROUP" is the key you want to filter on
            return data.reduce((sum, entry) => {
                if (entry.SERVICE_GROUP === serviceGroup && entry.TIME_DO_TPLUS <= threshold) {
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
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(25, 159, 64, 0.5)',
                                'rgba(254, 19, 64, 0.5)',
                                'rgba(255, 159, 164, 0.5)',
                                'rgba(125, 139, 144, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(25, 159, 64, 1)',
                                'rgba(254, 19, 64, 1)',
                                'rgba(255, 159, 164, 1)',
                                'rgba(125, 139, 144, 1)',
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
            console.log(this.tabledisplay)
            this.i = false;
        },
        changeGraph(itemvalue) {
            this.i = true;
            this.graphType();
            this.tabledisplay = itemvalue;
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
            }, 500);
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
            }, 500);
        },
        updateShowProperty() {
            // Update 'show' property based on window width
            this.showvalue = window.innerWidth > 980;
        }

    },
    mounted() {
        this.graphType();
        this.updateShowProperty();

        // Listen for window resize events and update 'show' property accordingly
        window.addEventListener('resize', this.updateShowProperty);
    },
    beforeDestroy() {
        // Remove the window resize event listener to prevent memory leaks
        window.removeEventListener('resize', this.updateShowProperty);
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

@media only screen and (max-width: 980px) {
    .grid {
        display: none;
    }

    /* Update the 'show' property to false for screen width less than or equal to 1600px */
    :root {
        --showvalue-value: false;
    }
}

/* Use the custom property to set the 'show' property */
.grid {
    display: var(--showvalue-value, grid);
}
</style>
  