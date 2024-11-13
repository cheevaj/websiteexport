<template>
  <div class="background_color">
    <v-card
      outlined
      flat
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
    SMS: Array,
  },
  data() {
    return {
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'DestinationNum', title: 'SIM' },
        { key: 'SMID', title: 'SMID' },
        { key: 'OriginalNum', title: 'OriginalNum' },
        { key: 'Result', title: 'Result' },
        { key: 'datetime', title: 'Date' },
        { key: 'content', title: 'Content' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'SIM', value: 'DestinationNum' },
        { text: 'SMID', value: 'SMID' },
        { text: 'OriginalNum', value: 'OriginalNum' },
        { text: 'Result', value: 'Result' },
        { text: 'Date', value: 'datetime' },
        { text: 'Content', value: 'content' },
      ],
    }
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
          (col) => col.key === header.value && col.active !== false
        )
      );
    },
    itemsPerPage() {
      return this.transformedDataHPackage.length > 0
        ? this.transformedDataHPackage[this.transformedDataHPackage.length - 1]
            .index
        : 10
    },
    transformedDataHPackage() {
      if (!this.SMS || !Array.isArray(this.SMS)) {
        return [];
      }
      return this.SMS.map((item, index) => {
        return {
          ...item,
          index: index + 1,
          DestinationNum: item.DestinationNum,
          SMID: item.SMID,
          OriginalNum: item.OriginalNum,
          Result: item.Result,
          content: this.maskContent(item.content),
          datetime: item.datetime,
        }
      });
    },
  },
  methods: {
    maskContent(content) {
      const keywordPattern = /OTP|otp|Code|code|รหัส|Codapay|ລະຫັດຜ່ານ/
      if (keywordPattern.test(content)) {
        return content.replace(/\d+/g, '******');
      }
      return content;
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
