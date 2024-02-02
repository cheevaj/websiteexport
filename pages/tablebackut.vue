 <template>
    <!-- Main card containing the entire component -->
    <v-card class="mx-auto text-center mx-2" color="#ffff00" dark>
        <!-- Sidebar column with menu and buttons -->
        <v-row>
            <v-col cols="2" class="py-0 pl-2 pr-0">
                <!-- Card for menu and subheader -->
                <v-card class="mx-auto pb-4" max-width="300" tile>
                    <!-- Subheader with TABLE | GRAPH text -->
                    <v-subheader style="color: #ffff00;">TABLE | GRAPH</v-subheader>
                    <!-- Dropdown menu for table selection -->
                    <v-menu flat transition="slide-x-transition" bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <!-- Button to activate the menu -->
                            <v-btn style=" width: 99%; border-radius: 0%; background-color: #ffff00; color: #000;" dark
                                v-bind="attrs" v-on="on">
                                MENU TABLES
                                <v-icon>mdi-table-sync</v-icon>
                            </v-btn>
                        </template>
                        <!-- List of table options in the menu -->
                        <v-list flat class="pt-0" style="background-color: #ffffe6;">
                            <!-- ... (List items for different tables) -->
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
                            <!--new------------->
                            <v-list-item class="ma-0 py-0 pl-0 pr-2" style="width: 100%;">
                                <v-btn class="px-2 " text
                                    style="width: 100%; color:#000; border-top-right-radius: 50px; border-bottom-right-radius: 50px;"
                                    :style="{ backgroundColor: expand === 'btn-3' ? 'rgb(255, 255, 0)' : '#ffffe6' }"
                                    @click="changeGraph('Root Cause Report')" @mouseenter="expand = 'btn-3'"
                                    @mouseleave="expand = ''">
                                    Root Cause Report
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
                <v-divider style="background-color: #ffff00;"></v-divider>
                <!-- Cards for different tables based on selection -->
                <v-card v-if="tabledisplay === 'Customer complaint'" class="mx-auto" max-width="300" tile>
                    <!-- ... (Content for Customer complaint table) -->
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
                    <!-- ... (Content for Root Cause table) -->
                    <v-list shaped>
                        <v-subheader style="color: #ffff00;">{{ tabledisplay }}</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <!-- Use v-if on the v-list-item to conditionally render it -->
                            <v-list-item v-for="(item, i) in itemdatacust" :key="i">
                                <v-list-item-content @click="changeGraph('Root Cause')">
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <v-card v-if="tabledisplay === 'Root Cause Report'" class="mx-auto" max-width="300" tile>
                    <!-- ... (Content for Root Cause Report table) -->
                    <v-list shaped>
                        <v-subheader style="color: #ffff00;">{{ tabledisplay }}</v-subheader>
                        <v-list-item-group v-model="selectedItem" color="yellow">
                            <v-list-item v-for="(item, i) in itemdatarootall" :key="i">
                                <v-list-item-content @click="changeGraph('Root Cause Report')">
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
                <div>
                    <!-- Section for styling the graph -->
                    <!-- ... (Buttons for styling the graph) -->
                    <v-card-text class="mt-2" style="color: #000;">
                        <h4>STYLE GRAPH</h4>
                    </v-card-text>
                    <v-divider style="background-color: #000;" />
                    <v-col cols="12" sm="12" md="12" class="mt-4 by-4 px-2">
                        <v-item-group mandatory>
                            <v-row class="fill-height">
                                <v-col v-for="(item, i) in itemsbuton" :key="i" class="px-1 pt-1">
                                    <v-item v-slot="{ active, toggle }">
                                        <v-btn text class="pa-2" style="background-color: transparent; color: transparent;"
                                            @click="showgraph(item.name)">
                                            <v-card flat :style="{
                                                background: graphstyle[0],
                                                border: '2px solid',
                                                borderColor: active ? '#000' : 'white'
                                            }" class="text-center pa-1" @click="toggle">
                                                <v-icon size="35"
                                                    :style="{ color: graphform === item.name ? '#000' : '#fff' }">{{
                                                        item.icon
                                                    }}</v-icon>
                                            </v-card>
                                        </v-btn>
                                    </v-item>
                                </v-col>
                            </v-row>
                        </v-item-group>
                    </v-col>
                </div>
            </v-col>
            <!-- Main content column with the graph and data tables -->
            <v-col cols="10" class="pa-0">
                <!-- ... (Content for loading state, graph, and data tables) -->
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
                                <v-col cols="12" class="py-1">
                                    <v-container>
                                        <v-card-text>
                                            <canvas height="96px" id="myChart"></canvas>
                                        </v-card-text>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <div class="px-1">
                            <v-divider style="background-color: #ffff00;"></v-divider>
                        </div>
                        <v-card-text style="background-color: rgba(255, 206, 86,0.1);">
                            <v-row>
                                <v-col
                                    v-if="(!loading && (tabledisplay === 'Customer complaint' || tabledisplay === 'Root Cause Report'))"
                                    cols="12" sm="7" md="7" class="px-0 py-0">
                                    <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                        <h4 style="color: #b3b300;">DATA TABLE</h4>
                                        <v-simple-table dense flat fixed-header class="table-container table-title-hiegth">
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
                        </v-card-text>
                    </v-sheet>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
import Chart from 'chart.js';
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
            showstrygraph: true,
            loading: true,
            percenmin: 0,
            percenmax: 0,
            dataset: [],
            data_desserts: [],
            datasetdatatime: [],
            item: [],
            tablename: '',
            tabledataall: 0,
            itemdatacustomer: [
                { text: 'SERVICE GROUP' },
                { text: 'DATA' },
                { text: 'SMS' },
                { text: 'VAS' },
                { text: 'VOICE' },
            ],
            itemdatacust: [
                { text: 'FOR DATA' },
                { text: 'FOR SMS' },
                { text: 'FOR VAS' },
                { text: 'FOR VOICE' },
            ],
            itemdatarootall: [
                { text: 'System/User' },
                { text: 'Resolve by Tier' },
                { text: 'Department' },
                { text: 'Resolve Owner' },
                { text: 'Province' },
                { text: 'Channel' },
            ],
            selectedItem: 0,
            itemsbuton: [
                { icon: 'mdi-align-horizontal-left', name: 'horizontalBar' },
                { icon: 'mdi-chart-bar', name: 'bar' },
                { icon: 'mdi-chart-areaspline-variant', name: 'line' },
                { icon: 'mdi-chart-pie', name: 'pie' },
            ],
            graphform: 'horizontalBar',
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
        // -------- Function get Data from page table use this page
        getData() {
            try {
                // Calculate min, max, and total values for different service groups (DATA, SMS, VAS, VOICE)
                const datamin = this.calculateDatamin(this.desserts, 'DATA', 20);
                const datavalue = this.calculateDataValue(this.desserts, 'DATA', 'DA');
                const datamax = datavalue - datamin;
                const dataminsms = this.calculateDatamin(this.desserts, 'SMS', 20);
                const datavaluesms = this.calculateDataValue(this.desserts, 'SMS', 'DA');
                const datamaxsms = datavaluesms - dataminsms;
                const dataminvas = this.calculateDatamin(this.desserts, 'VAS', 20);
                const datavaluevas = this.calculateDataValue(this.desserts, 'VAS', 'DA');
                const datamaxvas = datavaluevas - dataminvas;
                const dataminvoi = this.calculateDatamin(this.desserts, 'VOICE', 20);
                const datavaluevoi = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
                const datamaxvoi = datavaluevoi - dataminvoi;
                // Calculate totals and percentages for all service groups
                const allDT = datavalue + datavaluevoi + datavaluesms + datavaluevas;
                const minDT = dataminsms + datamin + dataminvoi + dataminvas;
                const percentmin = (((minDT / allDT) * 100).toFixed(2) + '%');
                this.percenmin = percentmin;
                const maxDT = datamaxsms + datamax + datamaxvoi + datamaxvas;
                const percentmax = (((maxDT / allDT) * 100).toFixed(2) + '%');
                this.percenmax = percentmax;
                // Create an array of data objects for each service group
                const dataObjects = [
                    { name: 'DATA', valuemax: datamax, valuemin: datamin, dataall: datavalue },
                    { name: 'SMS', valuemax: datamaxsms, valuemin: dataminsms, dataall: datavaluesms },
                    { name: 'VAS', valuemax: datamaxvas, valuemin: dataminvas, dataall: datavaluevas },
                    { name: 'VOICE', valuemax: datamaxvoi, valuemin: dataminvoi, dataall: datavaluevoi },
                ];
                // Extract names, max values, min values, and total values from dataObjects
                const names = dataObjects.map(item => item.name);
                const valuemax = dataObjects.map(item => item.valuemax);
                const valuemin = dataObjects.map(item => item.valuemin);
                const dataall = dataObjects.map(item => item.dataall);
                // Create a datasetdatatime array with formatted data for display
                this.datasetdatatime = names.map((item, index) => ({
                    name: item,
                    valuemin: valuemin[index],
                    valuemax: valuemax[index],
                    dataall: dataall[index],
                }));
                // Process data for table display based on selectedItem and tabledisplay
                if (this.desserts === undefined) {
                    console.error('Response is undefined');
                    throw new Error('Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }

            // --- go to function graphShow;
            this.graphShow();
            this.loading = false;
        },
        dataCustomer() {
            const dataDATA = this.calculateDataValue(this.desserts, 'DATA', 'DA');
            const dataSMS = this.calculateDataValue(this.desserts, 'SMS', 'DA');
            const dataVAS = this.calculateDataValue(this.desserts, 'VAS', 'DA');
            const dataVOICE = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
            if (this.selectedItem === 0) {
                const dataothervalue = dataDATA + dataSMS + dataVAS + dataVOICE;
                this.tablename = 'All';
                this.tabledataall = dataothervalue;
                // Get data style Objects from table service grops
                const dataObjects = [
                    { name: 'DATA', value: dataDATA },
                    { name: 'SMS', value: dataSMS },
                    { name: 'VAS', value: dataVAS },
                    { name: 'VOICE', value: dataVOICE },
                ];
                dataObjects.sort((a, b) => b.value - a.value);
                // get data to use graph 
                this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                this.value = dataObjects.filter(item => item.value > 0).map(item => item.value); // get data to use graph (graph values)
                const percentages = this.value.map(value => ((value / dataothervalue) * 100).toFixed(2));
                // get data to use table desplay datas
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 1) {
                this.tablename = 'DATA All';
                this.tabledataall = dataDATA;
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'DATA');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataD1Value(this.desserts, 'DATA', name),
                }));
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataDATA) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 2) {
                this.tablename = 'SMS All';
                this.tabledataall = dataSMS;
                const uniqueNames = this.loopname(this.desserts, 'SMS', 'DATA');
                const dataObjects = uniqueNames.map((name) => ({
                    name,
                    value: this.calculateDataD1Value(this.desserts, 'SMS', name),
                }));
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map((item) => item.name);
                this.value = dataObjects.map((item) => item.value);
                const percentages = this.value.map((value) => ((value / dataSMS) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 3) {
                this.tablename = 'VAS All';
                this.tabledataall = dataVAS;
                const uniqueNames = this.loopname(this.desserts, 'VAS', 'DATA');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataD1Value(this.desserts, 'VAS', name)
                }));
                // Sort the dataObjects array based on the value property in descending order
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataVAS) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 4) {
                this.tablename = 'VOICE All';
                this.tabledataall = dataVOICE;
                const uniqueNames = this.loopname(this.desserts, 'VOICE', 'DATA');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataD1Value(this.desserts, 'VOICE', name)
                }));
                // Sort the dataObjects array based on the value property in descending order
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataVOICE) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            this.dataset = this.dataset.filter(item => item.value > 0); // Filter out items with zero values
        },
        dataRoot() {
            const dataDATA = this.calculateDataValue(this.desserts, 'DATA', 'DA');
            const dataSMS = this.calculateDataValue(this.desserts, 'SMS', 'DA');
            const dataVAS = this.calculateDataValue(this.desserts, 'VAS', 'DA');
            const dataVOICE = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
            if (this.selectedItem === 0) {
                this.tablename = 'All';
                this.tabledataall = dataDATA;
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'Root');
                // console.log('test', uniqueNames)
                const dataObjects = uniqueNames.map((name) => ({
                    name: this.changeNameroot(name),
                    value: this.calculateDataD2Value(this.desserts, 'DATA', name),
                }));
                // arrow function find value max to min  
                dataObjects.sort((a, b) => b.value - a.value); // Sort dataObjects based on value in descending order
                // get data to use graph 
                this.names = dataObjects.map((item) => item.name); // get data to use graph (graph names)
                this.value = dataObjects.map((item) => item.value); // get data to use graph (graph values)
                const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                // get data to use table desplay datas
                // Format data for both graph and table display
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 1) {
                this.tablename = 'SMS All';
                this.tabledataall = dataSMS;
                const uniqueNames = this.loopname(this.desserts, 'SMS', 'Root');
                const dataObjects = uniqueNames.map((name) => ({
                    name: this.changeNameroot(name),
                    value: this.calculateDataD2Value(this.desserts, 'SMS', name),
                }));
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map((item) => item.name);
                this.value = dataObjects.map((item) => item.value);
                const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            } if (this.selectedItem === 2) {
                this.tablename = 'VAS All';
                this.tabledataall = dataVAS;
                const uniqueNames = this.loopname(this.desserts, 'VAS', 'Root');
                const dataObjects = uniqueNames.map((name) => ({
                    name: this.changeNameroot(name),
                    value: this.calculateDataD2Value(this.desserts, 'VAS', name),
                }));
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map((item) => item.name);
                this.value = dataObjects.map((item) => item.value);
                const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 3) {
                this.tablename = 'VOICE All';
                this.tabledataall = dataVOICE;
                const uniqueNames = this.loopname(this.desserts, 'VOICE', 'Root');
                const dataObjects = uniqueNames.map((name) => ({
                    name: this.changeNameroot(name),
                    value: this.calculateDataD2Value(this.desserts, 'VOICE', name),
                }));
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map((item) => item.name);
                this.value = dataObjects.map((item) => item.value);
                const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            this.dataset = this.dataset.filter(item => item.value > 0); // Filter out items with zero values
        },
        dataReport() {
            if (this.selectedItem === 0) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'OWNER');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'OWNER'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 1) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'TI');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'TI'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 2) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'DP');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'DP'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 3) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'RSOWNER');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'RSOWNER'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 4) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'PV');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'PV'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            if (this.selectedItem === 5) {
                const uniqueNames = this.loopname(this.desserts, 'DATA', 'CHAN');
                const dataObjects = uniqueNames.map(name => ({
                    name,
                    value: this.calculateDataValue(this.desserts, name, 'CHAN'),
                }));
                this.tablename = 'All';
                const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                this.tabledataall = dataallvalue;
                dataObjects.sort((a, b) => b.value - a.value);
                this.names = dataObjects.map(item => item.name);
                this.value = dataObjects.map(item => item.value);
                const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                this.dataset = this.names.map((item, index) => ({
                    name: item,
                    value: this.value[index],
                    percentage: `${percentages[index]}%`,
                }));
            }
            this.dataset = this.dataset.filter(item => item.value > 0); // Filter out items with zero values
        },
        // -------- Function loop Data of table SERVICE GROUP
        // Define a function named calculateDataValue that takes three parameters: data, serviceGroup, and status
        calculateDataValue(data, serviceGroup, status) {
            // Use the reduce function to iterate over the data array and accumulate a sum based on the specified conditions
            return data.reduce((sum, entry) => {
                // Use a switch statement to handle different cases based on the provided 'status'
                switch (status) {
                    // If 'status' is 'DA', check if the SERVICE_GROUP property of the entry matches the provided 'serviceGroup'
                    case 'DA':
                        if (entry.SERVICE_GROUP === serviceGroup) sum++;
                        break;
                    // If 'status' is 'OWNER', check if the ROOT_CAUSE_BY_STATUS property of the entry matches the provided 'serviceGroup'
                    case 'OWNER':
                        if (entry.ROOT_CAUSE_BY_STATUS === serviceGroup) sum++;
                        break;
                    // If 'status' is 'DP', check if the ROOT_CAUSE_BY_DEPARTMENT property of the entry matches the provided 'serviceGroup'
                    case 'DP':
                        if (entry.ROOT_CAUSE_BY_DEPARTMENT === serviceGroup) sum++;
                        break;
                    // If 'status' is 'TI', check if the ROOT_CAUSE_BY_TIER property of the entry matches the provided 'serviceGroup'
                    case 'TI':
                        if (entry.ROOT_CAUSE_BY_TIER === serviceGroup) sum++;
                        break;
                    // If 'status' is 'RSOWNER', check if the RESOLVE_CHANGBY property of the entry matches the provided 'serviceGroup'
                    case 'RSOWNER':
                        if (entry.RESOLVE_CHANGBY === serviceGroup) sum++;
                        break;
                    // If 'status' is 'PV', check if the PROVINCE property of the entry matches the provided 'serviceGroup'
                    case 'PV':
                        if (entry.PROVINCE === serviceGroup) sum++;
                        break;
                    // If 'status' is 'CHAN', check if the CREATEDBY property of the entry starts with the provided 'serviceGroup'
                    case 'CHAN':
                        if (entry.CREATEDBY.startsWith(serviceGroup)) sum++;
                        break;
                }
                // Return the accumulated sum
                return sum;
            }, 0); // Initialize the sum to 0
        },
        // -------- Function loop Data similar 
        loopname(data, serviceGroup, status) {
            if (status === 'DATA') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (entry.SERVICE_GROUP === serviceGroup && typeof entry.CLASSIFICATION === 'string') {
                        uniqueNames.add(entry.CLASSIFICATION);
                    }
                });
                return Array.from(uniqueNames);
            }
            else if (status === 'OWNER') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.ROOT_CAUSE_BY_STATUS === 'string') {
                        const n = entry.ROOT_CAUSE_BY_STATUS;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'DP') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.ROOT_CAUSE_BY_DEPARTMENT === 'string') {
                        const n = entry.ROOT_CAUSE_BY_DEPARTMENT;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'TI') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.ROOT_CAUSE_BY_TIER === 'string') {
                        const n = entry.ROOT_CAUSE_BY_TIER;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'RSOWNER') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.RESOLVE_CHANGBY === 'string') {
                        const n = entry.RESOLVE_CHANGBY;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'CHAN') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.CREATEDBY === 'string') {
                        const n = entry.CREATEDBY;
                        const changeCre = n.substring(0, 8);
                        // Check if changeCre is a string and has at least 8 characters
                        if (typeof changeCre === 'string' && changeCre.length >= 8) {
                            const adjustedName = this.adjustName(changeCre.substring(0, 8));
                            uniqueNames.add(adjustedName);
                        }
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'PV') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (typeof entry.PROVINCE === 'string') {
                        const n = entry.PROVINCE;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
            else if (status === 'Root') {
                const uniqueNames = new Set();
                data.forEach((entry) => {
                    if (entry.SERVICE_GROUP === serviceGroup && typeof entry.WORKLONG_DESCRIPTOIN === 'string') {
                        const n = entry.WORKLONG_DESCRIPTOIN;
                        const adjustedName = this.adjustName(n);
                        uniqueNames.add(adjustedName);
                    }
                });
                const namesArray = Array.from(uniqueNames);
                return namesArray;
            }
        },
        adjustName(name) {
            if (typeof name === 'string') {
                const text = name.substring(0, 7);
                for (let i = 0; i < text.length; i++) {
                    const a = text.substring(i, i + 1);
                    if (a === '_') {
                        const id = name.substring(0, i + 1);
                        return id.substring(0, 2) === 'TP' ? (id.substring(2, 3) === '0' ? id.substring(0, 2) + id.substring(3) : id.substring(0)) : name.substring(0, i + 1);
                    }
                }
                return name;
            } else {
                return name;
            }
        },
        // -------- Function look Data of Customer complaint tables
        calculateDataD1Value(data, serviceGroup, serviceGroupD1) {
            const nameservice = this.changservice(serviceGroupD1);
            return data.reduce((sum, entry) => {
                const textname = entry.CLASSIFICATION || '';
                const description = this.changservice(this.adjustName(textname));
                if (entry.SERVICE_GROUP === serviceGroup) {
                    const namedescription = description.substring(0, 5);
                    if (namedescription.includes(serviceGroupD1) || namedescription.includes(nameservice) || (textname === nameservice)) {
                        return sum + 1;
                    } else {
                        return sum;
                    }
                }
                return sum;
            }, 0);
        },
        // -------- Function Look Data of Root Cause tables
        calculateDataD2Value(data, serviceGroup, serviceGroupD1) {
            const nameservice = this.changservice(serviceGroupD1);
            return data.reduce((sum, entry) => {
                const textname = entry.WORKLONG_DESCRIPTOIN || '';
                const description = this.changservice(this.adjustName(textname));
                // const namechange = this.changservice(description)
                if (entry.SERVICE_GROUP === serviceGroup) {
                    const namedescription = description.substring(0, 5);
                    if (namedescription.includes(serviceGroupD1) || namedescription.includes(nameservice) || (textname === nameservice)) {
                        return sum + 1;
                    } else {
                        return sum;
                    }
                }
                return sum;
            }, 0);
        },
        // -------- Function Change vervice ID 
        changservice(nameservice) {
            const SERVICE = nameservice.substring(0, 7);
            const indexOfA = SERVICE.indexOf('_');
            if (SERVICE !== undefined) {
                if (SERVICE.substring(0, 2) === 'TP') {
                    return indexOfA === (3) ? SERVICE.substring(0, 2) + '0' + SERVICE.substring(2) : SERVICE.substring(0, indexOfA + 1);
                } else if ((indexOfA !== 0) && (SERVICE.substring(0, 2) !== 'TP') && (indexOfA !== -1)) {
                    return SERVICE.substring(0, indexOfA + 1);
                }
                else if (indexOfA === - 1) {
                    const SERVICE = nameservice.substring(0);
                    return SERVICE;
                }
            } else {
                console.log('undefineddata');
            }
        },
        changeNameroot(ID) {
            if (ID !== undefined && ID.indexOf('_') > 0 && ID.startsWith('TP')) {
                const idToNameMap = {
                    // 1-10
                    'TP01_': 'Number Was Barring in HSS',
                    'TP02_': 'Number Was Operational',
                    'TP03_': 'Number was Blacklist in OCS',
                    'TP04_': 'Usage Up Package Already',
                    'TP05_': 'High PRB',
                    'TP06_': 'No Have 3G/4G Profile',
                    'TP07_': 'Wrong Profile in SPNV',
                    'TP08_': 'No Package',
                    'TP09_': 'Number was suspended in OCS',
                    'TP10_': 'Money Was Deducted by Voice',
                    // 11 -20
                    'TP11_': 'Money Was Deducted by SMS',
                    'TP12_': 'Money Was Deducted by Games',
                    'TP13_': 'Money Was Deducted by Loan Money',
                    'TP14_': 'Money Was Deducted by Transfer to Others',
                    'TP15_': 'No Balance',
                    'TP16_': 'Usage Old Beeline SIM',
                    'TP17_': 'SIM WASLOCKED PROVIDED PIN&PUK',
                    'TP18_': 'Received Package Normal(They did not check SMS)',
                    'TP19_': 'Received Balance Normal(They did not check SMS)',
                    'TP20_': 'Customer Need to Cancel RBT',
                    // 21-30
                    'TP21_': 'System Problem',
                    'TP22_': 'Cancle Call Forward',
                    'TP23_': 'Scratch Card Was not Activate with Bonus',
                    'TP24_': 'Scratch Card was used up ',
                    'TP25_': 'More checking with Owner Apps',
                    'TP26_': 'Wrong Default PW',
                    'TP27_': 'Sites were down in that area',
                    'TP30_': 'More checking with Owner Apps',
                    // 31-40
                    'TP32_': 'Weak Coverage Signal',
                    'TP33_': 'Received SMS(They did not check SMS)',
                    'TP34_': 'Number Was Operational(Sugestion to Setting SMS Center)',
                    'TP35_': 'Money Was Deducted by Lottery Service',
                    'TP36_': 'Customer Capture 2G signal)',
                    'TP40_': 'Call to Invalid Number',
                    'TP41_': 'No Offerring In CBS',
                    'TP42_': 'Money Was Deducted by Rentle Package Service',
                    'TP43_': 'Money Was Deducted by Package Service',
                    'TP44_': 'PIN Code of Scrath Card In Correct',
                    'TP45_': 'Life Cycle Was Expired',
                    'TP46_': 'Activate Sim Failure',
                    'TP50_': 'In Corrected UCSI Template',
                    'TP51_': 'Full Counter (Package) in Supernova',
                    'TP52_': 'Received Promotion Normal(They did not check SMS)',
                    'TP53_': 'Blocking on their Mobile',
                    'TP54_': 'In Corrected USSD Code ',
                    'TP56_': 'Customer turn off Mobile',
                    'TP59_': 'Customer Need to Cancel Package( It Usage Up)',
                    'TP60_': 'Data Package is avaliable',
                    'TP57_': 'Extended Lifecycle of Package Expire',
                    'TP63_': 'Number Was IDLE Status in OCS',
                    'TP64_': 'No SMSMT in HSS',
                    // add more entries if needed
                };
                const name = idToNameMap[ID] || ID; // use the mapped name or the original ID if not found
                return name;
            } else {
                return ID;
            }
        },
        // -------- Function Assuming "SERVICE_GROUP" date time do
        calculateDatamin(data, serviceGroup, threshold) {
            // Assuming "SERVICE_GROUP" is the key you want to filter on
            return data.reduce((sum, entry) => {
                if (entry.SERVICE_GROUP === serviceGroup && entry.TIME_DO_TPLUS <= threshold) {
                    return sum + 1;
                }
                return sum;
            }, 0);
        },

        // -------- Function Graph 
        graphShow() {
            const ctx = document.getElementById('myChart').getContext('2d');
            // Clear existing chart
            if (this.myChart) {
                this.myChart.destroy();
            }
            const chartData = {
                labels: this.names,
                datasets: [{
                    data: this.value,
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
                        display: this.graphform === 'pie',
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
        // clange graph style desplay  
        changeGraph(itemvalue) {
            this.i = true;
            this.graphType();
            this.tabledisplay = itemvalue;
        },
        graphType() {
            // Set up the initial interval
            this.intervalId = setInterval(() => {
                if (this.i) {
                    if (this.tabledisplay === 'Customer complaint') {
                        this.dataCustomer();
                    }
                    else if (this.tabledisplay === 'Root Cause') {
                        this.dataRoot();
                    }
                    else if (this.tabledisplay === 'Root Cause Report') {
                        this.dataReport();
                    }
                    // this.getData();
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
            this.showstrygraph = window.innerWidth > 980;
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

.table-title-hiegth {
    max-height: 260px;
    overflow-y: auto;
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
  