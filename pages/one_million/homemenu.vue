<template>
  <div>
    <v-img
      src="https://laosesim.com/wp-content/uploads/sites/13/2023/09/20230922024211-650cff03668b0.jpg"
    >
      <v-card-text class="d-flex justify-center align-center">
        <v-card
          flat
          width="40%"
          class="d-flex justify-center align-center pa-4"
          style="margin-top: 10%"
        >
          <h3 v-if="numberNull === 'Null'" class="text-center">
            <span :class="{ 'custom-font' : en }" >{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}</span>
          </h3>
          <h3 v-else class="text-center">
            <span :class="{'custom-font' : en }" >{{ en ? 'ເບີໂທລະສັບແມ່ນ' : 'Your Number Phone' }}</span>
            <v-card-text>
            <h4>
              <v-icon color="rgb(128, 128, 128)">mdi-card-account-phone-outline</v-icon>
              <span style="color: rgb(128, 128, 128);">: {{ numberNull }}</span>
            </h4>
            </v-card-text>
          </h3>
        </v-card>
      </v-card-text>
    </v-img>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  Currency: 'index',
  props: {
    numberNull: String,
  },
  data() {
    return {}
  },
  computed: {
    en() {
      return this.$store.state.en;
    },
  },
}
</script>
<style>
.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-content: center;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
