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
        class="elevation-1 custom-font table-container py-1"
      >
        <v-divider />
        <v-card-actions
          v-for="(item, index) in data"
          :key="index"
          class="py-2 px-1 background_color_pk"
          style="border: 1px solid #bfbfbf"
        >
          <h3 class="px-2 white">{{ index }}</h3>
          <v-card-text class="pa-0 background_White">
            <v-card-actions class="py-0 pl-0 pr-2">
              <h4
                class="px-2 background_color_pk color-White"
                :class="{ 'custom-font': en }"
              >
                {{ en ? 'ອີນເຕີເນັດເຫຼືອ' : 'Internet remains' }}:
              </h4>
              <v-spacer />
              <span class="color-back"
                >&nbsp;&nbsp;{{ item.packagevalue }}&nbsp;</span
              >
            </v-card-actions>
          </v-card-text>
          <v-card-text class="pa-0 background_White">
            <v-card-actions class="py-0 pl-0 pr-2">
              <h4
                class="px-2 background_color_pk color-White"
                :class="{ 'custom-font': en }"
              >
                {{ en ? 'ວັນທີ່ສະໝັກ' : 'Register Date' }}:
              </h4>
              <v-spacer />
              <span class="color-back">&nbsp;&nbsp;{{ item.startDate }}</span>
            </v-card-actions>
          </v-card-text>
          <v-card-text class="pa-0 background_White">
            <v-card-actions class="py-0 pl-0 pr-2">
              <h4
                class="px-2 background_color_pk color-White"
                :class="{ 'custom-font': en }"
              >
                {{ en ? 'ວັນທີ່ໝົດກຳໜົດ' : 'Expire Date' }}:
              </h4>
              <v-spacer />
              <span class="color-back">&nbsp;&nbsp;{{ item.expireDate }}</span>
            </v-card-actions>
          </v-card-text>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  Currency: 'index',
  props: {
    data: Object,
  },
  data() {
    return {}
  },
  computed: {
    en() {
      return this.$store.state.en
    },
    check() {
      console.log('Data::', this.data)
      return 0
    },
  },
  methods: {},
}
</script>

<style>
.background_color_pk {
  background-color: rgb(255, 255, 204);
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
