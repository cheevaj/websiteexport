<style>
.custom-icon-close:hover {
  color: #ffd633;
}
</style>

<script>
export default {
  data: () => ({
    dialogOtp: false,
  }),
}
</script>
<template>
  <div class="text-center">
    <v-btn @click="dialogOtp = !dialogOtp">Open</v-btn>
    <v-dialog
      v-model="dialogOtp"
      width="360"
      persistent
      style="background-color: transparent"
    >
      <v-card width="360" style="border-radius: 8px; background-color: #f2f2f2">
        <v-icon
          class="custom-icon-close"
          style="position: absolute; right: 0px; z-index: 100; margin: 4px"
          @click="dialogOtp = false"
        >
          mdi-close
        </v-icon>
        <OtpLogin />
      </v-card>
    </v-dialog>
  </div>
</template>
