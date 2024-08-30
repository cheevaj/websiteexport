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
                    v-model="numberPhon"
                    class="no-spinner custom-font"
                    :placeholder=" en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ ( 20789... )' : 'Enter phone number ( 20788... )'"
                    clearable
                    style="width: 250px; height: 34px; margin-top: 1px"
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
        <h2 class="text-center color_CL custom-font" style="color: #ffff00;">{{ dataResponseBcelOne.length === 0 ? (en ? 'ຂໍ້ມູນ Bcel-One.' : 'Data Bcel-One.') : (en ? 'ຊໍາລະຜ່ານ Bcel-One.' : 'Pay through Bcel-One.') }}</h2>
      </v-card-text>
      <div></div>
    </v-card-actions>
    <v-card
      v-if="dataResponseBcelOne.length > 0"
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
        :height="heightPx - 260 + 'px'"
        fixed-header
        dense
        :headers="visibleHeaders"
        :items="dataResponseBcelOne"
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
      <v-card-text style="padding: 12px; padding-top: 0px; padding-bottom: 0px;">
        <v-row class="px-0">
        <v-col cols="6" class="px-0">
          <v-card-text class="pa-0 text-center custom-font" width="100%" height="30px" style="background-color: #000; color: #ffff00;">
            {{ en ? 'ຊໍາລະຜ່ານ USSD' : 'Pay through USSD' }}
          </v-card-text>
          <v-data-table
            v-if="!overlay"
            :height="heightPx - heightPx + 162 + 'px'"
            fixed-header
            dense
            :headers="visibleHeaders2"
            :items="dataResponsePayment"
            :items-per-page="10"
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
                <td v-for="header in visibleHeaders2" :key="header.text">
                  <span class="font_size_12">{{ item[header.value] }}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-card-text class="pa-0 text-center custom-font" width="100%" height="30px" style="background-color: #000; color: #ffff00;">
            {{ en ? 'ຊໍາລະຜ່ານ Ezload' : 'Pay through Ezload' }}
          </v-card-text>
          <v-data-table
            v-if="!overlay"
            :height="heightPx - heightPx + 162 + 'px'"
            fixed-header
            dense
            :headers="visibleHeaders3"
            :items="dataResponseLogonecreen"
            :items-per-page="10"
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
                <td v-for="header in visibleHeaders3" :key="header.text">
                  <span class="font_size_12">{{ item[header.value] }}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
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
        <h2>
          <span style="color: rgb(255, 255, 0)">{{en ? '' :"Bcel-One's"}}&nbsp;</span>{{ en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : "data history is not found" }}
        </h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center" style="display: flex; flex-direction: column; justify-content: center"
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
export default {
  middleware: 'auth',
  Currency: 'index',
  data() {
    return {
      outlined: false,
      loading: false,
      numberPhon: '',
      data_num: false,
      buttonanime: true,
      dataResponseBcelOne: [],
      dataResponsePayment: [],
      dataResponseLogonecreen: [],
      overlay: false,
      heightPx: 0,
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'SIS', title: 'MSISDN' },
        { key: 'AMOUNT', title: 'Amount' },
        { key: 'SEQ_NUMBER', title: 'SEQ Number' },
        { key: 'Provider', title: 'Provider' },
        { key: 'TYPE', title: 'Type' },
        { key: 'ADJUSTDATE', title: 'Adjust Date' },
        { key: 'DATE', title: 'Date' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'MSISDN', value: 'SIS' },
        { text: 'Amount', value: 'AMOUNT' },
        { text: 'SEQ Number', value: 'SEQ_NUMBER' },
        { text: 'Provider', value: 'Provider' },
        { text: 'Type', value: 'TYPE' },
        { text: 'Adjust Date', value: 'ADJUSTDATE' },
        { text: 'Date', value: 'DATE' },
      ],
      columns2: [
        { key: 'index', title: 'Index' },
        { key: 'SIS', title: 'ISDN' },
        { key: 'Pinno', title: 'Pin-no' },
        { key: 'AMOUNT', title: 'Amount' },
        { key: 'ResultDesc', title: 'Result Desc' },
        { key: 'DATE', title: 'Date' },
      ],
      headers2: [
        { text: 'Index', value: 'index' },
        { text: 'ISDN', value: 'SIS' },
        { text: 'Pin-no', value: 'Pinno' },
        { text: 'Amount', value: 'AMOUNT' },
        { text: 'Result Desc', value: 'ResultDesc' },
        { text: 'Date', value: 'DATE' },
      ],
      columns3: [
        { key: 'index', title: 'Index' },
        { key: 'SIS', title: 'msisdn' },
        { key: 'AMOUNT', title: 'Amount' },
        { key: 'ResultDesc', title: 'Result Desc' },
        { key: 'DATE', title: 'Date' },
      ],
      headers3: [
        { text: 'Index', value: 'index' },
        { text: 'msisdn', value: 'SIS' },
        { text: 'Amount', value: 'AMOUNT' },
        { text: 'Result Desc', value: 'ResultDesc' },
        { text: 'Date', value: 'DATE' },
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
    visibleHeaders2() {
      return this.headers2.filter((header) =>
        this.columns2.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    visibleHeaders3() {
      return this.headers3.filter((header) =>
        this.columns3.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    itemsPerPage() {
      return this.dataResponseBcelOne.length > 0
        ? this.dataResponseBcelOne[this.dataResponseBcelOne.length - 1].index
        : 10
    },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    handleSearch() {
      const Num = Number(this.numberPhon)
      this.dataResponseAll(Num)
    },
    async dataResponseAll(Num) {
      this.dataResponseBcelOne = []
      this.dataResponsePayment = []
      this.loading = true
      try {
        const bcelOneResponse = await this.$axios.post(
          'http://172.28.17.102:8100/show/justbceldata',
          { telephone: Num }
        )
        const paymentResponse = await this.$axios.post(
          'http://172.28.17.102:8100/show/postpaidpaymentussd',
          { telephone: Num }
        )
        const logOneScreenResponse = await this.$axios.post(
          'http://172.28.17.102:8100/show/logstoshowinonescreem',
          { telephone: Num }
        )
        if (bcelOneResponse.data) {
          this.dataResponseBcelOne = bcelOneResponse.data.map((detail, index) => ({
            index: index + 1,
            SIS: detail.MSISDN,
            AMOUNT: this.formatResultDesc(detail.AMOUNT),
            SEQ_NUMBER: detail.SEQ_NUMBER,
            Provider: detail.Provider,
            TYPE: detail.TYPE,
            ADJUSTDATE: this.formatAdjustDate(detail.RESPON_DATE),
            DATE: detail.DATED,
          }))
        }
        if (paymentResponse.data) {
          this.dataResponsePayment = paymentResponse.data.map((detail, index) => ({
            index: index + 1,
            SIS: detail.ISDN,
            Pinno: detail.Pinno,
            AMOUNT: this.formatResultDesc(detail.Amount),
            ResultDesc: detail.ResultDesc,
            DATE: detail.DATE.substring(0, 4) + '\u00A0/\u00A0' + detail.DATE.substring(4,6)+ '\u00A0/\u00A0' + detail.DATE.substring(6),
          }))
        }
        if (logOneScreenResponse.data.Data) {
          this.dataResponseLogonecreen = logOneScreenResponse.data.Data.map((detail, index) => ({
            index: index + 1,
            SIS: detail.msisdn,
            AMOUNT: this.formatResultDesc(detail.amount),
            DATE: detail.cdate,
            resultdesc: detail.resultdesc,
          }))
        }
        this.data_num = true
      } catch (error) {
        this.dataResponseBcelOne = []
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
        .replace(',', '')
      return formattedDate
    },
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
      return value
    },
    setSheetHeight() {
      this.heightPx = window.innerHeight - 190
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
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.font_size_12 {
  font-size: 12px;
}
.font_size_14 {
  font-size: 14px;
}
.text_color {
  color: rgb(115, 115, 115);
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
