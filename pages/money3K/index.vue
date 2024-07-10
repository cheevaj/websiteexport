<template>
  <div>
    <v-card-actions style="background-color: rgb(255, 255, 128)">
      <v-btn
        fab
        x-small
        text
        style="background-color: #000"
        @click="$router.go(-1)"
      >
        <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <h2 class="text-center custom-font">{{ en ? 'ລາຍການຂໍ້ມູນ' : 'List Menu'}}</h2>
      <v-spacer />
      <div></div>
    </v-card-actions>
    <div
      class="pa-12"
      flat
      style="
        height: calc(100vh - 14vh);
        background-color: rgb(255, 255, 204);
        box-shadow: inset;
      "
    >
      <v-row
        class="text-center"
        active-class="success"
        show-arrows
        :justify="
          Object.keys(items_menu).length % 4 === 0 
            ? 'center'
            : 'start'
        "
      >
        <v-col
          cols="12"
          xs="12"
          sm="4"
          md="3"
          lg="3"
          xl="3"
          v-for="(item, index) in items_menu"
          :key="index"
          class="px-2 mb-6"
        >
          <!--col-custom-->
          <v-card
            :outlined="buttonWeb === index ? false : true"
            :bordered="false"
            class="mouse_senter"
            style="
              color: transparent;
              border-top-left-radius: 50px;
              border-bottom-left-radius: 50px;
              border-top-right-radius: 10px;
              border-bottom-right-radius: 10px;
              border: 2px solid #808080;
            "
            @mouseenter="buttonWeb = index"
            @mouseleave="buttonWeb = false"
            @click="openLinkInNewTab(item.path)"
          >
            <v-card-actions class="pa-0">
              <div>
                <v-card
                  flat
                  height="54px"
                  width="54"
                  size="avatarSize"
                  style="
                    padding: 2px;
                    border-radius: 50%;
                    background-color: rgb(217, 217, 217);
                  "
                >
                  <v-card
                    flat
                    height="50"
                    width="50"
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
                <v-card-text class="text-center pl-2 pr-1 custom-font">
                  <h3 style="color: rgb(102, 102, 0)">
                    {{ en ? item.titleLao : item.titleEn }}
                  </h3>
                  <v-divider
                    class="mx-4"
                    style="background-color: rgb(102, 102, 0)"
                  />
                </v-card-text>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  data() {
    return {
      buttonWeb: false,
      // All website
      items_menu: [
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: 'Money Cuts Bye Soxay App',
          titleLao: 'ເງີນຖືກຕັດໂດຍແອບ Soxay',
          path: '../money3K/moneySoxayApp',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: 'Cuts Money 3000 kip',
          titleLao: 'ກອດລາຍການຕັດເງີນ 3000 ກີບ',
          path: '../money3K/cutMoney3K',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: 'History Query Packages',
          titleLao: 'History Query Packages',
          path: '../money3K/historyQueryPKages',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: "CCare's Top-up History",
          titleLao: "ປະຫວັດການເຕີມເງີນຂອງ C'Care",
          path: '../money3K/ccareCandidatePKage',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: 'Data BCEL ONE',
          titleLao: 'Data BCEL ONE',
          path: '../money3K/bcel_oneData',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn: 'Check The Price SIS.',
          titleLao: "ກອດເບີ່ງຂໍ້ມູນ ແລະ ລາຄາເບີ",
          path: '../money3K/checkPrieNumber',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn:"C'Care Register Package",
          titleLao:"ສະໝັກແພັກເກັດຜ່ານ C'Care",
          path: '../money3K/ccareRegisterPKages',
        },
        {
          avatar:
            'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          titleEn:"C'Care Register Package via counter",
          titleLao:"ລົງທະບຽນແພັກເກັດຂອງ C-Care ຜ່ານທາງເຄົາເຕີ.",
          path: '../money3K/ccareRegisterViacounter',
        },
      ],
    }
  },
  computed: {
    en() {
      return this.$store.state.en;
    },
  },
  methods: {
    openLinkInNewTab(path) {
      this.$router.push({
        path,
      })
    },
  },
}
</script>

<style>
.colorBK {
  background-color: #ffff00;
}
.mouse_senter {
  cursor: pointer;
}
.font_size_12 {
  font-size: 12px;
  /* Adjust the font size as needed */
}
.font_size_18 {
  font-size: 18px;
  /* Adjust the font size as needed */
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
