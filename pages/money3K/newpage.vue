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
                      placeholder="Serial Year and Month is ( 202403 )"
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
          <h2 class="text-center color_CL">CCare's Top-Up Package History.</h2>
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
          <h3>Enter New number phone.</h3>
          <br />
          <div class="mouse_senter" @click="buttonanime = !buttonanime">
            <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
          </div>
          <br />
          <h2>
            <span style="color: rgb(255, 255, 0)">CCare's top-up&nbsp;</span>data
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
        columns: [
          { key: 'index', title: 'N' },
          { key: 'Staff_Name', title: 'Staff Name' },
          { key: 'Packagecode', title: 'Package code' },
          { key: 'QTY', title: 'QTY' },
          { key: 'Product_Number', title: 'Product Number' },
          { key: 'Month', title: 'Month' },
        ],
        headers: [
          { text: 'N', value: 'index' },
          { text: 'Staff Name', value: 'Staff_Name' },
          { text: 'Package code', value: 'Packagecode' },
          { text: 'QTY', value: 'QTY' },
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
      async handleSearch() {
        this.dataResponse = {}
        this.loading = true
        const Num = this.numberPhon
        try {
          const response = await this.$axios.post(
            'http://172.28.17.102:9960/finddate/findcareregister',
            {
              datetime: Num,
            }
          )
          if (response.data) {
            this.dataResponse = response.data.map((detail, index) => ({
              index: index + 1,
              Month:
                detail.Month.substring(0, 4) + '\u00A0/\u00A0' + detail.Month.substring(4),
              Packagecode: detail.Packagecode,
              QTY: detail.QTY,
              Staff_Name: detail.Staff_Name,
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
  