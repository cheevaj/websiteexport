<template>
  <div class="background_color">
    <v-card
      outlined
      flat
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        left: 0;
        height: 548px;
        overflow: y;
        background-color: #f2f2f2;
      "
    >
      <v-data-table
        :loading="loading"
        height="496px"
        fixed-header
        dense
        hide-default-footer
        :headers="visibleHeaders"
        :items="transformedDataHPackage"
        :items-per-page="itemsPerPage"
        item-key="ProductNumber"
        :footer-props="{ showFirstLastPage: false }"
        class="elevation-1 custom-font table-container scrollbar"
      >
        <template v-slot:loading>
          <v-progress-linear
            indeterminate
            color="rgb(255, 204, 0)"
            height="4"
          ></v-progress-linear>
        </template>
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
              <span class="font_size_12">{{ item[header.value] }}</span>
            </td>
          </tr>
        </template>

        <template v-slot:footer>
          <v-card-actions class="pa-0" style="background-color: #e6e6e6">
            <v-spacer />
            <DatePicker
              v-model="dateRange"
              type="daterange"
              placement="bottom-end"
              placeholder="Select date"
              style="width: 200px"
            />
            <tr>
              <td :colspan="visibleHeaders.length" class="text-left px-4">
                <div
                  class="d-flex justify-space-between align-center w-100"
                  style="height: 50px; width: 100%"
                >
                  <h2 style="color: #404040">
                    Total:
                    <span style="color: #804d00">
                      {{ localUsePackage.totalMb }}MB
                    </span>
                  </h2>
                </div>
              </td>
            </tr>
          </v-card-actions>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  Currency: 'index',
  data() {
    return {
      localUsePackage: {},
      dateRange: [],
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'MSMIDN', title: 'MSMIDN' },
        { key: 'packageName', title: 'packageName' },
        { key: 'productNo', title: 'product-no' },
        { key: 'volMB', title: 'vol( MB )' },
        { key: 'serviceId', title: 'serviceId' },
        { key: 'servicename', title: 'servicename' },
        { key:'', title:'Application' },
        { key: 'profile', title: 'profile' },
        { key: 'start', title: 'start' },
        // { key: 'stop', title: 'stop' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'MSMIDN', value: 'MSMIDN' },
        { text: 'product-no', value: 'productNo' },
        { text: 'vol( MB )', value: 'volMB' },
        { text: 'serviceId', value: 'serviceId' },
        { text: 'servicename', value: 'servicename' },
        { text: 'Application', value: '' },
        { text: 'profile', value: 'profile' },
        { text: 'start', value: 'start' },
        // { text: 'stop', value: 'stop' },
      ],
      loading: false,
    }
  },
  computed: {
    dateTime() {
      return this.$store.state.dateTime // fist date or auto date form page index of folder one_million "SET_DATE" 
    },
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.columns.some(
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
    transformedDataHPackage() {
      if (
        !this.localUsePackage.data ||
        !Array.isArray(this.localUsePackage.data)
      ) {
        return []
      }
      return this.localUsePackage.data.map((item, index) => {
        return {
          ...item,
          index: item.index,
          profile: item.profile,
          MSMIDN: item.msisdn,
          packageName: item.packageName,
          productNo: item.productNo,
          serviceId: item.serviceId,
          servicename: item.servicename,
          start: item.start,
          stop: item.stop,
          volMB: item.volMB + 'MB',
        }
      })
    },
  },
  watch: {
    dateRange() {
      if (this.dateRange[0] !== '' && this.dateRange[1] !== '') {
        this.OnInternet()
      }
    },
  },
  mounted() {
    if (this.dateTime.length >= 2) {
      this.dateRange = [this.dateTime[0], this.dateTime[1]]
    }
  },
  methods: {
    async OnInternet() {
      this.loading = true
      this.localUsePackage = { data: [], totalMb: 0 }
      try {
        const formattedStartDate = this.dateRange[0]
          ? new Date(this.dateRange[0]).toISOString().slice(0, 16)
          : null
        const formattedEndDate = this.dateRange[1]
          ? new Date(this.dateRange[1]).toISOString().slice(0, 16)
          : null
        if (formattedStartDate === formattedEndDate) {
          this.loading = false
          this.messageModal('error')
          return
        }
        const res = await this.$axios.post(
          'http://172.28.17.102:3455/active4G/logpackage',
          {
            isdn: this.dateTime[2],
            sdate: formattedStartDate,
            edate: formattedEndDate,
          }
        )
        this.localUsePackage = res.data ? res.data : {}
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    messageModal(type) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${'ວັນທີ່ຕ້ອງຕ່າງກັນ.'}<span>`,
      })
    },
  },
}
</script>

<style>
.color_CL {
  color: #ffff;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.font_size_12 {
  font-size: 11px;
}
.font_size_14 {
  font-size: 14px;
}
.title_color {
  color: #ffff00;
}
.text_color {
  color: rgb(89, 89, 89);
}
.table-container ::-webkit-scrollbar {
  width: 8px;
  height: 4px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: rgb(255, 204, 0);
  border-radius: 2px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: rgb(255, 204, 0);
  border-radius: 1px;
}
.scrollbar {
  overflow-x: hidden;
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(255, 204, 0);
}
</style>
