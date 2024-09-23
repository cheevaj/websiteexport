<template>
    <div>
      <v-card
        v-if="(dataCandidatePKage.length > 0) && (pageItem === 3)"
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
          :items="dataCandidatePKage"
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
          v-if="pageItem === 3"
          min-width="450"
          min-height="300"
          class="text-center"
          style="display: flex; flex-direction: column; justify-content: center"
        >
          <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນໃໝ່.' : 'Enter New year and month.' }}</h3>
          <br />
          <div class="mouse_senter" @click="buttonanime = !buttonanime">
            <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
          </div>
          <br />
          <h2 v-if="en" class="custom-font">ຍັງບໍ່ມີຂໍ້ມູນ</h2>
          <h2 v-else>
            <span style="color: rgb(255, 255, 0)">CCare's &nbsp;</span>top-up data
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
          <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ.' : 'Enter New year and month.' }}</h3>
          <br />
          <div class="mouse_senter" @click="buttonanime = !buttonanime">
            <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
          </div>
          <br />
          <h2 class="custom-font"> {{en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' :'Data not found'}} </h2>
        </v-card>
      </v-card-text>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth',
    props: {
    dataCandidatePKage: Array,
    pageItem:Number,
  },
    data() {
      return {
        outlined: false,
        heightPx:0,
        numberPhon: '',
        buttonanime: true,
        overlay: false,
        columns: [
          { key: 'index', title: 'N' },
          { key: 'Staff_Name', title: 'Staff Name' },
          { key: 'Packagecode', title: 'Package code' },
          { key: 'QTY', title: 'QTY' },
          { key: 'Product_Number', title: 'Product Number' },
          { key: 'Month', title: 'Month' },
        ],
        headers: [
          { text: 'N', value: 'index' },
          { text: 'Staff Name', value: 'Staff_Name' },
          { text: 'Package code', value: 'Packagecode' },
          { text: 'QTY', value: 'QTY' },
          { text: 'Month', value: 'Month' },
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
        return this.dataCandidatePKage.length > 0
          ? this.dataCandidatePKage[this.dataCandidatePKage.length - 1].index
          : 10;
      },
    },
    mounted() {
      this.setSheetHeight()
      window.addEventListener('resize', this.setSheetHeight)
    },
    methods: {
      setSheetHeight() {
        this.heightPx = window.innerHeight - 205
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
  