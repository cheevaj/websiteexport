<template>
  <div>
    <v-card
      v-if="(dataHistoryPK.length > 0) && (pageItem === 2)"
      outlined
      class="rounded-0 scrollbar"
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
      <v-data-table
        v-if="!overlay"
        :height="heightPx + 'px'"
        fixed-header
        dense
        :headers="visibleHeaders"
        :items="dataHistoryPK"
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
        v-if="pageItem === 2"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3></h3><h3 class="custom-font">{{en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບໃໝ່.' : 'Enter New number phone.'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
        </div>
        <br />
        <h2 v-if="en" class="custom-font">ຍັງບໍ່ມີຂໍ້ມູນ</h2>
        <h2 v-else>
          <span style="color: rgb(255, 255, 0)">Number"s &nbsp;</span>data
          history is not found
        </h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
      <h3 class="custom-font">{{en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter your number phone.'}}</h3>
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
  props: {
    dataHistoryPK: Array,
    pageItem:Number,
  },
  data() {
    return {
      outlined: false,
      loading: false,
      heightPx: 0,
      buttonanime: true,
      overlay: false,
      columns: [
        { key: 'index', title: 'N' },
        { key: 'SIS', title: 'Msisdn' },
        { key: 'Net', title: 'Net' },
        { key: 'Price', title: 'Price' },
        { key: 'Package_Code', title: 'Package Code' },
        { key: 'Product_Number', title: 'Product Number' },
        { key: 'Duration', title: 'Duration' },
        { key: 'Start_Time', title: 'Start Time' },
        { key: 'ExpiryTime', title: 'Expiry Time' },
        { key: 'Oder_Ref', title: 'Oder Ref' },
        { key: 'Result_Desc', title: 'Result Desc' },
        { key: 'Chanel', title: 'Chanel' },
      ],
      headers: [
        { text: 'N', value: 'index' },
        { text: 'Msisdn', value: 'SIS' },
        { text: 'Net', value: 'Net' },
        { text: 'Price', value: 'Price' },
        { text: 'Package Code', value: 'Package_Code' },
        { text: 'Product Number', value: 'Product_Number' },
        { text: 'Duration', value: 'Duration' },
        { text: 'Start Time', value: 'Start_Time' },
        { text: 'Expiry Time', value: 'ExpiryTime' },
        { text: 'Oder Ref', value: 'Oder_Ref' },
        { text: 'Result Desc', value: 'Result_Desc' },
        { text: 'Chanel', value: 'Chanel' },
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
      return this.dataHistoryPK.length > 0
        ? this.dataHistoryPK[this.dataHistoryPK.length - 1].index
        : 10
    },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    setSheetHeight() {
      this.heightPx = window.innerHeight - 205;
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
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}
</style>
