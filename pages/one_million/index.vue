<template>
  <div>
    <v-card
      outlined
      class="rounded-0 screen"
      style="
        width: 100%;
        position: fixed;
        height: 100vh;
        left: 0;
        overflow: y;
        z-index: 10;
      "
      :style="{
        backgroundColor: colorMenu === 2 ? 'rgb(242, 242, 242)' : '#ffff',
      }"
    >
      <div style="position: fixed; z-index: 100; right: 1px">
        <v-card-actions class="pa-0">
          <transition name="move-right">
            <div v-show="buttonanime" class="transition-box">
              <v-card-actions class="pa-0">
                <div style="display: flex">
                  <form @submit.prevent="handleSearch">
                    <Input
                      v-model="numberPhon"
                      placeholder="Enter serial number..."
                      clearable
                      style="width: 200px; height: 34px"
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
                      background-color: #000;
                      color: #ffff00;
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
                    style="padding: 0"
                  >
                    <v-icon>mdi-chevron-double-right</v-icon>
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
            style="padding: 0"
          >
            <v-icon>mdi-chevron-double-left</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
      <div class="demo-split" style="width: 100%; height: 100%">
        <Split v-model="split">
          <template #left>
            <v-card-text
              class="pa-0 rounded-0"
              style="
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
              "
            >
              <div
                class="layout"
                style="
                  width: 100%;
                  height: 100%;
                  overflow-y: y;
                  border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                "
              >
                <v-card-text
                  class="text-center pa-0 rounded-0"
                  style="width: 100%; background-color: #f2f2f2"
                >
                  <v-img
                    max-width="120"
                    max-height="120"
                    src="https://lab-108-bucket.s3-ap-southeast-1.amazonaws.com/company-images/9a3665ea-de98-47f6-89a8-0a3f9e043f76.jpeg"
                    style="margin: auto"
                  />
                  <v-card-text
                    class="pa-0"
                    style="background-color: black; color: #ffff00"
                    >Menu</v-card-text
                  >
                  <v-btn
                    v-for="(item, index) in menuItems"
                    :key="index"
                    text
                    width="100%"
                    height="90"
                    class="rounded-0"
                    :style="{
                      backgroundColor:
                        mouseHover === index ? '#ffff00' : '#ffff',
                      color:
                        mouseHover !== index && colorMenu === index
                          ? '#ffff00'
                          : '#000',
                    }"
                    @mouseenter="mouseHover = index"
                    @mouseleave="mouseHover = colorMenu"
                    @click="slipMenu(index)"
                  >
                    <div>
                      <v-icon size="45">{{ item.iconType }}</v-icon>
                      <h4>{{ item.name }}</h4>
                    </div>
                  </v-btn>
                </v-card-text>
              </div>
            </v-card-text>
          </template>
          <template #right>
            <div style="margin-left: 6px">
              <div v-if="colorMenu === 0">
                <Home />
              </div>
              <div v-if="colorMenu === 1">
                <Crm />
              </div>
              <div v-if="colorMenu === 2">
                <Card />
              </div>
            </div>
          </template>
        </Split>
      </div>
    </v-card>
  </div>
</template>
<script>
import Crm from './data_crm'
import Home from './homemenu.vue'
import Card from './card.vue'
export default {
  middleware: 'auth',
  Currency: 'index',
  components: {
    Crm,
    Home,
    Card,
  },
  data() {
    return {
      loading: false,
      numberPhon: '',
      mouseHover: 0,
      buttonanime: true,
      colorMenu: 0,
      split: 0.07,
      minSplit: 0, // Minimum split ratio
      maxSplit: 0.1, // Maximum split ratio
      theme: 'light', // Assuming you have defined theme data
      activeMenuItem: '1', // Initial active menu item
      menuItems: [
        { name: 'Home', iconType: 'mdi-home-outline' },
        { name: 'CRM', iconType: 'mdi-monitor-screenshot' },
        { name: 'CARD', iconType: 'mdi-smart-card-outline' },
        { name: 'user', iconType: 'mdi-account' },
        { name: 'Exit', iconType: 'mdi-page-first' },
      ],
    }
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSheetHeight)
  },
  methods: {
    slipMenu(index) {
      if (index === 4) {
        this.$router.go(-1) // Navigate back one step
      } else {
        this.colorMenu = index
      }
    },
    setSheetHeight() {
      const screen = document.querySelector('.screen') // height of screen use screen if of
      if (screen) {
        const screenHeight = window.innerHeight - 64
        screen.style.height = screenHeight + 'px'
      }
    },
    handleMenuItemClick(item) {
      this.activeMenuItem = item.name
    },
    async handleSearch() {
      this.loading = !this.loading
      try {
        const num = this.numberPhon
        const res = await this.$axios.$get(
          `https://172.28.26.72:9443/ltc-smart-reward/read-point?userIdData=${encodeURIComponent(
            num
          )}`
        )
        console.log(res)
        this.loading = !this.loading
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
  watch: {
    split(newValue) {
      // Ensure that the split ratio is within the specified range
      if (newValue < this.minSplit) {
        this.split = this.minSplit
      } else if (newValue > this.maxSplit) {
        this.split = this.maxSplit
      }
    },
  },
}
</script>

<style>
#screen::-webkit-scrollbar {
  display: none;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.colo_red {
  color: #ff0000;
}

.demo-split {
  /* height: 400px; */
  border: 1px solid #dcdee2;
}
</style>
