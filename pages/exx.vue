<template>
  <div ref="pdfContent">
    <!-- @click="$router.go(-1)" -->
    <!-- start button download----------------------------------------------------------------------------------------------->
    <div class="shrink">
      <!--Sta book use------------------------------------------------------------------------------------------------------------------->
      <div
        class="text-right"
        style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 68px;
          right: 20px;
        "
      >
        <v-btn
          text
          fab
          small
          color="#000"
          @click="shows = !shows"
          style="z-index: 100"
        >
          <v-icon color="#000">mdi-clipboard-text-multiple-outline</v-icon>
        </v-btn>
      </div>
      <!--Sto book---------------------------------------------->

      <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
      <div
        class="text-right"
        style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 110px;
          right: 20px;
        "
        @mouseleave="expand = false"
      >
        <v-btn
          v-if="!expand"
          fab
          small
          color="#000"
          @mouseenter="expand = true"
        >
          <div>
            <v-icon color="#ffff00">mdi-tray-arrow-up</v-icon>
          </div>
        </v-btn>
        <v-expand-x-transition v-else>
          <v-card v-show="expand" class="mt-1">
            <v-btn
              style="
                border-bottom-left-radius: 0%;
                border-bottom-right-radius: 0%;
              "
              width="100%"
              color="#000"
              @mouseenter="expand = true"
            >
              <div
                style="display: fixed; align-items: start"
                @click="expand = false"
              >
                <v-icon style="color: #ffff00">mdi-tray-arrow-up</v-icon>
              </div>
              <div @click="expand = false" style="color: #ffff00">Download</div>
            </v-btn>
          </v-card>
        </v-expand-x-transition>
        <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
        <v-expand-transition>
          <v-card
            v-show="expand"
            style="
              border-top-left-radius: 0%;
              border-top-right-radius: 0%;
              background-color: #ffffcc;
            "
            outlined
          >
            <v-col>
              <!-- Sta slid baton Download Excel------------------------------------------------------------------------------------------------------------------->
              <v-btn
                class="mt-2"
                :style="{
                  boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                }"
                text
                height="25%"
                width="100%"
                small
                color="#009933"
                :outlined="show === 'button1' ? false : true"
                @mouseenter="setOutlined('button1')"
                @mouseleave="detOutlined(true)"
                @click="exportToExcel"
              >
                <v-icon
                  style="background-color: #009933; border-radius=50%"
                  size="35"
                  color="#ffffff"
                  >mdi-microsoft-excel</v-icon
                >
                <v-card-text
                  :style="{
                    color: show === 'button1' ? '#009933' : '#000',
                  }"
                  >Excel</v-card-text
                >
              </v-btn>

              <!-- Sta slid baton Download CSV------------------------------------------------------------------------------------------------------------------->

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mt-2"
                    text
                    height="25%"
                    width="100%"
                    small
                    :style="{
                      boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                    }"
                    color="#ff3333"
                    :outlined="show === 'button2' ? false : true"
                    @mouseenter="setOutlined('button2')"
                    @mouseleave="detOutlined(true)"
                  >
                    <v-icon
                      style="background-color: #ff3333; border-radius=50%"
                      size="35"
                      color="#ffffff"
                      >mdi-file-pdf-box</v-icon
                    >
                    <v-card-text
                      :style="{
                        color: show === 'button2' ? '#ff3333' : '#000',
                      }"
                    >
                      PDF</v-card-text
                    >
                  </v-btn>
                </template>
                <span>PDF can not download</span>
              </v-tooltip>
            </v-col>
          </v-card>
        </v-expand-transition>
      </div>
    </div>
    <!-- stop button download-->

    <!--Sta title page------------------------------------------------------------------------------------------------------->

    <v-row :dark="dark" style="margin-top: 0px">
      <v-col style="background-color: hsl(0, 0%, 96%)">
        <v-card-text class="py-0">
          <v-row>
            <!--Sta title table-->
            <v-col cols="12" sm="4" class="py-1">
              <div>
                <v-card-actions class="py-0">
                  <v-btn
                    fab
                    x-small
                    text
                    style="background-color: #ffff00"
                    @click="$router.go(-1)"
                  >
                    <v-icon color="#000" size="25">mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <h3 style="color: #595959">
                      <span style="color: #ffff00">P</span>age Title
                    </h3>
                  </v-card-title>
                  <div class="mt-4">
                    <v-btn
                      small
                      fab
                      outlined
                      color="#ffff00"
                      @mouseenter="dateshow = true"
                    >
                      <v-icon size="30" :color="buttonColor"
                        >mdi-calendar-search</v-icon
                      >
                    </v-btn>
                  </div>
                </v-card-actions>
                <v-card-text class="py-0" style="color: #595959">
                  {{ date }}-{{ dates }}
                </v-card-text>
              </div>
            </v-col>
            <!--Sto title table-->

            <!--Sta date range----------------------------------------------------------------------------------------------------------->
            <v-col cols="12" sm="6" v-if="dateshow" class="py-0">
              <v-card
                outlined
                class="my-3 px-0"
                flat
                style="background-color: #ffffbc"
              >
                <v-card-text
                  class="pa-0 text-right"
                  style="background-color: #ffff00"
                >
                  <v-btn text x-small @click="dateshow = false">
                    <v-icon size="20">mdi-close</v-icon>
                  </v-btn>
                </v-card-text>
                <v-row>
                  <!--Sta date Start-------------------------------------------------------------------------------->
                  <v-col cols="12" sm="4" md="4" class="pl-4">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Start Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                        color="yellow "
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          style="color: #ff4d4d"
                          @click="menu = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          outlined
                          color="primary"
                          @click="$refs.menu.save(date)"
                        >
                          save
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <!--Sto Date start-->
                  <v-col cols="12" sm="1" md="1">
                    <v-card-text style="color: #404040" class="px-0 mt-2">
                      <h2>To</h2>
                    </v-card-text>
                  </v-col>
                  <!--Sta Date stop------------------------------------------------------------------------------------------------->
                  <v-col cols="12" sm="4" md="4">
                    <v-menu
                      ref="menus"
                      v-model="menus"
                      :close-on-content-click="false"
                      :return-value.sync="dates"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dates"
                          label="End Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dates"
                        no-title
                        scrollable
                        color="yellow "
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          style="color: #ff4d4d"
                          @click="menus = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          outlined
                          color="primary"
                          @click="$refs.menus.save(dates)"
                        >
                          save
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <!--Sto Date stop-->
                  <!-- Sta baton search date------------------------------------------------------------------------------------>
                  <v-col cols="12" sm="4" md="3">
                    <v-card-text class="text-right" @mouseenter="j = true">
                      <v-btn fab small color="#000" @click="getData()">
                        <v-icon :color="iconColor"> mdi-magnify </v-icon>
                      </v-btn>
                      Search
                    </v-card-text>
                  </v-col>
                  <!--sto baton search date-->
                </v-row>
              </v-card>
            </v-col>
            <!--Sto date range-->

            <v-col cols="12" sm="2" class="py-1"></v-col>
          </v-row>
        </v-card-text>
        <!--Sto title page-->

        <!--Sta table---------------------------------------------------------------------------------------------------------------------->
        <v-row>
          <v-col cols="12" sm="2" class="pr-0">
            <v-card
              width="100%"
              :style="{ maxWidth: colWidth }"
              class="rounded-0"
              color="#ffff00"
              outlined
            >
              <v-toolbar color="#000" dark>
                <v-toolbar-title style="color: #ffff00"
                  >Table display
                </v-toolbar-title>
              </v-toolbar>
              <v-list subheader two-line flat>
                <v-list-item-group class="table-container">
                  <v-list-item v-for="item in columns" :key="item.key">
                    <template v-slot:default="{ active }">
                      <v-list-item-action>
                        <v-checkbox
                          v-model="item.active"
                          :input-value="active"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="10" class="pl-0">
            <v-card
              outlined
              style="background-color: #ffff00"
              class="table-container text-center"
            >
              <v-card-text v-if="loading" class="pa-0">
                <v-progress-linear
                  indeterminate
                  color="#4d3d00"
                ></v-progress-linear>
              </v-card-text>
              <v-data-table
                dense
                :headers="visibleHeaders"
                :items="visibleItems"
                :items-per-page="8"
                item-key="name"
                class="elevation-1 ma-1"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--Sto title table-->
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
// import VueResizeDirective from 'vue-resize-directive'
// Vue.use(VueResizeDirective)
// import html2pdf from 'html2pdf.js'
export default {
  Currency: 'DefaultLayout',
  data() {
    return {
      loading: false,
      colWidth: 'auto',
      buttonColor: '#ffff00',
      iconColor: '#fff',
      desserts: [],

      columns: [
        { key: 'TICKETID', title: 'TICKETID', active: true },
        { key: 'CLASSIFICATION', title: 'CLASSIFICATION', active: true },
        { key: 'MSISDN', title: 'MSISDN', active: true },
        { key: 'SERVICE_GROUP', title: 'SERVICE_GROUP', active: true },
        { key: 'COMMODITY', title: 'COMMODITY', active: true },
        { key: 'CREATED__BY', title: 'CREATEDBY', active: true },
        { key: 'CREATIONDATE', title: 'CREATIONDATE', active: true },
        { key: 'QUEUED_DATE', title: 'QUEUED_DATE', active: true },
        { key: 'QUEUED_OWNERGROUP', title: 'QUEUED_OWNERGROUP', active: true },
        { key: 'INPROGRESS_DATE', title: 'INPROGRESS_DATE', active: true },
        { key: 'INPROGRESS_OWNER', title: 'INPROGRESS_OWNER', active: true },
        {
          key: 'INPROGRESS_OWNERGROUP',
          title: 'INPROGRESS_OWNERGROUP',
          active: true,
        },
        {
          key: 'INPROGRESS_CHANGBY',
          title: 'INPROGRESS_CHANGBY',
          active: true,
        },
        { key: 'RESOLVE_DATE', title: 'RESOLVE_DATE', active: true },
        { key: 'RESOLVE_OWNER', title: 'RESOLVE_OWNER', active: true },
        {
          key: 'RESOLVE_OWNERGROUP',
          title: 'RESOLVE_OWNERGROUP',
          active: true,
        },
        { key: 'RESOLVE_CHANGBY', title: 'RESOLVE_CHANGBY', active: true },
        { key: 'TIME_CARE_TPLUS', title: 'TIME_CARE_TPLUS', active: true },
        { key: 'TIME_DO_TPLUS', title: 'TIME_DO_TPLUS', active: true },
        {
          key: 'WORKLONG_DESCRIPTOIN',
          title: 'WORKLONG_DESCRIPTOIN',
          active: true,
        },
        { key: 'MODIFY_DATE', title: 'MODIFY_DATE', active: true },
        { key: 'MODIFY__BY', title: 'MODIFYBY', active: true },
        { key: 'PROVINCE', title: 'PROVINCE', active: true },
        { key: 'DISTRICT', title: 'DISTRICT', active: true },
        { key: 'VILLAGE', title: 'VILLAGE', active: true },
        { key: 'TIME_CARE', title: 'TIME_CARE', active: true },
        { key: 'TIME_DO', title: 'TIME_DO', active: true },
        { key: 'COMPLAIN_BY', title: 'COMPLAIN_BY', active: true },
        { key: 'CLOSE_DATE', title: 'CLOSE_DATE', active: true },
        { key: 'CLOSE__BY', title: 'CLOSE_BY', active: true },
        { key: 'STATUS_TICKET', title: 'STATUS_TICKET', active: true },
        {
          key: 'TIME_CLOSE_BY_CENTER',
          title: 'TIME_CLOSE_BY_CENTER',
          active: true,
        },
      ],
      headers: [
        {
          text: 'TICKETID',
          align: 'start',
          sortable: false,
          value: 'TICKETID',
        },
        { text: 'CLASSIFICATION', value: 'CLASSIFICATION' },
        { text: 'MSISDN', value: 'MSISDN' },
        { text: 'SERVICE_GROUP', value: 'SERVICE_GROUP' },
        { text: 'CREATED__BY', value: 'CREATEDBY' },
        { text: 'COMMODITY', value: 'COMMODITY' },
        { text: 'CREATIONDATE', value: 'CREATIONDATE' },
        { text: 'QUEUED_DATE', value: 'QUEUED_DATE' },
        { text: 'QUEUED_OWNERGROUP', value: 'QUEUED_OWNERGROUP' },
        { text: 'INPROGRESS_DATE', value: 'INPROGRESS_DATE' },
        { text: 'INPROGRESS_OWNER', value: 'INPROGRESS_OWNER' },
        { text: 'INPROGRESS_OWNERGROUP', value: 'INPROGRESS_OWNERGROUP' },
        { text: 'INPROGRESS_CHANGBY', value: 'INPROGRESS_CHANGBY' },
        { text: 'RESOLVE_DATE', value: 'RESOLVE_DATE' },
        { text: 'RESOLVE_OWNER', value: 'RESOLVE_OWNER' },
        { text: 'RESOLVE_OWNERGROUP', value: 'RESOLVE_OWNERGROUP' },
        { text: 'RESOLVE_CHANGBY', value: 'RESOLVE_CHANGBY' },
        { text: 'TIME_CARE_TPLUS', value: 'TIME_CARE_TPLUS' },
        { text: 'TIME_DO_TPLUS', value: 'TIME_DO_TPLUS' },
        { text: 'WORKLONG_DESCRIPTOIN', value: 'WORKLONG_DESCRIPTOIN' },
        { text: 'MODIFY_DATE', value: 'MODIFY_DATE' },
        { text: 'MODIFY__BY', value: 'MODIFYBY' },
        { text: 'PROVINCE', value: 'PROVINCE' },
        { text: 'DISTRICT', value: 'DISTRICT' },
        { text: 'VILLAGE', value: 'VILLAGE' },
        { text: 'TIME_CARE', value: 'TIME_CARE' },
        { text: 'TIME_DO', value: 'TIME_DO' },
        { text: 'COMPLAIN_BY', value: 'COMPLAIN_BY' },
        { text: 'CLOSE_DATE', value: 'CLOSE_DATE' },
        { text: 'CLOSE__BY', value: 'CLOSE_BY' },
        { text: 'STATUS_TICKET', value: 'STATUS_TICKET' },
        { text: 'TIME_CLOSE_BY_CENTER', value: 'TIME_CLOSE_BY_CENTER' },
      ],
      yd: false,
      shows: false,
      dark: true,
      expand: false,
      show: null,
      color: '#e5e5e5',
      date: new Date(
        Date.now() -
          24 * 60 * 60 * 1000 -
          new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
      menu: false,
      dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
      menus: false,
      dateshow: false,
      // r:[],
    }
  },
  mounted() {
    this.getData()
    this.coloricon()
  },
  methods: {
    setOutlined(value) {
      this.show = value
    },
    detOutlined(value) {
      this.show = value
    },

    exportToExcel() {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.desserts)

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Currency Data')

      // Generate a unique filename or use a timestamp for the file
      const filename = `currency_data_${Date.now()}.xlsx`

      // Wrap the writeFile function in a Promise
      return new Promise((resolve, reject) => {
        try {
          XLSX.writeFile(workbook, filename)
          resolve(filename)
        } catch (error) {
          reject(error)
        }
      })
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}` //
    },

    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    async someAsyncFunction() {
      try {
        const exportedFileName = await this.exportToExcel()
        console.log(`File exported successfully: ${exportedFileName}`)
      } catch (error) {
        console.error('Error exporting file:', error)
      }
    },
    async getData() {
      this.loading = true

      try {
        const startDate = this.date
        const endDate = this.dates
        const config = {
          headers: {
            'ngrok-skip-browser-warning': 'true', // Include the custom header
          },
        }

        const res = await this.$axios.$get(
          `https://a347-115-84-68-228.ngrok-free.app/ticket?startDate=${encodeURIComponent(
            startDate
          )}&endDate=${encodeURIComponent(endDate)}`,
          config
        )
        const uniqueDesserts = res.filter(
          (value, index, self) =>
            self.findIndex((item) => item.TICKETID === value.TICKETID) === index
        )
// -------------------------------- index object
        res.forEach((object, index) => {
          console.log(
            `Index: ${index}, TICKETID: ${object.TICKETID}, CLASSIFICATION: ${object.CLASSIFICATION}`
          )
          // You can access other properties of the object here
        })
        // console.log(res)
        // console.log(uniqueDesserts)
        // this.r=res

        this.desserts = uniqueDesserts.map((item, index) => {
          // const modifiedIndex1 = index === 0 ? index : index * 5 // Increase the index by 5 from the second item onwards
          const inprogressowner = index === 0 ? index + 2 : index * 5 + 2 // Increase the index by 5 from the second item onwards
          const inprogressownerValue = res[inprogressowner]?.QUEUED_OWNER || ''

          const resolveowner = index === 0 ? index + 2 : index * 5 + 2 // Increase the index by 5 from the second item onwards
          const resolveownerValue = res[resolveowner]?.QUEUED_OWNER || ''

          const resolveownergroup = index === 0 ? index + 3 : index * 5 + 3 // Increase the index by 5 from the second item onwards
          const resolveownergroupValue =
            res[resolveownergroup]?.OWNERGROUP || ''

          const inprogresschangeby = index === 0 ? index + 3 : index * 5 + 3 // Increase the index by 5 from the second item onwards
          const inprogresschangeValue =
            res[inprogresschangeby]?.INPROGRESS_CHANGEBY || ''

          const resolvechangeby = index === 0 ? index + 3 : index * 5 + 3 // Increase the index by 5 from the second item onwards
          const rsolvechangebyValue =
            res[resolvechangeby]?.INPROGRESS_CHANGEBY || ''

          const closeby = index === 0 ? index + 4 : index * 5 + 4 // Increase the index by 5 from the second item onwards
          const closebyValue = res[closeby]?.INPROGRESS_CHANGEBY || ''

          const statusticket = index === 0 ? index + 4 : index * 5 + 4 // Increase the index by 5 from the second item onwards
          const statusticketValue = res[statusticket]?.STATUS || ''

          const inprogressdate = index === 0 ? index + 2 : index * 5 + 2 // Increase the index by 5 from the second item onwards
          const inprogressdateValue = res[inprogressdate]?.QUEUED_DATE || ''

          const resolvedate = index === 0 ? index + 3 : index * 5 + 3 // Increase the index by 5 from the second item onwards
          const resolvedateValue = res[resolvedate]?.QUEUED_DATE || ''

          const qeuredate = index === 0 ? index : index * 5 // Increase the index by 5 from the second item onwards
          const qeuredateValue = res[qeuredate]?.QUEUED_DATE || ''

          const colsedate = index === 0 ? index + 4 : index * 5 + 4 // Increase the index by 5 from the second item onwards
          const colsedateValue = res[colsedate]?.QUEUED_DATE || ''

          const date1 = new Date(inprogressdateValue)
          const date2 = new Date(qeuredateValue)
          const date3 = new Date(resolvedateValue)
          const date4 = new Date(colsedateValue)

          const timecare = date1 - date2
          const hours = Math.floor(timecare / (1000 * 60 * 60))
          const minutes = Math.floor(
            (timecare % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecaretplus = (timecare, hours, minutes)
          // --------------------------------
          // const timedotplus = resolvedateValue.getDate() - qeuredateValue.getDate()
          const timedo = date3 - date2
          const hoursdo = Math.floor(timedo / (1000 * 60 * 60))
          const minutesdo = Math.floor(
            (timedo % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timedotplus = (timedo, hoursdo, minutesdo)
          // --------------------------------

          const timecenter = date4 - date3
          const hourscenter = Math.floor(timecenter / (1000 * 60 * 60))
          const minutescenter = Math.floor(
            (timecenter % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecolsebycenter = (timecenter, hourscenter, minutescenter)
          return {
            TICKETID: item.TICKETID,
            CLASSIFICATION: item.CLASSIFICATION,
            MSISDN: item.MSISDN,
            SERVICE_GROUP: item.SERVICE_GROUP,
            COMMODITY: item.COMMODITY,
            CREATEDBY: item.CREATEDBY,
            CREATIONDATE: item.CREATIONDATE,
            QUEUED_DATE: qeuredateValue,
            QUEUED_OWNERGROUP: item.OWNERGROUP,
            INPROGRESS_DATE: inprogressdateValue,
            INPROGRESS_OWNER: inprogressownerValue,
            INPROGRESS_OWNERGROUP: item.OWNERGROUP,
            INPROGRESS_CHANGBY: inprogresschangeValue,
            RESOLVE_DATE: resolvedateValue,
            RESOLVE_OWNER: resolveownerValue,
            RESOLVE_OWNERGROUP: resolveownergroupValue,
            RESOLVE_CHANGBY: rsolvechangebyValue,
            TIME_CARE_TPLUS: timecaretplus, // inprogressdateValue - qeuredateValue
            TIME_DO_TPLUS: timedotplus, // resolvedateValue - qeuredateValue
            WORKLONG_DESCRIPTOIN: item.FIRST_WORKLOG_DESCRIPTION,
            MODIFY_DATE: resolvedateValue,
            MODIFYBY: item.FIRST_WORKLOG_MODIFYBY,
            PROVINCE: item.PROVINCE,
            DISTRICT: item.DISTRICT,
            VILLAGE: item.VILLAGE,
            COMPLAIN_BY: item.COMPLAIN_BY,
            CLOSE_DATE: colsedateValue,
            CLOSE_BY: closebyValue,
            STATUS_TICKET: statusticketValue,
            TIME_CLOSE_BY_CENTER: timecolsebycenter, // colsedateValue - resolvedateValue
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors as needed, e.g., show an error message to the user
      }
      // console.log(this.desserts)
      this.loading = false
    },
    // download file PDF
    // async exportToPDF() {
    //   try {
    //     const content = this.$refs.pdfContent // Use a ref on the content you want to convert to PDF
    //     const pdfOptions = {
    //       margin: 10,
    //       filename: 'your_pdf_filename.pdf',
    //       image: { type: 'jpeg', quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //     }

    //     const pdf = await html2pdf().from(content).set(pdfOptions).outputPdf()

    //     const blob = new Blob([pdf], { type: 'application/pdf' })
    //     const link = document.createElement('a')
    //     link.href = URL.createObjectURL(blob)
    //     link.download = 'your_pdf_filename.pdf'
    //     link.click()
    //   } catch (error) {
    //     console.error('Error exporting PDF:', error)
    //   }
    // },
    coloricon() {
      // Your getData() logic here

      // Change button and icon colors every second
      setInterval(() => {
        this.buttonColor = this.getRandomColor(['#ffff00', '#000'])
        this.iconColor = this.getRandomColor(['#ffff00', '#ffff', 'blue'])
        // Update text every second (optional)
      }, 1000)
    },
    getRandomColor(colorOptions) {
      // Function to select a random color from the provided options
      const randomIndex = Math.floor(Math.random() * colorOptions.length)
      return colorOptions[randomIndex]
    },
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((header) => {
        const column = this.columns.find((col) => col.key === header.value)
        return column ? column.active : false
      })
    },
    visibleItems() {
      return this.desserts.map((item) => {
        const newItem = { ...item }
        this.columns.forEach((col) => {
          if (!col.active) {
            newItem[col.key] = undefined
          }
        })
        return newItem
      })
    },
  },
}
</script>
<style>
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
table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
  