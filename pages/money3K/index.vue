<template>
  <div>
    <div
      flat
      style="
        height: calc(100vh - 9vh);
        background-color: #ffff;
        box-shadow: inset;
      "
    >
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        clipped
        fixed
        app
        class="custom-border"
        style="height: 91vh; background-color: #000"
      >
        <v-card-actions class="pa-0">
          &nbsp;&nbsp;
          <v-avatar
            height="64"
            width="58"
            class="pa-0 black mouse_senter"
            @click.stop="miniVariant = !miniVariant"
          >
            <img src="Tpluslogo.png" alt="John" />
          </v-avatar>
          <h2
            class="custom-font"
            style="color: #ffff; padding-left: 20px; padding-right: 20px"
          >
            ລາຍການເມນູ
          </h2>
        </v-card-actions>
        <v-list
          style="
            background-color: #ffff;
            height: 58vh;
            margin-left: 1px;
            margin-right: 1px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            padding-top: 2px;
            box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
          "
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
            style="
              margin-left: 1px;
              margin-right: 1px;
              box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
            "
            :style="{
              backgroundColor: selectedItem === i ? '#ffcc00' : 'transparent',
              color: selectedItem === i ? '#ffff' : '#000',
            }"
            @click="selectItem(i, item.title)"
          >
            <v-list-item-content>
              <v-list-item-title class="custom-font">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-card-actions
        class="custom-border"
        style="
          background-color: rgb(26, 15, 0);
          height: 64px;
          color: rgb(255, 204, 0);
        "
      >
        <v-spacer></v-spacer>
        <h1 class="custom-font">{{ selectedItem === 4 ? 'ປະຫວັດການລົງທະບຽນແພັກເກັດຂອງ CCare ຜ່ານ Bcel-One.' : title }}</h1>
        <v-spacer></v-spacer>
        <v-card-actions style="padding-top: 4px; margin-right: 8px">
          <Tooltip
            v-if="selectedItem === 0 || selectedItem === 6"
            :content="en ? 'ນໍາເຂົ້າໄຟລ໌ Excel.' : 'Import file Excel.'"
            placement="bottom"
            :delay="800"
          >
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileUpload"
            />
            <v-btn
              text
              x-small
              fab
              class="px-0 ml-1 mr-0"
              style="background-color: #ffff"
              @click="$refs.fileInput.click()"
            >
              <v-icon size="25" style="color: rgb(41, 163, 41)">
                mdi-file-excel-outline
              </v-icon>
            </v-btn>
          </Tooltip>
          &nbsp;&nbsp;
          <h2 class="custom-font" style="color: #ffff">
            {{
              selectedItem === 3 || selectedItem === 4
                ? 'ປີ ເເລະ ເດືອນ:'
                : selectedItem === 0 || selectedItem === 6 ? 'ກຸ່ມເບີໂທ:' : 'ເບີໂທ:'
            }}
          </h2>
          &nbsp;&nbsp;
          <transition name="move-right">
            <div v-show="buttonanime" class="transition-box">
              <v-card-actions class="pa-0">
                <div style="display: flex">
                  <form @submit.prevent="handleSearch">
                    <Input
                      v-if="selectedItem === 3 || selectedItem === 4"
                      class="custom-font"
                      size="large"
                      v-model="numberPhon"
                      :placeholder="
                        en
                          ? 'ກະລຸນາປ້ອມ ປີ ແລະ ເດືອນ ( 202402 )'
                          : 'Enter New year and month ( 202403 )'
                      "
                      clearable
                      style="width: 250px; height: 34px"
                      @keydown.enter="handleSearch"
                    />
                    <Input
                      v-else-if="selectedItem === 0 || selectedItem === 6"
                      v-model="numberPhon"
                      size="large"
                      class="custom-font"
                      :placeholder="
                        en
                          ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ ( 20789...,20778... )'
                          : 'Enter phone number ( 20788...,20778... )'
                      "
                      clearable
                      style="width: 450px; height: 34px"
                      @keydown.enter="handleSearch"
                    />
                    <Input
                      v-else
                      size="large"
                      class="custom-font"
                      v-model="numberPhon"
                      :placeholder="
                        en
                          ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ ( 20789... )'
                          : 'Enter phone number ( 20788... )'
                      "
                      clearable
                      style="width: 350px; height: 34px"
                      @keydown.enter="handleSearch"
                    />
                  </form>
                  <v-btn
                    :loading="loading"
                    small
                    text
                    @click="handleSearch"
                    style="
                      height: 36px;
                      background-color: rgb(255, 204, 0);
                      color: #000;
                      margin-top: 0px;
                      margin-left: 1px;
                      padding-left: 4px;
                      padding-right: 4px;
                    "
                  >
                    <v-icon color="#ffff">mdi-magnify</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </div>
          </transition>
        </v-card-actions>
      </v-card-actions>
      <div>
        <checkPrieNumber v-if="selectedItem === 0" :dataPrice="dataPrice" :pageItem="pageItem" />
        <moneySoxayApp v-else-if="selectedItem === 1" :dataSoxayApp="dataSoxayApp" :pageItem="pageItem" />
        <historyQueryPKages v-else-if="selectedItem === 2" :dataHistoryPK="dataHistoryPK" :pageItem="pageItem" />
        <CcareCandidatePKage v-else-if="selectedItem === 3" :dataCandidatePKage="dataCandidatePKage" :pageItem="pageItem" />
        <CcareRegisterPKages v-else-if="selectedItem === 4" :dataCRegisterPKages="dataCRegisterPKages" :pageItem="pageItem" />
        <CcareRegisterViacounter v-else-if="selectedItem === 5" :dataViacounter="dataViacounter" :pageItem="pageItem" />
        <CutMoney3K v-else-if="selectedItem === 6" :dataCutMoney3K="dataCutMoney3K" :pageItem="pageItem" />
        <bceloneData v-else :bceloneDataAll="bceloneDataAll" :pageItem="pageItem" />
      </div>
    </div>
  </div>
</template>
<script>
  import * as XLSX from 'xlsx'
import checkPrieNumber from './checkPrieNumber.vue';
import moneySoxayApp from './moneySoxayApp.vue';
import historyQueryPKages from './historyQueryPKages.vue';
import CcareCandidatePKage from './ccareCandidatePKage.vue';
import CcareRegisterPKages from './ccareRegisterPKages.vue';
import CcareRegisterViacounter from './ccareRegisterViacounter.vue';
import CutMoney3K from './cutMoney3K.vue';
import bceloneData from './bcel_oneData.vue';
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  components: {
    checkPrieNumber,
    moneySoxayApp,
    historyQueryPKages,
    CcareCandidatePKage,
    CcareRegisterPKages,
    CcareRegisterViacounter,
    CutMoney3K,
    bceloneData,
  },
  data() {
    return {
      title: 'ກອດເບີ່ງຂໍ້ມູນ ແລະ ລາຄາເບີ',
      type: '',
      dataPrice:[],
      dataSoxayApp:[],
      dataHistoryPK:[],
      dataCandidatePKage:[],
      dataCRegisterPKages:[],
      dataViacounter:[],
      dataCutMoney3K:[],
      bceloneDataAll:{},
      pageItem:-1,
      selectedItem: 0,
      numberPhon: '',
      miniVariant: false,
      drawer: true,
      loading: false,
      buttonanime: true,
      buttonWeb: false,
      items: [
        { title: 'ກອດເບີ່ງຂໍ້ມູນ ແລະ ລາຄາເບີ', titleEn: 'Check The Price SIS.',},
        { title: 'ເງີນຖືກຕັດໂດຍແອບ Soxay', titleEn: 'Money Cuts Bye Soxay App',},
        { title: 'History Query Packages', titleEn:'History Query Packages' },
        { title: "ປະຫວັດການເຕີມເງີນຂອງ C'Care", titleEn: "CCare's Top-up History",},
        { title: "ສະໝັກແພັກເກັດຜ່ານ C'Care", titleEn:"C'Care Register Package", },
        { title: 'ລົງທະບຽນແພັກເກັດຜ່ານທາງເຄົາເຕີ.', titleEn:"C'Care Register Package via counter", },
        { title: 'ກອດລາຍການຕັດເງີນ 3000 ກີບ', titleEn: 'Cuts Money 3000 kip', },
        { title: 'Data BCEL ONE', titleEn:'Data BCEL ONE' },
      ],
    }
  },
  computed: {
    en() {
      return this.$store.state.en
    },
  },
  methods: {
    selectItem(index, title) {
      this.selectedItem = index
      this.title = title
    },
    async handleSearch() {
      this.loading = true;
      let Num = this.numberPhon;
      const number = Number(this.numberPhon);
      
      if (this.selectedItem === 0 || this.selectedItem === 6) {
        Num = this.numberPhon.split(',').map((num) => num.trim()).reverse();
      } else if (this.selectedItem === 2) {
        Num = ['2076616633', '2078378917', '2078663685', '2076616633,2078378917'].includes(Num) ? '200' : Num;
      }
      
      const endpoints = {
        0: 'http://172.28.26.23:3400/showdetail/nicenumberdetaill',
        1: 'http://172.28.17.102:9970/data/findnumbersoxay',
        2: 'http://172.28.26.23:9085/api/spnv/query-register-history',
        3: 'http://172.28.17.102:9960/finddate/findcareregister',
        4: 'http://172.28.17.102:8100/incoming/TOPUPV_INCOMMING',
        5: 'http://172.28.26.23:3200/ccare/ccareregisterpackage',
        6: 'http://172.28.17.102:9980/adjust/getadjustment',
        7: [
          'http://172.28.17.102:8100/show/justbceldata',
          'http://172.28.17.102:8100/show/postpaidpaymentussd',
          'http://172.28.17.102:8100/show/logstoshowinonescreem',
        ],
      };
      const payload = this.selectedItem === 2
        ? {
            ClientIP: '1.1.1.1',
            UserId: 'APITPLUS',
            Chanel: 'TPLUS',
            Msisdn: Num,
            PageNo: 1,
            PageSize: 10,
          }
        : (this.selectedItem === 3 || this.selectedItem === 4)
        ? { datetime: number } 
        : (this.selectedItem === 5) 
        ? { msisdn: number } 
        : { telephone: (this.selectedItem === 7) ? number : Num };

      try {
        if (this.selectedItem === 7) {
          const [response1, response2, response3] = await Promise.all(
            endpoints[7].map((url) => this.$axios.post(url, payload))
          );
          const dataALL = {
            dataResponseBcelOne: response1.data,
            dataResponseBcelOne2: response2.data,
            dataResponseBcelOne3: response3.data,
          };
          this.processDataResponse(dataALL);
        } else {
          const response = await this.$axios.post(endpoints[this.selectedItem], payload);
          const data = response.data;
          if (data) {
            this.processDataResponse(data);
          } else {
            this.clearData();
          }
        }
      } catch (error) {
        this.clearData();
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    processDataResponse(data) {
      if (this.selectedItem === 0) {
        this.dataPrice = data.map((detail, index) => ({
          index: index + 1,
          MSISDN: detail.MSISDN,
          Active_Date: this.formatDate(detail.Active_Date),
          Book_detail: detail.Book_detail,
          Date_Booking: this.formatDate(detail.Date_Booking),
          Date_delete_pool: this.formatDate(detail.Date_delete_pool),
          Sub_status: detail.Sub_status,
          Class: detail.Class,
          Prepaid_price: this.formatResultDesc(detail.Prepaid_price),
          Postpaid_price: this.formatResultDesc(detail.Postpaid_Price),
        }));
      } else if (this.selectedItem === 1) {
        this.dataSoxayApp = data.map((detail, index) => ({
          index: index + 1,
          SIS: detail.RECEIVER_ISDN,
          RECEIVER_AMOUNT_F: this.formatResultDesc(detail.RECEIVER_AMOUNT_F),
          TRANSFER_AMOUNT: this.formatResultDesc(detail.TRANSFER_AMOUNT),
          DATE: this.formatAdjustDate(detail.CDATE),
          USER_ID: detail.USER_ID,
          RESULT_DESC: detail.RESULT_DESC,
        }));
      } else if (this.selectedItem === 2) {
        this.dataHistoryPK = data.Code === 20000
          ? data.Detail.map((detail, index) => ({
            index: index + 1,
            SIS: detail.Msisdn,
            Duration: detail.Duration,
            Start_Time: this.formatAdjustDate(detail.StartTime),
            ExpiryTime: this.formatAdjustDate(detail.ExpiryTime),
            Net: this.formatResultDesc(detail.Net),
            Oder_Ref: detail.Oder_Ref,
            Package_Code: detail.PackageCode,
            Package_Name: detail.PackageName,
            Price: this.formatResultDesc(detail.Price),
            Product_Number: detail.ProductNumber,
            Result_Desc: detail.ResultDesc,
            Chanel: detail.Chanel,
          }))
          : [];
      } else if (this.selectedItem === 3) {
        this.dataCandidatePKage = data.map((detail, index) => ({
          index: index + 1,
          Month: detail.Month.substring(0, 4) + '\u00A0/\u00A0' + detail.Month.substring(4),
          Packagecode: detail.Packagecode,
          QTY: detail.QTY,
          Staff_Name: detail.Staff_Name,
        }));
      } else if (this.selectedItem === 4) {
        this.dataCRegisterPKages = data.map((detail, index) => ({
          index: index + 1,
          MSISDN: detail.MSISDN,
          AMOUNT: this.formatResultDesc(detail.AMOUNT),
          USER_ID: detail.USER_ID,
          DATE: detail.CDATE.substring(0, 4) + '\u00A0/\u00A0' + detail.CDATE.substring(4, 6) + '\u00A0/\u00A0' + detail.CDATE.substring(6),
        }))
      }
      else if (this.selectedItem === 5) {
        this.dataViacounter = data.map((detail, index) => ({
          index: index + 1,
          MSISDN: detail.MSISDN,
          Dated: this.formatAdjustDate(detail.Dated),
          Packagecode: detail.Packagecode,
          SIMtype: detail.SIMtype,
          Staff_name:detail.Staff_name,
          Statu:detail.Statu
        }))
      }
      else if (this.selectedItem === 6){
        this.dataCutMoney3K = data.map((detail, index) => ({
          index: index + 1,
          SIS: detail.MSISDN,
          ADJUSTDATE: this.formatAdjustDate(detail.ADJUSTDATE),
          BBF: this.formatResultDesc(detail.BBF),
          BFT: this.formatResultDesc(detail.BFT),
          CODE: detail.CODE ? 'OK' : 'No',
          RESULTDESC: detail.RESULTDESC,
        }))
      }
      else if (this.selectedItem === 7) {
        this.bceloneDataAll = {
          bcelOneResponse: Array.isArray(data.dataResponseBcelOne)
            ? data.dataResponseBcelOne.map((detail, index) => ({
                index: index + 1,
                SIS: detail.MSISDN,
                AMOUNT: this.formatResultDesc(detail.AMOUNT),
                SEQ_NUMBER: detail.SEQ_NUMBER,
                Provider: detail.Provider,
                TYPE: detail.TYPE,
                ADJUSTDATE: this.formatAdjustDate(detail.RESPON_DATE),
                DATE: detail.DATED,
              }))
            : [],
          bcelOneResponse2: Array.isArray(data.dataResponseBcelOne2)
            ? data.dataResponseBcelOne2.map((detail, index) => ({
                index: index + 1,
                SIS: detail.ISDN,
                Pinno: detail.Pinno,
                AMOUNT: this.formatResultDesc(detail.Amount),
                ResultDesc: detail.ResultDesc,
                DATE: detail.DATE.substring(0, 4) + '\u00A0/\u00A0' + detail.DATE.substring(4, 6) + '\u00A0/\u00A0' + detail.DATE.substring(6),
            }))
            : [],
          dataResponseLogonecreen: Array.isArray(data.dataResponseBcelOne3.Data)
            ? data.dataResponseBcelOne3.Data.map((detail, index) => ({
                index: index + 1,
                SIS: detail.msisdn,
                AMOUNT: this.formatResultDesc(detail.amount),
                DATE: detail.cdate,
                resultdesc: detail.resultdesc,
            }))
            : [],
          };
        // console.log('Processed bceloneData:', this.bceloneData);
      }
      this.pageItem = this.selectedItem;
    },
    clearData() {
      this.dataPrice = [];
    },
    formatDate(date) {
      return date && date !== '0' ? `${date.substring(0, 4)}\u00A0/\u00A0${date.substring(4, 6)}\u00A0/\u00A0${date.substring(6)}` : '';
    },
    formatResultDesc(value) {
        const num = Number(value);
        if (!isNaN(num)) {
          return new Intl.NumberFormat().format(num);
        }
        return value;
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
        .replace(',', '');
      return formattedDate
    },
    handleFileUpload(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        this.readFile(file)
      } else {
        console.log('No file selected')
      }
    },
    readFile(file) {
      const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            range: -1,
          })
          const extractedData = jsonData.map((row) => row[0])
          extractedData.shift()
          this.numberPhon = extractedData.join(',')
        }
      reader.readAsBinaryString(file)
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
}
.font_size_18 {
  font-size: 18px;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.mouse-hover-menu:hover {
  background-color: rgb(255, 215, 0);
}
.custom-border {
  border: 2px solid #ffcc00;
}
</style>
