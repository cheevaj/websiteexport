<template>
  <div class="background_color">
    <v-card
      v-if="transformedDataHPackage.length > 0"
      outlined
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        left: 0;
        height: 548px;
        overflow: y;
        background-color: #f2f2f2;
      "
    >
      <v-data-table
        v-if="!overlay"
        height="488px"
        fixed-header
        dense
        :headers="visibleHeaders"
        :items="transformedDataHPackage"
        :items-per-page="itemsPerPage"
        item-key="ProductNumber"
        class="elevation-1 custom-font table-container scrollbar"
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
    dataCCare: Array,
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
        { key: 'QTY', title: 'QTY' },
        { key: 'Packagecode', title: 'Package Code' },
        { key: 'Staff_Name', title: 'Staff Name' },
        { key: 'Month', title: 'Month' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'QTY', value: 'QTY' },
        { text: 'Package Code', value: 'Packagecode' },
        { text: 'Staff Name', value: 'Staff_Name' },
        { text: 'Month', value: 'Month' },
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
      return this.dataCCare.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          Month: item.Month.substring(0, 4) + '\u00A0/\u00A0' + item.Month.substring(4),
          StartTime: this.formatAdjustDate(item.StartTime),
          ExpiryTime: this.formatAdjustDate(item.ExpiryTime),
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
        .replace(',', '')
      return formattedDate
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
  background-color: rgb(255, 204, 0);
  border-radius: 2px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: rgb(255, 204, 0);
  border-radius: 1px;
}
.scrollbar {
  overflow-x: hidden;
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(255, 204, 0);
}
</style>
