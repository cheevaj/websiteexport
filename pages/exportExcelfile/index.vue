<template>
  <div>
    <div
      style="position: relative; width: 100%; height: 250px; padding-top: 50px"
    >
      <img
        width="100%"
        height="250px"
        src="~/static/Downloads.png"
        style="display: block"
      />
      <v-btn
        fab
        x-small
        text
        style="background-color: #000; position: absolute; left: 4px; top: 4px"
        @click="$router.go(-1)"
      >
        <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div
      class="px-2 pt-12 pb-2"
      flat
      style="
        height: calc(100vh - 20vh);
        box-shadow: inset;
        background-color: rgb(255, 255, 250);
      "
    >
      <v-row
        class="text-center"
        active-class="success"
        show-arrows
        justify="center"
      >
        <v-col
          cols="12"
          xs="12"
          sm="3"
          md="2"
          lg="2"
          xl="2"
          v-for="(item, index) in items_menu"
          :key="index"
          class="pa-4 mt-6"
        >
          <v-card
            class="pa-0 my-8 text-center"
            flat
            style="
              background-color: rgb(255, 255, 230);
              height: 200px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              border: 1px solid rgb(191, 191, 191);
            "
          >
            <div style="display: flex; justify-content: center">
              <v-card
                outlined
                :elevation="buttonWeb === index ? '20' : '5'"
                :bordered="false"
                class="mouse_senter"
                style="
                  bottom: 30px;
                  width: 60px;
                  height: 60px;
                  color: transparent;
                  border-top-left-radius: 10px;
                  border-bottom-left-radius: 10px;
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                @mouseenter="buttonWeb = index"
                @mouseleave="buttonWeb = false"
                @click="openLinkInNewTab(item.path)"
              >
                <v-icon size="35" color="rgb(0, 128, 0)"
                  >mdi-file-excel-outline</v-icon
                >
              </v-card>
            </div>
            <v-card
              class="py-2 px-4"
              flat
              height="135px"
              style="bottom: 25px; background-color: rgb(255, 255, 230)"
            >
              <h3 class="custom-font" style="color: rgb(102, 102, 0)">
                {{ en ? item.titleLa : item.titleEn }}
              </h3>
              <v-divider />
              <p class="text-color custom-font">
                {{ en ? truncateText(item.textLa, 85) : truncateText(item.textEn, 85) }}
              </p>
            </v-card>
            <v-card
              flat
              style="bottom: 40px; background-color: rgb(255, 255, 230)"
            >
              <v-btn
                :outlined="button === index ? false : true"
                class="language-button"
                @click="openLinkInNewTab(item.path)"
                @mouseenter="button = index"
                @mouseleave="button = false">
                Download
              </v-btn>
            </v-card>
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
      button: false,
      buttonWeb: false,
      items_menu: [
        {
          titleEn: "History of CCare's register package for customer",
          titleLa: "ປະຫວັດ C'Care ລົງທະບຽນເເພັກເກັດໃຫ້ລູກຄ້າ.",
          path: '../exportExcelfile/ccareHistoryRegister',
          textEn: "Download report registration TelMonth of C'Care.",
          textLa: "ດາວໂຫຼດລາຍການ ການລົງທະບຽນເບີລາຍເດືອນຂອງ C'Care.",
          icon: 'mdi-file-excel-outline',
        },
        {
          titleEn: 'Monthly Number Top-up History',
          titleLa: 'ປະຫວັດການຕື່ມເງິນຂອງເບີລາຍເດືອນ',
          path: '../exportExcelfile/Top_upNumber',
          textEn: "Download history of C'Care through Bcel-One.",
          textLa: "ດາວໂຫຼດຂໍ້ມູນ ປະຫວັດການເຕີມເງືນຂອງ C'Care ຜ່ານ Bcel-One.",
          icon: 'mdi-microsoft-excel',
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
    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },
  },
}
</script>
<style scoped>
.language-button {
  background-color: #fff;
  border: 2px solid #ffff00;
  color: inherit;
  transition: background-color 0.3s ease;
}

.language-button:hover {
  background-color: #ffff00 !important;
  color: inherit !important;
}
</style>
