<template>
    <div>
        <v-row justify="center">
            <v-img class="screen"
                src="https://w0.peakpx.com/wallpaper/327/941/HD-wallpaper-yellow-wave-background-yellow-abstraction-wave-waves-background-creative-yellow-background-yellow-lines-background.jpg">
                <v-dialog v-model="dialog" persistent max-width="340px">
                    <v-card class="text-center"
                        style="background-color: rgba(255, 255, 255, 0.6); border: 1px solid black;">
                        <v-avatar class="my-2 pa-4" size="90">
                            <img src="~/static/Tpluslogo.png" alt="John">
                        </v-avatar>
                        <v-card-title class=" pl-4 text-center">
                            <span class="text-h5"><span style="color: #ffff00">L</span>ogin</span>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-form @submit.prevent="login">
                            <v-card-text class="py-0">
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field v-model="form.email" :rules="[rules.required]"
                                            prepend-icon="mdi-account" label="User Name Or E-mail"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class=" py-0">
                                        <v-text-field class="py-0" v-model="form.password"
                                            prepend-icon="mdi-lock-question" :rules="[rules.required, rules.counter]"
                                            label="Password" :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="showpassword ? 'text' : 'password'"
                                            @click:append="showpassword = !showpassword" counter
                                            maxlength="20"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-form>
                        <v-card-text class="text-center mt-12">
                            <v-btn style="color:#ffff00; background-color: black; min-width: 150px;" text
                                @click="checkrequired">
                                Login
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-img>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: true,
            showpassword: false,
            form: {
                email: '',
                password: ''
            },
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
        checkrequired() {
            console.log(this.form);
            this.dialog = false;
        },
        setSheetHeight() {
            const screen = document.querySelector('.screen');
            if (screen) {
                const screenHeight = window.innerHeight - 40;
                screen.style.height = screenHeight + 'px';
            }
        },
    }
}
</script>

<style>
#screen::-webkit-scrollbar {
    display: none;
}
</style>
