<template>
  <div ref="pdfContent">
    <v-row :dark="dark" style="margin-top: 0px">
      <v-col class="pt-1" style="background-color: hsl(0, 0%, 96%)">
        <v-card-text class="pt-0">
          <v-row>
            <!--Sta title table-->
            <v-col cols="12" sm="4" class="py-0">
              <v-card-actions class="py-0 mt-2" style="height: 45px">
                <v-btn
                  fab
                  x-small
                  text
                  style="background-color: #ffff00"
                  @click="$router.go(-1)"
                >
                  <v-icon color="#000" size="25">mdi-arrow-left</v-icon>
                </v-btn>
                <v-card-title class="py-0">
                  <v-spacer></v-spacer>
                  <h4 :class="{ 'custom-font': en }" style="color: #595959">
                    <span
                      :class="{ 'custom-font': en }"
                      style="color: #ffff00"
                      >{{ en ? '' : 'P' }}</span
                    >{{ en ? 'ໜ້າ Ticket' : 'page Ticket' }}
                  </h4>
                </v-card-title>
              </v-card-actions>
              <!-- <v-card-text class="py-0" style="color: #595959">
                  {{ date }}-{{ dates }}
                </v-card-text> -->
            </v-col>
            <!--Sto title table-->

            <!--Sta date range----------------------------------------------------------------------------------------------------------->
            <v-col cols="12" sm="6" class="py-0">
              <div v-if="dateshow" class="mt-2" style="height: 45px">
                <v-card-actions
                  outlined
                  class="px-0"
                  flat
                  style="background-color: transparent; height: 45px"
                >
                  <v-spacer />
                  <h4 :class="{ 'custom-font': en }">
                    {{ en ? 'ວັນທີ່ໃຊ້ຄົ້ນຫາ:' : 'Search date:' }}
                  </h4>
                  <DatePicker
                    v-model="dateRange"
                    type="daterange"
                    placement="bottom-end"
                    :placeholder="en ? 'ວັນທີ່ໃຊ້ຄົ້ນຫາ...' : 'Select date...'"
                    class="custom-font ml-1"
                    style="width: 200px"
                  />
                </v-card-actions>
              </div>
            </v-col>
            <!--Sto date range-->
            <v-col cols="12" sm="2" class="py-0">
              <v-card-actions class="pa-0 mt-2" style="height: 45px">
                <v-card-text
                  v-if="!expand && !overlay"
                  class="px-1"
                  style="bottom: 1px; right: 90px"
                >
                  <v-tooltip v-if="loading" bottom class="px-4">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        text
                        style="
                          background-color: transparent;
                          color: transparent;
                        "
                        v-bind="attrs"
                        v-on="on"
                        @mouseenter="colWidth = true"
                        @mouseleave="colWidth = false"
                      >
                        <v-progress-circular
                          :size="35"
                          color="yellow"
                          indeterminate
                        ></v-progress-circular>
                      </v-btn>
                    </template>
                    <span
                      class="tooltip"
                      :class="{ 'custom-font': en }"
                      ref="tooltip"
                      >{{ en ? 'ກຳລັງໂຫຼດກຣາຟ' : 'Loading Graph' }}</span
                    >
                  </v-tooltip>
                  <v-tooltip v-else bottom class="px-4 py-0 pink">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        text
                        style="
                          background-color: transparent;
                          color: transparent;
                        "
                        v-bind="attrs"
                        v-on="on"
                        @click="showgraph = !showgraph"
                        @mouseenter="colWidth = true"
                        @mouseleave="colWidth = false"
                      >
                        <v-icon
                          v-if="!showgraph"
                          size="35"
                          :color="colWidth ? '#ffcc00' : '#000'"
                          >mdi-chart-bar</v-icon
                        >
                        <v-icon
                          v-else
                          size="35"
                          :color="colWidth ? '#ffcc00' : '#000'"
                          >mdi-table-large</v-icon
                        >
                      </v-btn>
                    </template>
                    <span
                      v-if="!showgraph"
                      class="tooltip"
                      :class="{ 'custom-font': en }"
                      ref="tooltip"
                      >{{ en ? 'ສະເເດງກຣາຟ' : 'Display Graph' }}</span
                    >
                    <span
                      v-else
                      class="tooltip"
                      :class="{ 'custom-font': en }"
                      ref="tooltip"
                      >{{
                        en ? 'ສະແດງຂໍ້ມູນຕາຕະລາງ' : 'Display Table Data'
                      }}</span
                    >
                  </v-tooltip>
                </v-card-text>
                <v-spacer />
                <div class="shrink">
                  <div
                    class="text-right"
                    style="
                      min-height: 1px;
                      position: absolute;
                      max-width: 180px;
                      z-index: 90;
                      right: 45px;
                      top: 6px;
                    "
                    @mouseleave="expand = false"
                  >
                    <v-btn
                      v-if="!expand && !overlay"
                      fab
                      elevation
                      height="34"
                      width="34"
                      color="#000"
                      @mouseenter="expand = true"
                    >
                      <div>
                        <v-icon size="26" color="#ffcc00"
                          >mdi-tray-arrow-up</v-icon
                        >
                      </div>
                    </v-btn>
                    <v-btn
                      v-else-if="expand && overlay"
                      fab
                      small
                      color="#000"
                      @mouseenter="expand = true"
                    >
                      <div>
                        <v-icon color="#ffcc00">mdi-close</v-icon>
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
                            <v-icon style="color: #ffcc00"
                              >mdi-tray-arrow-up</v-icon
                            >
                          </div>
                          <div
                            :class="{ 'custom-font': en }"
                            style="color: #ffcc00"
                            @click="expand = false"
                          >
                            {{ en ? 'ດາວໂຫຼດ' : 'Download' }}
                          </div>
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
                              boxShadow: show
                                ? '#00ff55'
                                : 'rgb(217, 217, 217)',
                            }"
                            text
                            height="25%"
                            width="100%"
                            small
                            color="#009933"
                            :outlined="show === 'button1' ? false : true"
                            @mouseenter="setOutlined('button1')"
                            @mouseleave="detOutlined(true)"
                            @click="someAsyncFunction()"
                          >
                            <v-icon
                              style="
                                background-color: #009933;
                                border-radius: 50%;
                              "
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
                            <template #activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                class="mt-2"
                                text
                                height="25%"
                                width="100%"
                                small
                                :style="{
                                  boxShadow: show
                                    ? '#00ff55'
                                    : 'rgb(217, 217, 217)',
                                }"
                                color="#ff3333"
                                :outlined="show === 'button2' ? false : true"
                                v-on="on"
                                @mouseenter="setOutlined('button2')"
                                @mouseleave="detOutlined(true)"
                              >
                                <v-icon
                                  style="
                                    background-color: #ff3333;
                                    border-radius: 50%;
                                  "
                                  size="35"
                                  color="#ffffff"
                                  >mdi-file-pdf-box</v-icon
                                >
                                <v-card-text
                                  :style="{
                                    color:
                                      show === 'button2' ? '#ff3333' : '#000',
                                  }"
                                >
                                  PDF</v-card-text
                                >
                              </v-btn>
                            </template>
                            <span :class="{ 'custom-font': en }">{{
                              en
                                ? 'PDF ຍັງບໍ່ສາມາດດາວໂຫລດໄດ້'
                                : 'PDF can not download'
                            }}</span>
                          </v-tooltip>
                        </v-col>
                      </v-card>
                    </v-expand-transition>
                  </div>
                </div>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-text>
        <!--Sto title page-->
        <!--Sta table---------------------------------------------------------------------------------------------------------------------->
        <div v-if="!showgraph" class="demo-split">
          <Split v-model="split" min="0" max="1000">
            <template #left>
              <div class="demo-split-pane">
                <v-card
                  class="rounded-0"
                  width="100%"
                  height="100%"
                  color="#ffff00"
                  outlined
                >
                  <v-toolbar color="#000" dark>
                    <v-toolbar-title style="color: #ffff00">
                      <div :class="{ 'custom-font': en }">
                        {{ en ? 'ສະແດງຕາຕະລາງ' : 'Table display' }}
                      </div>
                    </v-toolbar-title>
                  </v-toolbar>
                  <v-list
                    class="table-container"
                    subheader
                    two-line
                    flat
                    :height="heightPx + 'px'"
                  >
                    <v-list-item-group
                      class="table-title-hiegth table-container"
                    >
                      <v-list-item
                        v-for="item in columns"
                        :key="item.key"
                        class="px-0"
                      >
                        <template #default="{ active }">
                          <v-list-item-action>
                            <v-checkbox
                              v-model="item.active"
                              :input-value="active"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-content class="px-0">
                            <v-list-item-title>{{
                              item.title
                            }}</v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </div>
            </template>
            <template #right>
              <div class="demo-split-pane-r">
                <v-card
                  outlined
                  style="
                    background-color: #ffff00;
                    border-top-left-radius: 0px;
                    border-top-right-radius: 0px;
                    border-bottom-right-radius: 1px;
                  "
                  height="100%"
                  class="table-container text-center"
                >
                  <v-card-text v-if="loading" class="pa-0">
                    <v-progress-linear
                      indeterminate
                      color="#4d3d00"
                    ></v-progress-linear>
                  </v-card-text>
                  <v-data-table
                    width="100%"
                    height="calc(73vh + 5px)"
                    fixed-header
                    dense
                    :headers="visibleHeaders"
                    :items="desserts"
                    :items-per-page="computedItemsPerPage"
                    item-key="TICKETID"
                    class="elevation-1 custom-font font_size_12 text-left"
                  >
                    <template v-slot:item="{ item, index }">
                      <tr
                        class="text_color custom-font"
                        :style="{
                          backgroundColor:
                            index % 2 === 0
                              ? 'rgb(255, 255, 235)'
                              : 'rgb(255, 255, 255)',
                        }"
                      >
                        <td v-for="header in visibleHeaders" :key="header.text">
                          <span class="font_size_12 custom-font">{{
                            item[header.value]
                          }}</span>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
              </div>
            </template>
          </Split>
        </div>
        <v-card v-if="showgraph" class="my-4">
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="#4d3d00"
          ></v-progress-linear>
          <chartgraph :desserts="desserts" />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import chartgraph from './chartgraph.vue'
export default {
  middleware: 'auth', 
  Currency: 'DefaultLayout',
  components: {
    chartgraph,
  },
  data() {
    return {
      heightPx: 0,
      showgraph: false,
      absolute: true,
      overlay: false,
      loading: false,
      colWidth: false,
      split: 0.025,
      desserts: [],
      dateRange: [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substr(0, 16),
        new Date(Date.now()).toISOString().substr(0, 16),
      ],
      columns: [
        { key: 'TICKETID', title: 'TICKET_ID', active: true },
        { key: 'CLASSIFICATION', title: 'CLASSIFICATION', active: true },
        { key: 'MSISDN', title: 'MSISDN', active: true },
        { key: 'CONTACT', title: 'CONTACT', active: true },
        { key: 'SERVICE_GROUP', title: 'SERVICE_GROUP', active: true },
        { key: 'SERVICE_TYPE', title: 'SERVICE_TYPE', active: true },
        { key: 'TICKET_TYPE', title: 'TICKET_TYPE', active: true },
        { key: 'CREATED_BY_OWNER', title: 'CREATED_BY_OWNER', active: true },
        { key: 'QUEUED_BY', title: 'QUEUED_BY', active: true },
        { key: 'QUEUED_DATE', title: 'QUEUED_DATE', active: true },
        { key: 'INPROGRESS_OWNER', title: 'INPROGRESS_OWNER', active: true },
        { key: 'INPROGRESS_DATE', title: 'INPROGRESS_DATE', active: true },
        { key: 'TIME_CARE_TPLUS', title: 'TIME_CARE_TPLUS', active: true },
        { key: 'RESOLVE_OWNER', title: 'RESOLVE_OWNER', active: true },
        { key: 'RESOLVE_DATE', title: 'RESOLVE_DATE', active: true },
        { key: 'TIME_DO_TPLUS', title: 'TIME_DO_TPLUS', active: true },
        { key: 'CLOSE_BY_OWNER', title: 'CLOSE_BY_OWNER', active: true },
        { key: 'CLOSE_BY_DATE', title: 'CLOSE_BY_DATE', active: true },
        {
          key: 'TIME_CLOSE_BY_CENTER',
          title: 'TIME_CLOSE_BY_CENTER',
          active: true,
        },
        { key: 'STATUS_TICKET', title: 'STATUS_TICKET', active: true },
        { key: 'VILLAGE', title: 'VILLAGE', active: true },
        { key: 'DISTRICT', title: 'DISTRICT', active: true },
        { key: 'PROVINCE', title: 'PROVINCE', active: true },
        {
          key: 'ROOT_CAUSE_BY_DEPARTMENT',
          title: 'ROOT_CAUSE_BY_DEPARTMENT',
          active: true,
        },
        { key: 'SOLUTION_SHOT', title: 'SOLUTION_SHOT', active: true },
        {
          key: 'ROOT_CAUSE_BY_STATUS',
          title: 'ROOT_CAUSE_BY_STATUS',
          active: true,
        },
        {
          key: 'ROOT_CAUSE_BY_TIER',
          title: 'ROOT_CAUSE_BY_TIER',
          active: true,
        },
        { key: 'CODE', title: 'CODE', active: true },
        {
          key: 'ROOT_CAUSE_DESCRIPTIONS',
          title: 'ROOT_CAUSE_DESCRIPTIONS',
          active: true,
        },
        {
          key: 'ForRootCuase',
          title: 'For_Root_Cause',
          active: true,
        },
        { key: 'DESCRIPTION', title: 'DESCRIPTION', active: true },
        { key: 'OWNER_GROUP', title: 'OWNER_GROUP', active: true },
        { key: 'DOWN_TIME', title: 'DOWN_TIME', active: true },
        { key: 'CREATED_BY', title: 'CREATED_BY', active: true },
        { key: 'CREATED_AT', title: 'CREATED_AT', active: true },
        {
          key: 'PENDING_CREATED_BY',
          title: 'PENDING_CREATED_BY',
          active: true,
        },
        {
          key: 'PENDING_CREATED_AT',
          title: 'PENDING_CREATED_AT',
          active: true,
        },
        { key: 'FIRST_NAME', title: 'FIRST_NAME', active: true },
        { key: 'LAST_NAME', title: 'LAST_NAME', active: true },
      ],
      headers: [
        {
          text: 'TICKET_ID',
          align: 'start',
          sortable: false,
          value: 'TICKETID',
        },
        { text: 'CLASSIFICATION', value: 'CLASSIFICATION' },
        { text: 'MSISDN', value: 'MSISDN' },
        { text: 'CONTACT', value: 'CONTACT' },
        { text: 'SERVICE_GROUP', value: 'SERVICE_GROUP' },
        { text: 'SERVICE_TYPE', value: 'SERVICE_TYPE' },
        { text: 'TICKET_TYPE', value: 'TICKET_TYPE' },
        { text: 'CREATED_BY_OWNER', value: 'CREATED_BY_OWNER' },
        { text: 'QUEUED_CREATED_BY', value: 'QUEUED_BY' },
        { text: 'QUEUED_DATE', value: 'QUEUED_DATE' },
        { text: 'INPROGRESS_OWNER', value: 'INPROGRESS_OWNER' },
        { text: 'INPROGRESS_DATE', value: 'INPROGRESS_DATE' },
        { text: 'TIME_CARE_TPLUS', value: 'TIME_CARE_TPLUS' },
        { text: 'RESOLVE_OWNER', value: 'RESOLVE_OWNER' },
        { text: 'RESOLVE_DATE', value: 'RESOLVE_DATE' },
        { text: 'TIME_DO_TPLUS', value: 'TIME_DO_TPLUS' },
        { text: 'CLOSE_BY_OWNER', value: 'CLOSE_BY_OWNER' },
        { text: 'CLOSE_BY_DATE', value: 'CLOSE_BY_DATE' },
        { text: 'TIME_CLOSE_BY_CENTER', value: 'TIME_CLOSE_BY_CENTER' },
        { text: 'STATUS_TICKET', value: 'STATUS_TICKET' },
        { text: 'VILLAGE', value: 'VILLAGE' },
        { text: 'DISTRICT', value: 'DISTRICT' },
        { text: 'PROVINCE', value: 'PROVINCE' },
        { text: 'ROOT_CAUSE_BY_DEPARTMENT', value: 'ROOT_CAUSE_BY_DEPARTMENT' },
        { text: 'SOLUTION_SHOT', value: 'SOLUTION_SHOT' },
        { text: 'ROOT_CAUSE_BY_STATUS', value: 'ROOT_CAUSE_BY_STATUS' },
        { text: 'ROOT_CAUSE_BY_TIER', value: 'ROOT_CAUSE_BY_TIER' },
        { text: 'CODE', value: 'CODE' },
        { text: 'ROOT_CAUSE_DESCRIPTIONS', value: 'ROOT_CAUSE_DESCRIPTIONS' },
        { text: 'For_Root_Cause', value: 'ForRootCuase' },
        { text: 'DESCRIPTION', value: 'DESCRIPTION' },
        { text: 'OWNER_GROUP', value: 'OWNER_GROUP' },
        { text: 'DATE_DOWN_TIME', value: 'DOWN_TIME' },
        { text: 'NEW_CREATED_BY', value: 'CREATED_BY' },
        { text: 'NEW_CREATED_AT', value: 'CREATED_AT' },
        { text: 'PENDING_CREATED_BY', value: 'PENDING_CREATED_BY' },
        { text: 'PENDING_CREATED_AT', value: 'PENDING_CREATED_AT' },
        { text: 'FIRST_NAME', value: 'FIRST_NAME' },
        { text: 'LAST_NAME', value: 'LAST_NAME' },
      ],
      dark: true,
      expand: false,
      show: null,
      menu: false,
      dateshow: true,
    }
  },
  computed: {
    en() {
      return this.$store.state.en
    },
    computedItemsPerPage() {
      return this.desserts.length > 0 ? this.desserts.length : 50
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
  watch: {
    dateRange() {
      if (this.dateRange[0] !== '' && this.dateRange[1] !== '') {
        this.OnInternet()
      }
    },
  },
  mounted() {
    this.OnInternet()
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    setSheetHeight() {
      this.heightPx = window.innerHeight - 230
    },
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
      const filename = `Ticket data ${Date.now()}.xlsx`
      return new Promise((resolve, reject) => {
        try {
          XLSX.writeFile(workbook, filename)
          resolve(filename)
        } catch (error) {
          reject(error)
        }
      })
    },
    async someAsyncFunction() {
      if (this.desserts.length <= 0) {
        return this.messageModal('warning', 'Not data.')
      }
      try {
        const exportedFileName = await this.exportToExcel()
        console.log(`File exported successfully: ${exportedFileName}`)
      } catch (error) {
        const errors = error === 'undefined' || null ? '' : error
        console.error('Error exporting file:', errors)
      }
    },
    async OnInternet() {
      this.desserts = []
      this.loading = true
      try {
        const formattedStartDate = this.dateRange[0]
          ? new Date(this.dateRange[0])
              .toLocaleString('en-CA', {
                timeZone: 'Asia/Bangkok',
                hour12: false,
              })
              .replace(',', '')
          : null

        const formattedEndDate = this.dateRange[1]
          ? new Date(this.dateRange[1])
              .toLocaleString('en-CA', {
                timeZone: 'Asia/Bangkok',
                hour12: false,
              })
              .replace(',', '')
          : null
        const res = await this.$axios.post(
          `http://172.28.17.101:9989/ticket/gotdata?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        )
        if (!Array.isArray(res.data.results) || res.data.results.length === 0) {
          console.warn('No data received.')
          this.desserts = []
          return
        }
        this.desserts = res.data.results.map((item) => ({
          TICKETID: item.id || null,
          CLASSIFICATION: item.classification_name || null,
          MSISDN: item.msisdn || null,
          CONTACT: item.contact || null,
          SERVICE_GROUP: item.classification_group_name || null,
          SERVICE_TYPE: item.service_type || null,
          TICKET_TYPE: item.ticket_type || null,
          CREATED_BY_OWNER: item.created_by_owner || null,
          QUEUED_BY: item.created_by || null,
          QUEUED_DATE: item.created_at
            ? new Date(item.created_at)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          INPROGRESS_OWNER: item.inprogress_created_by || null,
          INPROGRESS_DATE: item.inprogress_created
            ? new Date(item.inprogress_created)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          TIME_CARE_TPLUS: item.time_care_tplus || 0,
          RESOLVE_OWNER: item.resolved_created_by || null,
          RESOLVE_DATE: item.resolved_created
            ? new Date(item.resolved_created)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          TIME_DO_TPLUS: item.time_do_tplus || 0,
          CLOSE_BY_OWNER: item.closed_created_by || null,
          CLOSE_BY_DATE: item.closed_created
            ? new Date(item.closed_created)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          TIME_CLOSE_BY_CENTER: item.time_close_by_center || 0,
          STATUS_TICKET: item.status || null,
          VILLAGE: item.village || null,
          DISTRICT: item.district_name || null,
          PROVINCE: item.province_name || null,
          ROOT_CAUSE_BY_DEPARTMENT: item.RootCausebyOwnerDepart || null,
          SOLUTION_SHOT: item.SolutionShort || null,
          ROOT_CAUSE_BY_STATUS: item.RootCausebyOwner || null,
          ROOT_CAUSE_BY_TIER: item.RootCausebyTier || null,
          CODE: item.Code || null,
          ROOT_CAUSE_DESCRIPTIONS: item.root_cause || null,
          ForRootCuase: item.ForRootCuase || null,
          DESCRIPTION: item.description || null,
          OWNER_GROUP: item.to_owner_group || null,
          DOWN_TIME: item.down_time
            ? new Date(item.down_time)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          OWNER_GROUP_CREATE: item.to_owner_group_created || null,
          CREATED_BY: item.new_created_by || null,
          CREATED_AT: item.new_created
            ? new Date(item.new_created)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          PENDING_CREATED_BY: item.pending_created_by || null,
          PENDING_CREATED_AT: item.pending_created
            ? new Date(item.pending_created)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ')
            : null,
          FIRST_NAME: item.first_name || null,
          LAST_NAME: item.last_name || null,
        }))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
    messageModal(type, content) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${content}<span>`,
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
}
.font_size_12 {
  font-size: 14px;
}
.hover-pointer {
  cursor: pointer;
}
.demo-split {
  height: calc(82vh + 6px);
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 0px;
}
.demo-split-pane-r {
  padding-left: 8px;
}
</style>
