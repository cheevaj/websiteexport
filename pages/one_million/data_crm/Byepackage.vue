<template>
  <div>
    <v-card
      class="rounded-0 scrollbar"
      flat
      style="
        overflow-y: auto;
        left: 0;
        height: 548px;
        background-color: #f2f2f2;
      "
    >
      <v-card
        height="488px"
        flat
        fixed-header
        class="elevation-1 custom-font table-container"
      >
        <v-data-table
          v-if="text === 'Normal-Package'"
          height="calc(100vh - 26vh - 4px)"
          fixed-header
          dense
          :headers="visibleHeaders"
          :items="transformedDataHPackage"
          :items-per-page="itemsPerPage"
          item-key="PackageCode"
          class="elevation-1 custom-font table-container scrollbar"
        >
          <template v-slot:item="{ item }">
            <tr
              class="text_color"
              :style="{
                backgroundColor:
                  item.index % 2 !== 0
                    ? 'rgb(255, 255, 230)'
                    : 'rgb(255, 255, 255)',
              }"
            >
              <td v-for="header in visibleHeaders" :key="header.text">
                <span v-if="header.value !== 'Bye'" class="font_size_12">
                  {{ item[header.value] }}
                </span>
                <v-btn
                  v-else
                  class="custom-btn hover-cursor font_size_12 disabled-hover"
                  small
                  outlined
                  style="
                    background-color: rgb(255, 204, 0);
                    border: 1px solid rgb(230, 184, 0);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  
                  >
                <!-- @click="buyPackage(item)" -->
                  Buy
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-data-table
          v-else
          height="calc(100vh - 26vh - 4px)"
          fixed-header
          dense
          :headers="visibleHeadersRoaming"
          :items="transformedDataHPackageRoaming"
          :items-per-page="itemsPerPageRoaming"
          item-key="PackageCode"
          class="elevation-1 custom-font table-container scrollbar"
        >
          <template v-slot:item="{ item }">
            <tr
              class="text_color"
              :style="{
                backgroundColor:
                  item.index % 2 !== 0
                    ? 'rgb(255, 255, 230)'
                    : 'rgb(255, 255, 255)',
              }"
            >
              <td v-for="header in visibleHeadersRoaming" :key="header.text">
                <span v-if="header.value !== 'Bye'" class="font_size_12">
                  {{ item[header.value] }}
                </span>
                <v-btn
                  v-else
                  class="custom-btn hover-cursor font_size_12"
                  small
                  style="
                    background-color: rgb(255, 204, 0);
                    border: 1px solid rgb(230, 184, 0);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  @click="buyPackage(item)"
                > 
                  Buy
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
    <Modal
      v-model="modal"
      draggable
      scrollable
      :mask-closable="false"
      width="300"
      style="padding: 0px"
    >
      <template #header>
        <v-card-actions
          style="color: rgb(255, 215, 0); text-align: center; padding: 2px"
        >
          <v-spacer />
          <h3 class="custom-font">ທ່ານຕ້ອງການຊື້ເເພັກເກັດນີ້ ຫຼື ບໍ?</h3>
          <v-spacer />
        </v-card-actions>
      </template>
      <div>
        <div style="text-align: center">
          <v-card
            flat
            class="table-container"
            style="
              height: 80px;
              z-index: 100;
              margin-top: 2px;
              overflow-y: auto;
            "
          >
            <h4>{{ numberPhonSend }}</h4>
            <p>Code: {{ items.PackageName }}</p>
            <p>Data: {{ items.Net }}</p>
            <p>Price: {{ items.Price }}</p>
          </v-card>
        </div>
      </div>
      <template #footer>
        <Button
          size="large"
          long
          style="background-color: rgb(255, 215, 0); color: #ffff"
          @click="ByePackage"
        >
          <!-- <v-icon color="#ffff">{{ 'mdi-web' }}</v-icon>&nbsp; -->
          <h3 class="custom-font">{{ 'ຊື້' }}</h3>
        </Button>
      </template>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    numberPhonSend: String,
    text: String,
  },
  data() {
    return {
      packageNormal: [],
      packageRoaming: [],
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'PackageCode', title: 'Package Code' },
        { key: 'Net', title: 'Net' },
        { key: 'Duration', title: 'Duration' },
        { key: 'Price', title: 'Price (₭)' },
        { key: 'Flag', title: 'Flag' },
        { key: 'PackageName', title: 'Package Name' },
        { key: 'Bye', title: 'Bye' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'Package Code', value: 'PackageCode' },
        { text: 'Net', value: 'Net' },
        { text: 'Duration', value: 'Duration' },
        { text: 'Price (₭)', value: 'Price' },
        { text: 'Flag', value: 'Flag' },
        { text: 'Package Name', value: 'PackageName' },
        { text: 'Bye', value: 'Bye' },
      ],
      columnsRoaming: [
        { key: 'index', title: 'Index' },
        { key: 'PackageCode', title: 'Package Code' },
        { key: 'Net', title: 'Net' },
        { key: 'Duration', title: 'Duration' },
        { key: 'Price', title: 'Price (₭)' },
        // { key: 'Flag', title: 'Flag' },
        { key: 'PackageName', title: 'Package Name' },
        { key: 'Bye', title: 'Bye' },
      ],
      headersRoaming: [
        { text: 'Index', value: 'index' },
        { text: 'Package Code', value: 'PackageCode' },
        { text: 'Net', value: 'Net' },
        { text: 'Duration', value: 'Duration' },
        { text: 'Price (₭)', value: 'Price' },
        // { text: 'Flag', value: 'Flag' },
        { text: 'Package Name', value: 'PackageName' },
        { text: 'Bye', value: 'Bye' },
      ],
      modal: false,
      items: {},
    }
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    visibleHeadersRoaming() {
      return this.headersRoaming.filter((header) =>
        this.columnsRoaming.some(
          (col) => col.key === header.value && col.active !== false
        )
      )
    },
    itemsPerPage() {
      return this.transformedDataHPackage.length > 0
        ? this.transformedDataHPackage[this.transformedDataHPackage.length - 1]
            .index
        : 10
    },
    itemsPerPageRoaming() {
      return this.transformedDataHPackageRoaming.length > 0
        ? this.transformedDataHPackageRoaming[
            this.transformedDataHPackageRoaming.length - 1
          ].index
        : 10
    },
    transformedDataHPackage() {
      return this.packageNormal.map((item, index) => ({
        index: index + 1,
        CDate: item.CDate,
        Duration: item.Duration,
        Flag: item.Flag,
        Net: this.convertNet(item.Net),
        PackageCode: item.PackageCode,
        PackageName: item.PackageName,
        PkDesc: item.PkDesc,
        Price: this.formatPrice(item.Price),
      }))
    },
    transformedDataHPackageRoaming() {
      return this.packageRoaming.map((item, index) => ({
        index: index + 1,
        CDate: item.CDate,
        Duration: item.Duration,
        // Flag: item.Flag,
        Net:
          item.Net === 0 || item.Net === '0'
            ? 'Non-Stop'
            : this.convertNet(item.Net),
        PackageCode: item.PACKAGE_CODE,
        PackageName: item.PACKAGE_NAME,
        PkDesc: item.PkDesc,
        Price: this.formatPrice(item.pkPrice),
      }))
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const apiCalls = [
        this.$axios.post('http://172.28.26.23:9085/api/spnv/list-package', {
          Msisdn: this.numberPhonSend,
          MainProduct: '1172688790',
        }),
        this.$axios.get(
          `http://172.28.26.23:9085/api/spnv/queryPackageIR?msisdn=${this.numberPhonSend}&countryCode=66`
        ),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [pointDetailResponse, soXayResponse] = responses
        this.packageNormal = pointDetailResponse.data.Detail || []
        this.packageRoaming = soXayResponse.data.Detail || []
        // console.log(this.packageRoaming)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    buyPackage(item) {
      this.items = item
      // console.log(this.items)
      this.modal = true
    },
    formatPrice(value) {
      const num = Number(value)
      return !isNaN(num) ? new Intl.NumberFormat().format(num) : value
    },
    convertNet(value) {
      const numValue = Number(value)
      if (isNaN(numValue)) return value
      if (numValue >= 1024) {
        return `${(numValue / 1024).toFixed(1).replace(/\.0$/, '')}GM`
      } else if (numValue >= 100) {
        return Number.isInteger(numValue / 100)
          ? `${(numValue / 100).toFixed(0)}MB`
          : `${(numValue / 100).toFixed(1)}MB`
      } else {
        return `${(numValue / 10).toFixed(1)}KB`
      }
    },
    ByePackage() {
      this.modal = false
      // try {
      //   const res = await this.$axios.post(
      //     'http://172.28.26.23:3100/tplushlr/OffIR-Service',
      //     {
      //       ISDN: this.numberPhonSend,
      //       Chanel: 'USSDIR',
      //     }
      //   )
      //   res.statusText === 'OK'
      //     ? this.messageModal('success') :
           this.messageModal('error')
      // } catch (error) {
      //   console.error(error)
      // }
    },
    messageModal(type) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${
          type === 'success' ? 'ຊື້ເເພັກເກັດສໍາເລັດ.' : 'ຊື້ເເພັກເກັດລົມເເຫຼວ.'
        }`,
      })
    },
  },
}
</script>
<style>
.custom-btn {
  outline: 0px solid black;
  transition: outline 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 0px 0px rgba(128, 102, 0, 0.5);
}
.custom-btn:hover {
  outline: 0px solid black;
  box-shadow: 2px 4px 4px rgba(128, 102, 0, 0.5);
}
.disabled-hover:hover{
  cursor: not-allowed;
}
</style>
