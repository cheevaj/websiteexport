<template>
  <div>
    <div style="position: fixed; z-index: 100; right: 1px">
      <v-card-actions class="pa-0">
        <transition name="move-right">
          <div v-show="buttonanime" class="transition-box">
            <v-card-actions class="pa-0">
              <div style="display: flex">
                <form @submit.prevent="handleSearch">
                  <Input
                    class="custom-font"
                    v-model="numberPhon"
                    :placeholder=" en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ ( 202402 )' : 'Enter New year and month ( 202403 )'"
                    clearable
                    style="width: 250px; height: 34px; margin-top: 1px"
                    @keydown.enter="handleSearch"
                  />
                </form>
                <v-btn
                  class="custom-font"
                  :loading="loading"
                  small
                  text
                  @click="handleSearch"
                  style="
                    height: 31px;
                    background-color: rgb(230, 230, 0);
                    color: #000;
                    margin-top: 1px;
                    margin-left: 1px;
                    padding-left: 4px;
                    padding-right: 4px;
                  "
                >
                  {{en ? 'ຄົ້ນຫາ' : 'Search'}}
                </v-btn>
                <v-btn
                  text
                  x-small
                  height="32px"
                  @click="buttonanime = !buttonanime"
                  style="
                    padding: 0;
                    margin-top: 1px;
                    background-color: transparent;
                    color: transparent;
                  "
                >
                  <v-icon color="rgb(204, 204, 204)"
                    >mdi-chevron-double-right</v-icon
                  >
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </transition>
        <v-btn
          v-if="!buttonanime"
          fab
          text
          x-small
          height="32px"
          @click="buttonanime = !buttonanime"
          style="padding: 0; background-color: #000"
        >
          <v-icon color="#ffff">mdi-chevron-double-left</v-icon>
        </v-btn>
      </v-card-actions>

      <!-- Sta slid baton Download------------------------------------------------------------------------------------------------------------------->
      <div
        v-if="buttonanime"
        class="text-right"
        style="
          min-height: 1px;
          width: 180px;
          position: fixed;
          z-index: 100;
          top: 98px;
          right: 38px;
        "
        @mouseleave="expand = false"
      >
        <v-btn
          v-if="!expand && !hover"
          small
          :width="en ? undefined : '60px'"
          color="#000"
          @mouseenter="expand = true"
        >
          <div>
            <v-icon color="#ffff00">mdi-tray-arrow-up</v-icon>
          </div>
        </v-btn>
        <v-btn
          v-else-if="expand && hover"
          fab
          small
          color="#000"
          @mouseenter="expand = true"
        >
          <div>
            <v-icon color="#ffff00">mdi-close</v-icon>
          </div>
        </v-btn>
        <v-expand-x-transition v-else>
          <v-card v-show="expand">
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
              <div style="color: #ffff00" @click="expand = false">Download</div>
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
                @click="someAsyncFunction()"
              >
                <v-icon
                  style="background-color: #009933; border-radius: 50%"
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
                      boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                    }"
                    color="#ff3333"
                    :outlined="show === 'button2' ? false : true"
                    v-on="on"
                    @mouseenter="setOutlined('button2')"
                    @mouseleave="detOutlined(true)"
                  >
                    <v-icon
                      style="background-color: #ff3333; border-radius: 50%"
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
                <span class="custom-font">{{en ? 'ຍັງບໍ່ສາມາດດາວໂຫຼດໄຟຮ PDF' :'PDF can not download'}}</span>
              </v-tooltip>
            </v-col>
          </v-card>
        </v-expand-transition>
      </div>
    </div>
    <v-card-actions class="pa-2" style="background-color: rgb(26, 26, 0)">
      <v-btn fab x-small text @click="$router.go(-1)">
        <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-text class="pa-0">
        <h2 class="text-center color_CL custom-font">{{ en ? "ປະຫວັດການເຕີມເງືນຂອງ C'Care ຜ່ານ Bcel-One." : "Fill history of C'Care through Bcel-One."}}</h2>
      </v-card-text>
      <div></div>
    </v-card-actions>
    <v-card
      v-if="dataResponse.length > 0"
      outlined
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        width: 100%;
        position: fixed;
        height: calc(100vh - 14vh);
        left: 0;
        overflow: y;
        z-index: 10;
        background-color: #f2f2f2;
      "
    >
      <v-data-table
        v-if="!overlay"
        :height="heightPx + 'px'"
        fixed-header
        dense
        :headers="visibleHeaders"
        :items="dataResponse"
        :items-per-page="150"
        item-key="ProductNumber"
        class="elevation-1 pt-4 custom-font table-container"
      >
        <template v-slot:item="{ item }">
          <tr
            class="text_color"
            :style="{
              backgroundColor:
                item.index % 2 !== 0
                  ? 'rgb(255, 255, 230)'
                  : 'rgb(255, 255, 255)',
            }"
          >
            <td v-for="header in visibleHeaders" :key="header.text">
              <span class="font_size_12">{{ item[header.value] }}</span>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-card-text
      v-else
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 98vh;
      "
    >
      <v-card
        v-if="data_num"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font" >{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ ( 202402 )' : 'Enter New year and month ( 202403 )'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
        </div>
        <br />
        <h2>
          <span style="color: rgb(255, 255, 0)">CCare's Top-up&nbsp;</span
          >data history is not found
        </h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ' : 'Enter New year and month.'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)"
            >mdi-calendar-month-outline</v-icon
          >
        </div>
        <br />
        <h2 class="custom-font"><span class="custom-font" style="color: rgb(255, 255, 0)">{{en ? '' :'Data'}}</span>{{ en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'not found' }}</h2>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
export default {
  middleware: 'auth',
  data() {
    return {
      show: null,
      expand: false,
      hover: false,
      outlined: false,
      loading: false,
      numberPhon: '',
      data_num: false,
      buttonanime: true,
      dataResponse: [],
      overlay: false, // Add this line
      columns: [
        { key: 'index', title: 'INDEX' },
        { key: 'SIS', title: 'MSISDN' },
        { key: 'AMOUNT', title: 'AMOUNT' },
        { key: 'USER_ID', title: 'USER_ID' },
        { key: 'DATE', title: 'DATE' },
      ],
      headers: [
        { text: 'INDEX', value: 'index' },
        { text: 'MSISDN', value: 'SIS' },
        { text: 'AMOUNT', value: 'AMOUNT' },
        { text: 'USER_ID', value: 'USER_ID' },
        { text: 'DATE', value: 'DATE' },
      ],
    }
  },
  computed: {
    en() {
      return this.$store.state.en;
    },
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    // itemsPerPage() {
    //   const dataResponseLength = this.dataResponse.length
    //   if (
    //     dataResponseLength > 0 &&
    //     typeof this.dataResponse[dataResponseLength - 1].index === 'number'
    //   ) {
    //     // If dataResponse has items and the last index is a number, return it
    //     return this.dataResponse[dataResponseLength - 1].index
    //   } else {
    //     // If dataResponse is empty or the last index is not a number, return a default value (e.g., 10)
    //     return 10
    //   }
    // },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    async someAsyncFunction() {
      if (this.dataResponse.length > 0) {
        try {
          const exportedFileName = await this.exportToExcel()

          console.log(`File exported successfully: ${exportedFileName}`)
        } catch (error) {
          const errors = error === 'undefined' || null ? '' : error
          console.error('Error exporting file:', error)
          this.alert = errors
        }
      } else {
        this.errorMessage()
      }
    },
    setOutlined(value) {
      this.show = value
    },
    detOutlined(value) {
      this.show = value
    },
    async handleSearch() {
      this.dataResponse = {}
      this.loading = true
      const Num = this.numberPhon
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:8100/incoming/TOPUPV_INCOMMING',
          {
            datetime: Num,
          }
        )
        console.log('data date', response.data)
        if (response.data) {
          this.dataResponse = response.data.map((detail, index) => ({
            index: index + 1,
            SIS: detail.MSISDN,
            AMOUNT: this.formatResultDesc(detail.AMOUNT),
            USER_ID: detail.USER_ID,
            DATE:
              detail.CDATE.substring(0, 4) +
              '\u00A0/\u00A0' +
              detail.CDATE.substring(4, 6) +
              '\u00A0/\u00A0' +
              detail.CDATE.substring(6),
          }))
        } else {
          this.dataResponse = []
        }
        this.data_num = true
      } catch (error) {
        this.dataResponse = []
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
    //  function export file excel
    exportToExcel() {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.dataResponse)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Currency Data')
      // Generate a unique filename or use a timestamp for the file
      const filename = `Top-up Number ${Date.now()}.xlsx`
      // Wrap the writeFile function in a Promise
      return new Promise((resolve, reject) => {
        try {
          XLSX.writeFile(workbook, filename)
          resolve(filename)
          this.alert = 'alertsuccess'
        } catch (error) {
          reject(error)
        }
      })
    },
    setSheetHeight() {
      this.heightPx = window.innerHeight - 190;
    },
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
    },
    errorMessage() {
      this.$Notice.error({
        title: 'Data Not Found',
        desc: 'Please check information or Search for new information.',
      })
    },
  },
}
</script>

<style>
.color_CL {
  color: #ffff;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.font_size_12 {
  font-size: 11px;
}
.font_size_14 {
  font-size: 14px;
}
.title_color {
  color: #ffff00;
}
.text_color {
  color: rgb(89, 89, 89);
}
.table-container ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: #ffff00;
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
