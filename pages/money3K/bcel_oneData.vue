<template>
  <div class="table-container">
    <v-card
    v-if="( pageItem === 7 ) && (bceloneDataAll.bcelOneResponse.length > 0)"
      outlined
      class="rounded-0 table-container"
      style="
        overflow-y: auto;
        width: 100%;
        height: calc(100vh - 17vh);
        left: 0;
        overflow: y;
        z-index: 10;
        background-color: #f2f2f2;
      "
    >
      <v-card-text class="pa-0 text-center custom-font" width="100%" height="30px" style="background-color: #000; color: #ffff00;">
        {{ en ? 'ຊໍາລະຜ່ານ BCEL-ONE' : 'Pay through USSD' }}
      </v-card-text>
      <v-data-table
        outlined
        :height="heightPx - 260 + 'px'"
        fixed-header
        dense
        :headers="visibleHeaders"
        :items="bceloneDataAll.bcelOneResponse"
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
        <v-col cols="6" class="pa-0">
          <v-card-text class="pa-0 text-center custom-font" width="100%" height="30px" style="background-color: #000; color: #ffff00;">
            {{ en ? 'ຊໍາລະຜ່ານ USSD' : 'Pay through USSD' }}
          </v-card-text>
          <v-data-table
            outlined
            :height="heightPx - heightPx + 260 + 'px'"
            fixed-header
            dense
            :headers="visibleHeaders2"
            :items="bceloneDataAll.bcelOneResponse2"
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
        <v-col cols="6" class="pa-0">
          <v-card-text class="pa-0 text-center custom-font" width="100%" height="30px" style="background-color: #000; color: #ffff00;">
            {{ en ? 'ຊໍາລະຜ່ານ Ezload' : 'Pay through Ezload' }}
          </v-card-text>
          <v-data-table
            :height="heightPx - heightPx + 260 + 'px'"
            fixed-header
            dense
            :headers="visibleHeaders3"
            :items="bceloneDataAll.dataResponseLogonecreen"
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
        v-if="pageItem === 7"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບໃໝ່' : 'Enter New number phone.' }}</h3>
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
  props: {
    bceloneDataAll: Object,
    pageItem:Number,
  },
  data() {
    return {
      outlined: false,
      buttonanime: true,
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
      return this.bceloneDataAll.bcelOneResponse.length > 0
        ? this.bceloneDataAll.bcelOneResponse[this.bceloneDataAll.bcelOneResponse.length - 1].index
        : 10
    },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    setSheetHeight() {
      this.heightPx = window.innerHeight - 109;
      console.log('data All',this.bceloneDataAll)
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
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}
</style>
