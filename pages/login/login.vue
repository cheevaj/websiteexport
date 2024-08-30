<template>
    <div>
        <v-row>
            <v-col>
                <v-row class="pt-0">
                    <v-img gradient="to top right, rgba(225,225,0,0.2), rgba(0,0,0,0.2)" class="screen"
                        :src="require('@/static/login_backgroud.png')">
                        <!--https://w0.peakpx.com/wallpaper/327/941/HD-wallpaper-yellow-wave-background-yellow-abstraction-wave-waves-background-creative-yellow-background-yellow-lines-background.jpg-->
                        <v-card-text class="justify-center align-center text-center" style="height: 100%;">
                            <v-card class="text-center" max-width="340px" :class="{ 'shaking': !active }" style="background-color: rgba(255, 255, 255, 0.6); border: 1.5px solid rgb(153, 153, 0); border-radius: 20px; margin: 0 auto;
                                 top:10%; box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.5);">
                                <v-avatar class="my-2 pa-4" size="90">
                                    <img src="~/static/Tpluslogo.png" alt="John">
                                </v-avatar>
                                <v-card-text class=" text-center" width="100%" >
                                    <h2 class=" text-center custom-font" style="color: rgb(77, 77, 0);">{{ en ? 'ເຂົ້າສູ່ລະບົບ' : 'Login' }}</h2>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-form @submit.prevent="checkrequired" style="border-radius: 20px;"
                                    @keydown.enter="checkrequired">
                                    <v-card-text class="py-0" style="color: #000;">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field 
                                                    class="custom-font"
                                                    v-model="email" 
                                                    :rules="[rules.required]"
                                                    prepend-icon="mdi-account" 
                                                    :label="en ? 'ຊື່ຜູ້ໃຊ້ ຫຼື ອີເມວ' : 'User Name Or E-mail'"
                                                    :label-color="'#000'" 
                                                    style="color: #000;"
                                                    @keydown.enter="checkrequired">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="py-0">
                                                <v-text-field 
                                                    class="py-0 custom-font" 
                                                    v-model="password"
                                                    :prepend-icon="showpassword ? 'mdi-lock-open-variant' : 'mdi-lock-question'"
                                                    :rules="[rules.required, rules.counter]" 
                                                    :label="en ? 'ລະຫັດຜ່ານ' : 'Password'"
                                                    :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="showpassword ? 'text' : 'password'"
                                                    @click:append="showpassword = !showpassword" 
                                                    counter 
                                                    maxlength="20"
                                                    :label-color="'#000'" 
                                                    style="color: #000;"
                                                    @keydown.enter="checkrequired">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-text class=" text-center mt-12">
                                        <v-btn outlined class="custom-font" style="background-color: black; min-width: 150px;"
                                            :style="{ color: button ? '#ffff' : '#ffff00' }" text
                                            @mouseenter="button = false" @mouseleave="button = true"
                                            @click="checkrequired">
                                            {{ en ? 'ເຂົ້າສູ່ລະບົບ' : 'Login' }}
                                        </v-btn>
                                    </v-card-text>
                                </v-form>
                            </v-card>
                            <v-card
                                style="margin-top: 1px;min-width: 250px;border-top-left-radius: 30%; border-top-right-radius: 30%; border-bottom-left-radius: 10px; 
                                border-bottom-right-radius: 10px; top:10%; box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.5);">
                                <v-img
                                :src="require('@/static/boder.png')">
                                    <h1 class="mt-6"><span style="color: #ffff;">TI</span>CKET</h1>
                                </v-img>
                            </v-card>
                        </v-card-text>
                    </v-img>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: true,
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
    computed: {
        en() {
            return this.$store.state.en;
        },
    },
    methods: {
        setSheetHeight() {
            const screen = document.querySelector('.screen');
            if (screen) {
                const screenHeight = window.innerHeight + 10;
                screen.style.height = screenHeight + 'px';
            }
        },
        toggleActive() {
            this.active = false;
            if (!this.active) {
                setTimeout(() => {
                    this.active = true;
                }, 500);
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
                if(response){
                    this.$router.push('../');
                }    
                else { console.error('Invalid response data'); }
            } catch (err) {
                this.errorMessage();
            }
        },
        errorMessage() {
            this.$Notice.error({
                title: `<span class="custom-font">${this.en ? 'ບໍ່ພົບຜູ້ໃຊ້ນີ້' : 'User Not Found'}</span>`,
                desc: `<span class="custom-font">${this.en ? 'ກະລຸນາກວດເບິ່ງຊື່,ອີເມວ ຫຼື ລະຫັດຜ່ານຂອງທ່ານ ແລະ ລອງໃໝ່ອີກ.' : 'Check your User Name, Gmail or Password and try again.'}</span>`,
            });
            this.toggleActive();
        },
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
            const CryptoJS = require('crypto-js');
            const secretKey = 'yourSecretKey';
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
.hovered {
    background-color: rgba(255, 255, 255, 0.8);
    border-color: rgb(255, 255, 0);
}
.shaking {
    animation: shake 0.1s ease-in-out infinite alternate;
}
@keyframes shake {
    0% {
        transform: translateX(-3px);
    }

    100% {
        transform: translateX(3px);
    }
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
