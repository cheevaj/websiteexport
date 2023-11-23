<template>
  <div>
    <v-col :dark="dark" class="pa-0">
      <v-card
        max-height="80px"
        min-height="50px"
        outlined
        :dark="dark"
        class="rounded-0"
      >
        d
      </v-card>
    </v-col>
    <div class="shrink">
      <div
        class="text-right"
        style="
          min-height: 1px;
          max-width: 180px;
          position: fixed;
          z-index: 100;
          top: 80px;
          right: 20px;
        "
        @mouseleave="expand = false"
      >
        <v-btn
          v-if="!expand"
          fab
          small
          color="rgb(51, 204, 51)"
          @mouseenter="expand = true"
        >
          <div>
            <v-icon>mdi-tray-arrow-up</v-icon>
          </div>
        </v-btn>
        <v-expand-x-transition v-else>
          <v-card  v-show="expand" class="mt-1">
            <v-btn
              style="
                border-bottom-left-radius: 0%;
                border-bottom-right-radius: 0%;
              "
              width="100%"
              color="rgb(41, 163, 41)"
              @mouseenter="expand = true"
            >

              
              <div @click="expand=false" style="display: fixed; align-items: start">
                <v-icon>mdi-tray-arrow-up</v-icon>
              </div>
              <div @click="expand=false">Download</div>
            </v-btn>
          </v-card>
        </v-expand-x-transition>

        <v-expand-transition>
          <v-card
            v-show="expand"
            style="border-top-left-radius: 0%; border-top-right-radius: 0%"
            outlined
          >
            <v-col>
              <v-btn
                class="mt-2"
                :style="{
                  boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                }"
                text
                height="25%"
                width="100%"
                small
                color="#009933"
                :outlined="show === 'button1' ? false : true"
                @mouseenter="setOutlined('button1')"
                @mouseleave="detOutlined(true)"
                @click="exportToExcel"
              >
                <v-icon
                  style="background-color: #009933; border-radius=50%"
                  size="35"
                  color="#ffffff"
                  >mdi-microsoft-excel</v-icon
                >
                <v-card-text
                  :style="{
                    color: show === 'button1' ? '#009933' : '#000',
                  }"
                  >Excel</v-card-text
                >
              </v-btn>

              <v-btn
                class="mt-2"
                text
                height="25%"
                width="100%"
                small
                :style="{
                  boxShadow: show ? '#00ff55' : 'rgb(217, 217, 217)',
                }"
                color="#ff3333"
                :outlined="show === 'button2' ? false : true"
                @mouseenter="setOutlined('button2')"
                @mouseleave="detOutlined(true)"
              >
                <v-icon
                  style="background-color: #ff3333; border-radius=50%"
                  size="35"
                  color="#ffffff"
                  >mdi-file-code-outline</v-icon
                >
                <v-card-text
                  :style="{
                    color: show === 'button2' ? '#ff3333' : '#000',
                  }"
                  >Csv</v-card-text
                >
              </v-btn>
            </v-col>
          </v-card>
        </v-expand-transition>
      </div>
    </div>

<!-- tart table-->
<v-col class="pa-0">
  <v-card :dark="dark">

  </v-card>
</v-col>
    <v-row :dark="dark">
      <v-col class="px-0" :dark="dark" cols="12" sm="3">
        <v-card :dark="dark" class="rounded-0 px-4"> dd </v-card>
      </v-col>
      <v-col :dark="dark" cols="12" sm="9" style="background-color: hsl(0, 0%, 96%)">
        <v-card-title>
          <h3 style="color: #595959;">Page Title</h3>
        </v-card-title>
        <v-card-text style=" color: #595959;">
        Dta table title
        </v-card-text>
        <v-card outlined class="ma-1">
          <v-simple-table max-height="450px">
            <template #default>
              <thead>
                <tr style="background-color: #ff3333">
                  <th style="color: #fff" class="text-center">Currency</th>
                  <th style="color: #fff" class="text-center">Buy</th>
                  <th style="color: #fff" class="text-center">Sell</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in desserts"
                  :key="item.Currency"
                  :style="{
                    backgroundColor:
                      index % 2 == 0 ? 'rgb(230, 255, 230)' : '#ffffff',
                  }"
                >
                  <td class="text-center">
                    {{ item.Currency }}
                  </td>
                  <td class="text-center">{{ item.Buy }}.00</td>
                  <td class="text-center">{{ item.Sell }}.00</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
export default {
  Currency: 'DefaultLayout',
  data() {
    return {
      dark: true,
      expand: false,
      show: null,
      color: '#e5e5e5',
      desserts: [
        {
          Currency: 'USD',
          Buy: '20,680',
          Sell: '20.812',
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
        {
          Currency: 'TBM',
          Sell: 202,
          Buy: 237,
        },
      ],
    }
  },
  methods: {
    setOutlined(value) {
      this.show = value
    },
    detOutlined(value) {
      this.show = value
    },
    exportToExcel() {
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.json_to_sheet(this.desserts)

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Currency Data')

      // Generate a unique filename or use a timestamp for the file
      const filename = `currency_data_${Date.now()}.xlsx`

      XLSX.writeFile(workbook, filename)
    },
  },
}
</script>
  <style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>