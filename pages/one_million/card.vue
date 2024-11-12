<template>
  <div>
    <v-card-text class="pa-0">
      <Menu
        mode="horizontal"
        :active-name="selectedMenuItem"
        @on-select="handleMenuSelect"
        style="color: #804d00"
      >
        <!-- Menu Items without indicators -->
        <MenuItem name="1" class="language-button">
          <v-icon class="language-button"
            >mdi-book-open-page-variant-outline</v-icon
          >
          <span :class="{ 'custom-font': en }">{{
            en ? 'ກວດເບິ່ງ Serial' : 'Check Serial'
          }}</span>
        </MenuItem>
        <MenuItem name="2" class="language-button">
          <v-icon class="language-button">mdi-gift-outline</v-icon>
          <span :class="{ 'custom-font': en }">{{
            en ? 'ກວດເບິ່ງແຕ້ມໂຊກດີ' : 'Check Lucky Draw'
          }}</span>
        </MenuItem>
        <MenuItem name="3" class="language-button">
          <v-icon class="language-button">mdi-credit-card-check-outline</v-icon>
          <span :class="{ 'custom-font': en }">{{
            en ? 'ເລກ Pin' : 'Pin Number'
          }}</span>
        </MenuItem>

        <!-- Search form and button -->
        <v-card-actions
          class="pa-0"
          style="position: fixed; z-index: 100; right: 5px"
        >
          <form @submit.prevent="handleSearch">
            <Input
              :class="{ 'custom-font': en }"
              v-model="numberPhon"
              :placeholder="
                en
                  ? 'ກະລຸນາປ້ອມຂໍ້ມູນຂອງທ່ານ...'
                  : 'Please input your information...'
              "
              type="number"
              clearable
              style="width: 300px; height: 100%; margin-top: 0px"
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
              color:  #804d00;
              margin-top: 0px;
              margin-left: 1px;
              padding-left: 4px;
              padding-right: 4px;
            "
          >
            <h4 :class="{ 'custom-font': en }">
              {{ en ? 'ຄົ້ນຫາ' : 'Search' }}
            </h4>
          </v-btn>
        </v-card-actions>
      </Menu>
    </v-card-text>
    <v-card-text v-if="selectedMenuItem === '1'" class="pa-0" height="100%">
      <v-row>
        <v-col cols="12" class="px-0">
            <v-card
              min-width="100%"
              min-height="400"
              class="text-center"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <h3 :class="{ 'custom-font': en }">
                {{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}
              </h3>
              <br />
              <v-icon size="85" color="rgb(102, 102, 0)"
                >mdi-account-circle</v-icon
              >
              <br />
              <h2 :class="{ 'custom-font': en }">
                <span style="color:  #804d00">{{
                  en ? '' : 'USER '
                }}</span
                >{{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'data not found' }}
              </h2>
            </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-if="selectedMenuItem === '2'" class="pa-0" height="100%">
      <v-row>
        <v-col cols="12" class="px-0">
            <v-card
              min-width="100%"
              min-height="400"
              class="text-center"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <h3 :class="{ 'custom-font': en }">
                {{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}
              </h3>
              <br />
              <v-icon size="85" color="rgb(102, 102, 0)"
                >mdi-account-circle</v-icon
              >
              <br />
              <h2 :class="{ 'custom-font': en }">
                <span style="color:  #804d00">{{
                  en ? '' : 'USER '
                }}</span
                >{{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'data not found' }}
              </h2>
            </v-card>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-if="selectedMenuItem === '3'"
      class="pa-0"
      height="100%"
      style="background-color: transparent"
    >
      <v-row>
        <v-col cols="12" class="px-0">
            <v-card
              min-width="100%"
              min-height="400"
              class="text-center"
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <h3 :class="{ 'custom-font': en }">
                {{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}
              </h3>
              <br />
              <v-icon size="85" color="rgb(102, 102, 0)"
                >mdi-account-circle</v-icon
              >
              <br />
              <h2 :class="{ 'custom-font': en }">
                <span style="color:  #804d00">{{
                  en ? '' : 'USER '
                }}</span
                >{{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'data not found' }}
              </h2>
            </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
export default {
  Currency: 'index',
  middleware: 'auth',
  data() {
    return {
      loading: false,
      numberPhon:'',
      selectedMenuItem: '1',
    }
  },
  computed: {
    en() {
      return this.$store.state.en
    },
  },
  methods: {
    handleMenuSelect(name) {
      this.selectedMenuItem = name
    },
    handleSearch() {
      this.loading = !this.loading
    },
  },
}
</script>

<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.language-button:hover {
  color:  #804d00 !important;
}
.language-button:hover .v-icon {
  color:  #804d00 !important;
}
.ivu-menu-item-active.language-button {
  color:  #804d00 !important;
}
.ivu-menu-item-active.language-button .v-icon {
  color:  #804d00 !important;
}

.ivu-menu-item-indicator {
  display: none !important;
}
</style>
