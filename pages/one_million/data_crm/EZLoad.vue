<template>
  <div>
    <v-card
      class="rounded-0 scrollbar"
      style="
        overflow-y: auto;
        left: 0;
        height: calc(100vh - 19vh) - 4px;
        overflow: y;
        background-color: #f2f2f2;
      "
    >
      <v-card
        height="calc(100vh - 19vh)"
        fixed-header
        class="elevation-1 custom-font table-container"
      >
        <v-divider></v-divider>
        <v-card-actions class="pa-1 background_color">
          <v-card-text class="pa-0 background_White">
            <v-card-actions class="pa-0">
              <h4 class="px-2 background_color color-White">Register On:</h4>
              <span class="color-back"
                >&nbsp;&nbsp;{{ data.MyEZLoad.Register_on }}</span
              >
            </v-card-actions>
          </v-card-text>
          <v-card-text class="pa-0 background_White">
            <v-card-actions class="pa-0">
              <h4 class="px-2 background_color color-White">Last Login:</h4>
              <span class="color-back"
                >&nbsp;&nbsp;{{ data.MyEZLoad.Last_Login }}</span
              >
            </v-card-actions>
          </v-card-text>
        </v-card-actions>
        <v-card-text>
            
        </v-card-text>
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
