<template>
  <div ref="pdfContent">
    <!-- start button download----------------------------------------------------------------------------------------------->
    <div class="shrink ">
      <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
      <div class="text-right" style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 90px;
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
              <div :class="{ 'custom-font': en }" style="color: #ffff00" @click="expand = false">{{ en ? 'ດາວໂຫຼດ' : 'Download' }}</div>
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
                <v-icon style="background-color: #009933; border-radius:50%" size="35"
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
                    <v-icon style="background-color: #ff3333; border-radius:50%" size="35"
                      color="#ffffff">mdi-file-pdf-box</v-icon>
                    <v-card-text :style="{
          color: show === 'button2' ? '#ff3333' : '#000',
        }">
                      PDF</v-card-text>
                  </v-btn>
                </template>
                <span :class="{ 'custom-font': en }">{{ en ? 'PDF ຍັງບໍ່ສາມາດດາວໂຫລດໄດ້' : 'PDF can not download' }}</span>
              </v-tooltip>
            </v-col>
          </v-card>
        </v-expand-transition>
      </div>
    </div>
    <!-- stop button download-->

    <!--Sta title page------------------------------------------------------------------------------------------------------->

    <v-row :dark="dark" style="margin-top: 0px">
      <v-col class="pt-1" style="background-color: hsl(0, 0%, 96%)">
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
                    <h3 :class="{ 'custom-font': en }" style="color: #595959">
                      <span :class="{ 'custom-font': en }" style="color: #ffff00">{{ en ? '' : 'P' }}</span>{{ en ? 'ໜ້າ Ticket' : 'age Ticket' }}
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
                  <v-card-text class="pa-0 text-center" style="background-color: #ffff00">
                    <!-- <v-btn text x-small @click="dateshow = false">
                      <v-icon size="20">mdi-close</v-icon>
                    </v-btn> -->
                    <h5 :class="{ 'custom-font': en }">{{ en ? 'ວັນທີ່ໃຊ້ຄົ້ນຫາ' : 'Search date' }}</h5>
                  </v-card-text>
                  <v-row>
                    <!--Sta date Start-------------------------------------------------------------------------------->
                    <v-col cols="12" sm="4" md="4" class="pl-4" style="z-index: 11;">
                      <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                        transition="scale-transition" offset-y min-width="auto">

                        <template #activator="{ on, attrs }">
                          <v-text-field :class="{ 'custom-font': en }" v-model="date" :label=" en ? 'ວັນທີ່ເລີ່ມຕົ້ນ' : 'Start Date'" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable color="yellow ">
                          <v-spacer></v-spacer>
                          <v-btn text :class="{ 'custom-font': en }" style="color: #ff4d4d" @click="menu = false">
                            {{ en ? 'ຍົກເລີກ' : 'Cancel' }}
                          </v-btn>
                          <v-btn outlined :class="{ 'custom-font': en }" color="primary" @click="$refs.menu.save(date)">
                            {{ en ? 'ບັນທືກ' : 'save' }}
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <!--Sto Date start-->
                    <v-col cols="12" sm="1" md="1">
                      <v-card-text style="color: #404040" class="px-0 mt-2">
                        <h2 :class="{ 'custom-font': en }" >{{ en ? 'ຫາ' : 'To' }}</h2>
                      </v-card-text>
                    </v-col>
                    <!--Sta Date stop------------------------------------------------------------------------------------------------->
                    <v-col cols="12" sm="4" md="4" style="z-index: 11;">
                      <v-menu ref="menus" v-model="menus" :close-on-content-click="false" :return-value.sync="dates"
                        transition="scale-transition" offset-y min-width="auto">

                        <template #activator="{ on, attrs }">
                          <v-text-field v-model="dates" :class="{ 'custom-font': en }" :label=" en ? 'ວັນທີ່ສີນສຸດ' : 'End Date' " prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dates" no-title scrollable color="yellow ">
                          <v-spacer></v-spacer>
                          <v-btn text :class="{ 'custom-font': en }" style="color: #ff4d4d" @click="menus = false">
                            {{ en ? 'ຍົກເລີກ' : 'Cancel' }}
                          </v-btn>
                          <v-btn outlined :class="{ 'custom-font': en }" color="primary" @click="$refs.menus.save(dates)">
                            {{ en ? 'ບັນທືກ' : 'save' }}
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <!--Sto Date stop-->
                    <!-- Sta baton search date------------------------------------------------------------------------------------>
                    <v-col cols="12" sm="4" md="3" style="z-index: 11;">
                      <v-overlay class="text-center" :class="{ 'custom-font': en }" :absolute="absolute" :value="overlay">
                        <p :class="{ 'custom-font': en }">{{ en ? 'ວັນທີເລີ່ມຕົ້ນຄວນຈະນ້ອຍກວ່າວັນທີ່ສີນສຸດ.' : 'Date start should lower than Date stop.' }}
                          <span style="background-color: #ffff00; color: #000;">
                            {{ date }}
                          </span><span class="text-h5"> |</span><span style="background-color: #ffff00; color: #000;">
                            {{ dates }}
                          </span>
                        </p>
                        <v-btn :class="{ 'custom-font': en }" style="background-color: #ffff00; color: #000; margin-top: 20px; z-index: 11;" @click="overlay = false">
                          {{ en ? 'ເເກ້ໄຂ້ວັນທີ່' : 'Edit date' }}
                        </v-btn>
                      </v-overlay>
                      <v-card-text class="text-right">
                        <v-btn fab small color="#000" @mouseenter="datelang()" @click="getData()">
                          <v-icon :color="iconColor"> mdi-magnify </v-icon>
                        </v-btn>
                        <span class="hover-pointer" :class="{ 'custom-font': en }" @click="getData()">
                          {{ en ? 'ຄົ້ນຫາ' : 'Search' }}
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
                  <span class="tooltip" :class="{ 'custom-font': en }" ref="tooltip">{{ en ? 'ກຳລັງໂຫຼດກຣາຟ' : 'Loading Graph' }}</span>
                </v-tooltip>
                <v-tooltip v-else bottom class="px-4">

                  <template #activator="{ on, attrs }">
                    <v-btn text style=" background-color: transparent; color: transparent;" v-bind="attrs" v-on="on"
                      @click="showgraph = !showgraph" @mouseenter="colWidth = true" @mouseleave="colWidth = false">
                      <v-icon v-if="!showgraph" size="45" :color="colWidth ? '#ffff00' : '#000'">mdi-chart-bar</v-icon>
                      <v-icon v-else size="45" :color="colWidth ? '#ffff00' : '#000'">mdi-table-large</v-icon>
                    </v-btn>
                  </template>
                  <span v-if="!showgraph" class="tooltip" :class="{ 'custom-font': en }" ref="tooltip">{{ en ? 'ສະເເດງກຣາຟ' : 'Display Graph' }}</span>
                  <span v-else class="tooltip" :class="{ 'custom-font': en }" ref="tooltip">{{ en ? 'ສະແດງຂໍ້ມູນຕາຕະລາງ' : 'Display Table Data' }}</span>
                </v-tooltip>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-text>
        <!--Sto title page-->
        <!--Sta table---------------------------------------------------------------------------------------------------------------------->
        <v-card-actions v-if="!showgraph" class="expandable-row pt-0 px-0" style="width: 100%;
          position: fixed;
          height: calc(100vh - 30vh);
          left: 0;
          overflow: y;
          z-index: 10;">
          <div ref="resizableCol2" @mousedown="startResize">
            <v-card class="rounded-0" width="100%" :height="heightPx + 'px'" :style="{ width: col1Width + 'px' }" color="#ffff00"
              outlined>
              <v-toolbar color="#000" dark>
                <v-toolbar-title style="color: #ffff00">
                  <div :class="{ 'custom-font': en }">{{ en ? 'ສະແດງຕາຕະລາງ' : 'Table display' }}</div>
                  <input v-model="col1Width" class="resizable" type="range" color="#ffff00" :min="minCol1Width"
                    :max="maxCol1Width" />
                </v-toolbar-title>
              </v-toolbar>
              <v-list class="table-container" subheader two-line flat :height="heightPx + 'px'">
                <v-list-item-group class="table-title-hiegth table-container">
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
          <v-col class="py-0 pl-0 pr-0 pt-6">
            <v-card outlined style="background-color: #ffff00;" :height="heightPx + 'px'" class=" table-container text-center" :style="{ 'max-width': 'calc(100% - ' + col1Width + 'px)' }">
              <v-card-text v-if="loading" class="pa-0">
                <v-progress-linear indeterminate color="#4d3d00"></v-progress-linear>
              </v-card-text>
              <v-data-table
                width="100%"
                :height="heightPx + 'px'"
                fixed-header
                dense
                :headers="visibleHeaders"
                :items="desserts"
                :items-per-page="computedItemsPerPage"
                item-key="TICKETID"
                class="elevation-1 custom-font font_size_12"
              >
                <template v-slot:item="{ item }">
                  <tr class="text_color custom-font">
                    <td v-for="header in visibleHeaders" :key="header.text">
                      <span class="font_size_12 custom-font">{{ item[header.value] }}</span>
                    </td>
                  </tr>
                </template>
              </v-data-table>
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
  middleware:'auth',
  Currency: 'DefaultLayout',
  components: {
    chartgraph,
  },
  data() {
    return {
      heightPx:0,
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
        { text: 'TABLE_SOLUTION_SHOT', value: 'SOLUTION_SHOT' },
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
    en() {
      return this.$store.state.en;
    },
    computedItemsPerPage() {
      return this.desserts.length > 0 ? this.desserts.length : 50;
    },
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
    this.setSheetHeight()
      window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    setSheetHeight() {
        // Get the height of the computer screen
        this.heightPx = window.innerHeight - 230
      },
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
      // console.log('date::',this.date)
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
        // console.log(res)
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
          const firstItem = res[firstIndex];
          if (!firstItem) return null; // Check if firstItem is null or undefined
          const lastItemIndex = lastIndexes[firstItem.TICKETID];
          const lastItem = res[lastItemIndex];
          const resolveItemIndex = resolvebyIndex[firstItem.TICKETID];
          const resolveItem = resolveItemIndex !== undefined ? res[resolveItemIndex] : null;
          const inprogressItemIndex = indateIndex[firstItem.TICKETID];
          const inprogressItem = inprogressItemIndex !== undefined ? res[inprogressItemIndex] : null;
          const inownerItemIndex = inownerIndex[firstItem.TICKETID];
          const inownerItem = inownerItemIndex !== undefined ? res[inownerItemIndex] : null;
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
          const inprogressItemQUEUEDOWNER = inprogressItem && inprogressItem.QUEUED_OWNER ? inprogressItem.QUEUED_OWNER : '';
          const inownerItemQUEUEDOWNER = inownerItem && inownerItem.QUEUED_OWNER ? inownerItem.QUEUED_OWNER : '';
          const inownerItemINPROGRESSCHANGEBY = inownerItem && inownerItem.INPROGRESS_CHANGEBY ? inownerItem.INPROGRESS_CHANGEBY : '';
          const inprogressItemINPROGRESSCHANGEBY = inprogressItem && inprogressItem.INPROGRESS_CHANGEBY ? inprogressItem.INPROGRESS_CHANGEBY : '';
          // Ensure QUEUED_DATE exists before trying to access it
          const date1 = inprogressItem && inprogressItem.QUEUED_DATE ? new Date(convertToISOFormat(inprogressItem.QUEUED_DATE)) : null;
          const date2 = firstItem && firstItem.QUEUED_DATE ? new Date(convertToISOFormat(firstItem.QUEUED_DATE)) : null;
          const date3 = resolveItem && resolveItem.QUEUED_DATE ? new Date(convertToISOFormat(resolveItem.QUEUED_DATE)) : null;
          const date4 = lastItem && lastItem.QUEUED_DATE ? new Date(convertToISOFormat(lastItem.QUEUED_DATE)) : null;
          // Ensure all dates exist before performing calculations
          const timecare = date1 - date2;
          const hours = Math.floor(timecare / (1000 * 60 * 60));
          const minutes = Math.floor((timecare % (1000 * 60 * 60)) / (1000 * 60));
          const timecaretplus = (timecare, hours, minutes);
          const timedo = (date3 || date2) === null ? '' : date3 - date2;
          const hoursdo = (date3 || date2) === null ? '' : Math.floor(timedo / (1000 * 60 * 60));
          const minutesdo = (date3 || date2) === null ? '' : Math.floor((timedo % (1000 * 60 * 60)) / (1000 * 60));
          const timedotplus = (date3 || date2) === null ? '' : (timedo, hoursdo, minutesdo);
          const timecenter = (date4 || date3) === null ? '' : date4 - date3;
          const hourscenter = (date4 || date3) === null ? '' : Math.floor(timecenter / (1000 * 60 * 60));
          const minutescenter = (date4 || date3) === null ? '' : Math.floor((timecenter % (1000 * 60 * 60)) / (1000 * 60));
          const timecolsebycenter = (date4 || date3) === null ? '' : (timecenter, hourscenter, minutescenter);
          // change data of table SERVICE_GROUP
          let service = '';
          // 29 / 02
          if (firstItem && firstItem.CLASSIFICATION) {
            if (firstItem.CLASSIFICATION.startsWith('D')) {
              service = 'DATA';
            } else if (firstItem.CLASSIFICATION.startsWith('S')) {
              service = 'SMS';
            } else if (firstItem.CLASSIFICATION.startsWith('VA')) {
              service = 'VAS';
            } else if (firstItem.CLASSIFICATION.startsWith('V') && firstItem.CLASSIFICATION.substring(1, 2) !== 'A') {
              service = 'VOICE';
            } else {
              // Handle the case where CLASSIFICATION doesn't match any condition
              service = firstItem.SERVICE_GROUP || '';
            }
          } else if (lastItem && lastItem.CLASSIFICATION) {
            // If firstItem doesn't have CLASSIFICATION, check first
            if (lastItem.CLASSIFICATION.startsWith('D')) {
              service = 'DATA';
            } else if (lastItem.CLASSIFICATION.startsWith('S')) {
              service = 'SMS';
            } else if (lastItem.CLASSIFICATION.startsWith('VA')) {
              service = 'VAS';
            } else if (lastItem.CLASSIFICATION.startsWith('V') && lastItem.CLASSIFICATION.substring(1, 2) !== 'A') {
              service = 'VOICE';
            } else {
              // Handle the case where CLASSIFICATION doesn't match any condition
              service = firstItem.SERVICE_GROUP || '';
            }
          } else {
            // Handle the case where both firstItem and first don't have CLASSIFICATION
            service = 'Not data';
          }
          const department = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'DP');
          const rootownwe = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'ON');
          const tier = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'Ti');
          const solution = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'SOLU');
          const rootCause = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'ROOT');
          const descrpitions = this.changeNameroot(this.adjustName(firstItem.FIRST_WORKLOG_DESCRIPTION), 'Des');
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
            QUEUED_OWNERGROUP: firstItem.OWNERGROUP ? firstItem.OWNERGROUP : null,
            INPROGRESS_DATE: inprogressItem ? inprogressItem.QUEUED_DATE : null,
            INPROGRESS_OWNER: inownerItemQUEUEDOWNER, // QUEUED_OWNER === null
            INPROGRESS_OWNERGROUP: firstItem ? firstItem.OWNERGROUP : null,
            INPROGRESS_CHANGBY: inownerItemINPROGRESSCHANGEBY,
            ROOT_CAUSE_DESCRIPTIONS: rootCause,
            SOLUTION_SHOT: solution,
            ROOT_CAUSE_BY_DEPARTMENT: department,
            ROOT_CAUSE_BY_STATUS: rootownwe,
            ROOT_CAUSE_BY_TIER: tier,
            RESOLVE_DATE: resolveItem ? resolveItem.QUEUED_DATE : null,
            RESOLVE_OWNER: inprogressItemQUEUEDOWNER, // QUEUED_OWNER === null
            RESOLVE_OWNERGROUP: inprogressItem && inprogressItem.OWNERGROUP ? inprogressItem.OWNERGROUP : null,
            RESOLVE_CHANGBY: inprogressItemINPROGRESSCHANGEBY,
            TIME_CARE_TPLUS: timecaretplus,
            TIME_DO_TPLUS: timedotplus,
            WORKLONG_DESCRIPTOIN: (descrpitions==='PT31_' || descrpitions==='PT37_') ? firstItem.FIRST_WORKLOG_DESCRIPTION : descrpitions,
            MODIFY_DATE: resolveItem ? resolveItem.QUEUED_DATE : null,
            MODIFYBY: firstItem.FIRST_WORKLOG_MODIFYBY,
            PROVINCE: firstItem.PROVINCE,
            DISTRICT: firstItem.DISTRICT,
            VILLAGE: firstItem.VILLAGE,
            COMPLAIN_BY: firstItem.COMPLAIN_BY,
            CLOSE_DATE: lastItem ? lastItem.QUEUED_DATE : null,
            CLOSE_BY: lastItem ? lastItem.INPROGRESS_CHANGEBY : null,
            STATUS_TICKET: lastItem ? lastItem.STATUS : null,
            TIME_CLOSE_BY_CENTER: timecolsebycenter,
          };
        })
        // this.desserts = desserts
        this.desserts = desserts.filter(item => item !== null); // Filter out null items
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
      if (ID !== undefined && ID !== null && ID.indexOf('_') > 0 && ID.startsWith('TP')) {
        const idToNameMap = {
          'TP01_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Unber In System' : (status === 'ROOT' ? 'Number Was Barring in HSS' : (status === 'Des' ? 'TP001_ເບີຖືກບາໃນລະບົບ HSS. ທິມງານແກ້ໄຂໃຫ້ແລ້ວ' : 'Tier_2(SOC)')))),
          'TP02_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number Was Operational' : (status === 'Des' ? 'TP002_ເບີນີ້ໃຊ້ງານໄດ້ປົກກະຕິແນະນໍາລູກຄ້າຣີເຊັດມືຖືແລ້ວລອງໃໝ່' : 'Tier_2(SOC)')))),
          'TP03_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Unblickilist In System' : (status === 'ROOT' ? 'Number was Blacklist in OCS' : (status === 'Des' ? 'TP003_ເບີຖືກແບັກລີດໃນລະບົບ CBS.ທິມງານແກ້ໄຂใຫ້ແລ້ວ' : 'Tier_2(SOC)')))),
          'TP04_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Usage Up Package Already' : (status === 'Des' ? 'TP004_ລູກຄ້າใຊ້ງານແພັກເກັດໝົດແລ້ວ. ແນະນໍາລູກຄ້າສະໝັກແພັກເກັດໃໝ່' : 'Tier_2(SOC)')))),
          'TP05_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Update Location' : (status === 'ROOT' ? 'High PRB' : (status === 'Des' ? 'TP005_ລູກຄ້າຢູ່ໃນເຂດການໃຊ້ງານສູງຫຼືຊ່ອງສັນຍານເຕັມ.ແນະນໍາລູກຄ້າຣີເຊັດມືຖືແລ້ວລອງໃໝ່' : 'Tier_2(SOC)')))),
          'TP06_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Add 3G/4G Profile' : (status === 'ROOT' ? 'No Have 3G/4G Profile' : (status === 'Des' ? 'TP006_ບໍ່ໄດ້ເປີດ3G/4G ໃນລະບົບ HSS. ແນະນໍາລູກຄ້າກົດເປີດ Data ດ້ວຍວິທີ *777*3# &*777*4#' : 'Tier_2(SOC)')))),
          'TP07_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Modifi Profile SPNV' : (status === 'ROOT' ? 'Wrong Profile in SPNV' : (status === 'Des' ? 'TP007_ໂພຟາຍໄນລະບົບ ຊຸບເປີໂນວ່າບໍ່ຖືກ.ທິມງານແກ້ໄຂໄຫ້ແລ້ວ' : 'Tier_2(SOC)')))),
          'TP08_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'No Package' : (status === 'Des' ? 'TP008_ເບີບໍ່ມີແພັກເກັດ! ແນະນໍາລູກຄ້າສະໝັກແພັກເກັດໃໝ່' : 'Tier_2(SOC)')))),
          'TP09_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Exended lifecycle' : (status === 'ROOT' ? 'Number was suspended in OCS' : (status === 'Des' ? 'TP009_ເບີຖືກງົດໃຊ້ບໍລິການໃນລະບົບ CBS ຊົ່ວຄາວ! ແນະນໍາລູກຄ້າຕື່ມເງີນແລະລອງເຂົ້າໃຊ້ງານອີກຄັ້ງ' : 'Tier_2(SOC)')))),
          'TP10_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Voice' : (status === 'Des' ? 'TP010_ເງີນຖືກຕັດດ້ວຍການໂທອອກເບີອື່ນ.' : 'Tier_2(SOC)')))),
          'TP11_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by SMS' : (status === 'Des' ? 'TP011_ເງີນຖືກຕັດດ້ວຍການສົ່ງຂໍ້ຄວາມຫາເບີອື່ນ.' : 'Tier_2(SOC)')))),
          'TP12_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Games' : (status === 'Des' ? 'TP012_ເງີນຖືກຕັດດ້ວຍການຊື້ເກມ.' : 'Tier_2(SOC)')))),
          'TP13_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Loan Money' : (status === 'Des' ? 'TP013_ເງີນຖືກຕັດດ້ວຍການຢືມເງີນ.' : 'Tier_2(SOC)')))),
          'TP14_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Transfer to Others' : (status === 'Des' ? 'TP014_ເງີນຖືກຕັດດ້ວຍການໂອນເງີນຫາເບີອື່ນ.' : 'Tier_2(SOC)')))),
          'TP15_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'No Balance'  : (status === 'Des' ? 'TP015_ເບີບໍ່ມີເງີນ.ແນະນໍາລູກຄ້າຕື່ມເງີນແລະລອງເຂົ້າໃຊ້ງານ' : 'Tier_2(SOC)')))), 
          'TP16_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Usage Old Beeline SIM'  : (status === 'Des' ? 'TP016_ລູກຄ້າໃຊ້ຊີມເກົ່າຢູ່.ແນະນໍາລູກຄ້າເຂົ້າມາສູນບໍລິການເພື່ອປ່ຽນແຜ່ນຊິມເພື່ອຮອງຮັບບໍລິການທີດີກ່ວາ.' : 'Tier_2(SOC)')))), 
          'TP17_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Provided PIN & PUK' : (status === 'ROOT' ? 'SIM WASLOCKED PROVIDED PIN&PUK'  : (status === 'Des' ? 'TP017_ຂໍ້ມູນເລກ PIN&PUK ຕາມແອັດແທັກຟ່າຍເດີ' : 'Tier_2(SOC)')))), 
          'TP18_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Package Normal(They did not check SMS)'  : (status === 'Des' ? 'TP018_ລູກຄ້າໄດ້ຮັບແພັກເກັດປົກກະຕິ.ແນະນໍາລູກຄ້າກວດສອບຂໍ້ຄວາມໃນໂທລະສັບ' : 'Tier_2(SOC)')))),
          'TP19_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Balance Normal(They did not check SMS)'  : (status === 'Des' ? 'TP019_ລູກຄ້າໄດ້ຮັບເງິນໂທປົກກະຕິ.ແນະນໍາລູກຄ້າກວດສອບຂໍ້ຄວາມໃນໂທລະສັບ' : 'Tier_2(SOC)')))),
          'TP20_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel RPT' : (status === 'ROOT' ? 'Customer Need to Cancel RBT' : (status === 'Des' ? 'TP020_ຍົກເລິກບໍລິການເພງລໍສາຍສໍາເລັດ' : 'Tier_2(SOC)')))),
          'TP21_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Customer Need to Cancel RBT'  : (status === 'Des' ? 'TP021_ລະບົບມີບັນຫາຫຼືຂັດຂ້ອງ.ທິມງານກຳລັງແກ້ໄຂ' : 'Tier_3(IT)')))),
          'TP22_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel Call Forward' : (status === 'ROOT' ? 'Cancle Call Forward' : (status === 'Des' ? 'TP022_ຍົກເລິກບໍລິການໂອນສາຍສໍາເລັດ' : 'Tier_2(SOC)')))),
          'TP23_': status === 'DP' ? 'ISD' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate with Owner App to Sollved for Customers' : (status === 'ROOT' ? 'Scratch Card Was not Activate with Bonus' : (status === 'Des' ? 'TP023_ບັດນີ້ຍັງບໍ່ໄດ້ແອັກຕິບ' : 'Tier_3(ISD)')))),
          'TP24_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Scratch Card was used up' : (status === 'Des' ? 'TP024_ບັດນີ້ຖືກນໍາໃຊ້ແລ້ວ' : 'Tier_2(SOC)')))),
          'TP25_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'More checking with Owner Apps' : (status === 'Des' ? 'TP025_ບັນຫານີ້ຜິດພາດຍ້ອນລະບົບກະລຸນາສົ່ງອີເມວຫາພາກສ່ວນກ່ຽວຂ້ອງໃຫ້ກວດສອບຄືນ' : 'Tier_3(IT)')))),
          'TP26_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Wrong Default PW' : (status === 'Des' ? 'TP026_ພາສເວີດບໍ່ຖືກຕ້ອງ.ທິມງານຣີເຊັດພາສເວີດໃນລະບົບເປັນຄ່າເລີ່ມຕົ້ນ (0000)' : 'Tier_2(SOC)')))),
          'TP27_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Sites were down in that area' : (status === 'Des' ? 'TP027_ສະຖານີມີບັນຫາ.ທິມງານກຳລັງແກ້ໄຂ' : 'Tier_3(MB)')))),
          'TP28_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activated by *503#Call' : (status === 'Des' ? 'TP028_ເງິນຖືກຕັດດ້ວຍບໍລິການເສຍຄ່າຮັກສາຄວາມປອດໄພຂອງກະຊວງເຕັກໂນໂລຊືແລະການສື່ສານ' : 'Tier_2(SOC)')))),
          'TP29_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activated by *121/122#Call' : (status === 'Des' ? 'TP029_ລູກຄ້າໄຊ້ງານເກີນວົງເງິນຂອບເຂດງົບປະມານຂອງໂຕເອງ ກະລຸນາກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP30_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'System Problem' : (status === 'Des' ? 'TP030_ກະລຸນາຕິດຕໍ່ຫາທີມງານບໍລິການເສີມ ສໍາລັບເພີ່ມແພັກເກັດ' : 'Tier_3(IT)')))),
          'TP31_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'TP031_' : (status === 'Des' ? 'TP31_' : 'Tier_2(SOC)')))), // -------------test 031 not
          'TP32_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Update Location' : (status === 'ROOT' ? 'Weak Coverage Signal' : (status === 'Des' ? 'TP032_ເຂດລູກຄ້າຢູ່ຈັບສັນຍານຄວບຄຸມອ່ອນ' : 'Tier_2(SOC)')))),
          'TP33_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received SMS(They did not check SMS)' : (status === 'Des' ? 'TP033_ລູກຄ້າໄດ້ຮັບ OTP ແລ້ວແນະນໍາລູກຄ້າກວດສອບຂໍ້ຄວາມໃນໂທລະສັບຄືນ' : 'Tier_2(SOC)')))),
          'TP34_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number Was Operational(Sugestion to Setting SMS Center)' : (status === 'Des' ? 'TP034_ລູກຄ້າບໍ່ໄດ້ຮັບ OTP ແທ້! ແນະນໍາເພີ່ນກວດສູນຂໍ້ຄວາມໄນເຄື່ອງລູກຄ້າ' : 'Tier_2(SOC)')))),
          'TP35_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Lottery Service' : (status === 'Des' ? 'TP035_ເງີນຖືກຕັດດ້ວຍການຊື້ຫວຍ' : 'Tier_2(SOC)')))),
          'TP36_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer Capture 2G signal)' : (status === 'Des' ? 'TP036_ລູກຄ້າຈັບສັນຍານ 2G ແນະນໍາລູກຄ້າຣີເຊັດມືຖືແລ້ວລອງໃໝ່' : 'Tier_2(SOC)')))),
          'TP37_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'PT037_' : (status === 'Des' ? 'TP37_' : 'Tier_2(SOC)')))), // -------------test 037 not
          'TP38_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Transfer Money Incorrect way' : (status === 'Des' ? 'TP038_ລູກຄ້າໂອນເງີນບໍ່ຖືກວິທີ ແນະນໍາລູກຄ້າກວດສອບຄືນແລ້ວລອງໃໝ່' : 'Tier_2(SOC)')))),
          'TP39_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'IR Service is Not avalable ' : (status === 'Des' ? 'TP039_ບໍລິການໂຣມມີ່ງ ຍັງບໍ່ໄດ້ເປີດໃຫ້ບໍລິການ' : 'Tier_2(SOC)')))),
          'TP40_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Call to Invalid Number' : (status === 'Des' ? 'TP040_ເບີໂທປາຍທາງບໍ່ຖືກຕ້ອງ ແນະນຳລູກຄ້າກວດສອບເບີປາຍທາງແລ້ວລອງໃໝ່' : 'Tier_2(SOC)')))),
          'TP41_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'No Offerring In CBS' : (status === 'Des' ? 'TP041_ເບີນີ້ຍັງບໍ່ສົມບູນໃນລະບົບບີິວລີ້ງ_CBS(ບໍ່ມີອ໋ອບເຟີ້ລີ້ງ)' : 'Tier_3(IT)')))),
          'TP42_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Rentle Package Service' : (status === 'Des' ? 'TP042_ເງີນຖືກຕັດດ້ວຍບໍລິການຝາກເບີ' : 'Tier_2(SOC)')))),
          'TP43_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by Package Service' : (status === 'Des' ? 'TP042_ເງີນຖືກຕັດດ້ວຍການສະໝັກເເພັກເກັດ' : 'Tier_3(IT)')))),
          'TP44_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'PIN Code of Scrath Card In Correct' : (status === 'Des' ? 'TP044_ລູກຄ້າກົດລະຫັດບັດບໍ່ຖືກຕ້ອງແນະນໍາລູກຄ້າກວດລະຫັດຄືນ' : 'Tier_2(SOC)')))),
          'TP45_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Life Cycle Was Expired' : (status === 'Des' ? 'TP045_ທ່ານໄດ້ສໍາເລັດຍົກເລີກບໍລິການຝາກເບີ ກະລຸນາກວດສອບແລະນໍາໄຊ້ໄໝ່' : 'Tier_2(SOC)')))),
          'TP46_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Activate Sim Failure' : (status === 'Des' ? 'TP046_ບໍ່ສາມາດເປີດເບີໃໝ່ໄດ້ຜ່ານເວັບຊີແຄໄດ້ ແນະນໍາໃຫ້ພົວພັນຫາທີມງານ CBS ເພີ່ມເຕີມຜ່ານຊ່ອງທາງອີເມວອີກຄັ້ງ' : 'Tier_2(SOC)')))),
          'TP47_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Mismatch Condition to Loan Money' : (status === 'Des' ? 'TP047_ເບີຂອງລູກຄ້າຍັງບໍ່ຄົບເງື່ອນໄຂໃນການຢືມເງີນ' : 'Tier_2(SOC)')))),
          'TP48_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Sim Type Mismatch Condition' : (status === 'Des' ? 'TP048_ຊະນິດຂອງຊີມບໍ່ຖືກເງື່ອນໄຂໄນການໄຊ້ບໍລິການນີ້' : 'Tier_2(SOC)')))),
          'TP49_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Cancel Game' : (status === 'ROOT' ? 'Customer Need to Cancle Game Service' : (status === 'Des' ? 'TP049_ທ່ານໄດ້ສໍາເລັດຍົກເລີກບໍລິການເກມ' : 'Tier_2(SOC)')))),
          'TP50_': status === 'DP' ? 'MB' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'System' : (status === 'ROOT' ? 'In Corrected UCSI Template' : (status === 'Des' ? 'TP050_ໂພຟ່າຍບໍ່ຖືກໃນລະບົບ HSS/HLR(UCSI ບໍ່ຖືກຕ້ອງ)' : 'Tier_2(SOC)')))),
          'TP51_': status === 'DP' ? 'IT' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Remove Counter' : (status === 'ROOT' ? 'Full Counter (Package) in Supernova' : (status === 'Des' ? 'TP051_ເຄົ່າເຕີ້ເຕັມໄນລະບົບ Supernova ທິມງານແກ້ໄຂໄຫ້ແລ້ວແນນໍາລູກຄ້າລອງໄໝ່' : 'Tier_2(SOC)')))),
          'TP52_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Received Promotion Normal(They did not check SMS)' : (status === 'Des' ? 'TP052_ລູກຄ້າໄດ້ຮັບໂປໂມເຊີ້ນປົກກະຕິ ແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP53_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Blocking on their Mobile' : (status === 'Des' ? 'TP053_ລູກຄ້າຫຼົງກົດຖືກໂໝດຫ້າມລົບກວນຢູ່ໜ່ວຍລູກຄ້າເອງແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP54_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'In Corrected USSD Code' : (status === 'Des' ? 'TP054_ລູກຄ້າກົດລະຫັດບໍ່ຖືກໃນ USSD ແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP55_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer not Receice Balance' : (status === 'Des' ? 'TP055_ລູກຄ້າບໍທັນໄດ້ຮັບເງິນ ທິມງານກໍ່າລັງແກ້ໄຂໃຫ້' : 'Tier_2(SOC)')))),
          'TP56_': status === 'DP' ? 'USER' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Customer turn off Mobile' : (status === 'Des' ? 'TP056_ລູກຄ້າປິດໂທລະສັບແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP57_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Exanded PIN & PUK' : (status === 'ROOT' ? 'Extended Lifecycle of Package Expire' : (status === 'Des' ? 'TP057ສໍາເລັດການຕໍ່ເເພັກເກັດໄຫ້ລູກຄ້າສໍາເລັດແນະນໍາລູກຄ້າກວດສອບຄືນແລ້ວລອງໃໝ່ອີກຄັ້ງ' : 'Tier_2(SOC)')))),
          'TP58_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Number was Pool in OCS' : (status === 'Des' ? 'TP058_ເບີຖືກຕັດອອກຈາກລະບົບCBSແລ້ວ! ' : 'Tier_2(SOC)')))),
          'TP59_': status === 'DP' ? 'IT' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'Remove Counter' : (status === 'ROOT' ? 'Customer Need to Cancel Package( It Usage Up)' : (status === 'Des' ? 'TP059_ສໍາເລັດການຍົກເລີກແພັກເກັດແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP60_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Data Package is avaliable' : (status === 'Des' ? 'TP060_ແພັກເກັດດາຕ້າຂອງລູກຄ້າຍັງສາມາດນໍາໄຊ້ໄດ້ ແນະນໍາລູກຄ້າກວດສອບຄືນແລ້ວລອງໃໝ່ອີກຄັ້ງ' : 'Tier_2(SOC)')))),
          'TP61_': status === 'DP' ? 'USER' : (status === 'ON' ? 'USER' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'Money Was Deducted by RBT Service' : (status === 'Des' ? 'TP061_ເງີນຖືກຕັດດ້ວຍການສຽງເພງລໍສາຍແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_2(SOC)')))),
          'TP62_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Scratch Card Was not Activate with Bonus' : (status === 'Des' ? 'TP062_ບັດບໍ່ໄດ້ແອັດໂບນັດເຂົ້າທິມງານກໍ່າລັງແກ້ໄຂໄຫ້' : 'Tier_3(IT)')))),
          'TP63_': status === 'DP' ? 'IT' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Cooperate With Tier 3' : (status === 'ROOT' ? 'Number Was IDLE Status in OCS' : (status === 'Des' ? 'TP063_ເບີບໍທັນເປີດນຳໃຊ້ໄນCBSແນະນໍາລູກຄ້າກວດສອບຄືນ' : 'Tier_3(IT)')))),
          'TP64_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'Add SMS MT' : (status === 'ROOT' ? 'UNo SMSMT in HSS' : (status === 'Des' ? 'TP064_ເບີນີ້ບໍ່ທັນມີຂໍ້ຄວາມຂາເຂົ້າທີມງານແກ້ໄຂໄຫ້ແລ້ວແນະນໍາລູກຄ້າລອງໃໝ່ອີກຄັ້ງ' : 'Tier_2(SOC)')))),
          'TP65_': status === 'DP' ? 'MB' : (status === 'ON' ? 'SYSTEM' : (status === 'SOLU' ? 'PR' : (status === 'ROOT' ? 'No register 3Grap/One grap' : (status === 'Des' ? 'TP065_ເບີຍັງບໍ່ທັນລົງທະບຽນ ວັນແກຼັບ/3 ແກຼັບ' : 'Tier_2(SOC)')))), // ----65 not data
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
  width: 6px;
  height: 6px;
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

.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
  /* You can specify additional styles here */
}
.font_size_12 {
  font-size: 14px;
}
.hover-pointer {
  cursor: pointer;
}
</style>