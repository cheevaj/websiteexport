<template>
  <div ref="pdfContent">
    <!-- @click="$router.go(-1)" -->
    <!-- start button download----------------------------------------------------------------------------------------------->
    <div class="shrink">
      <!--Sta book use------------------------------------------------------------------------------------------------------------------->
      <div class="text-right" style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 68px;
          right: 20px;
        ">
        <v-btn text fab small color="#000" style="z-index: 100" @click="shows = !shows">
          <v-icon color="#000">mdi-clipboard-text-multiple-outline</v-icon>
        </v-btn>
      </div>
      <!--Sto book---------------------------------------------->
      <!-- sta alert file download---------------------------------------------------------------->
      <!-- <v-card v-if="alert !== false" flat outline class="rounded-0 pa-0"
        style="position: absolute; z-index:100; top: 20%; right: 5px;">
        <v-alert class="ma-0" style="width: 350px;" :value="alert === 'alertsuccess' ? true : false" text type="success"
          icon="mdi-check-circle-outline" transition="scale-transition" @mouseenter="stopalert()"
          @mouseleave="closealrt(alert='alertsuccess')">
          Download the file successfully.
        </v-alert>
        <v-alert class="ma-0" style="width: 350px;" :value="(alert !== 'alertsuccess' && alert !== false) ? true : false"
          text type="error" icon="mdi-close-circle-outline" transition="scale-transition" @mouseenter="stopalert()"
          @mouseleave="closealrt()">
          Download the file is error.
          <v-divider style="background-color: rgb(183, 183, 183);"></v-divider>
          <small>{{ alert }}</small>
        </v-alert>
      </v-card> -->
      <!---stop alert file download-------------------------------------------------------------------------------------->

      <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
      <div class="text-right" style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 110px;
          right: 20px;
        " @mouseleave="expand = false">
        <v-btn v-if="(!expand && !overlay)" fab small color="#000" @mouseenter="expand = true">
          <div>
            <v-icon color="#ffff00">mdi-tray-arrow-up</v-icon>
          </div>
        </v-btn>
        <v-btn v-else-if="(expand && overlay)" fab small color="#000" @mouseenter="expand = true">
          <div>
            <v-icon color="#ffff00">mdi-close</v-icon>
          </div>
        </v-btn>
        <v-expand-x-transition v-else>
          <v-card v-show="expand" class="mt-1">
            <v-btn style="
                border-bottom-left-radius: 0%;
                border-bottom-right-radius: 0%;
              " width="100%" color="#000" @mouseenter="expand = true">
              <div style="display: fixed; align-items: start" @click="expand = false">
                <v-icon style="color: #ffff00">mdi-tray-arrow-up</v-icon>
              </div>
              <div style="color: #ffff00" @click="expand = false">Download</div>
            </v-btn>
          </v-card>
        </v-expand-x-transition>
        <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
        <v-expand-transition>
          <v-card v-show="expand" style="
              border-top-left-radius: 0%;
              border-top-right-radius: 0%;
              background-color: #ffffcc;
            " outlined>
            <v-col>
              <!-- Sta slid baton Download Excel------------------------------------------------------------------------------------------------------------------->
              <v-btn class="mt-2" :style="{
                boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
              }" text height="25%" width="100%" small color="#009933" :outlined="show === 'button1' ? false : true"
                @mouseenter="setOutlined('button1')" @mouseleave="detOutlined(true)" @click="someAsyncFunction()">
                <v-icon style="background-color: #009933; border-radius=50%" size="35"
                  color="#ffffff">mdi-microsoft-excel</v-icon>
                <v-card-text :style="{
                  color: show === 'button1' ? '#009933' : '#000',
                }">Excel</v-card-text>
              </v-btn>

              <!-- Sta slid baton Download CSV------------------------------------------------------------------------------------------------------------------->

              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn v-bind="attrs" class="mt-2" text height="25%" width="100%" small :style="{
                    boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                  }" color="#ff3333" :outlined="show === 'button2' ? false : true" v-on="on"
                    @mouseenter="setOutlined('button2')" @mouseleave="detOutlined(true)">
                    <v-icon style="background-color: #ff3333; border-radius=50%" size="35"
                      color="#ffffff">mdi-file-pdf-box</v-icon>
                    <v-card-text :style="{
                      color: show === 'button2' ? '#ff3333' : '#000',
                    }">
                      PDF</v-card-text>
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
                  <v-btn fab x-small text style="background-color: #ffff00" @click="$router.go(-1)">
                    <v-icon color="#000" size="25">mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-card-title>
                    <v-spacer></v-spacer>
                    <h3 style="color: #595959">
                      <span style="color: #ffff00">P</span>age Title
                    </h3>
                  </v-card-title>
                  <div class="mt-4">
                    <v-btn small fab outlined color="#ffff00" @mouseenter="dateshow = true">
                      <v-icon size="30" :color="buttonColor">mdi-calendar-search</v-icon>
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
            <v-col cols="12" sm="6" class="py-0">
              <div v-if="dateshow">
                <v-card outlined class="my-3 px-0" flat style="background-color: #ffffbc">
                  <v-card-text class="pa-0 text-right" style="background-color: #ffff00">
                    <v-btn text x-small @click="dateshow = false">
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn>
                  </v-card-text>
                  <v-row>
                    <!--Sta date Start-------------------------------------------------------------------------------->
                    <v-col cols="12" sm="4" md="4" class="pl-4">
                      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                        transition="scale-transition" offset-y min-width="auto">
                        <template #activator="{ on, attrs }">
                          <v-text-field v-model="date" label="Start Date" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable color="yellow ">
                          <v-spacer></v-spacer>
                          <v-btn text style="color: #ff4d4d" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn outlined color="primary" @click="$refs.menu.save(date)">
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
                      <v-menu ref="menus" v-model="menus" :close-on-content-click="false" :return-value.sync="dates"
                        transition="scale-transition" offset-y min-width="auto">
                        <template #activator="{ on, attrs }">
                          <v-text-field v-model="dates" label="End Date" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" no-title scrollable color="yellow ">
                          <v-spacer></v-spacer>
                          <v-btn text style="color: #ff4d4d" @click="menus = false">
                            Cancel
                          </v-btn>
                          <v-btn outlined color="primary" @click="$refs.menus.save(dates)">
                            save
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <!--Sto Date stop-->
                    <!-- Sta baton search date------------------------------------------------------------------------------------>
                    <v-col cols="12" sm="4" md="3">
                      <v-overlay class="text-center" :absolute="absolute" :value="overlay">
                        <p>Date start should lower than Date stop.
                          <span style="background-color: #ffff00; color: #000;">
                            {{ date }}
                          </span><span class="text-h5"> |</span><span style="background-color: #ffff00; color: #000;">
                            {{ dates }}
                          </span>
                        </p>
                        <v-btn style="background-color: #ffff00; color: #000; " @click="overlay = false">
                          Ok, I see
                        </v-btn>
                      </v-overlay>
                      <v-card-text class="text-right">
                        <v-btn fab small color="#000" @mouseenter="datelang()" @click="getData()">
                          <v-icon :color="iconColor"> mdi-magnify </v-icon>
                        </v-btn>
                        Search
                      </v-card-text>
                    </v-col>
                    <!--sto baton search date-->
                  </v-row>
                </v-card>
              </div>
            </v-col>
            <!--Sto date range-->

            <v-col cols="12" sm="2" class="py-1">
              <v-card-text v-if="(!expand && !overlay)" class="text-center mt-4" style="
                 min-height: 1px;
                  z-index: 100;
                  bottom: 1px;
                  right: 90px;">
                <v-tooltip bottom class="px-4">
                  <template #activator="{ on, attrs }">
                    <v-btn text style="z-index: 100; background-color: transparent; color: transparent;" v-bind="attrs"
                    v-on="on"
                      @click="$router.push('/graph')" @mouseenter="colWidth = true" @mouseleave="colWidth = false">
                      <v-icon size="45" :color="colWidth ? '#ffff00' : '#000'">mdi-chart-bar</v-icon>
                    </v-btn>

                  </template>
                  <span class="tooltip" ref="tooltip">Display Graph</span>
                </v-tooltip>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-text>
        <!--Sto title page-->

        <!--Sta table---------------------------------------------------------------------------------------------------------------------->
        <v-card-actions class="expandable-row py-0">
          <div ref="resizableCol2" class="my-4 " @mousedown="startResize">
            <v-card class="rounded-0 " width="100%" height="80%" :style="{ width: col1Width + 'px' }" color="#ffff00"
              outlined>
              <v-toolbar color="#000" dark>
                <v-toolbar-title style="color: #ffff00">
                  <div>Table display</div>
                  <input v-model="col1Width" class="resizable" type="range" color="#ffff00" :min="minCol1Width"
                    :max="maxCol1Width" />
                </v-toolbar-title>
              </v-toolbar>
              <v-list subheader two-line flat>
                <v-list-item-group class="table-title-hiegth">
                  <v-list-item v-for="item in columns" :key="item.key">
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox v-model="item.active" :input-value="active"></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </div>
          <v-col class="py-0 pl-0">
            <v-card outlined style="background-color: #ffff00" class="table-hiegth text-center">
              <v-card-text v-if="loading" class="pa-0">
                <v-progress-linear indeterminate color="#4d3d00"></v-progress-linear>
              </v-card-text>
              <v-data-table v-if="!overlay" dense :headers="visibleHeaders" :items="visibleItems" :items-per-page="10"
                item-key="name" class="elevation-1 ma-1  px-4">
              </v-data-table>
              <v-card-text v-else class="pa-1">
                <v-card flat min-height="474px" class="text-h5">
                  <span style="color: #cccccc;">
                    Data Not found
                  </span>
                  <v-divider></v-divider>
                  <br>
                  <br>
                  <br>
                  <br>
                  <br>
                  <span>
                    <v-card-text>
                      <span style="color: #595959;">
                        Check date again Date start should lower than Date stop.
                      </span>
                      <br>
                      <span style="color: #595959;">
                        Data Not found because : The Date stop is less than Date start or Net word Error.
                      </span>
                    </v-card-text>
                  </span>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-card-actions>
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
      alert: false,
      absolute: true,
      overlay: false,
      loading: false,
      colWidth: false,
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
        { text: 'COMPLAIN_BY', value: 'COMPLAIN_BY' },
        { text: 'CLOSE_DATE', value: 'CLOSE_DATE' },
        { text: 'CLOSE__BY', value: 'CLOSE_BY' },
        { text: 'STATUS_TICKET', value: 'STATUS_TICKET' },
        { text: 'TIME_CLOSE_BY_CENTER', value: 'TIME_CLOSE_BY_CENTER' },
      ],
      col1Width: 150,
      minCol1Width: 60,
      maxCol1Width: 250,
      resizing: false,
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
      dateshow: true,
      // r:[],
    }
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

  mounted() {
    this.getData()
    this.coloricon()
    // this.closealrt()
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
      const filename = `Ticket data ${Date.now()}.xlsx`

      // Wrap the writeFile function in a Promise
      return new Promise((resolve, reject) => {
        try {
          XLSX.writeFile(workbook, filename)
          resolve(filename)
          this.alert = 'alertsuccess';
        } catch (error) {
          reject(error)
          // this.alert = error;

        }
      })
    },

    // ------------- function craet
    async someAsyncFunction() {
      try {
        const exportedFileName = await this.exportToExcel()

        console.log(`File exported successfully: ${exportedFileName}`)

      } catch (error) {

        const errors = (error === 'undefined' || null) ? '' : error;
        console.error('Error exporting file:', error)
        this.alert = errors;
      }
    },
    // sta function alert file download success---------------------------------------------------------------->
    // sto function alert file download success---------------------------------------------------------------->

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


    // ------------- function Get data in server

    datelang() {
      const datestart = new Date(this.date)
      const datestop = new Date(this.dates)
      const datelang = datestop - datestart
      if (datelang >= 0) {
        this.overlay = false;
      }
      else {
        this.overlay = true;
      }
    },
    async getData() {

      // const hours = Math.floor(datelang / (1000 * 60 * 60))
      // if (datelang >= 0) {

      // console.log(hours)
      this.loading = true

      try {
        const startDate = this.date
        const endDate = this.dates

        const res = await this.$axios.$get(
          `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
            startDate
          )}&endDate=${encodeURIComponent(endDate)}`
        )

        // --------- loop data in lastindex of Object in group ID
        const lastIndexes = {}
        const firstIndexes = {}
        const resolvebyIndex = {}
        const indateIndex = {}
        const inownerIndex = {}

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof inownerIndex[currentTicketID] === 'undefined') {
            inownerIndex[currentTicketID] = i - 3
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof lastIndexes[currentTicketID] === 'undefined') {
            lastIndexes[currentTicketID] = i
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof indateIndex[currentTicketID] === 'undefined') {
            indateIndex[currentTicketID] = i - 2
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof resolvebyIndex[currentTicketID] === 'undefined') {
            resolvebyIndex[currentTicketID] = i - 1
          }
        }

        for (let i = 0; i < res.length; i++) {
          const currentTicketID = res[i].TICKETID
          if (typeof firstIndexes[currentTicketID] === 'undefined') {
            firstIndexes[currentTicketID] = i
          }
        }

        // --------- last  data in lastindex of Object in group ID

        const desserts = Object.values(firstIndexes).map((firstIndex) => {
          // ---------------- fech data in desserts
          const firstItem = res[firstIndex]
          const lastItemIndex = lastIndexes[firstItem.TICKETID]
          const lastItem = res[lastItemIndex]
          const resolveItemIndex = resolvebyIndex[firstItem.TICKETID]
          const resolveItem =
            resolveItemIndex !== undefined ? res[resolveItemIndex] : null
          const inprogressItemIndex = indateIndex[firstItem.TICKETID]
          const inprogressItem = //  -2
            inprogressItemIndex !== undefined ? res[inprogressItemIndex] : null
          const inownerItemIndex = inownerIndex[firstItem.TICKETID]
          const inownerItem =
            inownerItemIndex !== undefined ? res[inownerItemIndex] : null

          function convertToISOFormat(dateString) {
            if (!dateString) {
              return null // or handle the case where dateString is undefined
            }

            const dateParts = dateString.split(' ')

            if (dateParts.length !== 2) {
              return null // or handle the case where the expected format is not found
            }

            const [day, month, year] = dateParts[0].split('-')
            const [hours, minutes, seconds] = dateParts[1].split(':')

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
          }
          const date1 = new Date(convertToISOFormat(inprogressItem.QUEUED_DATE))
          const date2 = new Date(convertToISOFormat(firstItem.QUEUED_DATE))
          const date3 = new Date(convertToISOFormat(resolveItem.QUEUED_DATE))
          const date4 = new Date(convertToISOFormat(lastItem.QUEUED_DATE))
          console.log('d1', date3)
          console.log(resolveItem.QUEUED_DATE)
          console.log('d2', date2)
          console.log(firstItem.QUEUED_DATE)

          // const time  care  tplus = resolvedateValue.getDate() - qeuredateValue.getDate()

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
          console.log('tic', timedotplus)
          // --------------------------------

          const timecenter = date4 - date3
          const hourscenter = Math.floor(timecenter / (1000 * 60 * 60))
          const minutescenter = Math.floor(
            (timecenter % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecolsebycenter = (timecenter, hourscenter, minutescenter)
          //  data in desertes
          return {
            TICKETID: firstItem.TICKETID,
            CLASSIFICATION: firstItem.CLASSIFICATION,
            MSISDN: firstItem.MSISDN,
            SERVICE_GROUP: firstItem.SERVICE_GROUP,
            COMMODITY: firstItem.COMMODITY,
            CREATEDBY: firstItem.CREATEDBY,
            CREATIONDATE: firstItem.CREATIONDATE,
            QUEUED_DATE: firstItem.QUEUED_DATE,
            QUEUED_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_DATE: inprogressItem.QUEUED_DATE,
            INPROGRESS_OWNER: inownerItem.QUEUED_OWNER,
            INPROGRESS_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_CHANGBY: inownerItem.INPROGRESS_CHANGEBY,
            RESOLVE_DATE: resolveItem.QUEUED_DATE,
            RESOLVE_OWNER: inprogressItem.QUEUED_OWNER,
            RESOLVE_OWNERGROUP: inprogressItem.OWNERGROUP,
            RESOLVE_CHANGBY: inprogressItem.INPROGRESS_CHANGEBY,
            TIME_CARE_TPLUS: timecaretplus, // inprogressdateValue - qeuredateValue
            TIME_DO_TPLUS: timedotplus, // resolvedateValue - qeuredateValue
            WORKLONG_DESCRIPTOIN: firstItem.FIRST_WORKLOG_DESCRIPTION,
            MODIFY_DATE: resolveItem.QUEUED_DATE,
            MODIFYBY: firstItem.FIRST_WORKLOG_MODIFYBY,
            PROVINCE: firstItem.PROVINCE,
            DISTRICT: firstItem.DISTRICT,
            VILLAGE: firstItem.VILLAGE,
            COMPLAIN_BY: firstItem.COMPLAIN_BY,
            CLOSE_DATE: lastItem.QUEUED_DATE,
            CLOSE_BY: lastItem.INPROGRESS_CHANGEBY,
            STATUS_TICKET: lastItem.STATUS,
            TIME_CLOSE_BY_CENTER: timecolsebycenter, // colsedateValue - resolvedateValue
          }
        })

        // console.log(desserts)

        this.desserts = desserts
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors as needed, e.g., show an error message to the user
      }
      this.loading = false
      // }
      // else {
      //   console.log("hi")
      // }
    },

    coloricon() {
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
    // - width title diplay ---------------------
    startResize(event) {
      this.resizing = true
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },

    handleMouseUp() {
      if (this.resizing) {
        this.resizing = false
        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)
      }
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

/* .table-container {
  max-height: 450px;
  overflow-y: auto;
} */
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
  