<template>
    <div>
      <div style="position: fixed; z-index: 100; right: 1px">
        <v-card-actions class="pa-0">
          <transition name="move-right">
            <div v-show="buttonanime" class="transition-box">
              <v-card-actions class="pa-0">
                <Tooltip
                  :content="en ? 'ນໍາເຂົ້າໄຟລ໌ Excel.' : 'Import file Excel.'"
                  placement="bottom"
                  :delay="800"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    @change="handleFileUpload"
                  />
                  <v-btn
                    text
                    x-small
                    fab
                    class="px-0 ml-1 mr-0 BK_colorBT"
                    @click="$refs.fileInput.click()"
                  >
                    <v-icon size="25" style="color: rgb(41, 163, 41)">
                      mdi-file-excel-outline
                    </v-icon>
                  </v-btn>
                </Tooltip>
                <div style="display: flex">
                  <form @submit.prevent="handleSearch">
                    <Input
                      class="custom-font"
                      v-model="numberPhon"
                      :placeholder="en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ 20789...,20788...' : 'Enter phone number is 20789...,20788...'"
                      clearable
                      style="width: 350px; height: 34px; margin-top: 1px"
                      @keydown.enter="handleSearch"
                    />
                  </form>
                  <v-btn
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
                    <h4 class="custom-font">{{en ? 'ຄົ້ນຫາ' : 'Search'}}</h4>
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
      </div>
      <v-card-actions class="pa-2" style="background-color: rgb(26, 26, 0)">
        <v-btn fab x-small text @click="$router.go(-1)">
          <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-text class="pa-0">
          <h2 class="text-center color_CL custom-font" style="color: #ffff00;">
            {{en ? 'ກອດຂໍ້ມູນການຕັດເງີນ 3000ກິບ ເດືອນຫຼ່າສຸດ' : 'Check the latest cut of money 3000 kip of the SIS.'}}
          </h2>
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
          :items-per-page="itemsPerPage"
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
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ' : 'Enter New number phone.' }}</h3>
          <br />
          <div class="mouse_senter" @click="buttonanime = !buttonanime">
            <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
          </div>
          <br />
          <h2 v-if="en" class="custom-font">ຍັງບໍ່ມີຂໍ້ມູນ</h2>
          <h2 v-else>
            <span style="color: rgb(255, 255, 0)">SIS's&nbsp;</span>data is not
            found
          </h2>
        </v-card>
        <v-card
          v-else
          min-width="450"
          min-height="300"
          class="text-center"
          style="display: flex; flex-direction: column; justify-content: center"
        >
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ' : 'Enter New number phone.' }}</h3>
          <br />
          <div class="mouse_senter" @click="buttonanime = !buttonanime">
            <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
          </div>
          <br />
          <h2 class="custom-font" ><span class="custom-font" style="color: rgb(255, 255, 0)">{{en ? '' :'Data'}}</span>{{ en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'not found' }}</h2>
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
        outlined: false,
        loading: false,
        numberPhon: '',
        data_num: false,
        buttonanime: true,
        dataResponse: [],
        overlay: false, // Add this line
        heightPx: 0,
        columns: [
          { key: 'index', title: 'N' },
          { key: 'SIS', title: 'MSISDN' },
          { key: 'BBF', title: 'BBF' },
          { key: 'BFT', title: 'BFT' },
          { key: 'RESULTDESC', title: 'Result Description' },
          { key: 'CODE', title: 'Code' },
          { key: 'ADJUSTDATE', title: 'Adjust Date' },
          // { key: 'MONTHLY', title: 'Monthly' },
        ],
        headers: [
          { text: 'N', value: 'index' },
          { text: 'MSISDN', value: 'SIS' },
          { text: 'BBF', value: 'BBF' },
          { text: 'BFT', value: 'BFT' },
          { text: 'Result Description', value: 'RESULTDESC' },
          { text: 'Code', value: 'CODE' },
          { text: 'Adjust Date', value: 'ADJUSTDATE' },
          // { text: 'Monthly', value: 'MONTHLY' },
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
      itemsPerPage() {
        return this.dataResponse.length > 0
          ? this.dataResponse[this.dataResponse.length - 1].index
          : 10
      },
    },
    mounted() {
      this.setSheetHeight()
      window.addEventListener('resize', this.setSheetHeight)
    },
    methods: {
      async handleSearch() {
        this.dataResponse = []
        this.loading = true
        const Num = this.numberPhon.split(',').map((num) => num.trim())
        try {
          const response = await this.$axios.post(
            'http://172.28.17.102:9980/adjust/getadjustment',
            {
              telephone: Num,
            }
          )
          // console.log(response)
          if (response.data) {
            this.dataResponse = response.data.map((detail, index) => ({
              index: index + 1,
              SIS: detail.MSISDN,
              ADJUSTDATE: this.formatAdjustDate(detail.ADJUSTDATE),
              BBF: this.formatResultDesc(detail.BBF),
              BFT: this.formatResultDesc(detail.BFT),
              CODE: detail.CODE ? 'OK' : 'No',
              // MONTHLY: detail.MONTHLY.substring(0, 4) + '\u00A0/\u00A0' +detail.MONTHLY.substring(4),
              RESULTDESC: detail.RESULTDESC,
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
      formatAdjustDate(dateString) {
        const date = new Date(dateString)
        const formattedDate = date
          .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
          .replace(',', '') // remove comma from the formatted string
        return formattedDate
      },
      formatResultDesc(value) {
      // Check if value is a valid number
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
      return value // Return the original value if it's not a valid number
    },
      setSheetHeight() {
        // Get the height of the computer screen
        this.heightPx = window.innerHeight - 190
      },
      handleFileUpload(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0]
          this.readFile(file)
        } else {
          console.log('No file selected')
        }
      },
      readFile(file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
  
          // -------------- Assuming phone numbers are in the specified column (colNum)
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            range: -1,
          })
  
          // ---------------- Extract data from the specified column and row
          const extractedData = jsonData.map((row) => row[0])
  
          // ---------------- Remove the header (assuming the header is in the first row)
          extractedData.shift()
  
          // --------------- Set this.numsend to the extracted phone numbers
          this.numberPhon = extractedData.join(',')
        }
        reader.readAsBinaryString(file)
      },
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setSheetHeight)
    },
  }
  </script>
  
  <style>
  .color_CL {
    color: #ffff;
  }
  .BK_colorBT {
    background-color: rgb(255, 255, 153);
  }
  .custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
  }
  .font_size_12 {
    font-size: 12px;
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
  