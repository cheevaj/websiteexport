<template>
    <div>
      <v-card
        class="rounded-0 scrollbar"
        flat
        style="
          overflow-y: auto;
          left: 0;
          height: 548px;
          overflow: y;
          background-color: #f2f2f2;
        "
      >
        <v-card
          height="548px"
          fixed-header
          flat
          class="elevation-1 custom-font table-container"
        >
          <v-divider />
          <v-card-actions v-for="(item ,index) in data.processedData.packages" :key="index" class="py-2 px-1 background_color" style="border: 1px solid #bfbfbf">
            <v-card-text class="pa-0 background_White">
              <v-card-actions class="py-0 pl-0 pr-2">
                <h4 class="px-2 background_color color-White" :class="{ 'custom-font': en }">{{ en ? 'ອີນເຕີເນັດເຫຼືອ' : 'Internet remains' }}:</h4>
                <v-spacer />
                <span class="color-back">&nbsp;&nbsp;{{ item.packagevalue }}&nbsp;</span>
              </v-card-actions>
            </v-card-text>
            <v-card-text class="pa-0 background_White">
              <v-card-actions class="py-0 pl-0 pr-2">
                <h4 class="px-2 background_color color-White" :class="{ 'custom-font': en }">{{ en ? 'ວັນທີ່ສະໝັກ' : 'Register Date' }}:</h4>
                <v-spacer />
                <span class="color-back">&nbsp;&nbsp;{{ item.startDate }}</span>
              </v-card-actions>
            </v-card-text>
            <v-card-text class="pa-0 background_White">
              <v-card-actions class="py-0 pl-0 pr-2">
                <h4 class="px-2 background_color color-White" :class="{ 'custom-font': en }">{{ en ? 'ວັນທີ່ໝົດກຳໜົດ' : 'Expire Date' }}:</h4>
                <v-spacer />
                <span class="color-back">&nbsp;&nbsp;{{ item.expireDate }}</span>
              </v-card-actions>
            </v-card-text>
          </v-card-actions>
            <div
              v-if="transformedDataHPackage.length > 0"
            >
              <v-data-table
                height="489px"
                fixed-header
                dense
                :headers="visibleHeaders"
                :items="transformedDataHPackage"
                :items-per-page="itemsPerPage"
                item-key="ProductNumber"
                class="elevation-1 custom-font table-container scrollbar"
                style="border-radius: 2px;"
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
                      <span class="font_size_12">{{ item[header.value] }}</span>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
        </v-card>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    middleware: 'auth',
    Currency: 'index',
    props: {
    data:Object
  },
    data() {
      return {
      columns: [
        { key: 'index', title: 'Index' },
        { key: 'Msisdn', title: 'Msisdn' },
        { key: 'Charge', title: 'Charge(₭)' },
        { key: 'Chanel', title: 'Chanel' },
        { key: 'PK_Code', title: 'PK_Code' },
        { key: 'SystemDesc', title: 'SystemDesc' },
        { key: 'Date', title: 'Date' },
        { key: 'Description', title: 'Description' },
      ],
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'Msisdn', value: 'Msisdn' },
        { text: 'Charge(₭)', value: 'Charge' },
        { text: 'Chanel', value: 'Chanel' },
        { text: 'PK_Code', value: 'PK_Code' },
        { text: 'SystemDesc', value: 'SystemDesc' },
        { text: 'Date', value: 'Date' },
        { text: 'Description', value: 'Description' },
      ],
      }
    },
    computed: {
      en() {
        return this.$store.state.en
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
        return this.data.query_pk_log.map((item, index) => {
          return {
            ...item,
            index: index + 1,
            Msisdn: item.Msisdn,
            Charge: item.Charge,
            PK_Code: item.PK_Code,
            Chanel: item.Chanel,
            Date: item.Date,
            Description: item.Description,
            SystemDesc: item.SystemDesc,
          }
        })
      },
    },
    methods: {
      formatResultDesc(value) {
        const num = Number(value)
        if (!isNaN(num)) {
          return new Intl.NumberFormat().format(num)
        }
        return value
      },
    },
  }
  </script>
  
  <style>
  .background_color {
    background-color: rgb(255, 255, 77);
  }
  .background_White {
    background-color: #ffff;
  }
  .color-back {
    color: rgb(26, 26, 0);
  }
  .color-White {
    color: rgb(115, 115, 115);
  }
  .custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
  }
  </style>
  