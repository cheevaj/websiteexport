<template>
    <v-row justify="center">
        <v-btn class="mt-12" @click="dialog = true">
            hh
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="350px">
            <v-card>
                <v-card-title class=" pl-4 text-center">
                    <span class="text-h5"><span style="color: #ffff00">L</span>ogin</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-form>
                    <v-card-text class="py-0">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="email" :rules="[rules.required]"
                                    label="User Name Or E-mail"></v-text-field>
                            </v-col>
                            <v-col cols="12" class=" py-0">
                                <v-text-field class="py-0" v-model="password" :rules="[rules.required, rules.counter]" label="Password"
                                    :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showpassword ? 'text' : 'password'"
                                    @click:append="showpassword = !showpassword" counter maxlength="20"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-form>
                <v-card-text class="text-center mt-12">
                    <v-btn style="color:#ffff00; background-color: black; min-width: 150px;" text @click="dialog = false" @mouseenter="checkrequired()">
                        Login
                    </v-btn>
                </v-card-text>
                <!-- <v-card-text class="text-center mt-12">
                    <v-btn style="color:#ffff00; background-color: black; min-width: 150px;" text @click="dialog = false">
                        Login
                    </v-btn>
                </v-card-text>
                <v-card-text class="text-center mt-12">
                    <v-btn style="color:#ffff00; background-color: black; min-width: 150px;" text @click="dialog = false">
                        Login
                    </v-btn>
                </v-card-text> -->
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            dialog: true,
            showpassword:false,
            password: '',
            email: '',
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                // email: value => {
                //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                //     return pattern.test(value) || 'Invalid e-mail.'
                // },
            },
        }
    },
    methods:{
        checkrequired(){
            if(this.password!==''&&this.email!==''){
                // console.log('hello')

            }
            else{
                console.log('hi')
            }
        }
    }
}
</script>