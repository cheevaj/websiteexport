<template>
  <div>
    <v-sheet
      flat
      class="mx-auto fill-height pt-0"
      style="background-color: rgb(255, 255, 240); box-shadow: inset"
    >
      <v-slide-group
        class="pt-0 px-4 pb-4 text-center"
        active-class="success"
        show-arrows
        justify="center"
      >
        <v-slide-item v-for="(item, index) in itemsss" :key="index">
          <v-card
            :outlined="buttonWeb === index ? false : true"
            :bordered="false"
            class="mt-12 mx-2 px-2 mb-2"
            style="height: 250px; width: 200px"
            @mouseenter="buttonWeb = index"
            @mouseleave="buttonWeb = false"
          >
            <div style="height: 40px">
              <v-card
                flat
                height="74px"
                width="74"
                size="avatarSize"
                style="
                  padding: 2px;
                  bottom: 40px;
                  left: 55px;
                  border-radius: 50%;
                  background-color: rgb(217, 217, 217);
                "
              >
                <v-card
                  flat
                  height="70"
                  width="70"
                  size="avatarSize"
                  style="border-radius: 50%"
                >
                  <v-img white="100%" height="100%" :src="item.avatar" />
                </v-card>
              </v-card>
            </div>
            <div
              style="
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
              "
            >
              <v-card-text
                class="pb-0 pl-0 text-center"
                :class="{ 'custom-font': en }"
              >
                <h2 style="color: rgb(102, 102, 0)">
                  {{ item.title }}
                </h2>
              </v-card-text>
              <v-divider
                class="mx-4"
                style="background-color: rgb(102, 102, 0)"
              />
            </div>
            <v-card-text
              class="pt-1pb-2"
              :class="{ 'custom-font': en }"
              style="height: 100px"
            >
              {{ truncateText(item.subtitle, 60) }}
            </v-card-text>
            <v-btn
              class="mt-2"
              :class="{ 'custom-font': en }"
              :outlined="buttonWeb === index ? false : true"
              style="color: rgb(230, 230, 0)"
              :style="{
                backgroundColor: buttonWeb === index ? '#000' : '#ffff',
              }"
              @click="openLinkInNewTab(item.link)"
            >
              {{ en ? 'ເຂົ້າລະບົບ' : 'Login' }}
            </v-btn>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonWeb: false,
    }
  },
  computed: {
    en() {
      return this.$store.state.en
    },
    itemsss() {
      return [
        {
          avatar: 'https://tplus.la/Black-Tplus-logo.png',
          title: 'MyCCare Web',
          subtitle: this.en
            ? 'TPLUS ໄດ້ຮັບການພັດທະນາແລະຍັງຄົງເປັນສ່ວນຫນຶ່ງທີ່ສໍາຄັນຂອງ VimpelCom.'
            : 'TPLUS has been developed and remains an important part of VimpelCom.',
          link: 'http://10.30.6.94:7878/Replaceisdn/index.php',
        },
        {
          avatar:
            'https://tse4.mm.bing.net/th?id=OIP.Es4Sc4gJqjV7Lh9BDs21WwHaEK&pid=Api&P=0&h=220',
          title: 'Vas Service',
          subtitle: this.en
            ? 'TPLUS has been developed and remains an important part of VimpelCom.'
            : 'TPLUS has been developed and remains an important part of VimpelCom.',
          link: 'http://10.30.6.94:9999/Hlred.php',
        },
        {
          avatar: '/checkSim.png',
          title: 'TPLUS',
          subtitle:
            'TPLUS has been developed and remains an important part of VimpelCom.standing of various commercial stamps',
          link: 'http://172.28.17.137:7789/Services/?mode=login',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          title: 'Check Bills',
          subtitle: this.en
            ? 'ການກວດສອບການຢືນຂອງສະແຕມການຄ້າຕ່າງໆ.'
            : 'Checking the standing of various commercial stamps.',
          link: 'http://172.28.17.102:5555/cbs',
        },
        {
          avatar:
            '/queTplus.png',
          title: 'website Queue',
          subtitle: this.en
            ? "ເວັບໄຊຄິວ ສໍາລັບ C'Care."
            : "website Queue of C'Care.",
          link: 'http://172.28.17.102:3334',
        },
      ]
    },
  },
  methods: {
    openLinkInNewTab(link) {
      window.open(link, '_blank')
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },
  },
}
</script>

<style>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
