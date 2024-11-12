<template>
  <div class="background_color">
    <v-card
      v-if="transformedDataHPackage.length > 0"
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
        height="488px"
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
    dataHPackage: Array,
  },
  data() {
    return {
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
        { key: 'Chanel', title: 'Chanel' },  // Update here
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
        { text: 'Chanel', value: 'Chanel' },  // Update here
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
      return this.dataHPackage.map((item, index) => {
        return {
          ...item,
          index: index + 1,
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
        .replace(',', '') // remove comma from the formatted string
      return formattedDate
    },
  },
}
</script>
