<template>
    <div>
        <v-row>
            <v-row class="pt-0 px-2">
                <v-img gradient="to top right, rgba(225,225,0,0.2), rgba(0,0,0,0.2)" class="screen"
                    :src="require('@/static/login_backgroud.png')">
                    <!--https://w0.peakpx.com/wallpaper/327/941/HD-wallpaper-yellow-wave-background-yellow-abstraction-wave-waves-background-creative-yellow-background-yellow-lines-background.jpg-->
                    <v-card-text class="justify-center align-center text-center" style="height: 100%;">
                        <v-card class="text-center" max-width="340px"
                            style="background-color: rgba(255, 255, 255, 0.6); border: 1px solid black; border-radius: 20px; margin: 0 auto; top:10%;">
                            <v-avatar class="my-2 pa-4" size="90">
                                <img src="~/static/Tpluslogo.png" alt="John">
                            </v-avatar>
                            <v-card-title class=" pl-4 text-center" width="100%">
                                <span class="text-h5"><span style="color: #ffcc00">L</span>ogin</span>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-form @submit.prevent="checkrequired" style="border-radius: 20px;"
                                @keydown.enter="checkrequired">
                                <v-card-text class="py-0" style="color: #000;">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="[rules.required]"
                                                prepend-icon="mdi-account" label="User Name Or E-mail"
                                                :label-color="'#000'" style="color: #000;"
                                                @keydown.enter="checkrequired"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" class=" py-0">
                                            <v-text-field class="py-0" v-model="password"
                                                prepend-icon="mdi-lock-question"
                                                :rules="[rules.required, rules.counter]" label="Password"
                                                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="showpassword ? 'text' : 'password'"
                                                @click:append="showpassword = !showpassword" counter maxlength="20"
                                                :label-color="'#000'" style="color: #000;"
                                                @keydown.enter="checkrequired"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-text class=" text-center mt-12">
                                    <v-btn style="background-color: black; min-width: 150px;"
                                        :style="{ color: button ? '#ffff' : '#ffff00' }" text
                                        @mouseenter="button = false" @mouseleave="button = true" @click="checkrequired">
                                        Login
                                    </v-btn>

                                </v-card-text>
                            </v-form>
                        </v-card>
                        <v-card flat
                            style="border-top-left-radius: 30%; border-top-right-radius: 30%; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; top:10%;">
                            <v-img
                                src="https://t4.ftcdn.net/jpg/02/69/00/43/240_F_269004342_YF6N2N5cIfRa74IYNLADSjDMbTrPhY35.jpg">
                                <h1 class="mt-6"><span style="color: rgb(255, 255, 0);">TI</span>CKET</h1>
                            </v-img>
                        </v-card>
                    </v-card-text>
                </v-img>
            </v-row>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            button: true,
            showpassword: false,
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
            },
        }
    },
    mounted() {
        this.setSheetHeight();
        window.addEventListener('resize', this.setSheetHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setSheetHeight);
    },
    methods: {
        setSheetHeight() {
            const screen = document.querySelector('.screen');
            if (screen) {
                const screenHeight = window.innerHeight + 10;
                screen.style.height = screenHeight + 'px';
            }
        },
        async checkrequired() {
            try {
                const response = await this.$auth.loginWith('local', {
                    data: {
                        nameoremail: this.email,
                        password: this.password,
                    },
                });

                if (response.data && response.data.encryptedData) {
                    const key = response.data.encryptedData.key.data;
                    const decryptedData = this.decryptResponse(
                        response.data.encryptedData,
                        key
                    );
                    const encryptedToken = this.encryptToken(decryptedData.user.token);

                    this.dataresponse = decryptedData;

                    // Set the encrypted token as the user token
                    this.$auth.setUserToken(encryptedToken);

                    this.$store.commit('setToken', decryptedData.user.token);
                    // Log user authentication state
                    console.log('User authenticated:', this.$auth.loggedIn);

                    // Log current route before redirection
                    console.log('Current route:', this.$route.path);
                    this.$router.push('/index');
                } else {
                    console.error('Invalid response data');
                }
            } catch (err) {
                this.errorMessage();
            }
        },
        //   iview ui code
        errorMessage() {
            this.$Notice.error({
                title: 'User Not Found',
                desc: 'check your Gmail ro Password and Try again.'
            });
        },
        //   iview ui code
        decryptResponse(encryptedData, key) {
            const crypto = require('crypto');
            const algorithm = 'aes-256-cbc';
            const iv = Buffer.from(encryptedData.iv, 'hex');
            const decipher = crypto.createDecipheriv(
                algorithm,
                Buffer.from(key, 'hex'),
                iv
            );

            let decryptedData = decipher.update(
                encryptedData.data,
                'hex',
                'utf-8'
            );
            decryptedData += decipher.final('utf-8');

            try {
                return JSON.parse(decryptedData);
            } catch (e) {
                console.error('Error parsing decrypted data:', e);
                return null;
            }
        },
        encryptToken(token) {
            // Implement your token encryption logic here
            // Example: Use a cryptographic library like crypto-js
            const CryptoJS = require('crypto-js');

            // Replace 'yourSecretKey' with your actual secret key
            const secretKey = 'yourSecretKey';

            // Encrypt the token using AES encryption
            const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();

            return encryptedToken;
        },
    },
};
</script>

<style>
#screen::-webkit-scrollbar {
    display: none;
}
</style>
