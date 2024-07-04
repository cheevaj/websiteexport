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
  props: {
    dataSoXay: Array,
  },
  data() {
    return {
      columns: [
        { key: 'index', title: 'INDEX' },
        { key: 'RECEIVER_ISDN', title: 'SIS' },
        { key: 'RECEIVER_AMOUNT_F', title: 'RECEIVER AMOUNT' },
        { key: 'TRANSFER_AMOUNT', title: 'TRANSFER AMOUNT' },
        { key: 'RESULT_DESC', title: 'RESULT DESC' },
        { key: 'DATE', title: 'DATE' },
        { key: 'USER_ID', title: 'USER_ID' }, // Corrected key
      ],
      headers: [
        { text: 'INDEX', value: 'index' },
        { text: 'SIS', value: 'RECEIVER_ISDN' },
        { text: 'RECEIVER AMOUNT', value: 'RECEIVER_AMOUNT_F' },
        { text: 'TRANSFER AMOUNT', value: 'TRANSFER_AMOUNT' },
        { text: 'RESULT DESC', value: 'RESULT_DESC' },
        { text: 'DATE', value: 'DATE' },
        { text: 'USER_ID', value: 'USER_ID' }, // Corrected key
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
      return this.dataSoXay.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          DATE: this.formatAdjustDate(item.CDATE),
          RECEIVER_AMOUNT_F: this.formatResultDesc(item.RECEIVER_AMOUNT_F), // Corrected method call
          TRANSFER_AMOUNT: this.formatResultDesc(item.TRANSFER_AMOUNT), // Corrected method call
        }
      })
    },
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
  mounted() {
    // this.setSheetHeight();
    // window.addEventListener('resize', this.setSheetHeight);
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
