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
          <v-card v-show="expand" class="mt-1">
            <v-btn
              style="
                border-bottom-left-radius: 0%;
                border-bottom-right-radius: 0%;
              "
              width="100%"
              color="rgb(41, 163, 41)"
              @mouseenter="expand = true"
            >
              <div
                style="display: fixed; align-items: start"
                @click="expand = false"
              >
                <v-icon>mdi-tray-arrow-up</v-icon>
              </div>
              <div @click="expand = false">Download</div>
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
    <v-divider style="background-color: rgb(111, 111, 111)"></v-divider>
    <v-row  :dark="dark" style="margin-top: 0px;">
      <v-col class="px-0" :dark="dark" cols="12" sm="3">
        <div >
          <v-card flat :dark="dark" class="rounded-0 px-4">
            <v-row>
              <v-col class="pr-0" cols="3">
                  <v-img
                    style="border-radius: 50%; width: 50px; height: 50px;"
                    src="https://marketplace.canva.com/EAFMNm9ybqQ/1/0/1600w/canva-gold-luxury-initial-circle-logo-qRQJCijq_Jw.jpg"
                  />
              </v-col>
              <v-col cols="9" class="px-0">
                <v-card flat> </v-card>
              </v-col>
            </v-row>
            <v-card-text class="py-0"> Classic </v-card-text>
            <v-divider style="background-color: rgb(111, 111, 111)"></v-divider>
            <v-card-text
              class="px-0"
              text
              style="background-color: transparent"
            >
              <v-btn text style="width: 100%"> dd </v-btn>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col
        :dark="dark"
        cols="12"
        sm="9"
        style="background-color: hsl(0, 0%, 96%)"
      >
        <div >
          <pagetable />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
import pagetable from './pagetable'
export default {
  Currency: 'DefaultLayout',
  components: {
    pagetable,
  },
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