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
        background-color: #f2f2f2;
      "
    >
      <div style="position: fixed; z-index: 100; right: 1px">
        <v-card-actions class="pa-0">
          <transition name="move-right">
            <div v-show="buttonanime" class="transition-box">
              <v-card-actions v-if="colorMenu !== 2" class="pa-0">
                <div style="display: flex">
                  <form @submit.prevent="handleSearch">
                    <Input
                      class="custom-font"
                      v-model="numberPhon"
                      :placeholder="en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ (20789... )' : 'Enter number ( 20789... )' "
                      type="number"
                      clearable
                      style="width: 300px; height: 34px; margin-top: 1px;"
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
                    <h4 class="custom-font">{{en ? 'ຄົ້ນຫາ' : 'Search'}}</h4>
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
                    style="background-color: #000; color: #ffff00"
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
                <Home :numberNull="numberNull ? numberPhon : 'Null'" />
              </div>
              <div v-if="colorMenu === 1">
                <Crm
                  :numberPhonSend="numberPhonSend"
                  :dataPoint="dataPoint"
                  :numberNull="numberNull"
                  :dataHPackage="dataHPackage"
                  :dataSoXay="dataSoXay"
                  :cutMoney3K="cutMoney3K"
                  :uRegister="uRegister"
                  :debtMoney="debtMoney"
                  :selectInform="selectInform"
                  :vasSerVices="vasSerVices"
                  :simType="simType"
                  :checkData="checkData"
                  :SMS="SMS"
                  :statusIR="statusIR"
                />
                <!--@switch="receiveSwitchData"-->
              </div>
              <div v-if="colorMenu === 2">
                <Card />
              </div>
              <div v-if="colorMenu === 3">
                <User :numberPhonSend="numberPhonSend" :dataUser="dataUser" :numberNull="numberNull" />
              </div>
            </div>
          </template>
        </Split>
      </div>
    </v-card>
  </div>
</template>
<script>
import Home from './homemenu.vue'
import Crm from './data_crm'
import Card from './card.vue'
import User from './user.vue'
export default {
  middleware: 'auth',
  Currency: 'index',
  components: {
    Home,
    Crm,
    Card,
    User,
  },
  data() {
    return {
      statusIR:{},
      SMS:[],
      dataPoint: {},
      dataHPackage: [],
      vasSerVices: {}, 
      selectInform:{},
      dataSoXay: [],
      dataUser: [],
      uRegister: [],
      debtMoney: {},
      simType:{},
      checkData:{},
      loading: false,
      numberPhon: '',
      numberPhonSend: '',
      cutMoney3K: '',
      numberNull: false,
      mouseHover: 0,
      buttonanime: true,
      colorMenu: 0,
      split: 0.07,
      minSplit: 0,
      maxSplit: 0.1,
      theme: 'light',
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
  computed: {
    en() {
      return this.$store.state.en;
    },
  },
  methods: {
    slipMenu(index) {
      if (index === 4) {
        this.$router.go(-1)
      } else {
        this.colorMenu = index
      }
    },
    setSheetHeight() {
      const screen = document.querySelector('.screen');
      if (screen) {
        const screenHeight = window.innerHeight - 64
        screen.style.height = screenHeight + 'px'
      }
    },
    handleSearch() {
      this.loading = true
      const Num = this.numberPhon
      if (Num.length === 10) {
        this.dataResponseAll(Num)
        this.dataOfHQRPackage(Num)
        this.numberPhonSend = Num
      } else {
        this.colorMenu = 0
        this.mouseHover = 0
        this.$Notice.error({
          title: this.en ? `<span class="custom-font">${'ກະລຸນາກອດເບີ'}</span>` : 'Check Phone Number',
          desc: this.en ? `<span class="custom-font">${'ກະລຸນາກອດເບີ, ເບີໂທມີເລກເກິນ ຫຼື ບໍ່ເຖີງ 10 ຕົວເລກ.'}</span>` : 'Check your phone number, your number Phone must be at least 10 characters long.',
        })
        this.loading = false
      }
    },
    async dataOfHQRPackage(Num) {
      this.loading = true
      const Number = [
        '2076616633',
        '2078378917',
        '2078663685',
        '2076616633,2078378917',
      ].includes(Num)
        ? ''
        : Num
      try {
        const response = await this.$axios.post(
          'http://172.28.26.23:9085/api/spnv/query-register-history',
          {
            ClientIP: '1.1.1.1',
            UserId: 'APITPLUS',
            Chanel: 'TPLUS',
            Msisdn: Number,
            PageNo: 1,
            PageSize: 10,
          }
        )
        if (response.data && response.data.Detail) {
          this.dataHPackage = response.data.Detail
        } else {
          this.dataHPackage = []
        }
        this.data_num = true
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async dataResponseAll(Num) {
      const num = Number(Num);
      const currentDate = new Date();
      const stopdate = currentDate.toISOString().slice(0, 16);
      const firstDayNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      const startdate = new Date(firstDayNextMonth.setMonth(firstDayNextMonth.getMonth() - 2)).toISOString().slice(0, 16);
      const apiCalls = [
        this.$axios.post('http://172.28.26.23:3400/ltc-smart-reward/ReadPointDetail', { userIdData: Num }),
        this.$axios.post('http://172.28.17.102:9970/data/findnumbersoxay', { telephone: num }),
        this.$axios.post('http://172.28.17.102:9980/adjust/getadjustment', { telephone: Num }),
        this.$axios.post('http://172.28.26.23:3200/checksim/register', { msisdn: num }),
        this.$axios.post('http://172.28.26.23:3100/debit/getdetailforbank', { tel: Num }),
        this.$axios.post('http://172.28.26.23:3200/masternumber/info', { msisdn: Num }),
        this.$axios.post('http://172.28.26.23:3200/vasservices/info', { msisdn: Num }),
        this.$axios.post('http://172.28.26.23:3200/vasservices/simtype', { msisdn: Num }),
        this.$axios.post('http://172.28.26.23:3200/checksim/checkdata', { msisdn: Num }).catch(error => {
          if (error.response && error.response.status === 500) {
            console.log('Not Response Package');
          }
        }),
        this.$axios.post('http://172.28.26.23:3200/sms/smslog', {isdn: Num, sdate: startdate, edate: stopdate, }).catch(error => {
          if (error.response && error.response.status === 500) {
            console.log('Not Response');
          }
        }),
        this.$axios.$post('http://172.28.26.23:3200/Ir/checkstatus', { ISDN: Num }),
      ];
      try {
        const responses = await Promise.all(apiCalls);
        const [
          pointDetailResponse,
          soXayResponse,
          adjustResponse,
          userRegisterResponse,
          debtMoneyResponse,
          selectInform,
          vasSerVices,
          simType,
          checkData,
          smsDetailResponse,
          statusIR,
        ] = responses;
        this.dataPoint = pointDetailResponse.data.data;
        this.dataSoXay = soXayResponse ? soXayResponse.data : {};
        if (Array.isArray(adjustResponse.data) && adjustResponse.data.length > 0) {
          const adjustDate = adjustResponse.data[0].ADJUSTDATE;
          this.cutMoney3K = this.formatAdjustDate(adjustDate);
        } else {
          this.cutMoney3K = '';
        }
        this.uRegister = userRegisterResponse ? userRegisterResponse.data : {};
        this.debtMoney = debtMoneyResponse ? debtMoneyResponse.data : {};
        this.selectInform = selectInform ? selectInform.data : {};
        this.vasSerVices = vasSerVices ? vasSerVices.data : {};
        this.simType = simType ? simType.data : {};
        this.checkData = checkData ? checkData.data : {};
        this.SMS = smsDetailResponse && smsDetailResponse.data !== 'Not found data!' ? smsDetailResponse.data : [];
        this.statusIR = statusIR ? statusIR.data : {};
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.numberNull = this.numberPhon !== '';
        this.colorMenu = this.colorMenu === 0 ? 1 : this.colorMenu;
        this.mouseHover = this.mouseHover === 0 ? 1 : this.mouseHover;
        this.loading = false;
      }
    },
    formatAdjustDate(dateString) {
      const date = new Date(dateString)
      const formattedDate = date
        .toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(',', '')
      return formattedDate
    },
  },
  watch: {
    split(newValue) {
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
  border: 1px solid #dcdee2;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
