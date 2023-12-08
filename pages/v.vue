<template>
  <v-app>
    <v-app-bar style="z-index: 100" flat clipped-left fixed app>
      <v-col cols="12" class="px-0">
        <v-row>
          <v-col
            cols="3"
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
                @mouseenter="colortext = 'tplus'"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @click="$router.push('/')"
              >
                <v-card-actions class="pa-0">
                  <v-card-text
                    class="px-0"
                    :style="{
                      color: colortext === 'tplus' ? '#ffff00' : '#000',
                    }"
                  >
                    TPLUS
                  </v-card-text>
                </v-card-actions>
              </v-btn>
            </v-list-item>
          </v-col>
          <v-col cols="3" class="px-0">
            <v-btn
              height="100%"
              class="pa-0"
              text
              style="background-color: transparent; color: transparent"
              @mouseenter="colortext = 'web'"
              @mouseleave="colortext = false"
            >
              <v-card-actions class="pa-0">
                <v-card-text
                  :style="{
                    color: colortext === 'web' ? '#ffff00' : '#000',
                  }"
                >
                  <v-icon style="bottom: 2px"> mdi-web-sync </v-icon>
                  Web
                </v-card-text>
              </v-card-actions>
            </v-btn>
            
          </v-col>
          <v-col cols="6" class="text-right" @mouseleave="colortext = false">
            <v-card-text class="pa-0 text-right pr-12">
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'number'"
                @mouseleave="colortext = false"
                @click="$router.push('/pagetable')"
              >
                <v-card-actions class="pa-0">
                  <v-card-text
                    :style="{
                      color: colortext === 'number' ? '#ffff00' : '#000',
                    }"
                  >
                    view Number
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                text
                style="background-color: transparent; color: transparent"
                @click="openLinkInNewTab(link[0])"
                @mouseenter="colortext = 'about'"
                @mouseleave="colortext = false"
              >
                <v-card-actions class="pa-0">
                  <v-card-text
                    :style="{
                      color: colortext === 'about' ? '#ffff00' : '#000',
                    }"
                  >
                    about us
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'product'"
                @click="openLinkInNewTab(link[1])"
              >
                <v-card-actions class="pa-0">
                  <v-card-text
                    :style="{
                      color: colortext === 'product' ? '#ffff00' : '#000',
                    }"
                  >
                    Products
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn
                height="100%"
                class="pa-0"
                text
                style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'services'"
                @click="openLinkInNewTab(link[2])"
              >
                <v-card-actions class="pa-0">
                  <v-card-text
                    :style="{
                      color: colortext === 'services' ? '#ffff00' : '#000',
                    }"
                  >
                    Contact us
                  </v-card-text>
                </v-card-actions>
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>
      <!-- Sta baton Search -->
    </v-app-bar>
    <v-main>
      <v-divider style="background-color: #ffff00"></v-divider>
      <Nuxt />
    </v-main>
    <v-footer padless style="background-color: #ffff00">
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
          <span style="color: #ffff00"> TPLUS</span> Digital Sole Co, Ltd
          formerly known as VimpelcomLao Co, Ltd. officially on July, 13, 2019
          announced as <span style="color: #ffff00"> TPLUS</span> Digital Co,
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
export default {
  name: 'DefaultLayout',
  data() {
    return {
      selectedItem: 1,
      itemsweb: [
        [
        { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' },
        ],
      ],
      link: [
        'https://tplus.la/tplus/about-us',
        'https://tplus.la/new-number/sim/',
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
      image: 'https://api.tplus.la/images/defaultTplusLogo.jpg',
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
    }
  },
  methods: {
    openLinkInNewTab(link) {
      window.open(link, '_blank')
    },
  },
}
</script>
