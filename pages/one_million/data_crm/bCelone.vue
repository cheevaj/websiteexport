<template>
    <div class="background_color">
      <v-card
        v-if="transformedDataHPackage.length > 0"
        class="rounded-0 scrollbar"
        style="
          overflow-y: auto;
          left: 0;
          height: calc(100vh - 19vh);
          background-color: #f2f2f2;
        "
      >
        <v-data-table
          height="calc(100vh - 27vh)"
          fixed-header
          dense
          :headers="visibleHeaders"
          :items="transformedDataHPackage"
          :items-per-page="itemsPerPage"
          item-key="ProductNumber"
          class="elevation-1 custom-font table-container"
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
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth',
    Currency: 'index',
    props: {
      dataB_celOne: Array,
    },
    data() {
      return {
        columns: [
          { key: 'index', title: 'INDEX' },
          { key: 'MSISDN', title: 'MSISDN' },
          { key: 'AMOUNT', title: 'AMOUNT' },
          { key: 'SEQ_NUMBER', title: 'SEQ_NUMBER' },
          { key: 'Provider', title: 'Provider' },
        //   { key: 'DATED', title: 'DATE' },
        { key: 'TYPE', title: 'TYPE' },
          { key: 'RESPON_DATE', title: 'RESPON DATE' }, // Corrected key
        ],
        headers: [
          { text: 'INDEX', value: 'index' },
          { text: 'MSISDN', value: 'MSISDN' },
          { text: 'AMOUNT', value: 'AMOUNT' },
          { text: 'SEQ_NUMBER', value: 'SEQ_NUMBER' },
          { text: 'PROVIDER', value: 'Provider' },
        //   { text: 'DATE', value: 'DATED' },
        { text: 'TYPE', value: 'TYPE' },
          { text: 'RESPON DATE', value: 'RESPON_DATE' }, // Corrected key
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
      itemsPerPage() {
        return this.transformedDataHPackage.length > 0
          ? this.transformedDataHPackage[this.transformedDataHPackage.length - 1]
              .index
          : 10
      },
      transformedDataHPackage() {
        return this.dataB_celOne.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            RESPON_DATE: this.formatAdjustDate(item.RESPON_DATE),
            AMOUNT: this.formatResultDesc(item.AMOUNT), // Corrected method call
          }
        })
      },
    },
    mounted() {
      // this.setSheetHeight();
      // window.addEventListener('resize', this.setSheetHeight);
    },
    methods: {
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
    width: 8px;
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
  .scrollbar {
    overflow-x: hidden;
    /* Prevent horizontal overflow */
  }
  
  .scrollbar::-webkit-scrollbar {
    width: 8px;
    /* Set the width of the scrollbar */
    height: 2px;
  }
  
  /* Increase specificity of thumb styles */
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: yellow;
    /* Set the color of the thumb */
  }
  </style>
  