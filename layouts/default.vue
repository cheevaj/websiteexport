<template>
  <v-app>
    <v-app-bar v-if="token || tokenShow" style="z-index: 100" flat clipped-left fixed app>
      <div class="text-center">
        <v-dialog v-model="dialog" width="300">
          <v-card class="text-center">
            <v-icon class="mt-4" color="yellow" size="55">mdi-alert-circle-outline</v-icon>
            <v-card-text class="text-h8 a text-center">
              <h4>
                Are you leaving?
              </h4>
              <p>
                Are you sure want to log out ? All your unsaved data will bet lost.
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn color="error" text @click="dialog = false">
                  cancel
                </v-btn>
                <v-btn color="yellow" @click="logOut">
                  Getout
                </v-btn>
              </v-card-actions>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-col cols="12" class="px-0">
        <v-row>
          <v-col :cols="show ? 2 : 4" align="center" justify="center" @mouseleave="colortext = false"
            @click="$router.push('/')">
            <!-- <v-col class="px-0"> -->
            <v-list-item class="px-0">
              <v-btn class="pa-0" text style="background-color: transparent; color: transparent">
                <v-card-actions class="pa-0">
                  <v-img class="pa-0" width="45px" style="border-radius: 50%" :src="image" />
                </v-card-actions>
              </v-btn>
              <v-btn height="100%" @mouseenter="colortext = 'tplus'" class="pa-0" text
                style="background-color: transparent; color: transparent" @click="$router.push('/')">
                <v-card-actions class="pa-0">
                  <v-card-text class="px-0" :style="{ color: colortext === 'tplus' ? '#ffff00' : '#000' }">
                    TPLUS
                  </v-card-text>
                </v-card-actions>
              </v-btn>
            </v-list-item>
          </v-col>
          <v-col :cols="show ? 1 : 2" class="px-0 text-center" @mouseleave="colortext = false">
            <v-btn height="100%" width="100%" class="pa-0" text
              style="background-color: transparent; color: transparent" @mouseenter="colortext = 'web'"
              @click="website = !website">
              <v-card-actions class="pa-0">
                <v-card-text :style="{ color: colortext === 'web' ? '#ffff00' : '#000' }">
                  <v-icon style="bottom: 2px"> mdi-web-sync </v-icon>
                  Web
                </v-card-text>
              </v-card-actions>
            </v-btn>
          </v-col>
          <v-col :cols="show ? 1 : 2" class="px-0 text-center" @mouseleave="colortext = false">
            <v-btn height="100%" width="100%" class="pa-0" text
              style="background-color: transparent; color: transparent" @mouseenter="colortext = 'MenuAll'"
              @click="$router.push('../one_million')">
              <v-card-actions class="pa-0">
                <v-card-text :style="{ color: colortext === 'MenuAll' ? '#ffff00' : '#000' }">
                  <v-icon style="bottom: 2px"> mdi-layers-triple</v-icon>
                  Menu
                </v-card-text>
              </v-card-actions>
            </v-btn>
          </v-col>
          <v-col cols="8" v-if="show" class="text-right" @mouseleave="colortext = false">
            <v-card-text class="pa-0 text-right">
              <v-tooltip bottom class="px-4">
                <template #activator="{ on, attrs }">
                  <v-btn height="100%" class="pa-0" text v-bind="attrs" v-on="on"
                    style="background-color: transparent; color: transparent" @mouseenter="startTimer"
                    @mouseleave="clearTimer" @click="$router.push('/pagetable')">
                    <v-card-actions class="pa-0">
                      <v-card-text :style="{ color: colortext === 'number' ? '#ffff00' : '#000' }">
                        view TICKET
                      </v-card-text>
                    </v-card-actions>
                  </v-btn>
                </template>
                <span class="tooltip" ref="tooltip">View or Download TICKET File</span>
              </v-tooltip>
              <v-btn height="100%" text style="background-color: transparent; color: transparent"
                @click="openLinkInNewTab(link[0])" @mouseenter="colortext = 'about'" @mouseleave="colortext = false">
                <v-card-actions class="pa-0">
                  <v-card-text :style="{ color: colortext === 'about' ? '#ffff00' : '#000' }">
                    about us
                  </v-card-text>
                </v-card-actions>
              </v-btn>

              <v-btn height="100%" class="pa-0" text style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'message'" @click="$router.push('/chart/pagewhatsapp')">
                <v-card-actions class="pa-0">
                  <v-card-text :style="{ color: colortext === 'message' ? '#ffff00' : '#000' }">
                    messages
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn height="100%" class="pa-0" text style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'product'" @click="openLinkInNewTab(link[1])">
                <v-card-actions class="pa-0">
                  <v-card-text :style="{ color: colortext === 'product' ? '#ffff00' : '#000' }">
                    Products
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn height="100%" class="pa-0" text style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'services'" @click="openLinkInNewTab(link[2])">
                <v-card-actions class="pa-0">
                  <v-card-text :style="{ color: colortext === 'services' ? '#ffff00' : '#000' }">
                    Contact us
                  </v-card-text>
                </v-card-actions>
              </v-btn>
              <v-btn height="100%" class="pa-0 pl-12" text style="background-color: transparent; color: transparent"
                @mouseenter="colortext = 'logout'" @click="dialog = true">
                <v-card-text :style="{ color: colortext === 'logout' ? '#ffff00' : '#000', }">
                  <span>Getout</span><v-icon>mdi-exit-to-app</v-icon>
                </v-card-text>
              </v-btn>
            </v-card-text>
          </v-col>
          <v-col cols="4" v-else>
            <v-card-text class="pa-0 text-right ">
              <v-menu transition="slide-y-transition" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn height="100%" class="pa-0" text v-bind="attrs" v-on="on"
                    style="background-color: transparent; color: transparent" @mouseenter="colortext = 'menu'"
                    @mouseleave="colortext = false">
                    <v-card-actions class="pa-0">
                      <v-card-text :style="{ color: colortext === 'menu' ? '#ffff00' : '#000' }">
                        <v-icon>mdi-menu</v-icon>
                      </v-card-text>
                    </v-card-actions>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(item, index) in menu" :key="index">
                    <v-btn height="100%" class="pa-0" text style="background-color: transparent; color: transparent"
                      @mouseenter="colortext = 'menu' + index" @mouseleave="colortext = false"
                      @click=" (index === 0 || index === 2) ? index === 0 ? $router.push('/pagetable') : $router.push('/chart/pagewhatsapp') : openLinkInNewTab(link[index])">
                      <v-list-item-title style="color: #000;"
                        :style="{ color: colortext === 'menu' + index ? '#ffff00' : '#000' }">
                        {{ item.title }}
                        <v-divider style="background-color: #ffff00;"></v-divider>
                      </v-list-item-title>
                    </v-btn>
                  </v-list-item>
                  <v-list-item class="text-right">
                    <v-btn height="100%" class="pa-0" text style="background-color: transparent; color: transparent"
                      @mouseenter="colortext = 'logout'" @mouseleave="colortext = false" @click="dialog = true">
                      <v-list-item-title style="color: #000;"
                        :style="{ color: colortext === 'logout' ? '#ffff00' : '#000' }">
                        <span>Getout</span><v-icon>mdi-exit-to-app</v-icon>
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
      <v-card v-if="website" class="rounded-0"
        style="position: fixed; z-index: 100; background-color: rgb(255, 255, 230);">
        <div>
          <!-- <v-card-actions class="pa-0"> -->
          <!-- <v-card-text class="py-0 px-4 "><h3>Website of TPLUS</h3></v-card-text> -->
          <v-card-text class="py-0 pr-8 pl-0 text-right"><v-btn @click="website = !website" fab x-small text
              style="position: fixed; z-index: 100;">
              <v-icon size="25">mdi-close-circle</v-icon>
            </v-btn></v-card-text>
          <!-- </v-card-actions> -->
        </div>
        <pageWebsite />
      </v-card>
      <v-divider style="background-color: #ffff00"></v-divider>
      <Nuxt />
    </v-main>
    <v-footer v-if="token || tokenShow" padless style="background-color: #ffff00">
      <v-card flat tile class="white--text text-center" style="background-color: #000">
        <v-card-text>
          <v-btn :style="{ backgroundColor: item.backgroundColor }" v-for="item in icons" :key="item.icon"
            class="mx-4 white--text" icon @click="openLinkInNewTab(item.link)">
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
import pageWebsite from '~/components/pageWebsite.vue';
export default {
  Currency: 'components',
  components: {
    pageWebsite,
  },
  name: 'DefaultLayout',
  data() {
    return {
      selectedItem: 1,
      show: true,
      dialog: false,
      website: false,
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
        return this.$auth.strategy.token.reset();
      } else {
        // Return the token without resetting it for other routes
        return this.$auth.strategy.token.get();
      }
    },
    tokenShow() {
      return this.$store.state.tokenShow;
    },
  },
  mounted() {
    // Update 'show' property on component mount
    this.updateShowProperty();
    // console.log('hi', this.token)
    // Listen for window resize events and update 'show' property accordingly
    window.addEventListener('resize', this.updateShowProperty);
  },
  methods: {
    logOut() {
      this.dialog = false;
      this.$auth.strategy.token.reset();
      this.$store.commit('setToken', false);
      this.$router.push('/login/login');
      this.$auth.logout();
    },
    openLinkInNewTab(link) {
      window.open(link, '_blank')
    },
    startTimer() {
      this.colortext = 'number'
      this.tooltipTimer = setTimeout(() => {
        this.$refs.tooltip.classList.add('visible') // Add a class to make the tooltip visible
      }, 700) // 2000 milliseconds = 2 seconds
    },
    clearTimer() {
      this.colortext = false
      clearTimeout(this.tooltipTimer)
      this.$refs.tooltip.classList.remove('visible') // Remove the class to hide the tooltip
    },
    updateShowProperty() {
      // Update 'show' property based on window width
      this.show = window.innerWidth > 1200;
    }
  },
  beforeDestroy() {
    // Remove the window resize event listener to prevent memory leaks
    window.removeEventListener('resize', this.updateShowProperty);
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

  /* Update the 'show' property to false for screen width less than or equal to 1600px */
  :root {
    --show-value: false;
  }
}

/* Use the custom property to set the 'show' property */
.grid {
  display: var(--show-value, grid);
}
</style>
