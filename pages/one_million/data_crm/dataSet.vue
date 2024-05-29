<template>
  <div class="background_color">
    <v-card
      v-if="transformedDataHPackage.length > 0"
      outlined
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        left: 0;
        overflow: y;
        z-index: 10;
        background-color: #f2f2f2;
      "
    >
      <v-data-table
        v-if="!overlay"
        height="100%"
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
  Currency: 'index',
  props: {
    dataHPackage: Array,
  },
  data() {
    return {
      outlined: false,
      loading: false,
      numberPhon: '',
      data_num: false,
      buttonanime: true,
      overlay: false,
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'Msisdn', title: 'SIS' },
        { key: 'Net', title: 'Net' },
        { key: 'Price', title: 'Price' },
        { key: 'PackageCode', title: 'Package Code' },
        { key: 'ProductNumber', title: 'Product Number' },
        { key: 'Duration', title: 'Duration' },
        { key: 'StartTime', title: 'Start Time' },
        { key: 'ExpiryTime', title: 'Expiry Time' },
        { key: 'Oder_Ref', title: 'Oder Ref' },
        { key: 'ResultDesc', title: 'Result Desc' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'SIS', value: 'Msisdn' },
        { text: 'Net', value: 'Net' },
        { text: 'Price', value: 'Price' },
        { text: 'Package Code', value: 'PackageCode' },
        { text: 'Product Number', value: 'ProductNumber' },
        { text: 'Duration', value: 'Duration' },
        { text: 'Start Time', value: 'StartTime' },
        { text: 'Expiry Time', value: 'ExpiryTime' },
        { text: 'Oder Ref', value: 'Oder_Ref' },
        { text: 'Result Desc', value: 'ResultDesc' },
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
        ? this.transformedDataHPackage[this.transformedDataHPackage.length - 1].index
        : 10
    },
    transformedDataHPackage() {
      return this.dataHPackage.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          StartTime: this.formatAdjustDate(item.StartTime),
          ExpiryTime:this.formatAdjustDate(item.ExpiryTime),
        }
      });
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
    // setSheetHeight() {
    //   // Get the height of the computer screen
    //   this.heightPx = window.innerHeight - 190
    // },
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
