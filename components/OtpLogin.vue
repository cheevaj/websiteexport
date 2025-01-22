<style>
.custom-new-otp {
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  border-radius: 4px;
}
.custom-new-otp:hover {
  color: #0056b3;
  text-decoration: none;
}
.color-BK {
  background-color: #fefefe;
  color: rgb(102, 102, 102);
}
.custom-icon-close:hover {
  color: #ffd633;
}
</style>
<script>
export default {
  props: {
    data: Object,
  },
  data: () => ({
    loading: false,
    resendCode: true,
    otp: '',
    countdown: 0,
    timer: null,
  }),
  methods: {
    async onFinish(rsp) {
      this.loading = true
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            nameoremail: this.data.email,
            password: this.data.password,
            otp: String(rsp),
          },
        })
        if (response) {
          this.$router.push('../')
        } else {
          console.error('Invalid response data')
        }
      } catch (err) {
        this.messageModal('error', 'OTP does not match.')
      } finally {
        this.otp = '';
        this.loading = false
      }
    },
    async generateNewOtp() {
      this.resendCode = false
      this.countdown = 40
      try {
        await this.$axios.post('/users/loginComfirmOTP', {
          email: '',
          nameoremail: this.data.email,
          password: this.data.password,
        })
      } catch (err) {
        console.error('Error:', err)
      }
      finally {
        this.otp = '';
        this.startCountdown();
      }
    },
    startCountdown() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--
        } else {
          clearInterval(this.timer)
          this.resendCode = true
        }
      }, 1000)
    },
    messageModal(type, content) {
      this.$Message[type]({
        background: true,
        dangerouslyUseHTMLString: true,
        content: `<span class="custom-font">${content}</span>`,
      })
    },
  },
  created() {
    this.startCountdown()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<template>
  <div class="text-center">
    <div>
      <v-img max-height="240" max-width="360" src="/otp_image_3.jpg" />
      <v-card-title class="text-h5 color-BK lighten-2">
        Enter OTP Code
      </v-card-title>
      <v-divider />
      <v-card-text class="pt-6 pb-5 px-4" style="background-color: #ffff">
        <div class="ma-auto">
          <v-otp-input
            v-model="otp"
            :disabled="loading"
            @finish="onFinish"
          ></v-otp-input>
          <v-overlay absolute :value="loading" style="border-radius: 6px">
            <v-progress-circular
              indeterminate
              color="#ffd633"
            ></v-progress-circular>
          </v-overlay>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="pr-1">Didn't receive the code?</div>
        <a
          v-if="resendCode"
          class="custom-new-otp mr-2"
          @click="generateNewOtp"
        >
          Resend Code
        </a>
        <a v-else class="custom-new-otp ml-2 mr-4"> {{ countdown }}s </a>
      </v-card-actions>
      <v-card-text class="pb-4 mt-2">
        <div class="text-center">
          <p>Please enter the verification code sent to {{ data.number }}</p>
        </div>
      </v-card-text>
    </div>
  </div>
</template>
