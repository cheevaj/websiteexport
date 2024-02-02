<!-- <template>
    <div>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4" sm="4" class="pr-0">
                    <v-card-title>
                        <h2>Phone number</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-dialog v-model="dialog" persistent max-width="290">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="yellow" dark v-bind="attrs" v-on="on" outlined>
                                    <h4 style="color: #000;">
                                        +856 2058812037
                                    </h4>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-actions class="yellow pa-0">
                                    <v-card-text class="text-h6 py-0 pl-2 pr-0">
                                        Connect Whatsapp QR
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-btn fab small color=" darken" text @click="dialog = false">
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                                <v-divider></v-divider>
                                <v-card-text>
                                    Sorry, Can not connected
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-card-text>
                    <v-card-text class="pr-0 ">
                        <h4>Send to</h4>
                        <div>
                            <v-card-actions class="pr-0">
                                <v-text-field v-model="numberphone" label="207xxx, 207xx" :rules="rules"
                                    hide-details="auto" />
                                <v-divider class="ml-1 pr-0 my-2" vertical style="background-color: #009242;" />
                                <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" />
                                <v-btn text outlined fab class="px-0 ml-1 mr-0" @click="$refs.fileInput.click()">
                                    <v-icon size="35" style="color: rgb(41, 163, 41);">
                                        mdi-file-excel-outline
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card-text>
                    <div v-if="numnotsend !== null && numnotsend !== undefined && numnotsend.length > 0">
                        <v-card-text class="py-0">
                            <h4>Numbers that not be Tplus number.</h4>
                            <v-card outlined>
                                <v-card-text class="py-1">
                                    <h4 v-for="(element, index) in numnotsend" :key="index">{{ element }}</h4>
                                </v-card-text>
                            </v-card>
                        </v-card-text>
                    </div>
                </v-col>
                <v-col cols="12" md="7" sm="7" class="pl-1">
                    <v-card-title>
                        <h2>Message</h2>
                    </v-card-title>
                    <v-container fluid>
                        <v-card-actions>
                            <v-textarea outlined name="input-7-4" v-model="text"></v-textarea>
                            <v-dialog v-model="dialog2" persistent max-width="650px">
                                <template v-slot:activator="{ on, attrs }">
                                    <div @mouseenter="show = 'color'" @mouseleave="show = 'notcolor'">
                                        <Button text fab class="ml-4" ghost
                                            :style="{ backgroundColor: text !== '' ? '#000' : 'rgb(242, 242, 242)' }"
                                            style="height: 50px;" v-bind="attrs" v-on="on" @click="changeNameber()">
                                            <v-icon :color="show === 'color' ? '#ffff00' : 'rgb(191, 191, 191)'"
                                                size="34">mdi-send</v-icon>
                                        </Button>
                                    </div>
                                </template>
                                <v-card>
                                    <v-toolbar color="yellow" dark flat class="pb-0 mb-0">
                                        <h1 style="color: #000;">Check Number phone</h1>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-card-actions>
                                            <h2>Messages</h2>
                                            <v-spacer></v-spacer>
                                            <v-text-field v-model="pasend" maxlength="25"
                                                :append-icon="show === 'eye' ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules_pas.required, rules_pas.min]"
                                                :type="show === 'eye' ? 'text' : 'password'" name="input-10-1"
                                                label="Enter your password:" hint="password least 8 characters" counter
                                                @click:append="show = show === 'eye' ? 'noteye' : 'eye'">
                                            </v-text-field>
                                        </v-card-actions>
                                        <v-card class="d-flex align-center justify-center mx-auto" min-width="450"
                                            min-height="76" outlined>
                                            <div v-if="numsend !== null && numsend !== undefined && numsend.length > 0">
                                                {{ text }}
                                            </div>
                                        </v-card>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6" class="pr-0"
                                                v-if="numnotsend !== null && numnotsend !== undefined && numnotsend.length > 0">
                                                <v-card-text class="pb-0 pl-0">
                                                    <div style="color: #000;">
                                                        Numbers that not be Tplus number.
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0" min-height="76" outlined>
                                                    <v-card-text>
                                                        <div v-for="(element, index) in numnotsend" :key="index">
                                                            <div>
                                                                {{ element }}
                                                            </div>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="12" sm="5" md="5" class="pr-0"
                                                v-if="numnotsend === null || numnotsend === undefined || numnotsend.length <= 0">
                                                <v-card-text class="pb-0 pl-0">
                                                    <div style="color: #000;">
                                                        Number phone is
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0" min-height="76" outlined>
                                                    <v-card-text>
                                                        +856 2058812037
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="1"
                                                v-if="numnotsend === null || numnotsend === undefined || numnotsend.length < 0">
                                                <v-card-text class="px-0" min-height="76" align="center" justify="center">
                                                    <v-icon>
                                                        mdi-send
                                                    </v-icon>
                                                </v-card-text>
                                            </v-col>
                                            <v-col cols="12" md="6" sm="6" class="pr-0">
                                                <v-card-text class="pb-0 pl-0">
                                                    <div style="color: #000;">
                                                        Tplus number.
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0" min-height="76" outlined>
                                                    <v-card-text>
                                                        <div v-for="(element, index) in numsend" :key="index">
                                                            <div
                                                                v-if="numsend !== null && numsend !== undefined && numsend.length > 0">
                                                                {{ element }}
                                                            </div>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn text color="error" @click="dialog2 = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn outlined color="yellow" @click="changePassword()">
                                            <v-icon>mdi-send</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </v-container>
                </v-col>
            </v-row>
        </v-card-text>
    </div>
</div></template>
<script>
import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            show: false,
            dialog: false,
            dialog2: false,
            loading: false,
            value: '',
            pasend: '',
            numnotsend: [],
            numsend: [],
            imageqr: '',
            numberphone: "",
            text: '',
            model: '',
            rules: [
                value => !!value || 'No, phone number',
            ],
            rules_pas: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },
    methods: {
        async sedQrchart() {
            try {
                const response = await this.$axios.post('http://172.28.26.23:3335/sendtouser/alerttouser', {
                    numeros: this.numsend,
                    mensaje: this.text,
                });
                this.resultados = response.data.resultados;
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
            this.dialog2 = false;
            this.renderFunc();
        },
        // -------------------------------------------------------------------
        handleFileUpload(event) {
            const fileInput = this.$refs.fileInput;
            const file = event.target.files[0];
            fileInput.value = '';
            this.readFile(file);
        },
        readFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                this.numsend = jsonData.flat().map(cell => String(cell));
                this.numberphone = this.numsend;
            };
            reader.readAsBinaryString(file);
        },
        changeNameber() {
            const numeber = this.numberphone;
            if (numeber && numeber.length > 7) {
                const numeros = this.numberphone.split(',').map(numero => numero.trim());
                const num = numeros.map((n) => {
                    if (n.substring(n.length - 8, n.length - 7) === '7') {
                        return "20" + n.substring(n.length - 8);
                    } else {
                        return '';
                    }
                }).filter(n => n !== '');
                this.numnotsend = numeros.map((n, index) => {
                    if (n.substring(n.length - 8, n.length - 7) === '7') {
                        return '';
                    } else {

                        return (n);
                    }
                }).filter(n => n !== '');
                console.log('ll', this.numnotsend)
                this.numsend = num;
            } else {
                const title = 'The numbers phone is less than 8 digits.';
                const desc = ' Check your number phones.';
                this.error(false, title, desc);
            }
            this.show = true;
            console.log(this.numsend)
        },
        changePassword() {
            const nunpa = this.numsend[0];
            if (nunpa === this.pasend) {
                if (this.numnotsend.length <= 0) {
                    this.sedQrchart();
                }
                else {
                    const title = 'The numbers that not be Tplus.';
                    const desc = ' Check your number phones.';
                    this.error(false, title, desc);
                }
            } else {
                const title = 'The password is incorrect.';
                const desc = 'check your password and Try again.';
                this.error(false, title, desc);
            }
        },
        renderFunc() {
            this.text = '';
            this.pasend = ''
            this.$Notice.success({
                title: 'Messages sent successfully.',
                desc: ' You sent messages submitted successfully.',
            });

        },
        error(nodesc, title, desc) {
            this.$Notice.error({
                title,
                desc: nodesc ? '' : desc,
            });
        },

    }

}
</script>
<style>
.color_yellow {
    background-color: #ffff00;
    color: #000;
}
</style> -->