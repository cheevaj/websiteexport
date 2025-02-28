<template>
  <div>
    <v-card-text style="background-color: hsl(0, 0%, 96%)">
      <v-row>
        <v-col cols="12" class="py-0">
          <v-card-actions class="py-0 pl-0" style="height: 45px">
            <v-btn
              fab
              x-small
              text
              style="background-color: #000"
              @click="$router.go(-1)"
            >
              <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
            </v-btn>
            <v-card-title class="py-0">
              <v-spacer />
              <h4 :class="{ 'custom-font': en }" style="color: #595959">
                <span :class="{ 'custom-font': en }" style="color: #ffff00">{{
                  en ? '' : 'P'
                }}</span
                >{{ en ? 'ໜ້າ Ticket' : 'page Ticket' }}
              </h4>
            </v-card-title>
            <v-spacer />
            <v-card-actions class="pa-0">
              <div
                size="large"
                type="flex"
                style="width: 100%; margin-right: 40px"
              >
                <form @submit.prevent="searchData">
                  <Input
                    v-model="search"
                    :placeholder="
                      en
                        ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ ( 202402 )'
                        : 'Enter year and month ( 202403 )'
                    "
                    size="large"
                    class="custom-font custom-input"
                  >
                    <template #append>
                      <Button
                        :loading="loading"
                        @click="searchData"
                        class="button-input"
                        ><v-icon v-if="!loading" color="#ffd633"
                          >mdi-magnify</v-icon
                        ></Button
                      >
                    </template>
                  </Input>
                </form>
              </div>
              <v-btn
                small
                :width="en ? undefined : '60px'"
                height="35"
                elevation
                color="#000"
                class="rounded-0"
                @click="someAsyncFunction()"
              >
                <div>
                  <v-icon color="#ffff00">mdi-tray-arrow-up</v-icon>
                </div>
              </v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card-text>
    <div class="demo-split">
      <Split v-model="split" min="0" max="990">
        <template #left>
          <div class="demo-split-pane">
            <v-card
              class="rounded-0"
              width="100%"
              height="100%"
              color="#ffff00"
              outlined
            >
              <v-list
                style="
                  background-color: #ffff;
                  height: 58vh;
                  margin-left: 1px;
                  margin-right: 1px;
                  border-bottom-left-radius: 4px;
                  border-bottom-right-radius: 4px;
                  padding-top: 2px;
                  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
                "
              >
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  router
                  class="custom-list-item"
                  :class="[{ 'custom-list-item-button': selectionItem === i }]"
                  exact
                  @click="selectionItem = i"
                >
                  <v-list-item-content>
                    <v-list-item-title class="custom-font">
                      {{ en ? item.titleLao : item.titleEn }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </template>
        <template #right>
          <div class="demo-split-pane-r">
            <v-card
              outlined
              class="table-container text-center custom-card-r d-flex justify-center align-center"
            >
              <v-card
                v-if="dataResponse.length > 0"
                outlined
                class="rounded-0 scrollbar custom-card-table text-left"
              >
                <v-data-table
                  width="100%"
                  height="calc(72vh + 5px)"
                  fixed-header
                  dense
                  :headers="visibleHeaders"
                  :items="dataResponse"
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
              <img
                v-else-if="dataResponse.length === 0 && !loading"
                width="680px"
                height="280px"
                src="~/static/Downloads.png"
                style="display: block"
              />
            </v-card>
          </div>
        </template>
      </Split>
    </div>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  data() {
    return {
      button: false,
      buttonWeb: false,
      loading: false,
      search: '',
      selectionItem: 0,
      split: 0.125,
      dataResponse: [],
      items: [
        {
          titleLao: "C'Care ລົງທະບຽນເເພັກເກັດໃຫ້ລູກຄ້າ.",
          titleEn: 'Check The Price SIS.',
        },
        {
          titleLao: 'ປະຫວັດການຕື່ມເງິນຂອງເບີລາຍເດືອນ',
          titleEn: 'Money Cuts Bye Soxay App',
        },
      ],
    }
  },
  computed: {
    en() {
      return this.$store.state.en
    },
    columns() {
      return this.selectionItem === 0
        ? [
            { key: 'index', title: 'Index' },
            { key: 'Name', title: 'Name' },
            { key: 'QTY', title: 'QTY' },
            { key: 'Packagecode', title: 'Package code' },
            { key: 'Month', title: 'Month' },
          ]
        : [
            { key: 'index', title: 'INDEX' },
            { key: 'SIS', title: 'MSISDN' },
            { key: 'AMOUNT', title: 'AMOUNT' },
            { key: 'USER_ID', title: 'USER_ID' },
            { key: 'DATE', title: 'DATE' },
          ]
    },
    headers() {
      return this.selectionItem === 0
        ? [
            { text: 'Index', value: 'index' },
            { text: 'Name', value: 'Name' },
            { text: 'QTY', value: 'QTY' },
            { text: 'Package code', value: 'Packagecode' },
            { text: 'Month', value: 'Month' },
          ]
        : [
            { text: 'INDEX', value: 'index' },
            { text: 'MSISDN', value: 'SIS' },
            { text: 'AMOUNT', value: 'AMOUNT' },
            { text: 'USER_ID', value: 'USER_ID' },
            { text: 'DATE', value: 'DATE' },
          ]
    },
    computedItemsPerPage() {
      return this.dataResponse.length > 0 ? this.dataResponse.length : 50
    },
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    itemsPerPage() {
      const dataResponseLength = this.dataResponse.length
      if (
        dataResponseLength > 0 &&
        typeof this.dataResponse[dataResponseLength - 1].index === 'number'
      ) {
        return this.dataResponse[dataResponseLength - 1].index
      } else {
        return 10
      }
    },
  },
  methods: {
    searchData() {
      if (this.search === '') {
        return
      }
      switch (this.selectionItem) {
        case 0:
          this.handleSearchCCare()
          break
        case 1:
          this.handleSearchCCarePackage()
          break
        default:
          console.warn('Invalid selectionItem:', this.selectionItem)
      }
    },
    async handleSearchCCare() {
      this.dataResponse = [];
      this.loading = true
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:9960/finddate/numberofcareregister',
          {
            datetime: this.search,
          }
        )
        if (response.data) {
          let totalQty = 0
          this.dataResponse = response.data.map((detail, index) => {
            totalQty += detail.QTY
            return {
              index: index + 1,
              Name: detail.Name,
              QTY: detail.QTY,
              Packagecode: detail.Packagecode,
              Month:
                detail.Month.substring(0, 4) +
                '\u00A0/\u00A0' +
                detail.Month.substring(4),
            }
          })
          this.dataResponse.push({
            index: this.dataResponse.length + 1,
            Name: 'All',
            QTY: `All QTY: ${totalQty}`,
            Packagecode: '',
            Month: `From ${this.dataResponse[0].Month} to ${
              this.dataResponse[this.dataResponse.length - 1].Month
            }`,
          })
          console.log(this.dataResponse)
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
    async handleSearchCCarePackage() {
      this.dataResponse = {}
      this.loading = true
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:8100/incoming/TOPUPV_INCOMMING',
          {
            datetime: this.search,
          }
        )
        console.log(this.dataResponse)

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
          console.log('data date', response.data)
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
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
    },
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
    exportToExcel() {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.dataResponse)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Currency Data')
      const filename = `CCare register ${Date.now()}.xlsx`
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
    errorMessage() {
      this.$Notice.error({
        title: 'Data Not Found',
        desc: 'Please check data or input new year and month.',
      })
    },
  },
}
</script>
<style scoped>
.language-button {
  background-color: #fff;
  border: 2px solid #ffff00;
  color: inherit;
  transition: background-color 0.3s ease;
}
.language-button:hover {
  background-color: #ffff00 !important;
  color: inherit !important;
}
.custom-list-item {
  margin-left: 0px;
  margin-right: 1px;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
}
.custom-list-item:hover {
  background-color: #ffd633;
}
.custom-list-item-button {
  background-color: #ffd633;
}
.custom-input {
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 340px;
}
.button-input {
  background-color: #000;
  color: #ffd633;
  border-top-left-radius: 0px;
  width: 54px;
  height: 34.5px;
  border-bottom-left-radius: 0px;
}
.demo-split {
  height: calc(81vh + 8px);
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 0px;
}
.demo-split-pane-r {
  padding-left: 6px;
}
.custom-card-r {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 1px;
  height: calc(81vh + 8px);
}
.custom-card-table {
  overflow-y: auto;
  width: 100%;
  position: absolute;
  height: calc(81vh + 5px);
  left: 0;
  overflow: y;
  z-index: 10;
  background-color: #f2f2f2;
}
</style>
