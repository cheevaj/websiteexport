<template>
    <!-- Main card containing the entire component -->
    <div>
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
                                <v-list-item v-for="(item, index) in menuItems" :key="index" class="ma-0 py-0 pl-0 pr-2"
                                    style="width: 100%;" :disabled="(tabledisplay === 'Targets' && index === 3)"
                                    @click="changeGraph(item.name)" @mouseenter="expand = `btn-${index + 1}`"
                                    @mouseleave="expand = ''">
                                    <v-btn class="px-2" text
                                        style="width: 100%; color:#000; border-top-right-radius: 50px; border-bottom-right-radius: 50px;"
                                        :style="{ backgroundColor: expand === `btn-${index + 1}` ? 'rgb(255, 255, 0)' : '#ffffe6' }">
                                        {{ item.label }}
                                    </v-btn>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-card>
                    <v-divider style="background-color: #ffff00;"></v-divider>
                    <!-- Cards for different tables based on selection -->
                    <v-card v-if="tabledisplay === 'Customer Complaint'" class="mx-auto" max-width="300" tile>
                        <!-- ... (Content for Customer Complaint table) -->
                        <v-list shaped>
                            <v-subheader style="color: #ffff00;">{{ tabledisplay }}</v-subheader>
                            <v-list-item-group v-model="selectedItem" color="yellow">
                                <v-list-item v-for="(item, i) in itemdatacustomer" :key="i"
                                    @click="changeGraph('Customer Complaint')">
                                    <v-list-item-content>
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
                                <v-list-item v-for="(item, i) in itemdatacust" :key="i" @click="changeGraph('Root Cause')">
                                    <v-list-item-content>
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
                                <v-list-item v-for="(item, i) in itemdatarootall" :key="i"
                                    @click="changeGraph('Root Cause Report')">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ item.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card>
                    <div v-if="this.tabledisplay !== 'Targets'">
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
                                            <v-btn text class="pa-2"
                                                style="background-color: transparent; color: transparent;"
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
                    <div v-else>
                        <v-card flat class="rounded-0" style="background-color: #ffffe6;">
                            <v-card-text class="pa-0" style="background-color:#000;color:#ffff00">
                                <v-row>
                                    <v-col cols="12" class="pl-1 pt-0 pb-0" style="padding-right: 13px;">
                                        <v-card-text class="pa-0 mb-1"
                                            style="color: #000; background-color: #ffff00; border-radius: 20px;"
                                            :style="{ backgroundColor: targetDate === 'date' ? '#b3b300' : '#ffff00' }">
                                            <v-btn class="py-2 rounded-0" text
                                                style="width: 100%; height: 100%; color: #000;"
                                                @click="targetDate = 'date'">
                                                dates
                                            </v-btn>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="12" class="pl-1 pt-0 pb-0" style="padding-right: 13px;">
                                        <v-card-text class="pa-0 mb-1" style="color: #000; border-radius: 20px;"
                                            :style="{ backgroundColor: targetDate === 'service' ? '#b3b300' : '#ffff00' }">
                                            <v-btn class="py-2 rounded-0" text
                                                style="width: 100%; height: 100%; color: #000;"
                                                @click="targetDate = 'service'">
                                                service
                                            </v-btn>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="12" class="pl-1 pt-0" style="padding-right: 13px;">
                                        <v-card-text class="pa-0 mb-1"
                                            style="color: #000; background-color: #ffff00; border-radius: 20px;"
                                            :style="{ backgroundColor: (targetDate === 'user') || (targetDate === 'userAll') ? '#b3b300' : '#ffff00' }">
                                            <v-btn class="py-2 rounded-0" text
                                                style="width: 100%; height: 100%; color: #000;"
                                                @click="targetDate = 'user'">
                                                user
                                            </v-btn>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                                <v-divider style="background-color: #000;"></v-divider>
                            </v-card-text>
                            <v-card-text class="px-2 py-1" style="color: #000;">
                                <div>
                                    <h4>
                                        Time Do Tplus
                                    </h4>
                                    <div>
                                        <v-card-actions class="pa-0">
                                            <p class="px-2 rounded-6"
                                                :style="{ backgroundColor: checkTargetDo === 'Achieved the Target' ? 'rgb(198, 255, 179)' : 'rgb(255, 214, 204)' }">
                                                {{
                                                    checkTargetDo }}</p>
                                            <v-spacer></v-spacer>
                                            <v-icon v-if="checkTargetDo === 'Achieved the Target'"
                                                color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                            <v-icon v-else color="error">mdi-close-box</v-icon>
                                        </v-card-actions>
                                        <h3
                                            :style="{ color: checkTargetDo === 'Achieved the Target' ? 'rgb(0, 230, 0)' : 'rgb(255, 71, 26)' }">
                                            {{ percentTimeDoTa }}
                                        </h3>
                                    </div>
                                </div>
                                <v-divider style="background-color: #ffff00;"></v-divider>
                                <div>
                                    <h4>
                                        Time Care Tplus
                                    </h4>
                                    <div>
                                        <v-card-actions class="pa-0">
                                            <p class="px-2"
                                                :style="{ backgroundColor: checkTargetCare === 'Achieved the Target' ? 'rgb(198, 255, 179)' : 'rgb(255, 214, 204)' }">
                                                {{ checkTargetCare }}</p>
                                            <v-spacer></v-spacer>
                                            <v-icon v-if="checkTargetCare === 'Achieved the Target'"
                                                color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                            <v-icon v-else color="error">mdi-close-box</v-icon>
                                        </v-card-actions>
                                    </div>
                                    <h3
                                        :style="{ color: checkTargetCare === 'Achieved the Target' ? 'rgb(0, 230, 0)' : 'rgb(255, 71, 26)' }">
                                        {{ percentTimeCareTa }}
                                    </h3>
                                </div>
                            </v-card-text>
                        </v-card>
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
                                        <v-card-text class="pt-0">
                                            <div v-if="this.tabledisplay !== 'Targets'">
                                                <div v-for="(item, index) in (tabledisplay === 'Customer Complaint' ? itemdatacustomer : (tabledisplay === 'Root Cause' ? itemdatacust : itemdatarootall))"
                                                    :key="index">
                                                    <div v-if="!loading">
                                                        <h2 style="color:rgb(77, 77, 0);" v-if="index === selectedItem">
                                                            {{ item.text }}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="this.tabledisplay === 'Targets'">
                                                <h2 style="color:rgb(77, 77, 0);">
                                                    <v-btn v-if="(targetDate === 'user') || (targetDate === 'userAll')"
                                                        small class="pa-0" outlined
                                                        @click="targetDate = targetDate === 'userAll' ? 'user' : 'userAll'">
                                                        <span style="color: rgb(77, 77, 0)" class="pa-0">
                                                            <v-card-actions class="pa-0 ma-0">
                                                                <h2>
                                                                    KPI
                                                                </h2>
                                                                <v-icon small
                                                                    style="color: rgb(77, 77, 0);">mdi-cached</v-icon>
                                                            </v-card-actions>
                                                        </span>
                                                    </v-btn>
                                                    <span v-else>
                                                        KPI
                                                    </span>
                                                </h2>
                                            </div>
                                            <div v-if="this.tabledisplay !== 'Targets'" class="custom-font">
                                                <canvas height="100px" id="myChart"></canvas>
                                            </div>
                                            <div v-else class="custom-font">
                                                <MyChartBar v-if="targetDate === 'date'" :desserts="desserts" :mount="mount"
                                                    @chartBarData="receiveChartData" />
                                                <div v-else-if="targetDate === 'user'">
                                                    <v-row>
                                                        <v-col cols="6">
                                                            <MychartUserCare :userTarget="userTarget" />
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <myChartUserDo :userTarget="userTarget" />
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                                <MycharUser v-else-if="targetDate === 'userAll'" :userTarget="userTarget" />
                                                <MyChartLine v-else :datasetdatatime="datasetdatatime" />
                                            </div>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <div class="px-1">
                                <v-divider style="background-color: #ffff00;"></v-divider>
                            </div>
                            <v-card-text v-if="this.tabledisplay !== 'Targets'"
                                style="background-color: rgba(255, 206, 86,0.1);">
                                <v-row>
                                    <v-col
                                        v-if="(!loading && (tabledisplay === 'Customer Complaint' || tabledisplay === 'Root Cause Report'))"
                                        cols="12" sm="7" md="7" class="px-0 py-0">
                                        <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                            <h4 style="color: #b3b300;">DATA TABLE</h4>
                                            <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                :height="dataset.length >= 5 ? '225px' : null"
                                                :max-height="dataset.length < 5 ? '225px' : null">
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-center" style="color: #ffff00;">
                                                                Row Labels
                                                            </th>
                                                            <th class="text-center" style="color:#ffff00;">
                                                                Count of SERVICE
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
                                            <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                :height="dataset.length >= 5 ? '225px' : null"
                                                :max-height="dataset.length < 5 ? '225px' : null">
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
                                            <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                :height="datasetdatatime.length >= 5 ? '225px' : null"
                                                :max-height="datasetdatatime.length < 5 ? '225px' : null">
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

                                                                    L(20m):{{ percentTimeDoTa }}
                                                                </h4>
                                                            </td>
                                                            <td style="color: #000;">
                                                                <h4>
                                                                    H(20m):{{ percentTimeDo }}
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
                            <v-card-text v-else style="background-color: rgba(255, 206, 86,0.1);">
                                <div>
                                    <v-row>
                                        <v-col v-if="targetDate !== 'date'" cols="12" sm="5" md="5" class="px-0 py-0">
                                            <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                                <h4 style="color: #b3b300;">TABLE TIME</h4>
                                                <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                    :height="userTarget.length >= 6 ? '225px' : null"
                                                    :max-height="userTarget.length < 6 ? '225px' : null">
                                                    <template v-slot:default>
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center" style="color: #ffff00;">
                                                                    OWNER GROUP
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Do &gt; 20m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Care &gt;5m
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in userTarget" :key="item.name"
                                                                :style="{ backgroundColor: index !== userTarget.length - 1 ? '#000' : '#ffff00' }">
                                                                <td
                                                                    :style="{ backgroundColor: index !== userTarget.length - 1 ? '#000' : '#ffff00', color: index !== userTarget.length - 1 ? '#ffff' : '#000' }">
                                                                    {{ item.name }}</td>
                                                                <td
                                                                    :style="{ backgroundColor: index !== userTarget.length - 1 ? '#000' : '#ffff00', color: index !== userTarget.length - 1 ? '#ffff' : '#000' }">
                                                                    {{ item.Time_Do }}</td>
                                                                <td
                                                                    :style="{ backgroundColor: index !== userTarget.length - 1 ? '#000' : '#ffff00', color: index !== userTarget.length - 1 ? '#ffff' : '#000' }">
                                                                    {{ item.Time_Care }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-card-text>
                                        </v-col>
                                        <v-col v-if="targetDate === 'date'" cols="12" sm="12" md="12" class="px-0 py-0">
                                            <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                                <h4 style="color: #b3b300;">TABLE TIME</h4>
                                                <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                    :height="dataDates.length >= 5 ? '225px' : null"
                                                    :max-height="dataDates.length < 5 ? '225px' : null">
                                                    <template v-slot:default>
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center" style="color: #ffff00;">
                                                                    Date
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Total
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Do TP
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Do &gt;20m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Care TP &le;5m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Care &gt;5m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Percent (%) &le;20m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Percent (%) &le;5m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Targets
                                                                    &le;20m | &gt;5m
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for=" item  in     dataDates    " :key="item.name">
                                                                <td style="color: #ffff00;">{{ item.nameValueall }}</td>
                                                                <td style="color: #ffff00;">{{ item.valueAll }}</td>
                                                                <td>{{ item.valueminD }}</td>
                                                                <td>{{ item.valuemaxD }}</td>
                                                                <td>{{ item.valueminC }}</td>
                                                                <td>{{ item.valuemaxC }}</td>
                                                                <td>{{ item.percentMinD }}</td>
                                                                <td>{{ item.percentMinC }}</td>
                                                                <td><v-icon v-if="item.targetD"
                                                                        color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                    <v-icon v-else color="error">mdi-close-box</v-icon> |
                                                                    <v-icon v-if="item.targetC"
                                                                        color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                    <v-icon v-else color="error">mdi-close-box</v-icon>
                                                                </td>
                                                            </tr>
                                                            <tr style="background-color: #ffff00;">
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        All
                                                                    </h4>
                                                                </td>
                                                                <td v-for="(   item, index   ) in    DataAll   "
                                                                    :key="index" style="color: #000;">
                                                                    <h4>
                                                                        {{ item }}
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        {{ percentTimeDoTa }}
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        {{ percentTimeCareTa }}
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        <v-icon
                                                                            v-if="checkTargetDo === 'Achieved the Target'"
                                                                            color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                        <v-icon v-else color="error">mdi-close-box</v-icon>
                                                                        |
                                                                        <v-icon
                                                                            v-if="checkTargetCare === 'Achieved the Target'"
                                                                            color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                        <v-icon v-else color="error">mdi-close-box</v-icon>
                                                                    </h4>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-card-text>
                                        </v-col>
                                        <v-col v-else cols="12" sm="7" md="7" class="px-0 py-0">
                                            <v-card-text class="px-1 pt-0 pb-1" style="color: #000000;">
                                                <h4 style="color: #b3b300;">TABLE TIME</h4>
                                                <v-simple-table dense flat fixed-header class="table-container custom-font"
                                                    :height="datasetdatatime.length >= 5 ? '227px' : null"
                                                    :max-height="datasetdatatime.length < 5 ? '227px' : null">
                                                    <template v-slot:default>
                                                        <thead>
                                                            <tr>
                                                                <th class="text-center" style="color: #ffff00;">
                                                                    SERVICE
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Do TP &le;20m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Do &gt; 20m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Care TP &le;5m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Time Care &gt;5m
                                                                </th>
                                                                <th class="text-center" style="color:#ffff00;">
                                                                    Total
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="    item     in     datasetdatatime    "
                                                                :key="item.name">
                                                                <td style="color: #ffff00;">{{ item.name }}</td>
                                                                <td>{{ item.valuemin }}</td>
                                                                <td>{{ item.valuemax }}</td>
                                                                <td>{{ item.valueminall }}</td>
                                                                <td>{{ item.valuemaxC }}</td>
                                                                <td style="color: #ffff00;">{{ item.dataall }}</td>
                                                            </tr>
                                                            <tr style="background-color: #ffff00;">
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        percent(%)
                                                                    </h4>
                                                                </td>

                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        {{ percentTimeDoTa }}
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        {{ percentTimeDoTa }}| <v-icon
                                                                            v-if="checkTargetDo === 'Achieved the Target'"
                                                                            color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                        <v-icon v-else color="error">mdi-close-box</v-icon>
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>
                                                                        {{ percentTimeCareTa }}
                                                                    </h4>
                                                                </td>
                                                                <td style="color: #000;">
                                                                    <h4>

                                                                        {{ percentTimeC }}|<v-icon
                                                                            v-if="checkTargetCare === 'Achieved the Target'"
                                                                            color="rgb(0, 230, 0)">mdi-checkbox-marked</v-icon>
                                                                        <v-icon v-else color="error">mdi-close-box</v-icon>
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
                                </div>
                            </v-card-text>
                        </v-sheet>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script>
import Chart from 'chart.js';
const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    Currency: 'components',
    props: {
        desserts: Array,
    },
    data() {
        return {
            mount: false,
            targetDate: 'date',
            checkTargetDo: '',
            checkTargetCare: '',
            expand: 'btn-1',
            datacang: true,
            showstrygraph: true,
            loading: true,
            percentTimeC: 0,
            percentTimeDoTa: 0,
            percentTimeCareTa: 0,
            percentTimeDo: 0,
            dataDates: [],
            dataset: [],
            userTarget: [],
            DataAll: {},
            datasetdatatime: [],
            tablename: '',
            tabledataall: 0,
            tabledisplay: 'Customer Complaint',
            menuItems: [
                { name: 'Customer Complaint', label: 'Customer Complaint' },
                { name: 'Root Cause', label: 'Root Cause' },
                { name: 'Root Cause Report', label: 'Root Cause Report' },
                { name: 'Targets', label: 'Targets' },
            ],
            itemdatacustomer: [
                { text: 'SERVICE GROUP' },
                { text: 'GENERAL' },
                { text: 'DATA' },
                { text: 'SMS' },
                { text: 'VAS' },
                { text: 'VOICE' },
            ],
            itemdatacust: [
                { text: 'GENERAL' },
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
            targets: [
                { text: 'TARGET' },
                { text: 'TIME' },
            ],
            selectedItem: 0,
            itemsbuton: [
                { icon: 'mdi-chart-bar', name: 'bar' },
                { icon: 'mdi-align-horizontal-left', name: 'horizontalBar' },
                { icon: 'mdi-chart-areaspline-variant', name: 'line' },
                { icon: 'mdi-chart-pie', name: 'pie' },
            ],
            graphform: 'bar',
            graphstyle,
            radius: 2,
            value: [],
            names: [],
            namemins: [],
            valuemins: [],
            width: 1.5,
            i: true,
        };
    },
    methods: {
        receiveChartData(data, allData) {
            this.dataDates = data;
            this.DataAll = allData;
        },
        showgraph(name) {
            this.graphform = name;
            this.graphShow();
        },
        // -------- Function get Data from page table use this page
        getData() {
            try {
                // Process data for table display based on selectedItem and tabledisplay
                const datamin = this.calculateDatamin(this.desserts, 'DATA', 20);
                const datamaxC = this.calculateDatamin(this.desserts, 'DATA', 5);
                const datavalue = this.calculateDataValue(this.desserts, 'DATA', 'DA');
                const datamax = datavalue - datamin;
                // const dataminC = datavalue - datamaxC;
                const dataminsms = this.calculateDatamin(this.desserts, 'SMS', 20);
                const datamaxsmsC = this.calculateDatamin(this.desserts, 'SMS', 5);
                const datavaluesms = this.calculateDataValue(this.desserts, 'SMS', 'DA');
                const datamaxsms = datavaluesms - dataminsms;
                // const dataminsmsC = datavaluesms - datamaxsmsC;
                const dataminvas = this.calculateDatamin(this.desserts, 'VAS', 20);
                const datamaxvasC = this.calculateDatamin(this.desserts, 'VAS', 5);
                const datavaluevas = this.calculateDataValue(this.desserts, 'VAS', 'DA');
                const datamaxvas = datavaluevas - dataminvas;
                // const dataminvasC = datavaluevas - datamaxvasC;
                const dataminvoi = this.calculateDatamin(this.desserts, 'VOICE', 20);
                const datamaxvoiC = this.calculateDatamin(this.desserts, 'VOICE', 5);
                const datavaluevoi = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
                const datamaxvoi = datavaluevoi - dataminvoi;
                // const dataminvoiC = datavaluevoi - datamaxvoiC;
                // Calculate totals and percentages for all service groups
                const allDT = datavalue + datavaluevoi + datavaluesms + datavaluevas;
                const minDTC = datamaxC + datamaxsmsC + datamaxvasC + datamaxvoiC;
                const minDT = dataminsms + datamin + dataminvoi + dataminvas;
                this.percentTimeDoTa = minDT === 0 ? '0%' : (minDT === allDT ? '100%' : (((minDT / allDT) * 100).toFixed(2) + '%'));
                const maxDT = datamaxsms + datamax + datamaxvoi + datamaxvas;
                this.percentTimeDo = maxDT === 0 ? 0 + '%' : (((maxDT / allDT) * 100).toFixed(2) + '%');
                this.percentTimeDo = maxDT === 0 ? 0 + '%' : (maxDT === allDT ? '100%' : (((maxDT / allDT) * 100).toFixed(2) + '%'));

                const max = (datavalue + datavaluesms + datavaluevas + datavaluevoi) - (datamaxC + datamaxsmsC + datamaxvasC + datamaxvoiC)
                this.percentTimeC = minDTC === 0 ? 0 + '%' : (minDTC === allDT ? '100%' : (((minDTC / allDT) * 100).toFixed(2) + '%'));
                this.percentTimeCareTa = max === 0 ? 100 + '%' : (max === allDT ? '100%' : (((max / allDT) * 100).toFixed(2) + '%'));
                this.checkTargetDo = minDT === 0 ? 'Achieved the Target' : ((minDT / allDT) * 100).toFixed(2) >= 99.5 ? 'Achieved the Target' : 'Not on Target';
                this.checkTargetCare = max === 0 ? 100 + '%' : ((max / allDT) * 100).toFixed(2) >= 99.5 ? 'Achieved the Target' : 'Not on Target';
                // Create an array of data objects for each service group
                const dataObjects = [
                    { name: 'DATA', valueall: datavalue, valuemax: datamax, valuemin: datamin, valueminall: datavalue - datamaxC, dataall: datavalue, valuemaxC: datamaxC },
                    { name: 'SMS', valueall: datavaluesms, valuemax: datamaxsms, valuemin: dataminsms, valueminall: datavaluesms - datamaxsmsC, dataall: datavaluesms, valuemaxC: datamaxsmsC },
                    { name: 'VAS', valueall: datavaluevas, valuemax: datamaxvas, valuemin: dataminvas, valueminall: datavaluevas - datamaxvasC, dataall: datavaluevas, valuemaxC: datamaxvasC },
                    { name: 'VOICE', valueall: datavaluevoi, valuemax: datamaxvoi, valuemin: dataminvoi, valueminall: datavaluevoi - datamaxvoiC, dataall: datavaluevoi, valuemaxC: datamaxvoiC },
                ];
                // Extract names, max values, min values, and total values from dataObjects
                dataObjects.sort((a, b) => b.dataall - a.dataall);
                // Append 'Total' object to dataObjects
                dataObjects.push({
                    name: 'Total:',
                    valuemax: datamax + datamaxsms + datamaxvas + datamaxvoi,
                    valuemin: datamin + dataminsms + dataminvas + dataminvoi,
                    valueminall: (datavalue + datavaluesms + datavaluevas + datavaluevoi) - (datamaxvoiC + datamaxvasC + datamaxsmsC + datamaxC),
                    valuemaxC: datamaxC + datamaxsmsC + datamaxvasC + datamaxvoiC,
                    dataall: datavalue + datavaluesms + datavaluevas + datavaluevoi,
                });
                const names = dataObjects.map(item => item.name);
                const valuemax = dataObjects.map(item => item.valuemax);
                const valuemin = dataObjects.map(item => item.valuemin);
                const valueminall = dataObjects.map(item => item.valueminall);
                const valuemaxC = dataObjects.map(item => item.valuemaxC);
                const dataall = dataObjects.map(item => item.dataall);
                this.namemins = names; // get data to use graph (graph names)
                this.valuemins = valuemax;
                // Create a datasetdatatime array with formatted data for display
                this.datasetdatatime = names.map((item, index) => ({
                    name: item,
                    valuemin: valuemin[index],
                    valuemax: valuemax[index],
                    valueminall: valueminall[index],
                    valuemaxC: valuemaxC[index],
                    dataall: dataall[index],
                }));
                if (this.tabledisplay === 'Targets') {
                    const datatimedo = this.calculateuserName(this.desserts, 20);
                    const nameCount = {};
                    // Count occurrences of each name in datamin
                    datatimedo.forEach(name => {
                        nameCount[name] = (nameCount[name] || 0) + 1;
                    });
                    const datatimeCare = this.calculateuserName(this.desserts, 5);
                    const nameCountTimeC = {};
                    // Count occurrences of each name in datamin
                    datatimeCare.forEach(name => {
                        nameCountTimeC[name] = (nameCountTimeC[name] || 0) + 1;
                    });
                    const allNames = new Set([...Object.keys(nameCount), ...Object.keys(nameCountTimeC)]);
                    // console.log(allNames)

                    // Initialize the userTarget array
                    // Loop through each unique name
                    const allvalue = [];
                    allNames.forEach(name => {
                        // Extract counts from nameCount and nameCountTimeC; assign 0 if not present
                        const timeDo = nameCount[name] || 0;
                        const timeCare = nameCountTimeC[name] || 0;
                        // Push an object with name, timeDo, and timeCare to the userTarget array
                        allvalue.push({ name, Time_Do: timeDo, Time_Care: timeCare });
                    });

                    // Calculate the sums for Time_Do and Time_Care
                    let sumTimeDo = 0;
                    let sumTimeCare = 0;
                    allvalue.forEach(item => {
                        sumTimeDo += item.Time_Do;
                        sumTimeCare += item.Time_Care;
                    });

                    // Add summary entry with total values to userTarget array
                    this.userTarget = [
                        ...allvalue, // Individual entries
                        { name: 'Total:' + allvalue.length, Time_Do: sumTimeDo, Time_Care: sumTimeCare } // Summary entry
                    ];
                    this.i = false;
                }
                if (this.selectedItem === 0) {
                    // Handle different cases based on tabledisplay option
                    if (this.tabledisplay === 'Root Cause') {
                        const uniqueNames = this.loopname(this.desserts, '', 'Cause');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'Cause', ''),
                            valueData: this.calculateDataValue(this.desserts, name, 'DATARoot', 'DATA'),
                            valueSms: this.calculateDataValue(this.desserts, name, 'DATARoot', 'SMS'),
                            valueVas: this.calculateDataValue(this.desserts, name, 'DATARoot', 'VAS'),
                            valueVoice: this.calculateDataValue(this.desserts, name, 'DATARoot', 'VOICE'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const valueData = dataObjects.map(item => item.valueData);
                        const valueSms = dataObjects.map(item => item.valueSms);
                        const valueVas = dataObjects.map(item => item.valueVas);
                        const valueVoice = dataObjects.map(item => item.valueVoice);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            valueData: valueData[index],
                            valueSms: valueSms[index],
                            valueVas: valueVas[index],
                            valueVoice: valueVoice[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else if (this.tabledisplay === 'Root Cause Report') {
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'OWNER');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'OWNER'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const datavalue = this.calculateDataValue(this.desserts, 'DATA', 'DA');
                        const datad1value = this.calculateDataValue(this.desserts, 'SMS', 'DA');
                        const datad2value = this.calculateDataValue(this.desserts, 'VAS', 'DA');
                        const datad3value = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
                        const dataothervalue = datavalue + datad1value + datad2value + datad3value;
                        const dataA = datavalue + datad1value;
                        this.tablename = 'All';
                        this.tabledataall = this.tabledisplay === 'Root Cause Report' ? dataA : dataothervalue;
                        // Get data style Objects from table service grops
                        const dataDATA = [
                            { name: 'DATA', value: datavalue },
                            { name: 'SMS', value: datad1value },
                            { name: 'VAS', value: datad2value },
                            { name: 'VOICE', value: datad3value },
                        ];
                        const dataOwner = [{ name: 'USER', value: datavalue }, { name: 'SYSTEM', value: datad1value }]
                        const dataObjects = this.tabledisplay === 'Root Cause Report' ? dataOwner : dataDATA;                  // arrow function find value max to min  
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
                    this.dataset = this.dataset.filter(item => item.value > 0); // Filter out items with zero values
                }
                // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA and SERVICE_GROUP WORKLONG_DESCRIPTOIN DATA
                //  DATA
                if (this.selectedItem === 1) {
                    if (this.tabledisplay === 'Root Cause') {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'DATA', 'DA'); // Calculate data values for 'All' and unique names
                        this.tablename = 'All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'Root');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'DATARoot', 'DATA'),
                        }));
                        // arrow function find value max to min  
                        dataObjects.sort((a, b) => b.value - a.value); // Sort dataObjects based on value in descending order
                        // get data to use graph 
                        // this.names = dataObjects.map((item) => item.name); // get data to use graph (graph names)
                        // this.value = dataObjects.map((item) => item.value); // get data to use graph (graph values)
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                        // get data to use table desplay datas
                        // Format data for both graph and table display
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else if (this.tabledisplay === 'Root Cause Report') {
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'TI');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'TI'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const uniqueNames = this.loopname(this.desserts, 'Report', 'GENERAL');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'GENERAL'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        const d1Entries = dataObjects.filter(item => item.name.startsWith('D1_'));
                        const d3Entries = dataObjects.filter(item => item.name.startsWith('D3_'));
                        const d4Entries = dataObjects.filter(item => item.name.startsWith('D4_'));
                        const d5Entries = dataObjects.filter(item => item.name.startsWith('D5_'));
                        const d6Entries = dataObjects.filter(item => item.name.startsWith('DATA'));
                        // Combine values for value entries
                        const d1Sum = d1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d3Sum = d3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d4Sum = d4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d5Sum = d5Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d6Sum = d6Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const s1Entries = dataObjects.filter(item => item.name.startsWith('S1_'));
                        const s3Entries = dataObjects.filter(item => item.name.startsWith('S2_'));
                        const s4Entries = dataObjects.filter(item => item.name.startsWith('S3_'));
                        const s5Entries = dataObjects.filter(item => item.name.startsWith('S5_'));
                        const s6Entries = dataObjects.filter(item => item.name.startsWith('S6_'));
                        const sSEntries = dataObjects.filter(item => item.name.startsWith('SMS'));
                        // Combine values for value entries
                        const S1Sum = s1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S2Sum = s4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S3Sum = s3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S5Sum = s5Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S6Sum = s6Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const SSSum = sSEntries.reduce((sum, entry) => sum + entry.value, 0);
                        const v1Entries = dataObjects.filter(item => item.name.startsWith('V1_'));
                        const v3Entries = dataObjects.filter(item => item.name.startsWith('V2_'));
                        const v4Entries = dataObjects.filter(item => item.name.startsWith('V3_'));
                        const v5Entries = dataObjects.filter(item => item.name.startsWith('V5_'));
                        const vcal1Entries = dataObjects.filter(item => item.name.startsWith('ບັນຫາ ໂທ​​ເຂົ້າ'));
                        const vcal2Entries = dataObjects.filter(item => item.name.startsWith('ໂທ​​ເຂົ້າ-​​ໂທອອກ'));
                        const vVEntries = dataObjects.filter(item => item.name.startsWith('VOICE'));

                        // Combine values for value entries
                        const v1Sum = v1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const v2Sum = v3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const v3Sum = v4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const v5Sum = v5Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const vVSum = vVEntries.reduce((sum, entry) => sum + entry.value, 0);
                        const cal1Sum = vcal1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const cal2Sum = vcal2Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const va1Entries = dataObjects.filter(item => item.name.startsWith('VA1_'));
                        const vaVAEntries = dataObjects.filter(item => item.name.startsWith('VAS'));
                        const va1Sum = va1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const vaVASum = vaVAEntries.reduce((sum, entry) => sum + entry.value, 0);

                        // Create a new entry with combined values
                        const combinedEntryv1 = {
                            name: 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້',
                            value: v1Sum + v2Sum + v3Sum + cal1Sum + cal2Sum + vVSum + v5Sum,
                        };
                        // Remove D1 and D4 entries from dataObjects

                        // Create a new entry with combined values
                        const combinedEntryS1 = {
                            name: 'S1_ສົ່ງ-ຮັບ SMS ບໍ່​ໄດ້​',
                            value: S1Sum + S2Sum + S3Sum + SSSum,
                        };
                        const combinedEntryS5 = {
                            name: 'S5_ສະຫມັກ APP ແລ້ວບໍ່ໄດ້ຮັບ CODE ຢືນຢັນ​',
                            value: S5Sum + S6Sum,
                        };
                        // Create a new entry with combined values
                        const combinedEntryD1 = {
                            name: 'D1_CONNCET INTERNET ບໍ່ໄດ້',
                            value: d1Sum + d4Sum + d6Sum,
                        };
                        const combinedEntryD3 = {
                            name: 'D3_INTERNET ຊ້າ',
                            value: d3Sum + d5Sum,
                        };
                        const combinedEntryVA1 = {
                            name: 'VA1_ເງີນຫາຍ (ບໍ່ຮູ້ສາເຫດ)',
                            value: va1Sum + vaVASum,
                        };
                        // Remove D1 and D4 entries from dataObjects
                        const updatedDataObjects = dataObjects.filter(item => !item.name.startsWith('D1_') && !item.name.startsWith('D3_') && !item.name.startsWith('D4_') &&
                            !item.name.startsWith('D5_') && !item.name.startsWith('DATA') && !item.name.startsWith('S1_') && !item.name.startsWith('S2_') && !item.name.startsWith('S3_') && !item.name.startsWith('S5_')
                            && !item.name.startsWith('S6_') && !item.name.startsWith('SMS') && !item.name.startsWith('V1_')
                            && !item.name.startsWith('V2_') && !item.name.startsWith('V3_') && !item.name.startsWith('V5_') && !item.name.startsWith('ບັນຫາ ໂທ​​ເຂົ້າ') && !item.name.startsWith('ໂທ​​ເຂົ້າ-​​ໂທອອກ')
                            && !item.name.startsWith('VOICE') && !item.name.startsWith('VA1_') && !item.name.startsWith('VAS'));
                        // Add the combined entry back to dataObjects
                        updatedDataObjects.unshift(combinedEntryD1, combinedEntryD3, combinedEntryS1, combinedEntryv1, combinedEntryS5, combinedEntryVA1);
                        updatedDataObjects.sort((a, b) => b.value - a.value);
                        this.names = updatedDataObjects.map(item => item.name);
                        this.value = updatedDataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                }
                // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA and SERVICE_GROUP WORKLONG_DESCRIPTOIN DATA
                //  SMS
                if (this.selectedItem === 2) {
                    // SMS of Root cause
                    if ((this.tabledisplay === 'Root Cause')) {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'SMS', 'DA');
                        this.tablename = 'SMS All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'SMS', 'Root');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'DATARoot', 'SMS'),
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
                    else if (this.tabledisplay === 'Root Cause Report') {
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'DP');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'DP'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    // DATA of customer compaint
                    else {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'DATA', 'DA');
                        this.tablename = 'DATA All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'DATA');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataD1Value(this.desserts, 'DATA', name),
                        }));
                        const d1Entries = dataObjects.filter(item => item.name.startsWith('D1_'));
                        const d3Entries = dataObjects.filter(item => item.name.startsWith('D3_'));
                        const d4Entries = dataObjects.filter(item => item.name.startsWith('D4_'));
                        const d5Entries = dataObjects.filter(item => item.name.startsWith('D5_'));
                        const dDEntries = dataObjects.filter(item => item.name.startsWith('DATA'));
                        // Combine values for value entries
                        const d1Sum = d1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d3Sum = d3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d4Sum = d4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const d5Sum = d5Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const dDSum = dDEntries.reduce((sum, entry) => sum + entry.value, 0);

                        // Create a new entry with combined values
                        const combinedEntryD1 = {
                            name: 'D1_CONNCET INTERNET ບໍ່ໄດ້',
                            value: d1Sum + d4Sum + dDSum,
                        };
                        const combinedEntryD3 = {
                            name: 'D3_INTERNET ຊ້າ',
                            value: d3Sum + d5Sum,
                        };
                        // Remove D1 and D4 entries from dataObjects
                        const updatedDataObjects = dataObjects.filter(item => !item.name.startsWith('D1_') && !item.name.startsWith('D3_') && !item.name.startsWith('D4_') && !item.name.startsWith('D5_')
                            && !item.name.startsWith('DATA'));
                        // Add the combined entry back to dataObjects
                        updatedDataObjects.unshift(combinedEntryD1, combinedEntryD3);
                        updatedDataObjects.sort((a, b) => b.value - a.value);
                        this.names = updatedDataObjects.map(item => item.name);
                        this.value = updatedDataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }

                }
                // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA and SERVICE_GROUP WORKLONG_DESCRIPTOIN DATA
                //  VAS
                if (this.selectedItem === 3) {
                    if (this.tabledisplay === 'Root Cause') {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'VAS', 'DA');
                        this.tablename = 'VAS All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'VAS', 'Root');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'DATARoot', 'VAS'),
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
                    else if (this.tabledisplay === 'Root Cause Report') {
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'RSOWNER');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'RSOWNER'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;

                        const Resolnull = dataObjects.filter(item => !item.name.trim());
                        const Resol = Resolnull.reduce((sum, entry) => sum + entry.value, 0);

                        let updatedDataObjects = dataObjects; // Declare outside the block
                        if (Resol >= 1) {
                            const combinedEntryS1 = {
                                name: 'Not Name',
                                value: Resol,
                            };
                            updatedDataObjects = updatedDataObjects.filter(item => item.name.trim() !== '');
                            updatedDataObjects.unshift(combinedEntryS1);
                        }
                        updatedDataObjects = (Resol >= 1 ? updatedDataObjects : dataObjects).sort((a, b) => b.value - a.value);

                        this.names = updatedDataObjects.map(item => item.name);
                        this.value = updatedDataObjects.map(item => item.value);

                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));

                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }

                    // SMS of customer compaint
                    else {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'SMS', 'DA');
                        this.tablename = 'SMS All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'SMS', 'DATA');
                        const dataObjects = uniqueNames.map((name) => ({
                            name,
                            value: this.calculateDataD1Value(this.desserts, 'SMS', name),
                        }));
                        const d1Entries = dataObjects.filter(item => item.name.startsWith('S1_'));
                        const d3Entries = dataObjects.filter(item => item.name.startsWith('S2_'));
                        const d4Entries = dataObjects.filter(item => item.name.startsWith('S3_'));
                        const d5Entries = dataObjects.filter(item => item.name.startsWith('SMS'));
                        // Combine values for value entries
                        const S1Sum = d1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S2Sum = d4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S3Sum = d3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const S5Sum = d5Entries.reduce((sum, entry) => sum + entry.value, 0);
                        // Create a new entry with combined values
                        const combinedEntryS1 = {
                            name: 'S1_ສົ່ງ-ຮັບ SMS ບໍ່​ໄດ້​',
                            value: S1Sum + S2Sum + S3Sum + S5Sum,
                        };
                        // Remove D1 and D4 entries from dataObjects
                        const updatedDataObjects = dataObjects.filter(item => !item.name.startsWith('S1_') && !item.name.startsWith('S2_') && !item.name.startsWith('S3_') && !item.name.startsWith('SMS'));
                        // Add the combined entry back to dataObjects
                        updatedDataObjects.unshift(combinedEntryS1);
                        updatedDataObjects.sort((a, b) => b.value - a.value);
                        this.names = updatedDataObjects.map((item) => item.name);
                        this.value = updatedDataObjects.map((item) => item.value);
                        const percentages = this.value.map((value) => ((value / this.tabledataall) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }

                }
                // Calculate values based on SERVICE_GROUP CLASSIFICATION DATA and SERVICE_GROUP WORKLONG_DESCRIPTOIN DATA
                //  VOICE
                if (this.selectedItem === 4) {
                    if (this.tabledisplay === 'Root Cause') {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
                        this.tablename = 'VOICE All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'VOICE', 'Root');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'DATARoot', 'VOICE'),
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
                    else if (this.tabledisplay === 'Root Cause Report') {
                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'PV');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'PV'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        const dataallvalue = this.calculateDataValue(this.desserts, 'VAS', 'DA');
                        this.tablename = 'VAS All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'VAS', 'DATA');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataD1Value(this.desserts, 'VAS', name)
                        }));
                        // Sort the dataObjects array based on the value property in descending order
                        const va1Entries = dataObjects.filter(item => item.name.startsWith('VA1_'));
                        const vaVAEntries = dataObjects.filter(item => item.name.startsWith('VAS'));
                        // Combine values for value entries
                        const va1Sum = va1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const vaVASum = vaVAEntries.reduce((sum, entry) => sum + entry.value, 0);
                        // Create a new entry with combined values
                        const combinedEntryVA1 = {
                            name: 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້',
                            value: va1Sum + vaVASum,
                        };
                        // Remove D1 and D4 entries from dataObjects
                        const updatedDataObjects = dataObjects.filter(item => !item.name.startsWith('VA1_') && !item.name.startsWith('VAS'));
                        // Add the combined entry back to dataObjects
                        updatedDataObjects.unshift(combinedEntryVA1);
                        // Sort the dataObjects array based on the value property in descending order
                        updatedDataObjects.sort((a, b) => b.value - a.value);
                        this.names = updatedDataObjects.map(item => item.name);
                        this.value = updatedDataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                };
                if (this.selectedItem === 5) {
                    const dataallvalue = this.calculateDataValue(this.desserts, 'VOICE', 'DA');
                    if (this.tabledisplay === 'Root Cause Report') {

                        const uniqueNames = this.loopname(this.desserts, 'DATA', 'CHAN');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataValue(this.desserts, name, 'CHAN'),
                        }));
                        this.tablename = 'All';
                        const dataallvalue = dataObjects.reduce((sum, item) => sum + item.value, 0);
                        this.tabledataall = dataallvalue;
                        dataObjects.sort((a, b) => b.value - a.value);
                        this.names = dataObjects.filter(item => item.value > 0).map(item => item.name); // get data to use graph (graph names)
                        this.value = dataObjects.filter(item => item.value > 0).map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                    else {
                        this.tablename = 'VOICE All';
                        this.tabledataall = dataallvalue;
                        const uniqueNames = this.loopname(this.desserts, 'VOICE', 'DATA');
                        const dataObjects = uniqueNames.map(name => ({
                            name,
                            value: this.calculateDataD1Value(this.desserts, 'VOICE', name)
                        }));
                        const v1Entries = dataObjects.filter(item => item.name.startsWith('V1_'));
                        const v3Entries = dataObjects.filter(item => item.name.startsWith('V2_'));
                        const v4Entries = dataObjects.filter(item => item.name.startsWith('V3_'));
                        const vVEntries = dataObjects.filter(item => item.name.startsWith('VOICE'));
                        const vcal1Entries = dataObjects.filter(item => item.name.startsWith('ບັນຫາ ໂທ​​ເຂົ້າ'));
                        const vcal2Entries = dataObjects.filter(item => item.name.startsWith('ໂທ​​ເຂົ້າ-​​ໂທອອກ'));
                        // Combine values for value entries
                        const v1Sum = v1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const v2Sum = v3Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const v3Sum = v4Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const vVSum = vVEntries.reduce((sum, entry) => sum + entry.value, 0);
                        const cal1Sum = vcal1Entries.reduce((sum, entry) => sum + entry.value, 0);
                        const cal2Sum = vcal2Entries.reduce((sum, entry) => sum + entry.value, 0);
                        // Create a new entry with combined values
                        const combinedEntryS1 = {
                            name: 'V1_ມີ​ສັນຍານ​ໂທ​​ເຂົ້າ-​​ໂທອອກບໍ່​ໄດ້',
                            value: v1Sum + v2Sum + v3Sum + cal1Sum + cal2Sum + vVSum,
                        };
                        // Remove D1 and D4 entries from dataObjects
                        const updatedDataObjects = dataObjects.filter(item => !item.name.startsWith('V1_') && !item.name.startsWith('V2_') && !item.name.startsWith('V3_') && !item.name.startsWith('VOICE') && !item.name.startsWith('ບັນຫາ ໂທ​​ເຂົ້າ') && !item.name.startsWith('ໂທ​​ເຂົ້າ-​​ໂທອອກ'));
                        // Add the combined entry back to dataObjects
                        updatedDataObjects.unshift(combinedEntryS1);
                        // Sort the dataObjects array based on the value property in descending order
                        updatedDataObjects.sort((a, b) => b.value - a.value);
                        this.names = updatedDataObjects.map(item => item.name);
                        this.value = updatedDataObjects.map(item => item.value);
                        const percentages = this.value.map(value => ((value / dataallvalue) * 100).toFixed(2));
                        this.dataset = this.names.map((item, index) => ({
                            name: item,
                            value: this.value[index],
                            percentage: `${percentages[index]}%`,
                        }));
                    }
                };
                if (this.desserts === undefined) {
                    console.error('Response is undefined');
                    throw new Error('Response is undefined');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
            // --- go to function graphShow;
            if (this.tabledisplay !== 'Targets') {
                this.graphShow();
            };
            this.loading = false;
        },
        tarGets() {

        },
        // -------- Function loop Data of table SERVICE GROUP
        // Define a function named calculateDataValue that takes three parameters: data, serviceGroup, and status
        calculateDataValue(data, serviceGroup, status, tyle) {
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
                    case 'GENERAL':
                        if (entry.CLASSIFICATION === serviceGroup) sum++;
                        break;
                    case 'Cause':
                        if (entry.ROOT_CAUSE_DESCRIPTIONS === serviceGroup) sum++;
                        break;
                    case 'DATARoot':
                        if (entry.ROOT_CAUSE_DESCRIPTIONS === serviceGroup && entry.SERVICE_GROUP === tyle) sum++;
                        break;
                    // If 'status' is 'DP', check if the ROOT_CAUSE_BY_DEPARTMENT property of the entry matches the provided 'serviceGroup'
                    case 'DP':
                        if (entry.ROOT_CAUSE_BY_DEPARTMENT === serviceGroup) sum++;
                        break;
                    // If 'status' is 'TI', check if the ROOT_CAUSE_BY_TIER property of the entry matches the provided 'serviceGroup'
                    case 'TI':
                        if (entry.ROOT_CAUSE_BY_TIER === serviceGroup) sum++;
                        break;
                    // If 'status' is 'RSOWNER', check if the RESOLVE_OWNER property of the entry matches the provided 'serviceGroup'
                    case 'RSOWNER':
                        if (entry.RESOLVE_OWNER === serviceGroup) sum++;
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
            // Initialize a Set to store unique names
            const uniqueNames = new Set();

            let namesArray;
            // Helper function to add adjusted names to the uniqueNames set
            const addAdjustedName = (entry, key, length) => {
                if (typeof entry[key] === 'string') {
                    const n = length ? entry[key].substring(0, length) : entry[key];
                    const adjustedName = this.adjustName(n);
                    uniqueNames.add(adjustedName);
                }
            };
            // Iterate over the data based on the provided status
            switch (status) {
                case 'DATA':
                    // Filter data based on SERVICE_GROUP and CLASSIFICATION
                    data.forEach((entry) => {
                        if (entry.SERVICE_GROUP === serviceGroup && typeof entry.CLASSIFICATION === 'string') {
                            uniqueNames.add(entry.CLASSIFICATION);
                        }
                    });
                    break;

                case 'GENERAL':
                    // Filter data based on SERVICE_GROUP and CLASSIFICATION
                    data.forEach((entry) => {
                        if (typeof entry.CLASSIFICATION === 'string') {
                            uniqueNames.add(entry.CLASSIFICATION);
                        }
                    });
                    break;

                case 'OWNER':
                    // Filter data based on ROOT_CAUSE_BY_STATUS
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'ROOT_CAUSE_BY_STATUS');
                    });
                    break;

                case 'DP':
                    // Filter data based on ROOT_CAUSE_BY_DEPARTMENT
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'ROOT_CAUSE_BY_DEPARTMENT');
                    });
                    break;

                case 'TI':
                    // Filter data based on ROOT_CAUSE_BY_TIER
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'ROOT_CAUSE_BY_TIER');
                    });
                    break;

                case 'RSOWNER':
                    // Filter data based on RESOLVE_CHANGBY
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'RESOLVE_OWNER');
                    });
                    break;

                case 'CHAN':
                    // Filter data based on CREATEDBY with substring and adjust
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'CREATEDBY', 8);
                    });
                    // Assign the value to namesArray
                    namesArray = Array.from(uniqueNames);
                    // Return namesArray outside the switch statement
                    return namesArray;
                case 'PV':
                    // Filter data based on PROVINCE
                    data.forEach((entry) => {
                        addAdjustedName(entry, 'PROVINCE');
                    });
                    break;

                case 'Root':
                    // Filter data based on SERVICE_GROUP and WORKLONG_DESCRIPTOIN
                    data.forEach((entry) => {
                        if (entry.SERVICE_GROUP === serviceGroup && typeof entry.ROOT_CAUSE_DESCRIPTIONS === 'string') {
                            addAdjustedName(entry, 'ROOT_CAUSE_DESCRIPTIONS');
                        }
                    });
                    break;

                // Add more cases as needed
                case 'Cause':
                    // Filter data based on SERVICE_GROUP and WORKLONG_DESCRIPTOIN
                    data.forEach((entry) => {
                        if (typeof entry.ROOT_CAUSE_DESCRIPTIONS === 'string') {
                            addAdjustedName(entry, 'ROOT_CAUSE_DESCRIPTIONS');
                        }
                    });
                    break;

                default:
                    // Handle unknown status
                    console.error('Unknown status:', status);
                    break;
            }

            // Convert the uniqueNames set to an array and return
            return Array.from(uniqueNames);
        },
        adjustName(name) {
            if (typeof name === 'string') {
                const text = name.substring(0, 7);
                for (let i = 0; i < text.length; i++) {
                    const a = text.substring(i, i + 1);
                    if (!text.startsWith('Tier_')) {
                        if (a === '_') {
                            const id = name.substring(0, i + 1);
                            return id.substring(0, 2) === 'TP' ? (id.substring(2, 3) === '0' ? id.substring(0, 2) + id.substring(3) : id.substring(0)) : name.substring(0, i + 1);
                        }
                    }
                }
                return name;
            } else {
                return name;
            }
        },
        // -------- Function look Data of Customer Complaint tables
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
        // -------- Function Assuming "SERVICE_GROUP" date time do
        calculateDatamin(data, serviceGroup, threshold) {
            // Assuming "SERVICE_GROUP" is the key you want to filter on
            return data.reduce((sum, entry) => {
                if (threshold === 20) {
                    if (entry.SERVICE_GROUP === serviceGroup && entry.TIME_DO_TPLUS <= threshold) {
                        return sum + 1;
                    }
                }
                else if (threshold === 5) {
                    if (entry.SERVICE_GROUP === serviceGroup && entry.TIME_CARE_TPLUS > threshold) {
                        return sum + 1;
                    }
                }
                return sum;
            }, 0);
        },
        calculateuserName(data, threshold) {
            // Check the threshold value and select the appropriate field to compare
            const fieldToCheck = threshold === 20 ? 'TIME_DO_TPLUS' : 'TIME_CARE_TPLUS';

            // Use map to directly create an array of names based on the condition
            const names = data
                .filter(entry => entry[fieldToCheck] > threshold)
                .map(entry => entry.RESOLVE_OWNER);

            return names; // Return the array of names
        },
        // -------- Function Graph 
        graphShow() {
            const ctx = document.getElementById('myChart').getContext('2d');
            // Clear existing chart
            if (this.myChart) {
                this.myChart.destroy();
            }
            const colorBK = [
                'rgb(255, 255, 0,0.8)',
                'rgb(255, 0, 255,0.8)',
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
                'rgb(255, 0, 255,1)',
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
            const calculateNiceNumber = (value) => {
                if (value >= 500) {
                    return Math.ceil(value % 100) * 100 === 0 ? Math.ceil(value / 100) * 100 + 50 : (Math.ceil(value / 100) * 100) - value >= 30 ? Math.ceil(value / 100) * 100 : Math.ceil(value / 100) * 100 + 50;
                }
                else if (value >= 100) {
                    return Math.ceil(value % 100) * 100 === 0 ? Math.ceil(value / 100) * 100 + 50 : Math.ceil(value / 100) * 100;
                } else if (value >= 50) {
                    return Math.ceil(value % 50) * 50 === 0 ? Math.ceil(value / 50) * 50 + 10 : (Math.ceil(value / 50) * 50) - value >= 5 ? Math.ceil(value / 50) * 50 : Math.ceil(value / 50) * 50 + 10;
                } else if (value > 20) {
                    return Math.ceil(value % 20) * 20 === 0 ? Math.ceil(value / 20) * 20 + 5 : (Math.ceil(value / 20) * 20) - value >= 5 ? Math.ceil(value / 20) * 20 : Math.ceil(value / 20) * 20 + 5;
                } else {
                    return Math.ceil(value / 10) * 10;
                }
            };

            const maxNum = calculateNiceNumber(Math.max(...this.value)) >= 1000 ? calculateNiceNumber(Math.max(...this.value) + 50) : calculateNiceNumber(Math.max(...this.value));
            let Data = [];
            if (this.tabledisplay === 'Root Cause' && this.selectedItem === 0) {
                const valueData = this.dataset.map(item => item.valueData);
                const valueSms = this.dataset.map(item => item.valueSms);
                const valueVas = this.dataset.map(item => item.valueVas);
                const valueVoice = this.dataset.map(item => item.valueVoice);

                Data = [
                    {
                        label: 'DATA',
                        data: valueData,
                        backgroundColor: colorBK,
                        borderColor: colorBD,
                        borderWidth: 1,
                    },
                    {
                        label: 'SMS',
                        data: valueSms,
                        backgroundColor: colorBK,
                        borderColor: colorBD,
                        borderWidth: 1,
                    },
                    {
                        label: 'VAS',
                        data: valueVas,
                        backgroundColor: colorBK,
                        borderColor: colorBD,
                        borderWidth: 1,
                    },
                    {
                        label: 'VOICE',
                        data: valueVoice,
                        backgroundColor: colorBK,
                        borderColor: colorBD,
                        borderWidth: 1,
                    },
                ];
            }
            const chartData = {
                labels: this.names,
                datasets: (this.tabledisplay === 'Root Cause' && this.selectedItem === 0) ? Data : [{
                    data: this.value,
                    backgroundColor: colorBK,
                    borderColor: colorBD,
                    borderWidth: 1,
                }],
                datasetData: [{
                    data: this.value,
                }]
            };
            // ----- Graph value dataset.percentage
            const filteredValueCare = this.value.filter(value => value > 0);
            const valueAll = Math.max(...filteredValueCare);
            // console.log(valueAll)
            this.myChart = new Chart(ctx, {
                type: this.graphform,
                data: chartData,
                options: {
                    legend: {
                        display: this.graphform === '_',
                    },
                    hover: {
                        animationDuration: 0
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
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
                                if (this.tabledisplay === 'Root Cause' && this.selectedItem === 0) {
                                    chartData.datasetData.forEach((dataset, i) => {
                                        const meta = chartInstance.controller.getDatasetMeta(i);
                                        if (this.graphform === 'horizontalBar') {
                                            meta.data.forEach((bar, index) => {
                                                const data = dataset.data[index];
                                                ctx.font = 'bold 14px Arial';
                                                ctx.fillText(data, bar._model.x + 10, bar._model.y + 8);
                                            });
                                        }
                                        else {
                                            meta.data.forEach((bar, index) => {
                                                const data = dataset.data[index];
                                                ctx.font = 'bold 14px Arial';
                                                ctx.fillText(data, bar._model.x, bar._model.y + 4);
                                            });
                                        }
                                    });
                                }
                                else {
                                    chartData.datasets.forEach((dataset, i) => {
                                        const meta = chartInstance.controller.getDatasetMeta(i);
                                        if (this.graphform === 'horizontalBar') {
                                            meta.data.forEach((bar, index) => {
                                                const formattedData = dataset.data.map((value, index) => {
                                                    const percentage = this.dataset[index].percentage;
                                                    return `${value}|${percentage}`;
                                                });
                                                const data = (this.selectedItem === 0 && (this.tabledisplay === 'Customer Complaint' || this.tabledisplay === 'Root Cause Report')) ||
                                                    ((this.selectedItem === 1 || this.selectedItem === 2) && this.tabledisplay === 'Root Cause Report') ?
                                                    formattedData[index] : dataset.data[index]; // dataset.data[index]
                                                const xleng = (this.selectedItem === 0 && (this.tabledisplay === 'Customer Complaint' || this.tabledisplay === 'Root Cause Report')) ||
                                                    ((this.selectedItem === 1 || this.selectedItem === 2) && this.tabledisplay === 'Root Cause Report') ? 38 : 15; // dataset.data[index]
                                                ctx.font = 'bold 14px Arial';
                                                ctx.fillText(data, bar._model.x + xleng, bar._model.y + 8);
                                            });
                                        }
                                        else {
                                            meta.data.forEach((bar, index) => {
                                                const formattedData = dataset.data.map((value, index) => {
                                                    const percentage = this.dataset[index].percentage;
                                                    return `${value}|${percentage}`;
                                                });
                                                const data = (this.selectedItem === 0 && (this.tabledisplay === 'Customer Complaint' || this.tabledisplay === 'Root Cause Report')) ||
                                                    ((this.selectedItem === 1 || this.selectedItem === 2) && this.tabledisplay === 'Root Cause Report') ? formattedData[index] : dataset.data[index]; // dataset.data[index]
                                                ctx.font = 'bold 14px Arial';
                                                ctx.fillText(data, bar._model.x, bar._model.y - 4);
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                max: maxNum,
                                fontFamily: 'Noto Sans Lao',
                                fontSize: 14,
                                fontColor: '#000',
                                beginAtZero: true,
                            },
                        }],
                        xAxes: [{
                            stacked: true,
                            gridLines: {
                                display: true
                            },
                            ticks: {
                                max: (
                                    this.graphform === 'horizontalBar' &&
                                    (this.selectedItem === 0 && (this.tabledisplay === 'Customer Complaint' || this.tabledisplay === 'Root Cause Report')) ||
                                    ((this.selectedItem === 1 || this.selectedItem === 2) && this.tabledisplay === 'Root Cause Report')
                                ) ? (
                                    valueAll > 100 ? valueAll + 25 : (valueAll + 15

                                    )
                                ) : valueAll > 15 ? valueAll + 10 : valueAll + 5,

                                fontSize: 14,
                                fontColor: '#000',
                                fontFamily: 'Noto Sans Lao',
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
                    // this.tarGets();
                    clearInterval(this.intervalId);
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

.custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
    /* You can specify additional styles here */
}
</style>
  