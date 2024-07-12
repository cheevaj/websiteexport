<template>
  <div>
    <v-card-text class="White" v-if="numberNull"> hi </v-card-text>
    <v-card-text v-else
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
      "
    >
      <v-card
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 :class="{ 'custom-font' : en }" >{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}</h3>
        <br>
        <v-icon size="85" color="rgb(153, 153, 0)">mdi-smart-card</v-icon>
        <br>
        <h2 :class="{ 'custom-font' : en }"><span style="color: rgb(255, 255, 0);">{{ en ?'' : 'CARD' }}</span> {{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'not found' }}</h2>
      </v-card>
    </v-card-text>
  </div>
</template>
<script>
export default {
  Currency: 'index',
  middleware: 'auth',
  props: {
    dataCard: Object,
    numberNull: Boolean,
  },
  data() {
    return {}
  },
  mounted() {
    // console.log(this.dataCard)
  },
  computed: {
    en() {
      return this.$store.state.en;
    },
  },
}
</script>
