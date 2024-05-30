<template>
  <div class="background_color">
    <div style="position: fixed; z-index: 100; right: 1px">
      <v-card-actions class="pa-0">
        <transition name="move-right">
          <div v-show="buttonanime" class="transition-box">
            <v-card-actions class="pa-0">
              <div style="display: flex">
                <form @submit.prevent="handleSearch">
                  <Input
                    v-model="numberPhon"
                    placeholder="Serial number is 20789..."
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
                  Search
                </v-btn>
                <v-btn
                  text
                  x-small
                  height="32px"
                  @click="buttonanime = !buttonanime"
                  style="padding: 0; margin-top: 1px ;background-color: transparent; color: transparent;"
                >
                  <v-icon color="rgb(204, 204, 204)">mdi-chevron-double-right</v-icon>
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
        <h2 class="text-center color_CL">History Query Data Packages</h2>
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
        :items-per-page="itemsPerPage"
        item-key="ProductNumber"
        class="elevation-1 pt-4 custom-font table-container"
      >
        <template v-slot:item="{ item }">
          <tr class="text_color" :style="{ backgroundColor: item.index % 2 !== 0 ? 'rgb(255, 255, 230)' : 'rgb(255, 255, 255)' }">
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
        <h3>Enter New number phone.</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
        </div>
        <br />
        <h2>
          <span style="color: rgb(255, 255, 0)">Number"s &nbsp;</span>data
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
        <h3>Enter your number phone.</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2><span style="color: rgb(255, 255, 0)">Data</span> not found</h2>
      </v-card>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outlined: false,
      loading: false,
      numberPhon: '',
      heightPx:0,
      data_num: false,
      buttonanime: true,
      dataResponse: [],
      overlay:false,
      columns: [
        { key: 'index', title: 'N' },
        { key: 'SIS', title: 'SIS' },
        { key: 'Net', title: 'Net' },
        { key: 'Price', title: 'Price' },
        { key: 'Package_Code', title: 'Package Code' },
        { key: 'Product_Number', title: 'Product Number' },
        { key: 'Duration', title: 'Duration' },
        { key: 'Start_Time', title: 'Start Time' },
        { key: 'ExpiryTime', title: 'Expiry Time' },
        { key: 'Oder_Ref', title: 'Oder Ref' },
        { key: 'Result_Desc', title: 'Result Desc' },
      ],
      headers: [
        { text: 'N', value: 'index' },
        { text: 'SIS', value: 'SIS' },
        { text: 'Net', value: 'Net' },
        { text: 'Price', value: 'Price' },
        { text: 'Package Code', value: 'Package_Code' },
        { text: 'Product Number', value: 'Product_Number' },
        { text: 'Duration', value: 'Duration' },
        { text: 'Start Time', value: 'Start_Time' },
        { text: 'Expiry Time', value: 'ExpiryTime' },
        { text: 'Oder Ref', value: 'Oder_Ref' },
        { text: 'Result Desc', value: 'Result_Desc' },
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
      return this.dataResponse.length > 0
        ? this.dataResponse[this.dataResponse.length - 1].index
        : 10;
    },
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
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
    async handleSearch() {
      this.loading = true
      const Num = this.numberPhon
      const Number = [
        '2076616633',
        '2078378917',
        '2078663685',
        '2076616633,2078378917',
      ].includes(Num)
        ? '200'
        : Num
      try {
        const response = await this.$axios.post(
          'http://172.28.26.23:9085/api/spnv/query-register-history',
          {
            ClientIP: '1.1.1.1',
            UserId: 'APITPLUS',
            Chanel: 'TPLUS',
            Msisdn: Number,
            PageNo: 1,
            PageSize: 10,
          }
        )
        if (response.data && response.data.Detail) {
          this.dataResponse = response.data.Detail.map((detail, index) => ({
            index: index + 1,
            SIS: detail.Msisdn,
            Duration: detail.Duration,
            Start_Time: this.formatAdjustDate(detail.StartTime),
            ExpiryTime: this.formatAdjustDate(detail.ExpiryTime),
            Net: detail.Net,
            Oder_Ref: detail.Oder_Ref,
            Package_Code: detail.PackageCode,
            Package_Name: detail.PackageName,
            Price: detail.Price,
            Product_Number: detail.ProductNumber,
            Result_Desc: detail.ResultDesc,
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
    setSheetHeight() {
      // Get the height of the computer screen
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
.text_color{
  color:rgb(89, 89, 89);
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
