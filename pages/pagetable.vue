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
                        <span @click="getData()">
                          Search
                        </span>
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
                <v-tooltip v-if="loading" bottom class="px-4">
                  <template #activator="{ on, attrs }">
                    <v-btn text style=" background-color: transparent; color: transparent;" v-bind="attrs" v-on="on"
                      @mouseenter="colWidth = true" @mouseleave="colWidth = false">
                      <v-progress-circular :size="35" color="yellow" indeterminate></v-progress-circular>
                    </v-btn>
                  </template>
                  <span class="tooltip" ref="tooltip">Loading Graph</span>
                </v-tooltip>
                <v-tooltip v-else bottom class="px-4">
                  <template #activator="{ on, attrs }">
                    <v-btn text style=" background-color: transparent; color: transparent;" v-bind="attrs" v-on="on"
                      @click="showgraph = !showgraph" @mouseenter="colWidth = true" @mouseleave="colWidth = false">
                      <v-icon v-if="!showgraph" size="45" :color="colWidth ? '#ffff00' : '#000'">mdi-chart-bar</v-icon>
                      <v-icon v-else size="45" :color="colWidth ? '#ffff00' : '#000'">mdi-table-large</v-icon>
                    </v-btn>
                  </template>
                  <span v-if="!showgraph" class="tooltip" ref="tooltip">Display Graph</span>
                  <span v-else class="tooltip" ref="tooltip">Display Table Data</span>
                </v-tooltip>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-text>
        <!--Sto title page-->
        <!--Sta table---------------------------------------------------------------------------------------------------------------------->
        <v-card-actions v-if="!showgraph" class="expandable-row py-0">
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
          <v-col class="py-0 pl-1" :style="{ 'max-width': 'calc(100% - ' + col1Width + 'px)' }">
            <v-card outlined style="background-color: #ffff00;" height="474" class=" table-container text-center">
              <v-card-text v-if="loading" class="pa-0">
                <v-progress-linear indeterminate color="#4d3d00"></v-progress-linear>
              </v-card-text>
              <v-data-table v-if="!overlay" height="397px" fixed-header dense :headers="visibleHeaders"
                :items="visibleItems" :items-per-page="10" item-key="TICKETID" class="elevation-1 pt-4">
                <template v-slot:header="{ header }">
                  <th v-if="header" style="background-color: #000; color: #ffff00;">
                    {{ header.text }}
                  </th>
                </template>
              </v-data-table>
              <v-card-text v-else class="pa-1">
                <v-card flat min-height="470px" class="text-h5">
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
        <!-- page graph------------------------>
        <v-card v-if="showgraph" class="my-4">
          <v-progress-linear v-if="loading" indeterminate color="#4d3d00"></v-progress-linear>
          <chartgraph :desserts="desserts" />
        </v-card>
      </v-col>
    </v-row>

    <!--Sto title table-->
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
import chartgraph from './chartgraph.vue'
export default {
  Currency: 'DefaultLayout',
  components: {
    chartgraph,
  },
  data() {
    return {
      showgraph: false,
      alert: false,
      absolute: true,
      overlay: false,
      loading: false,
      colWidth: false,
      buttonColor: '#ffff00',
      iconColor: '#fff',
      desserts: [],
      // column show of table
      columns: [
        { key: 'TICKETID', title: 'TICKETID', active: true },
        { key: 'CLASSIFICATION', title: 'CLASSIFICATION', active: true },
        { key: 'MSISDN', title: 'MSISDN', active: true },
        { key: 'SERVICE_GROUP', title: 'SERVICE_GROUP', active: true },
        { key: 'COMMODITY', title: 'COMMODITY', active: true },
        { key: 'CREATEDBY', title: 'CREATEDBY', active: true },
        { key: 'CREATIONDATE', title: 'CREATIONDATE', active: true },
        { key: 'QUEUED_DATE', title: 'QUEUED_DATE', active: true },
        { key: 'QUEUED_OWNERGROUP', title: 'QUEUED_OWNERGROUP', active: true },
        { key: 'INPROGRESS_DATE', title: 'INPROGRESS_DATE', active: true },
        { key: 'INPROGRESS_OWNER', title: 'INPROGRESS_OWNER', active: true },
        { key: 'INPROGRESS_OWNERGROUP', title: 'INPROGRESS_OWNERGROUP', active: true },
        { key: 'INPROGRESS_CHANGBY', title: 'INPROGRESS_CHANGBY', active: true },
        { key: 'ROOT_CAUSE', title: 'ROOT_CAUSE', active: true, },
        { key: 'SOLUTION_SHOT', title: 'SOLUTION_SHOT', active: true, },
        { key: 'ROOT_CAUSE_DESCRIPTIONS', title: 'ROOT_CAUSE_DESCRIPTIONS', active: true },
        { key: 'ROOT_CAUSE_BY_STATUS', title: 'ROOT_CAUSE_BY_STATUS', active: true },
        { key: 'ROOT_CAUSE_BY_TIER', title: 'ROOT_CAUSE_BY_TIER', active: true, },
        { key: 'RESOLVE_DATE', title: 'RESOLVE_DATE', active: true },
        { key: 'RESOLVE_OWNER', title: 'RESOLVE_OWNER', active: true },
        { key: 'RESOLVE_OWNERGROUP', title: 'RESOLVE_OWNERGROUP', active: true },
        { key: 'RESOLVE_CHANGBY', title: 'RESOLVE_CHANGBY', active: true },
        { key: 'TIME_CARE_TPLUS', title: 'TIME_CARE_TPLUS', active: true },
        { key: 'TIME_DO_TPLUS', title: 'TIME_DO_TPLUS', active: true },
        { key: 'WORKLONG_DESCRIPTOIN', title: 'WORKLONG_DESCRIPTOIN', active: true },
        { key: 'MODIFY_DATE', title: 'MODIFY_DATE', active: true },
        { key: 'MODIFY__BY', title: 'MODIFYBY', active: true },
        { key: 'PROVINCE', title: 'PROVINCE', active: true },
        { key: 'DISTRICT', title: 'DISTRICT', active: true },
        { key: 'VILLAGE', title: 'VILLAGE', active: true },
        { key: 'COMPLAIN_BY', title: 'COMPLAIN_BY', active: true },
        { key: 'CLOSE_DATE', title: 'CLOSE_DATE', active: true },
        { key: 'CLOSE_BY', title: 'CLOSE_BY', active: true },
        { key: 'STATUS_TICKET', title: 'STATUS_TICKET', active: true },
        {
          key: 'TIME_CLOSE_BY_CENTER',
          title: 'TIME_CLOSE_BY_CENTER',
          active: true,
        },

      ],
      // title table
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
        { text: 'CREATEDBY', value: 'CREATEDBY' },
        { text: 'COMMODITY', value: 'COMMODITY' },
        { text: 'CREATIONDATE', value: 'CREATIONDATE' },
        { text: 'QUEUED_DATE', value: 'QUEUED_DATE' },
        { text: 'QUEUED_OWNERGROUP', value: 'QUEUED_OWNERGROUP' },
        { text: 'INPROGRESS_DATE', value: 'INPROGRESS_DATE' },
        { text: 'INPROGRESS_OWNER', value: 'INPROGRESS_OWNER' },
        { text: 'INPROGRESS_OWNERGROUP', value: 'INPROGRESS_OWNERGROUP' },
        { text: 'INPROGRESS_CHANGBY', value: 'INPROGRESS_CHANGBY' },
        { text: 'ROOT_CAUSE_DESCRIPTIONS', value: 'ROOT_CAUSE_DESCRIPTIONS' },
        { text: 'SOLUTION_SHOT', value: 'SOLUTION_SHOT' },
        { text: 'ROOT_CAUSE_BY_DEPARTMENT', value: 'ROOT_CAUSE_BY_DEPARTMENT' },
        { text: 'ROOT_CAUSE_BY_STATUS', value: 'ROOT_CAUSE_BY_STATUS' },
        { text: 'ROOT_CAUSE_BY_TIER', value: 'ROOT_CAUSE_BY_TIER' },
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
        { text: 'CLOSE_BY', value: 'CLOSE_BY' },
        { text: 'STATUS_TICKET', value: 'STATUS_TICKET' },
        { text: 'TIME_CLOSE_BY_CENTER', value: 'TIME_CLOSE_BY_CENTER' },

      ],
      col1Width: 80,
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
        (7 * 24) * 60 * 60 * 1000 -
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
    // -- header table 
    visibleHeaders() {
      return this.headers.filter((header) => {
        const column = this.columns.find((col) => col.key === header.value)
        return column ? column.active : false
      })
    },
    // ---- data table
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
  },
  methods: {
    setOutlined(value) {
      this.show = value
    },
    detOutlined(value) {
      this.show = value
    },
    //  function export file excel
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

    // ------------- function create name file excel 
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

    // function change date style date
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
    // function check date start and date stop
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
    // ------------- function Get data in api
    async getData() {
      this.showgraph = false;
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
        // index of last - 3 in ticket ID similar
        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID
          if (typeof inownerIndex[currentTicketID] === 'undefined') {
            inownerIndex[currentTicketID] = i - 3
          }
        }
        // index of last in ticket ID similar
        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof lastIndexes[currentTicketID] === 'undefined') {
            lastIndexes[currentTicketID] = i
          }
        }
        // index of last - 2 in ticket ID similar
        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof indateIndex[currentTicketID] === 'undefined') {
            indateIndex[currentTicketID] = i - 2
          }
        }
        // index of last - 1 in ticket ID similar
        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof resolvebyIndex[currentTicketID] === 'undefined') {
            resolvebyIndex[currentTicketID] = i - 1
          }
        }
        // index of fist index in ticket ID similar
        for (let i = 0; i < res.length; i++) {
          const currentTicketID = res[i].TICKETID
          if (typeof firstIndexes[currentTicketID] === 'undefined') {
            firstIndexes[currentTicketID] = i
          }
        }
        // --------- last  data in lastindex of Object in group ID
        const desserts = Object.values(firstIndexes).map((firstIndex) => {
          // ---------------- fech data in desserts
          // first and last index get Index of res 
          const firstItem = res[firstIndex]
          const lastItemIndex = lastIndexes[firstItem.TICKETID]
          const lastItem = res[lastItemIndex]
          // first index get Index of res
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
          const inprogressItemQUEUEDOWNER =
            inprogressItem && inprogressItem.QUEUED_OWNER
              ? inprogressItem.QUEUED_OWNER
              : '';
          const inownerItemQUEUEDOWNER =
            inownerItem && inownerItem.QUEUED_OWNER
              ? inownerItem.QUEUED_OWNER
              : '';
          const inownerItemINPROGRESSCHANGEBY =
            inownerItem && inownerItem.INPROGRESS_CHANGEBY
              ? inownerItem.INPROGRESS_CHANGEBY
              : '';
          const inprogressItemINPROGRESSCHANGEBY =
            inprogressItem && inprogressItem.INPROGRESS_CHANGEBY
              ? inprogressItem.INPROGRESS_CHANGEBY
              : '';
          const date1 = new Date(convertToISOFormat(inprogressItem.QUEUED_DATE))
          const date2 = new Date(convertToISOFormat(firstItem.QUEUED_DATE))
          const date3 = new Date(convertToISOFormat(resolveItem.QUEUED_DATE))
          const date4 = new Date(convertToISOFormat(lastItem.QUEUED_DATE))
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
          // console.log('tic', timedotplus)
          // --------------------------------
          const timecenter = date4 - date3
          const hourscenter = Math.floor(timecenter / (1000 * 60 * 60))
          const minutescenter = Math.floor(
            (timecenter % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecolsebycenter = (timecenter, hourscenter, minutescenter)
          // change data of table SERVICE_GROUP
          let service = '';
          if (firstItem.CLASSIFICATION.startsWith('D')) {
            service = 'DATA';
          } else if (firstItem.CLASSIFICATION.startsWith('S')) {
            service = 'SMS';
          } else if (firstItem.CLASSIFICATION.startsWith('VA')) {
            service = 'VAS';
          } else if (firstItem.CLASSIFICATION.startsWith('V') && firstItem.CLASSIFICATION.substring(1, 2) !== 'A') {
            service = 'VOICE';
          } else {
            service = firstItem.SERVICE_GROUP || '';
          }
          const department = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'DP');
          const rootownwe = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'ON');
          const tier = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'Ti');
          const solution = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'SOLU');
          const rootCause = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'ROOT');
          //  data in desertes
          return {
            TICKETID: firstItem.TICKETID,
            CLASSIFICATION: firstItem.CLASSIFICATION,
            MSISDN: firstItem.MSISDN,
            SERVICE_GROUP: service,
            COMMODITY: firstItem.COMMODITY,
            CREATEDBY: firstItem.CREATEDBY,
            CREATIONDATE: firstItem.CREATIONDATE,
            QUEUED_DATE: firstItem.QUEUED_DATE,
            QUEUED_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_DATE: inprogressItem.QUEUED_DATE,
            INPROGRESS_OWNER: inownerItemQUEUEDOWNER, //         QUEUED_OWNER === null
            INPROGRESS_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_CHANGBY: inownerItemINPROGRESSCHANGEBY, //
            ROOT_CAUSE_DESCRIPTIONS: rootCause, //
            SOLUTION_SHOT: solution, //
            ROOT_CAUSE_BY_DEPARTMENT: department, // colsedateValue - resolvedateValue
            ROOT_CAUSE_BY_STATUS: rootownwe, // colsedateValue - resolvedateValue
            ROOT_CAUSE_BY_TIER: tier,
            RESOLVE_DATE: resolveItem.QUEUED_DATE,
            RESOLVE_OWNER: inprogressItemQUEUEDOWNER, //         QUEUED_OWNER === null
            RESOLVE_OWNERGROUP: inprogressItem.OWNERGROUP,
            RESOLVE_CHANGBY: inprogressItemINPROGRESSCHANGEBY, // 
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
        this.desserts = desserts
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      this.loading = false;
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
    changeNameroot(ID, status) {
      if (ID !== undefined && ID.indexOf('_') > 0 && ID.startsWith('TP')) {
        const idToNameMap = {
          'TP01_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Unber In System' : (status === 'ROOT' ? 'Number Was Barring in HSS' : 'SOC'))),
          'TP02_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number Was Operational' : 'SOC'))),
          'TP03_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Unblickilist In System' : (status === 'ROOT' ? 'Number was Blacklist in OCS' : 'SOC'))),
          'TP04_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Usage Up Package Already' : 'SOC'))),
          'TP05_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Update Location' : (status === 'ROOT' ? 'High PRB' : 'SOC'))),
          'TP06_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Add 3G/4G Profile' : (status === 'ROOT' ? 'No Have 3G/4G Profile' : 'SOC'))),
          'TP07_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Modifi Profile SPNV' : (status === 'ROOT' ? 'Wrong Profile in SPNV' : 'SOC'))),
          'TP08_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'No Package' : 'SOC'))),
          'TP09_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Exended lifecycle' : (status === 'ROOT' ? 'Number was suspended in OCS' : 'SOC'))),
          'TP10_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Voice' : 'SOC'))),
          'TP11_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by SMS' : 'SOC'))),
          'TP12_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Games' : 'SOC'))),
          'TP13_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Loan Money' : 'SOC'))),
          'TP14_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Transfer to Others' : 'SOC'))),
          'TP15_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'No Balance' : 'SOC'))),
          'TP16_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Usage Old Beeline SIM' : 'SOC'))),
          'TP17_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Provided PIN & PUK' : (status === 'ROOT' ? 'SIM WASLOCKED PROVIDED PIN&PUK' : 'SOC'))),
          'TP18_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Package Normal(They did not check SMS)' : 'SOC'))),
          'TP19_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Balance Normal(They did not check SMS)' : 'SOC'))),
          'TP20_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel RPT' : (status === 'ROOT' ? 'Customer Need to Cancel RBT' : 'SOC'))),
          'TP21_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'System Problem' : 'IT'))),
          'TP22_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel Call Forward' : (status === 'ROOT' ? 'Cancle Call Forward' : 'SOC'))),
          'TP23_': status === 'DP' ? 'ISD' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Scratch Card Was not Activate with Bonus' : 'ISD')),
          'TP24_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Scratch Card was used up' : 'SOC'))),
          'TP25_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'More checking with Owner Apps' : 'IT'))),
          'TP26_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Wrong Default PW' : 'SOC'))),
          'TP27_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Sites were down in that area' : 'MB'))),
          'TP28_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activated by *503#Call' : 'SOC'))),
          'TP29_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activated by *121/122#Call' : 'SOC'))),
          'TP30_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'System Problem' : 'IT'))),
          'TP31_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'TP031_' : 'SOC'))), // -------------test 031 not
          'TP32_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Update Location' : (status === 'ROOT' ? 'Weak Coverage Signal' : 'SOC'))),
          'TP33_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received SMS(They did not check SMS)' : 'SOC'))),
          'TP34_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number Was Operational(Sugestion to Setting SMS Center)' : 'SOC'))),
          'TP35_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Lottery Service' : 'SOC'))),
          'TP36_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer Capture 2G signal)' : 'SOC'))),
          'TP37_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'PT037_' : 'SOC'))), // -------------test 037 not
          'TP38_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Transfer Money Incorrect way' : 'SOC'))),
          'TP39_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'IR Service is Not avalable ' : 'SOC'))),
          'TP40_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Call to Invalid Number' : 'SOC'))),
          'TP41_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'No Offerring In CBS' : 'IT'))),
          'TP42_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Rentle Package Service' : 'SOC'))),
          'TP43_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : 'IT'),
          'TP44_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'PIN Code of Scrath Card In Correct' : 'SOC'))),
          'TP45_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Life Cycle Was Expired' : 'SOC'))),
          'TP46_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activate Sim Failure' : 'SOC'))),
          'TP47_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Mismatch Condition to Loan Money' : 'SOC'))),
          'TP48_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Sim Type Mismatch Condition' : 'SOC'))),
          'TP49_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel Game' : (status === 'ROOT' ? 'Customer Need to Cancle Game Service' : 'SOC'))),
          'TP50_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'System' : (status === 'ROOT' ? 'In Corrected UCSI Template' : 'SOC'))),
          'TP51_': status === 'DP' ? 'IT' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Remove Counter' : (status === 'ROOT' ? 'Full Counter (Package) in Supernova' : 'SOC'))),
          'TP52_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Promotion Normal(They did not check SMS)' : 'SOC'))),
          'TP53_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Blocking on their Mobile' : 'SOC'))),
          'TP54_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'In Corrected USSD Code' : 'SOC'))),
          'TP55_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer not Receice Balance' : 'SOC'))),
          'TP56_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer turn off Mobile' : 'SOC'))),
          'TP57_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Exanded PIN & PUK' : (status === 'ROOT' ? 'Extended Lifecycle of Package Expire' : 'SOC'))),
          'TP58_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number was Pool in OCS' : 'SOC'))),
          'TP59_': status === 'DP' ? 'IT' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Remove Counter' : (status === 'ROOT' ? 'Customer Need to Cancel Package( It Usage Up)' : 'SOC'))),
          'TP60_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Data Package is avaliable' : 'SOC'))),
          'TP61_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by RBT Service' : 'SOC'))),
          'TP62_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Scratch Card Was not Activate with Bonus' : 'IT'))),
          'TP63_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Number Was IDLE Status in OCS' : 'IT'))),
          'TP64_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Add SMS MT' : (status === 'ROOT' ? 'UNo SMSMT in HSS' : 'SOC'))),
          // 'TP65_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Unber In System' : 'SOC'))), // ----65 not data
        };
        const name = idToNameMap[ID] || ID; // use the mapped name or the original ID if not found
        return name;
      } else {
        return ID;
      }
    },
    // goto page graph and send desserts data to page graph
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

.table-title-hiegth {
  max-height: 400px;
  overflow-y: auto;

}
</style>
  