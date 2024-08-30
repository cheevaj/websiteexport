<template>
  <div>
    <div style="position: fixed; z-index: 100; right: 1px">
      <v-card-actions class="pa-0">
        <transition name="move-right">
          <div v-show="buttonanime" class="transition-box">
            <v-card-actions class="pa-0">
              <div style="display: flex">
                <form @submit.prevent="handleSearch">
                  <Input
                    class="custom-font"
                    v-model="numberPhon"
                    :placeholder=" en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ ( 202403 )' : 'Enter New year and month ( 202403 )'"
                    clearable
                    style="width: 250px; height: 34px; margin-top: 1px"
                    @keydown.enter="handleSearch"
                  />
                </form>
                <v-btn
                  :loading="loading"
                  small
                  text
                  @click="handleSearch"
                  style="
                    height: 31px;
                    background-color: rgb(230, 230, 0);
                    color: #000;
                    margin-top: 1px;
                    margin-left: 1px;
                    padding-left: 4px;
                    padding-right: 4px;
                  "
                >
                  <h4 class="custom-font">{{en ? 'ຄົ້ນຫາ' : 'Search'}}</h4>
                </v-btn>
                <v-btn
                  text
                  x-small
                  height="32px"
                  @click="buttonanime = !buttonanime"
                  style="
                    padding: 0;
                    margin-top: 1px;
                    background-color: transparent;
                    color: transparent;
                  "
                >
                  <v-icon color="rgb(204, 204, 204)"
                    >mdi-chevron-double-right</v-icon
                  >
                </v-btn>
              </div>
            </v-card-actions>
          </div>
        </transition>
        <v-btn
          v-if="!buttonanime"
          fab
          text
          x-small
          height="32px"
          @click="buttonanime = !buttonanime"
          style="padding: 0; background-color: #000"
        >
          <v-icon color="#ffff">mdi-chevron-double-left</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <v-card-actions class="pa-2" style="background-color: rgb(26, 26, 0)">
      <v-btn fab x-small text @click="$router.go(-1)">
        <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-text class="pa-0">
        <h2 class="text-center color_CL custom-font" style="color: #ffff00;">{{en ? "ປະຫວັດການລົງທະບຽນແພັກເກັດຂອງ CCare ຜ່ານ Bcel-One." : "CCare's Register Package via Bcel-One Channel History."}}</h2>
      </v-card-text>
      <div></div>
    </v-card-actions>
    <v-card
      v-if="dataResponse.length > 0"
      outlined
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        width: 100%;
        position: fixed;
        height: calc(100vh - 14vh);
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
        :items="dataResponse"
        :items-per-page="150"
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
        v-if="data_num"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ' : 'Enter New year and month.'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
        </div>
        <br />
        <h2 v-if="en" class="custom-font">ບໍ່ພົບຂໍ້ມູນການເຕີມເເພັກເກັດຂອງ c-care</h2>
        <h2 v-else>
          <span style="color: rgb(255, 255, 0)">C-Care's top-up&nbsp;</span>data
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
        <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ' : 'Enter New year and month.'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2 class="custom-font"><span style="color: rgb(255, 255, 0)">{{en ? '' : 'Data'}}</span> {{en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : "not found"}}</h2>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      outlined: false,
      loading: false,
      numberPhon: '',
      data_num: false,
      buttonanime: true,
      dataResponse: [],
      overlay: false,
      heightPx: 0,
      columns: [
        { key: 'index', title: 'INDEX' },
        { key: 'MSISDN', title: 'MSISDN' },
        { key: 'AMOUNT', title: 'AMOUNT' },
        { key: 'USER_ID', title: 'USER_ID' },
        { key: 'DATE', title: 'DATE' },
      ],
      headers: [
        { text: 'INDEX', value: 'index' },
        { text: 'MSISDN', value: 'MSISDN' },
        { text: 'AMOUNT', value: 'AMOUNT' },
        { text: 'USER_ID', value: 'USER_ID' },
        { text: 'DATE', value: 'DATE' },
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
      return this.$store.state.en;
    },
    // itemsPerPage() {
    //   return this.dataResponse.length > 0
    //     ? this.dataResponse[this.dataResponse.length - 1].index
    //     : 10
    // },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    async handleSearch() {
      this.dataResponse = []
      this.loading = true
      const Num = Number(this.numberPhon);
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:8100/incoming/TOPUPV_INCOMMING',
          {
            datetime: Num,
          }
        )
        if (response.data) {
          this.dataResponse = response.data.map((detail, index) => ({
            index: index + 1,
            MSISDN: detail.MSISDN,
            AMOUNT: this.formatResultDesc(detail.AMOUNT),
            USER_ID: detail.USER_ID,
            DATE: detail.CDATE.substring(0, 4) + '\u00A0/\u00A0' + detail.CDATE.substring(4, 6) + '\u00A0/\u00A0' + detail.CDATE.substring(6),

          }))
        } else {
          this.dataResponse = []
        }
        this.data_num = true
      } catch (error) {
        this.dataResponse = []
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
      return value;
    },
    setSheetHeight() {
      this.heightPx = window.innerHeight - 190
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
  background-color: #ffff00;
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
