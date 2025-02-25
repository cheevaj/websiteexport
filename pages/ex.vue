<!-- <template>
  <div fluid>
    <v-row no-gutters>
      <v-col cols="5" class="left-section d-flex align-center justify-center">
        <div class="left-content text-center">
          <h2 class="white--text font-weight-bold">Welcome Back!</h2>
          <p class="white--text">
            To stay connected with us please login with your personal info
          </p>
          <v-btn
            outlined
            class="white--text"
            color="white"
            width="150"
            @click="setStep(1)"
          >
            SIGN IN
          </v-btn>
        </div>
      </v-col>
      <v-col cols="7" class="right-section d-flex align-center justify-center">
        <div class="login-page">
          <div class="login-card">
            <h2 class="login-title">Login</h2>
            <v-text-field
              label="ຊື່ຜູ້ໃຊ້ (ສະເພາະເອັດມິນ)"
              placeholder="ກະລຸນາປ້ອມຊື່"
              single-line
              outlined
              dense
              prepend-inner-icon="mdi-account"
              v-model="email"
              class="login-input custom-font"
            ></v-text-field>
            <v-text-field
              label="ລະຫັດຜ່ານ"
              placeholder="ກະລຸນາປ້ອມລະຫັດຜ່ານ..."
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              single-line
              outlined
              dense
              prepend-inner-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              maxlength="20"
              counter
              :rules="[rules.required, rules.counter]"
              @click:append="toggleShowPassword"
              @submit.prevent="messageModal('error', 'ຍັງບໍ່ໄດ້ເປິດໃຫ້ສະໝັດ.')"
              @keydown.enter="messageModal('error', 'ຍັງບໍ່ໄດ້ເປິດໃຫ້ສະໝັດ.')"
              class="login-input custom-font"
            ></v-text-field>
            <div class="login-options">
              <v-checkbox
                v-model="rememberMe"
                label="Remember Me"
                class="login-checkbox"
                dense
              ></v-checkbox>
              <a
                href="#"
                class="forgot-password"
                @click="messageModal('error', 'ຍັງບໍ່ໄດ້ໃຫ້ບໍລິການ.')"
                >Forget Password</a
              >
            </div>
            <v-btn
              class="login-button login-card"
              large
              @click="messageModal('error', 'ຍັງບໍ່ໄດ້ໃຫ້ບໍລິການ.')"
              >Log in</v-btn
            >
            <p class="register-text" style="color: #4d4d00">
              Don’t have an account?
              <a
                href="#"
                @click="messageModal('error', 'ຍັງບໍ່ໄດ້ເປິດໃຫ້ສະໝັດ.')"
                >Register</a
              >
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rememberMe: false,
      showPassword: false,
      email: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  mounted() {
    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')
    if (storedEmail && storedPassword) {
      this.email = storedEmail
      this.password = storedPassword
      this.rememberMe = true
    }
  },
  methods: {
    setStep(value) {
      this.$store.commit('SET_STEP', value)
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    errorMessage(title, desc) {
      this.$Notice.error({
        title: `<span class="custom-font">${title}</span>`,
        desc: `<span class="custom-font">${desc}</span>`,
      })
    },
    messageModal(type, desc) {
      this.$Message[type]({
        background: true,
        content: `<span class="custom-font">${desc}<span>`,
      })
    },
  },
}
</script>
<style scoped>
.left-section {
  background: linear-gradient(
    to bottom left,
    rgb(255, 233, 81),
    rgb(255, 192, 25)
  );
  height: 90.5vh;
  color: white;
}

.left-content {
  max-width: 300px;
}

.right-section {
  background: #f9f9f9;
  height: 90.5vh;
  position: relative;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(90vh + 2px);
  background: url('~/static/BK-Image.jpg') no-repeat center center;
  background-size: cover;
}
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.login-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
}
.login-input {
  width: 100%;
  margin-bottom: 15px;
  border-radius: 20px;
}
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #fff;
}
.login-checkbox {
  color: #fff;
}
.forgot-password {
  color: #fff;
  text-decoration: none;
}
.login-button {
  width: 100%;
  color: #fff;
  margin-top: 20px;
  border-radius: 50px;
  font-weight: bold;
  background-color: rgb(255, 225, 0)!important;
}
.register-text {
  margin-top: 20px;
  color: #fff;
}
.register-text a {
  color: #4d4d00;
  font-weight: bold;
  text-decoration: none;
}
</style> -->
