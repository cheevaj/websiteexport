<template>
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
                        <v-card-actions class="pr-0">
                            <v-text-field v-model="numberphone" label="207xxx, 207xx" :rules="rules" hide-details="auto" />
                            <v-divider class="ml-1 pr-0 my-2" vertical style="background-color: #009242;" />
                            <Tooltip content="Import file Excel." placement="bottom" :delay="800">
                                <input type="file" ref="fileInput" style="display: none"
                                    @change="handleFileUpload('send_num', $event)" />
                                <v-btn text fab class="px-0 ml-1 mr-0" @click="$refs.fileInput.click()">
                                    <v-icon size="35" style="color: rgb(41, 163, 41);">
                                        mdi-file-excel-outline
                                    </v-icon>
                                </v-btn>
                            </Tooltip>
                        </v-card-actions>
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
                <v-col cols="12" md="8" sm="8" class="pl-1">
                    <v-card-actions>
                        <v-card-title>
                            <h2>Message</h2>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <Tooltip content="Edit file import." placement="bottom" :delay="800">
                            <v-btn fab text style="background-color: #ffff00; color: #000;" @click="dialogseting = true">
                                <v-icon size="35">
                                    mdi-file-cog
                                </v-icon>
                            </v-btn>
                        </Tooltip>
                        <v-dialog v-model="dialogseting" persistent max-width="300">
                            <v-card>
                                <v-card-title style="color: rgb(115, 115, 115);">
                                    Excel table
                                </v-card-title>
                                <v-divider style="background-color: #ffff00;"></v-divider>
                                <v-card-actions>
                                    <div>
                                        <p>Row</p>
                                        <InputNumber :min="1" v-model="rowNum" />
                                    </div>
                                    <div>
                                        <p>Column</p>
                                        <InputNumber :min="0" v-model="colNum" />
                                    </div>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="error darken-1" text @click="changeRow(false)">
                                        Resat
                                    </v-btn>
                                    <v-btn color="#ffff" style="background-color: #ffff00;" text @click="changeRow(true)">
                                        save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-actions>
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
                                        <v-card class="d-flex align-center justify-center mx-auto overflow-auto"
                                            min-width="450" max-height="100px" min-height="76" outlined>
                                            <div v-if="numsend !== null && numsend !== undefined && numsend.length > 0">
                                                {{ text }}
                                            </div>
                                        </v-card>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6" class="pr-0"
                                                v-if="numnotsend !== null && numnotsend !== undefined && numnotsend.length > 0">
                                                <v-card-text class="pb-0 pl-0 ">
                                                    <div style="color: #000;">
                                                        Numbers that not be Tplus number.
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0 overflow-auto" min-height="76" max-height="200px"
                                                    outlined>
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
                                                <v-card class="rounded-0 overflow-auto" min-height="76" max-height="200px"
                                                    outlined>
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
            <v-card-title class="pb-0">
                <h3>
                    Add number phone to Database
                </h3>
            </v-card-title>
            <v-divider style="background-color: #ffff00;" />
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="4" sm="4">
                        <p>
                            Import your phone number file by clicking <span><v-icon
                                    style="color:rgb(41,163,41)">mdi-microsoft-excel</v-icon></span>
                        </p>
                        <p>
                            Click Save in bock Pop Up to add number phone to database
                        </p>
                    </v-col>
                    <v-col cols="12" md="3" sm="3">
                        <template>
                            <Tooltip content="Import file Excel." placement="bottom" :delay="800">
                                <input type="file" ref="fileAdd" style="display: none"
                                    @change="handleFileUpload('add_num', $event)" />
                                <v-btn outlined class="ml-1 mr-0 text-center" height="50px"
                                    style="background-color:#fafabd;" @click="$refs.fileAdd.click()">
                                    <v-icon size="45" style="color: rgb(41, 163, 41);">
                                        mdi-microsoft-excel
                                    </v-icon>
                                </v-btn>
                            </Tooltip>
                        </template>
                        <v-dialog v-model="dialog3" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card max-height="100%">
                                <v-row class="yellow pa-0 ma-0">
                                    <v-col cols="8" md="9" sm="9" class="pa-0 ma-0">
                                        <v-card-text class="yellow pa-0">
                                            <v-card-text class="text-h6 pa-4">
                                                Number phone Upload
                                            </v-card-text>
                                            <v-spacer></v-spacer>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="4" md="3" sm="3" class="pa-0 ma-0">
                                        <v-card-actions class="mr-12 pt-3">
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-4" color="error" text @click="deleteNum()">
                                                cancel
                                            </v-btn>
                                            <v-btn class="mx-2" @click="addNumber_database()"
                                                style="background-color: #000; color: #ffff00;">
                                                <v-icon>mdi-content-save-move-outline</v-icon>
                                                Add
                                            </v-btn>
                                        </v-card-actions>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-card-text class="px-0">
                                    <v-simple-table fixed-header height="580px">
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left" style="background-color: #000;color: #ffff00;">
                                                        Index
                                                    </th>
                                                    <th class="text-left" style="background-color: #000;color: #ffff00;">
                                                        Numbers
                                                    </th>
                                                    <th class="text-left" style="background-color:#000;color: #ffff00;">
                                                        Whatsapp
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in addNumber" :key="index">
                                                    <td>{{ index }}</td>
                                                    <td>{{ item }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card-text>
    </div>
</div></template>
<script>
import * as XLSX from 'xlsx';
export default {
    data() {
        return {
            dialogseting: false,
            show: false,
            dialog: false,
            dialog2: false,
            dialog3: false,
            colNum: 1,
            rowNum: 1,
            value: '',
            pasend: '',
            numnotsend: [],
            numsend: [],
            imageqr: '',
            numberphone: "",
            addNumber: [],
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
                const response = await this.$axios.post('http://172.28.26.23:3335/sendtouser/saveandalerttouser', {
                    numeros: this.numsend,
                    mensaje: this.text,
                });
                this.resultados = response.data.resultados;
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
            this.dialog2 = false;
            this.numsend = [];
            this.numberphone = "";
            this.renderFunc('Messages sent successfully.', ' You sent messages submitted successfully.');
        },
        async addNumber_database() {
            try {
                const response = await this.$axios.post('http://172.28.26.23:3335/sendtouser/insertnumbers', {
                    numeros: this.addNumber,
                });
                this.resultados = response.data.resultados;
            } catch (error) {
                console.error('Error al enviar el mensaje:', error);
            }
            this.addNumber = [];
            this.dialog3 = false;
            this.renderFunc('Add number phone success.', ' You can add number to database successfully.');
        },
        // -------------------------------------------------------------------
        handleFileUpload(tyNum, event) {
            const fileInput = tyNum === 'send_num' ? this.$refs.fileInput : this.$refs.fileAdd; // ---- undefined
            if (event.target.files.length > 0) {
                const file = event.target.files[0];
                fileInput.value = '';
                this.readFile(tyNum, file);
            } else {
                console.log('No file selected');
            }
        },
        readFile(tyNum, file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // -------------- Assuming phone numbers are in the specified column (colNum)
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: this.colNum - 1 });
                console.log(jsonData)

                // ---------------- Extract data from the specified column and row
                const extractedData = jsonData.map(row => row[this.rowNum - 1]);

                // ---------------- Remove the header (assuming the header is in the first row)
                extractedData.shift();

                // --------------- Set this.numsend to the extracted phone numbers
                if (tyNum === 'send_num') {
                    this.numsend = extractedData.map(cell => String(cell));
                    this.numberphone = this.numsend;
                } else if (tyNum === 'add_num') {
                    const addnum = extractedData.map(cell => String(cell));
                    this.addNumber = addnum.filter(item => item !== 'undefined');
                    this.dialog3 = true;
                } else {
                    return '';
                }
            };
            reader.readAsBinaryString(file);
        },
        deleteNum() {
            this.addNumber = [];
            this.dialog3 = false;
        },
        changeNameber() {
            const numeber = this.numberphone;
            const num = Math.max(...this.numsend.map(Number));
            // console.log('llo', num)
            // Check if numeber is a string
            if ((typeof numeber === 'string' && numeber.length > 7) || num >= 0) {
                const numeros = numeber.split(',').map(numero => numero.trim());
                const num = numeros.map((n) => {
                    if (n.substring(n.length - 8, n.length - 7) === '7') {
                        return "20" + n.substring(n.length - 8);
                    } else {
                        return '';
                    }
                }).filter(n => n !== '');
                this.numnotsend = numeros.map((n) => {
                    if (n.substring(n.length - 8, n.length - 7) === '7') {
                        return '';
                    } else {
                        return n;
                    }
                }).filter(n => n !== '');

                this.numsend = num;
            } else {
                // Handle the case where numeber is not a string or has length <= 7
                const title = 'Invalid input';
                const desc = 'The input should be a string with length greater than 7.';
                this.error(false, title, desc);
            }

            this.show = true;
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
        changeRow(status) {
            if (status) {
                this.dialogseting = false;
            }
            else {
                this.colNum = 1;
                this.rowNum = 1;
                this.dialogseting = false;
            }
            console.log('ll', this.colNum, this.rowNum)
        },
        renderFunc(smsTitle, smsText) {
            this.text = '';
            this.pasend = ''
            this.$Notice.success({
                title: smsTitle,
                desc: smsText,
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

.top,
.bottom {
    text-align: center;
}

.center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
}

.center-left {
    float: left;
}

.center-right {
    float: right;
}
</style>