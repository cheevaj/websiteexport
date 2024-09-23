<template>
  <div>
    <v-card
      v-if="(dataPrice.length > 0) && (pageItem === 0)"
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
        :items="dataPrice"
        :items-per-page="15"
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
    <v-card v-if="pageItem === 0"
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
        <h2 class="custom-font">
          <span class="custom-font" style="color: rgb(255, 255, 0)">{{en ? '' : 'Data'}}&nbsp;</span>{{en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'is not found'}}
        </h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font">
          {{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບໃໝ່.' : 'Enter your new number phone.' }}
        </h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2 class="custom-font">
          {{ en ? 'ບໍ່ພົບຂໍ້ມູນຂອງເບີ' : 'Data not found' }}
        </h2>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    dataPrice: Array,
    pageItem:Number,
  },
  middleware: 'auth',
  data() {
    return {
      outlined: false,
      data_num: false,
      buttonanime: true,
      overlay: false,
      heightPx: 0,
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'MSISDN', title: 'MSISDN' },
        { key: 'Class', title: 'Class' },
        { key: 'Prepaid_price', title: 'Prepaid price' },
        { key: 'Postpaid_price', title: 'Postpaid price' },
        { key: 'Active_Date', title: 'Active Date' },
        { key: 'Book_detail', title: 'Book detail' },
        { key: 'Date_Booking', title: 'Date Booking' },
        { key: 'Date_delete_pool', title: 'Date delete pool' },
        { key: 'Sub_status', title: 'Sub status' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'MSISDN', value: 'MSISDN' },
        { text: 'class', value: 'Class' },
        { text: 'Prepaid price', value: 'Prepaid_price' },
        { text: 'Postpaid price', value: 'Postpaid_price' },
        { text: 'Active Date', value: 'Active_Date' },
        { text: 'Book detail', value: 'Book_detail' },
        { text: 'Date Booking', value: 'Date_Booking' },
        { text: 'Date delete pool', value: 'Date_delete_pool' },
        { text: 'Sub status', value: 'Sub_status' },
      ],
    }
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    en() {
      return this.$store.state.en
    },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
      return value
    },
    setSheetHeight() {
      this.heightPx = window.innerHeight - 205;
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
.title_color {
  color: #ffff00;
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
