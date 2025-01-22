<template>
  <v-app>
    <v-app-bar
      v-if="token || tokenShow"
      style="z-index: 100"
      flat
      clipped-left
      fixed
      app
    >
      <div class="text-center">
        <v-dialog v-model="dialog" width="300">
          <v-card class="text-center">
            <v-icon class="mt-4" color="yellow" size="55"
              >mdi-alert-circle-outline</v-icon
            >
            <v-card-text class="text-h8 a text-center">
              <h4 class="custom-font">
                {{ en ? 'ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ?' : 'Are you leaving?' }}
              </h4>
              <p class="custom-font">
                {{
                  en
                    ? 'ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອອກຈາກລະບົບ? ຂໍ້ມູນທັງຫມົດທີ່ບໍ່ໄດ້ບັນທຶກໄວ້ຂອງທ່ານຈະສູນເສຍ.'
                    : 'Are you sure want to log out ? All your unsaved data will bet lost.'
                }}
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn
                  class="custom-font"
                  color="error"
                  text
                  @click="dialog = false"
                >
                  {{ en ? 'ຍົກເລີກ' : 'cancel' }}
                </v-btn>
                <v-btn class="custom-font" color="yellow" @click="logOut">
                  {{ en ? 'ອອກຈາກລະບົບ' : 'Getout' }}
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-col cols="12" class="px-0">
        <v-row>
          <v-col
            :cols="show ? 2 : 4"
            align="center"
            justify="center"
            @mouseleave="colortext = false"
            @click="$router.push('/')"
          >
            <!-- <v-col class="px-0"> -->
            <v-list-item class="px-0">
              <v-btn
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
              >
                <v-card-actions class="pa-0">
                  <v-img
                    class="pa-0"
                    width="45px"
                    style="border-radius: 50%"
                    :src="image"
                  />
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @click="toggleItemStatus('/')"
              >
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0 custom-cursor"> TPLUS </v-card-text>
                </v-card-actions>
              </v-btn>
            </v-list-item>
          </v-col>
          <v-col :cols="show ? 1 : 2" class="px-0 text-center">
            <v-btn
              height="100%"
              width="100%"
              class="pa-0"
              text
              style="background-color: transparent; color: transparent"
              @click="openMenuItem('website')"
            >
              <v-card-actions class="pa-0">
                <v-card-text class="custom-font custom-cursor">
                  <v-icon style="bottom: 2px"> mdi-web-sync </v-icon>
                  {{ en ? 'ເວັບໄຊທ໌' : 'Web' }}
                </v-card-text>
              </v-card-actions>
            </v-btn>
          </v-col>
          <v-col :cols="show ? 1 : 2" class="px-0 text-center">
            <v-btn
              height="100%"
              width="100%"
              class="pa-0"
              text
              style="background-color: transparent; color: transparent"
              @click="openMenuItem('menu')"
            >
              <v-card-actions class="pa-0">
                <v-card-text class="custom-font custom-cursor">
                  <v-icon style="bottom: 2px"> mdi-layers-triple</v-icon>
                  {{ en ? 'ເມນູ' : 'Menu' }}
                </v-card-text>
              </v-card-actions>
            </v-btn>
          </v-col>
          <v-col cols="8" v-if="show" class="text-right">
            <v-card-text class="pa-0 text-right">
              <v-tooltip bottom class="px-4">
                <template #activator="{ on, attrs }">
                  <v-btn
                    height="100%"
                    class="pa-0"
                    text
                    v-bind="attrs"
                    v-on="on"
                    style="background-color: transparent; color: transparent"
                    @mouseenter="startTimer"
                    @mouseleave="clearTimer"
                    @click="toggleItemStatus('/pagetable')"
                  >
                    <v-card-actions class="pa-0">
                      <v-card-text class="custom-font custom-cursor">
                        {{ en ? 'ເບີ່ງ TICKET' : 'view TICKET' }}
                      </v-card-text>
                    </v-card-actions>
                  </v-btn>
                </template>
                <span class="tooltip custom-font" ref="tooltip">{{
                  en
                    ? 'ເບີ່ງ ຫຼື ດາວໂຫຼດໄຟລ໌ TICKET'
                    : 'View or Download TICKET File'
                }}</span>
              </v-tooltip>
              <v-btn
                height="100%"
                text
                style="background-color: transparent; color: transparent"
                @click="openLinkInNewTab(link[0])"
              >
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0 custom-font custom-cursor">
                    {{ en ? 'ກ່ຽວກັບພອກເຮົາ' : 'about us' }}
                  </v-card-text>
                </v-card-actions>
              </v-btn>

              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @click="toggleItemStatus('/chart/pagewhatsapp')"
              >
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0 custom-font custom-cursor">
                    {{ en ? 'ສົ່ງຂໍ້ຄວາມ' : 'messages' }}
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @click="openLinkInNewTab(link[1])"
              >
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0 custom-font custom-cursor">
                    {{ en ? 'ສີນຄ້າ' : 'Products' }}
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @click="openLinkInNewTab(link[2])"
              >
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0 custom-font custom-cursor">
                    {{ en ? 'ຕິດຕໍ່ພອກເຮົາ' : 'Contact us' }}
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent; margin-left: 20px;"
                @click="dialog = true"
              >
                <v-card-text class="px-0 custom-cursor">
                  <span class="custom-font">{{
                    en ? 'ອອກຈາກລະບົບ' : 'Getout'
                  }}</span
                  ><v-icon>mdi-exit-to-app</v-icon>
                </v-card-text>
              </v-btn>
            </v-card-text>
          </v-col>
          <v-col cols="4" v-else>
            <v-card-text class="pa-0 text-right">
              <v-menu transition="slide-y-transition" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    height="100%"
                    class="pa-0"
                    text
                    v-bind="attrs"
                    v-on="on"
                    style="background-color: transparent; color: transparent"
                  >
                    <v-card-actions class="pa-0">
                      <v-card-text
                        class="custom-cursor"
                      >
                        <v-icon>mdi-menu</v-icon>
                      </v-card-text>
                    </v-card-actions>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in menu" :key="index">
                    <v-btn
                      height="100%"
                      class="pa-0"
                      text
                      style="background-color: transparent; color: transparent"
                      @click="
                        index === 0 || index === 2
                          ? index === 0
                            ? $router.push('/pagetable')
                            : $router.push('/chart/pagewhatsapp')
                          : openLinkInNewTab(link[index])
                      "
                    >
                      <v-list-item-title
                        class="custom-cursor"
                      >
                        {{ item.title }}
                        <v-divider
                          style="background-color: #804d00"
                        ></v-divider>
                      </v-list-item-title>
                    </v-btn>
                  </v-list-item>
                  <v-list-item class="text-right">
                    <v-btn
                      height="100%"
                      class="pa-0"
                      text
                      style="background-color: transparent; color: transparent"
                      @click="dialog = true"
                    >
                      <v-list-item-title
                        class="custom-cursor"
                      >
                        <span class="custom-font">{{
                          en ? 'ອອກຈາກລະບົບ' : 'Getout'
                        }}</span
                        ><v-icon>mdi-exit-to-app</v-icon>
                      </v-list-item-title>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>
      <!-- Sta baton Search -->
    </v-app-bar>
    <v-main>
      <v-card
        v-if="website"
        class="rounded-0"
        style="
          position: fixed;
          z-index: 100;
          background-color: rgb(255, 255, 230);
        "
        @mouseleave="openMenuItem('website')"
      >
        <pageWebsite />
      </v-card>
      <div
        v-if="imenu"
        class="rounded-0 pa-0"
        style="
          position: fixed;
          z-index: 100;
          background-color: rgb(255, 255, 230);
          margin-left: 18%;
        "
      >
        <v-card
          flat
          class="BK_color pb-2"
          min-height="150"
          width="300"
          @mouseleave="openMenuItem('menu')"
        >
          <v-card-title class="py-2 custom-font"
            >{{ en ? 'ເມນູ' : 'Menu' }}
          </v-card-title>
          <v-divider></v-divider>
          <div v-for="(item, index) in pageMenu" :key="index">
            <v-btn
              class="pa-0 rounded-0"
              :text="colortext === 'CRM' + index ? false : true"
              width="100%"
              style="background-color: transparent; color: transparent"
              @click="toggleItemStatus(item.path)"
              @mouseenter="colortext = 'CRM' + index"
              @mouseleave="colortext = false"
            >
              <v-card-text
                class="px-4 py-0 rounded-0"
                width="100%"
                :style="{
                  color: colortext === 'CRM' + index ? '#804d00' : '#000',
                }"
              >
                <v-card-actions class="pa-0 ma-0" width="100%">
                  <v-icon style="bottom: 2px" size="20">{{ item.icon }}</v-icon
                  >&nbsp;
                  <span class="custom-font">{{
                    en ? item.nameLa : item.nameEn
                  }}</span>
                </v-card-actions>
              </v-card-text>
            </v-btn>
            <v-divider></v-divider>
          </div>
        </v-card>
      </div>
      <v-divider style="background-color: #804d00"></v-divider>
      <v-card-text
        class="text-left pa-2"
        style="position: fixed; z-index: 150; bottom: 0px; left: 0px"
      >
        <Tooltip
          placement="top"
          :content="en ? 'Lao to English' : 'English to Lao'"
          :delay="600"
        >
          <Button class="language-button custom-font" @click="toggleLanguage">{{
            en ? 'ລາວ' : 'English'
          }}</Button>
        </Tooltip>
        <!-- <Tooltip v-else placement="top" content="Lao to English" :delay="600">
          <Button class="language-button " @click="toggleLanguage"></Button>
        </Tooltip> -->
      </v-card-text>
      <Nuxt />
    </v-main>
    <v-footer
      v-if="token || tokenShow"
      padless
      style="background-color: #804d00"
    >
      <v-card
        flat
        tile
        class="white--text text-center"
        style="background-color: #000"
      >
        <v-card-text>
          <v-btn
            :style="{ backgroundColor: item.backgroundColor }"
            v-for="item in icons"
            :key="item.icon"
            class="mx-4 white--text"
            icon
            @click="openLinkInNewTab(item.link)"
          >
            <v-icon :color="item.color" size="34px">{{ item.icon }}</v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          <span style="color: #804d00"> TPLUS</span> Digital Sole Co, Ltd
          formerly known as VimpelcomLao Co, Ltd. officially on July, 13, 2019
          announced as <span style="color: #804d00"> TPLUS</span> Digital Co,
          Ltd is one of the world’s largest integrated telecommunications
          services operators providing voice and data services through a range
          of traditional and broadband mobile and fixed technologies and TPLUS
          Digital Co, Ltd 100 % is owned by the Telecommunication Public Company
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import pageWebsite from '~/components/pageWebsite.vue'
export default {
  Currency: 'components',
  components: {
    pageWebsite,
  },
  name: 'DefaultLayout',
  data() {
    return {
      en: this.$store.state.en,
      show: true,
      dialog: false,
      website: false,
      imenu: false,
      pageMenu: [
        {
          nameEn: 'CRM',
          nameLa: 'CRM',
          icon: 'mdi-monitor-screenshot',
          path: '../one_million',
        },
        {
          nameEn: 'Check The Number.',
          nameLa: 'ກອດຂໍ້ມູນເບີໂທ.',
          icon: 'mdi-card-account-phone-outline',
          path: '../money3K',
        },
        {
          nameEn: 'Export File',
          nameLa: 'ດາວໂຫຼດ ໄຟຮ',
          icon: 'mdi-file-move',
          path: '../exportExcelfile',
        },
      ],
      menu: [
        { title: 'Ticket' },
        { title: 'Contact us' },
        { title: 'Message ' },
        { title: 'Products' },
        { title: 'Contact us' },
      ],
      link: [
        'https://tplus.la/tplus/about-us',
        'https://tplus.la/new-number/sim/',
        '',
        'https://tplus.la/help',
      ],
      icons: [
        {
          icon: 'mdi-facebook',
          backgroundColor: 'blue',
          title: 'Welcome',
          link: 'https://www.facebook.com/TPLUSLAO',
          color: '#fff',
        },
        {
          icon: 'mdi-youtube',
          backgroundColor: '#fff',
          title: 'Welcome',
          link: 'https://www.youtube.com/channel/UCrP6L5Pnwy6Fvcl3MsvW4Dg',
          color: '#e60000',
        },
        {
          icon: 'mdi-instagram',
          backgroundColor: '#ff33cc',
          color: '#fff',
          title: 'Welcome',
          link: 'https://www.instagram.com/tpluslao/?hl=en',
        },
      ],
      colortext: false,
      image: 'https://api.tplus.la/images/defaultTplusLogo.jpg', // ~/static/Tpluslogo.png
      items: [
        {
          img: 'https://api.tplus.la/images/defaultTplusLogo.jpg',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      mini: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      tooltipTimer: null,
    }
  },
  computed: {
    token() {
      if (this.$route.path === '/login/login') {
        return this.$auth.strategy.token.reset()
      } else {
        // Return the token without resetting it for other routes
        return this.$auth.strategy.token.get()
      }
    },
    tokenShow() {
      return this.$store.state.tokenShow
    },
  },
  mounted() {
    this.updateShowProperty()
    window.addEventListener('resize', this.updateShowProperty)
  },
  methods: {
    toggleLanguage() {
      this.en = !this.en
      this.$store.commit('setLanguage', this.en)
    },
    openMenuItem(item) {
      if (item === 'menu') {
        this.website = false
        this.imenu = !this.imenu
      } else {
        this.imenu = false
        this.website = !this.website
      }
    },
    toggleItemStatus(ToPath) {
      this.$router.push({
        path: ToPath,
      })
      this.website = false
      this.imenu = false
    },
    logOut() {
      this.dialog = false
      this.$auth.strategy.token.reset()
      this.$store.commit('setToken', false)
      this.$router.push('/login/login')
      this.$auth.logout()
    },
    openLinkInNewTab(link) {
      window.open(link, '_blank')
    },
    startTimer() {
      this.colortext = 'number'
      this.tooltipTimer = setTimeout(() => {
        this.$refs.tooltip.classList.add('visible')
      }, 700)
    },
    clearTimer() {
      this.colortext = false
      clearTimeout(this.tooltipTimer)
      this.$refs.tooltip.classList.remove('visible')
    },
    updateShowProperty() {
      this.show = window.innerWidth > 1200
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateShowProperty)
  },
}
</script>
<style scoped>
.tooltip {
  display: none;
}

.tooltip.visible {
  display: inline-block;
}

@media only screen and (max-width: 1200px) {
  .grid {
    display: none;
  }

  :root {
    --show-value: false;
  }
}

.grid {
  display: var(--show-value, grid);
}
.BK_color {
  background-color: rgb(242, 242, 242);
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.language-button {
  color: none;
}

.language-button:hover {
  background-color: #ffd633;
  color: #333333;
}
.custom-cursor {
  color: #000;
}
.custom-cursor:hover {
  cursor: pointer;
  color: #804d00;
}
</style>
