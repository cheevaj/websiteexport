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
                    v-model="numberPhon"
                    class="custom-font"
                    :placeholder=" en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ ( 20789... )' : 'Enter phone number ( 20788... )'"
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
        <h2 class="text-center color_CL custom-font " style="color: #ffff00;">{{ en ? "ປະຫວັດການຕັດເງີນຂອງແອບ Soxay" : "History of Money cut by Soxay App."}}</h2>
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
      <v-card
        v-if="data_num"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
      <h3 class="custom-font">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ' : 'Enter New number phone.' }}</h3>
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
        <h3 class="custom-font">{{en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter your number phone.'}}</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2 class="custom-font" ><span class="custom-font" style="color: rgb(255, 255, 0)">{{en ? '' :'Data'}}</span>{{ en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'not found' }}</h2>
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
      overlay: false, // Add this line
      heightPx: 0,
      columns: [
        { key: 'index', title: 'N' },
        { key: 'SIS', title: 'SIS' },
        { key: 'RECEIVER_AMOUNT_F', title: 'RECEIVER AMOUNT' },
        { key: 'TRANSFER_AMOUNT', title: 'TRANSFER AMOUNT' },
        { key: 'USER_ID', title: 'USER-ID' },
        { key: 'RESULT_DESC', title: 'RESULT-DESC' },
        { key: 'DATE', title: 'DATE' },
      ],
      headers: [
        { text: 'N', value: 'index' },
        { text: 'SIS', value: 'SIS' },
        { text: 'RECEIVER AMOUNT', value: 'RECEIVER_AMOUNT_F' },
        { text: 'TRANSFER AMOUNT', value: 'TRANSFER_AMOUNT' },
        { text: 'USER-ID', value: 'USER_ID' },
        { text: 'RESULT-DESC', value: 'RESULT_DESC' },
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
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  methods: {
    async handleSearch() {
      this.dataResponse = []
      this.loading = true
      const Num = this.numberPhon // .split(',').map((num) => num.trim())
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:9970/data/findnumbersoxay',
          {
            telephone: Num,
          }
        )
        // console.log(response.data)
        if (response.data) {
          this.dataResponse = response.data.map((detail, index) => ({
            index: index + 1,
            SIS: detail.RECEIVER_ISDN,
            RECEIVER_AMOUNT_F: this.formatResultDesc(detail.RECEIVER_AMOUNT_F),
            TRANSFER_AMOUNT: this.formatResultDesc(detail.TRANSFER_AMOUNT),
            DATE: this.formatAdjustDate(detail.CDATE),
            USER_ID: detail.USER_ID,
            RESULT_DESC: detail.RESULT_DESC,
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
    setSheetHeight() {
      // Get the height of the computer screen
      this.heightPx = window.innerHeight - 190
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
  background-color: #ffff00;
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
