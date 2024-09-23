<template>
  <div>
    <v-card
      v-if="(dataViacounter.length > 0) && (pageItem === 5)"
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
        :items="dataViacounter"
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
        v-if="pageItem === 5"
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
        <h2 v-if="en" class="custom-font">ບໍ່ພົບຂໍ້ມູນ</h2>
        <h2 v-else>
          <span style="color: rgb(255, 255, 0)">CCare's Register&nbsp;</span> Package is not found
        </h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ' : 'Enter New number phone.' }}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2 class="custom-font"><span style="color: rgb(255, 255, 0)">{{en ? '' : 'Data'}}</span>{{en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'not found'}}</h2>
      </v-card>
    </v-card-text>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  props: {
    dataViacounter: Array,
    pageItem:Number,
  },
  data() {
    return {
      outlined: false,
      buttonanime: true,
      overlay: false,
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'MSISDN', title: 'SIS' },
        { key: 'Packagecode', title: 'Package code' },
        { key: 'SIMtype', title: 'SIM type' },
        { key: 'Dated', title: 'Date' },
        { key: 'Statu', title: 'Status' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'SIS', value: 'MSISDN' },
        { text: 'Package code', value: 'Packagecode' },
        { text: 'SIM type', value: 'SIMtype' },
        { text: 'Date', value: 'Dated' },
        { text: 'Status', value: 'Statu' },
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
      return this.dataViacounter.length > 0
        ? this.dataViacounter[this.dataViacounter.length - 1].index
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
