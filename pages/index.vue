<template>
  <div>
    <v-window v-model="onboarding">
      <v-window-item v-for="item in image" :key="`card-${item}`">
        <v-col cols="12">
          <v-card
            @mouseenter="stopAutoSlide"
            @mouseleave="startAutoSlide"
            style="height: 100%; width: 100%"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                style="
                  max-height: 450px;
                  min-height: 450px;
                  background-color: #fff;
                "
                :src="item"
              >
                <v-card-actions
                  style="height: 100%; width: 100%"
                  class="justify-space-between"
                >
                  <v-btn class="custom-btn" disable-ripple text @click="prev">
                    <v-icon color="#FFFF" size="55">mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-item-group
                    style="height: 100%"
                    v-model="onboarding"
                    mandatory
                  >
                    <v-item
                      style="top: 94%"
                      v-for="item in image"
                      :key="`card-${item}`"
                      v-slot="{ active, toggle }"
                    >
                      <v-btn
                        class="mx-1 custom-minus"
                        :input-value="active"
                        icon
                        @click="toggle"
                        disable-ripple
                      >
                        <v-icon color="#fff" size="55">mdi-minus</v-icon>
                      </v-btn>
                    </v-item>
                  </v-item-group>
                  <v-btn
                    @mouseenter="colorIcon"
                    @mouseleave="colorIcon"
                    style="
                      height: 100%;
                      width: 15%;
                      background-color: transparent;
                      box-shadow: none;
                      border: none;
                      color: transparent;
                    "
                    disable-ripple
                    text
                    @click="next(item)"
                  >
                    <v-icon size="55" :color="color">mdi-chevron-right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-img>
            </v-row>
          </v-card>
        </v-col>
      </v-window-item>
    </v-window>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-col>
            <v-img
              style="height: 100%; width: 100%; border-radius: 20px"
              :src="imageabout"
            />
          </v-col>
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <v-col>
            <v-card-text>
              <v-card
                flat
                class="text-center d-flex align-center"
                style="height: 100%; text-align: center"
              >
                <v-card-text class="px-0">
                  <v-card-text class="px-0" style="width: 100%; top: 20%">
                    <h1 class="#ffff00">TPLUS APPLICATION</h1>
                    <br />
                    <v-card-text class="pa-0" style="color: #735f5f">
                      1K view of customer relationship
                    </v-card-text>
                    <p>
                      Customers are able to view all their relationships with
                      the TPLUS. Beeline Group's target group packaging
                      information and scheduled management procedures
                    </p>
                    <v-btn
                      @mouseenter="setOutlined('button1')"
                      @mouseleave="detOutlined(true)"
                      color="#ffff00"
                      :outlined="show === 'button1' ? false : true"
                      :style="{ boxShadow: show ? 'none' : '0' }"
                      @click="openLinkInNewTab(link[4])"
                    >
                      See More
                    </v-btn>
                  </v-card-text>
                  <v-btn
                    @click="openLinkInNewTab(link[1])"
                    class="ma-1"
                    style="width: 126px; height: 40px"
                  >
                    <v-img
                      src="https://iblaos.com/iblaos/image/personal/ib_cool/Appstore.png"
                      style="width: 130px; height: 40px"
                    />
                  </v-btn>
                  <v-btn
                    @click="openLinkInNewTab(link[0])"
                    class="ma-1"
                    style="width: 126px; height: 40px"
                  >
                    <v-img
                      src="https://iblaos.com/iblaos/image/personal/ib_cool/Google_Play.png"
                      style="width: 132px; height: 40px; object-fit: cover"
                    />
                  </v-btn>
                  <v-btn
                    @click="openLinkInNewTab(link[0])"
                    class="ma-1"
                    style="width: 126px; height: 40px"
                  >
                    <v-img
                      src="https://iblaos.com/iblaos/image/personal/ib_cool/AppGallery.png"
                      style="width: 130px; height: 40px; object-fit: cover"
                    />
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
    <v-img
      height="450px"
      gradient="to top right, rgba(0,0,0,0.7), rgba(0,0,0,0.7)"
      src="https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-6/334105025_962924015083673_5923475944932159423_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF9u1gXNMg7lY3mQaa-n5DFzfyfG5x7yMDN_J8bnHvIwM3DC5e6dKd9d3MR2oVbmrqJpuygZC1pVUbUVBLyoEOH&_nc_ohc=XStMk_qKkwoAX8HivxO&_nc_ht=scontent.fvte2-1.fna&oh=00_AfDDgnFsJdYUGJkm9KrRJBzuWO-Zbrp5Bbi3B_F_Y_5O_Q&oe=656A3055"
    >
      <v-container style="height: 100%" class="py-center">
        <v-row
          justify="center"
          align="center"
          class="ma-0"
          style="height: 100%"
        >
          <v-col cols="12" sm="6">
            <v-card-text>
              <v-card-title>
                <div style="color: rgb(255, 255, 255)">
                  If any customer has an old top-up card or an old
                  <span style="color: #ffff00">Beeline </span> SIM card, please
                  come and change it to a new<span style="color: #ffff00">
                    TPLUS </span
                  >SIM card at the customer service center nationwide.
                </div>
              </v-card-title>
              <v-card-text>
                <p style="color: aliceblue">
                  <span
                    :style="{ color: show === 'button3' ? '#ffff00' : '#fff' }"
                  >
                    New package
                  </span>
                </p>
                <v-btn
                  @mouseenter="setOutlined('button3')"
                  @mouseleave="detOutlined(true)"
                  color="#ffff00"
                  :outlined="show === 'button3' ? false : true"
                  :style="{ boxShadow: show ? 'none' : '0' }"
                  @click="openLinkInNewTab(link[3])"
                >
                  See More
                </v-btn>
              </v-card-text>
            </v-card-text>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            class="my-auto"
            align="center"
            justify="center"
          >
            <v-window v-model="onboarding1" justify="center">
              <v-window-item v-for="item in image1" :key="`card-${item}`">
                <v-col>
                  <v-card
                    style="height: 100%; border-radius: 5%"
                    @mouseenter="stopAutoSlide"
                    @mouseleave="startAutoSlide"
                    color="grey"
                  >
                    <v-row>
                      <v-img
                        style="height: 100%; width: 100%; border-radius: 4%"
                        :src="item"
                      />
                    </v-row>
                  </v-card>
                </v-col>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
      <v-row>
        <v-col cols="12" sm="6"></v-col>
        <v-col cols="12" sm="6"> </v-col>
      </v-row>
    </v-img>

    <v-card-text class="px-0">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-hover v-slot="{ hover }" open-delay="50">
              <v-card
                outlined
                :elevation="hover ? 14 : 0"
                min-height="300px"
                max-width="100%"
                class="pb-2"
              >
                <v-parallax height="300" :src="imagenumber"></v-parallax>
                <!-- <v-img
                  style="max-width: 100%; max-height: 350px"
                  :src="imagenumber"
                /> -->
                <v-card-text>
                  <v-card-title class="pa-0">
                    We are ready to provide configuration instructions to
                    support the <span style="color: #ffff00">4.5G</span> signal
                    in the device again.
                  </v-card-title>
                  <v-card-text class="px-0 pb-0">
                    The number is limited. Anyone who is interested, hurry up to
                    order
                  </v-card-text>
                  <v-btn
                    class="my-2"
                    @mouseenter="setOutlined('button4')"
                    @mouseleave="detOutlined(true)"
                    color="#ffff00"
                    :outlined="show === 'button4' ? false : true"
                    :style="{ boxShadow: show ? 'none' : '0' }"
                    @click="openLinkInNewTab(link[5])"
                  >
                    All SIM Cards
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  data() {
    return {
      link: [
        'https://onelink.to/py4z9c',
        'http://bit.ly/BeelineApp-iOS', // [1 ios app]
        'https://tplus.la/', // [2 website Tplus ]
        'https://tplus.la/packages/category-post/1', // [3 package ]
        'https://www.facebook.com/138074166214254/posts/1591513930870263/', // [4 rivew app]
        'https://tplus.la/new-number/sim/', // [5 number tplus]
      ],
      imagenumber: 'https://i.ytimg.com/vi/bRtr3v5Ofi4/maxresdefault.jpg', // image sim number
      imagepackage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyOcMXYtN_feot25XrNfZMHoiQiCDSTixHd9bi46BvOb5qxTGEU9_EqvQE0c6nuL2OW74&usqp=CAU',
      imageabout:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyOcMXYtN_feot25XrNfZMHoiQiCDSTixHd9bi46BvOb5qxTGEU9_EqvQE0c6nuL2OW74&usqp=CAU',
      show: true,
      onboarding: 0,
      onboarding1: 0,
      image: [
        'https://laotiantimes.com/wp-content/uploads/2021/01/WhatsApp-Image-2021-01-29-at-16.52.06.jpeg',
        'https://laotiantimes.com/wp-content/uploads/2022/06/Minion-EN-news.jpg',
        'https://i.ytimg.com/vi/51MPGqpsSyU/maxresdefault.jpg',
      ],
      image1: [
        'https://pbs.twimg.com/media/Edh8TaRUcAY1LtX?format=jpg&name=large',
        'https://pbs.twimg.com/media/Edh8TaTUcAEqcND?format=jpg&name=large',
        'https://pbs.twimg.com/media/Edh8TaTU4AAs_BR?format=jpg&name=large',
        'https://pbs.twimg.com/media/Edh8TaSVAAAEhyX?format=jpg&name=large',
      ],
    }
  },
  computed: {
    length() {
      return this.image.length
    },
    length1() {
      return this.image1.length1
    },
  },
  methods: {
    // logout(){
    //   if (!this.$store.state.token){
    //     this.$router.push('/login/login');
    //   }
    // },
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    },
    next1() {
      this.onboarding1 =
        this.onboarding1 + 1 === this.length1 ? 0 : this.onboarding1 + 1
    },
    prev1() {
      this.onboarding1 =
        this.onboarding1 - 1 < 0 ? this.length1 - 1 : this.onboarding1 - 1
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.next()
        this.next1()
      }, 4000) // Slide every 4 seconds (4000 milliseconds)
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval, this.autoSlideInterval1)
    },

    setOutlined(value) {
      this.show = value
    },
    detOutlined(value) {
      this.show = value
    },
    colorIcon() {
      if (this.color !== '#ffffff') {
        this.color = '#ffffff'
      } else {
        this.color = '#e5e5e5'
      }
    },
    openLinkInNewTab(link) {
      window.open(link, '_blank')
    },
  },
  mounted() {
    // Start automatic image slide when the component is mounted
    this.startAutoSlide()
  },
  befoestroy() {
    // Stop automatic image slide when the component is destroyed
    this.stopAutoSlide()
  },
}
</script>
<style scoped>
.color_background_btn {
  background-color: #fff;
  color: #fff;
}

.font_display {
  font-family: 'Inter', sans-serif;
}

.title_color {
  color: #fff;
}
.custom-btn {
  height: 100%;
  width: 15%;
  background-color: transparent;
  box-shadow: none;
  border: none;
  color: transparent;
}
.custom-minus {
  background-color: none;
  box-shadow: none;
  border: none;
  color: transparent;
}
</style>
