<template>
    <div style="background-color: rgb(242, 242, 242); height: 91vh;">
        <v-overlay :value="modelSend"></v-overlay>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="4" sm="4" class="pr-0">
                    <v-card-title>
                        <h2 :class="{'custom-font' : en}">{{ en ? 'ເບີໂທລະສັບ' : 'Phone number'}}</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-dialog v-model="dialog" persistent max-width="290">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="yellow" dark v-bind="attrs" v-on="on" outlined>
                                    <h4 style="color: #000;">
                                        +856 2078927154
                                    </h4>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-actions class="yellow pa-0">
                                    <v-card-text class="text-h6 py-0 pl-2 pr-0" :class="{'custom-font' : en}">
                                        {{ en ? 'ເຊື່ອມຕໍ່ Whatsapp QR' : 'Connect Whatsapp QR'}}
                                    </v-card-text>
                                    <v-spacer></v-spacer>
                                    <v-btn fab small color=" darken" text @click="dialog = false">
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                </v-card-actions>
                                <v-divider></v-divider>
                                <v-card-text :class="{'custom-font' : en}">
                                    {{ en ? 'ຍັງບໍ່ສາມາດ ເປີດເຊືອມໄດ້' : 'Sorry, Can not connected'}}
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                    </v-card-text>
                    <v-card-text class="pr-0 ">
                        <h4 :class="{'custom-font' : en}">{{ en ? 'ສົ່ງໃຫ້ເບີ' : 'Send to'}}</h4>
                        <v-card-actions class="pr-0">
                            <Input v-model="numberphone" size="large" :maxlength="sendAuto ? false :10" :placeholder="sendAuto ? 'ປ້ອມຈໍານອນເບີ: 207xxx...,207xxx...' : 'ປ້ອມເບີ: 207xxx...'" class="custom-input custom-font"/>
                            <Tooltip content="Import file Excel." placement="bottom" :delay="800">
                                <input type="file" ref="fileInput" style="display: none"
                                    @change="handleFileUpload('send_num', $event)" />
                                <v-btn text fab :disabled="!sendAuto" class="px-0 ml-1 mr-0" @click="$refs.fileInput.click()">
                                    <v-icon size="35" style="color: rgb(41, 163, 41);">
                                        mdi-file-excel-outline
                                    </v-icon>
                                </v-btn>
                            </Tooltip>
                        </v-card-actions>
                    </v-card-text>
                </v-col>
                <v-col cols="12" md="8" sm="8" class="pl-1">
                    <v-card-actions>
                        <v-card-title>
                            <h2 :class="{'custom-font' : en}">{{ en ? 'ຂໍ້ຄວາມ' : 'Message'}}</h2>
                        </v-card-title>
                        <v-spacer></v-spacer>
                        <h3 class="custom-font">{{ tooltipContent }}</h3>&nbsp;&nbsp;
                        <Tooltip :content="tooltipContent" placement="bottom" :delay="800" :class="{'custom-font' : en}">
                            <i-Switch
                                v-model="sendAuto"
                                size="small"
                                true-color="#ffcc00"

                            />
                        </Tooltip>
                        <!-- <v-dialog
                          v-model="select"
                          fullscreen
                          hide-overlay
                          transition="dialog-bottom-transition"
                          scrollable
                        >
                        <v-card class="rounded-0">
                            <v-card-actions class="py-1 pl-1 pr-2" style="background-color: #ffff00">
                            <v-btn
                                text
                                x-small
                                style="background-color: transparent; color: transparent"
                                @click="select = !select"
                                ><v-icon size="30" color="#ffff">mdi-arrow-left-bold</v-icon></v-btn
                            >
                            <v-spacer></v-spacer>
                            <h2 class="custom-font">ລາຍລະອຽດວີດີໂອ</h2>
                            <v-spacer></v-spacer>
                            <v-btn fab outlined x-small @click="select = !select"
                                ><v-icon>mdi-close</v-icon></v-btn
                            >
                            </v-card-actions>
                            <v-card-text class="px-0" style="padding-top: 3px; padding-bottom: 4px">
                            
                            </v-card-text>
                        </v-card>
                        </v-dialog> -->
                        <Modal
                            v-model="modelSend"
                            draggable
                            scrollable
                            :mask="false"
                            width="340"
                            style="padding: 0px"
                        >
                            <template #header>
                            <div style="color: rgb(255, 215, 0); text-align: center">
                                <v-icon color="rgb(255, 215, 0)"
                                >mdi-send-variant-clock-outline</v-icon
                                >
                                <span class="custom-font">ສົ່ງຂໍ້ຄວາມອັດຕະໂນມັດ</span>
                            </div>
                            </template>
                            <div>
                            <div style="text-align: center">
                                <v-card class="rounded-0 text-center table-container" height="200px" outlined>
                                    <div class="scrollable-content" :class="{'custom-font' : en}">
                                        
                                    </div>
                                </v-card>
                            </div>
                            </div>
                            <template #footer>
                                <v-card-actions>
                                    <Button
                                    size="large"
                                    long
                                    style="background-color: rgb(230, 230, 0); color: #ffff"
                                    @click="openBook"
                                    >
                                    <v-icon color="#ffff">mdi-book-open-page-variant</v-icon>&nbsp;<span
                                    class="custom-font"
                                    >ຄູ່ມື</span
                                    >
                                </Button>
                                <Button
                                    size="large"
                                    long
                                    style=" color: #ffff"
                                    :style="{ backgroundColor: !sendAuto ? '#ff9900' : '#333300' }"
                                    @click="openAutosend"
                                    >
                                    <v-icon color="#ffff">mdi-repeat-variant</v-icon>&nbsp;<span
                                    class="custom-font"
                                    >{{ !sendAuto ? 'ເປີດໃຊ້ງານ' : 'ປີດໃຊ້ງານ'}}</span
                                    >
                                </Button>
                            </v-card-actions>
                            </template>
                        </Modal>
                        <v-spacer></v-spacer>
                        <Tooltip :content="tooltipEditFile" placement="bottom" :delay="800" :class="{'custom-font' : en}">
                            <v-btn fab text style="background-color: #ffff00; color: #000;"
                                @click="dialogseting = true">
                                <v-icon size="35">
                                    mdi-file-cog
                                </v-icon>
                            </v-btn>
                        </Tooltip>
                        <v-dialog v-model="dialogseting" persistent max-width="300">
                            <v-card>
                                <v-card-title :class="{'custom-font' : en}" style="color: rgb(115, 115, 115);">
                                    {{ en ? 'ຕາຕະລາງ Excel ເບີໂທ' : 'Excel table'}}
                                </v-card-title>
                                <v-divider style="background-color: #ffff00;"></v-divider>
                                <v-card-actions>
                                    <div>
                                        <p :class="{'custom-font' : en}" >{{ en ? 'ເລີ່ມຈາກແຖວທີ່' : 'Start Row'}}</p>
                                        <InputNumber :min="1" v-model="rowNum" />
                                    </div>
                                    <div>
                                        <p :class="{'custom-font' : en}" >{{ en ? 'ເລີ່ມຈາກຖັງທີ່' : 'Start Column'}}</p>
                                        <InputNumber :min="0" v-model="colNum" />
                                    </div>
                                </v-card-actions>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn :class="{'custom-font' : en}" color="error darken-1" text @click="changeRow(false)">
                                        {{ en ? 'ຍົກເລີກ' : 'Cancel'}}
                                    </v-btn>
                                    <v-btn :class="{'custom-font' : en}" color="#ffff" style="background-color: #ffff00;" text
                                        @click="changeRow(true)">
                                        {{ en ? 'ບັນທືກ' : 'save'}}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-actions>
                    <v-container fluid>
                        <v-card-actions>
                            <Input v-model="text" type="textarea" :rows="8" placeholder="ຂໍ້ຄວາມ..." :class="{'custom-font' : en}" class="table-container" style="background-color: #ffff;" />    
                            <v-dialog v-model="dialog2" persistent max-width="650px">
                                <template v-slot:activator="{ on, attrs }">
                                    <div class="ml-4" @mouseenter="show = 'color'" @mouseleave="show = 'notcolor'">
                                        <Button text fab ghost :disabled="text !== '' ? false : true " class="pa-0"
                                            :style="{ backgroundColor: text !== '' ? '#000' : 'rgb(255, 255, 255)' }"
                                            style="height: 50px; width: 50px; border-radius: 50%;" v-bind="attrs" v-on="on" @click=" changeNameber">
                                            <v-icon :color="show === 'color' ? '#00cc00' : 'rgb(191, 191, 191)'"
                                                size="34">{{ sendAuto ? 'mdi-send-clock-outline' : 'mdi-whatsapp' }}</v-icon>
                                        </Button>
                                    </div>
                                </template>
                                <v-card style="background-color: #f2f2f2;">
                                    <v-toolbar color="yellow" dark flat class="pb-0 mb-0">
                                        <h1 :class="{'custom-font' : en}" style="color: #000;">{{ en ? 'ກວດເບິ່ງເບີໂທລະສັບ ແລະ ຂໍ້ຄວາມ' : 'Check Number phone and Message'}}</h1>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-card-actions>
                                            <h2 :class="{'custom-font' : en}">{{ en ? 'ຂໍ້ຄວາມ' : 'Messages' }}</h2>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                        <v-card v-if="(sendAuto && !text )" class="mx-auto table-container pa-4 text-center" min-width="450" height="145px" outlined style="display: flex; flex-direction: column; justify-content: center">
                                            <v-card-actions class="pa-0">
                                                <v-icon size="45px" color="#ffcc00" class="px-4">mdi-email-arrow-right</v-icon>
                                                <v-spacer />
                                                <v-progress-linear
                                                  color="lighten-2"
                                                  buffer-value="0"
                                                  stream
                                                  reverse
                                                  style="color: #ffcc00;"
                                                />
                                                <v-spacer />
                                              <v-progress-circular
                                                :rotate="90"
                                                :size="100"
                                                :width="15"
                                                :value="values"
                                                color="#ffcc00"
                                                class="px-0"
                                            >
                                                {{ values }}%
                                              </v-progress-circular>
                                          </v-card-actions>
                                        </v-card>
                                        <v-card v-else class="mx-auto table-container pa-0" min-width="450" height="145px" outlined>
                                            <div class="scrollable-content pa-4" :class="{'custom-font' : en}" v-html="formatText(text)">
                                            </div>
                                        </v-card>
                                        <v-row>
                                            <v-col cols="12" sm="5" md="5" class="pr-0">
                                                <v-card-text class="pb-0 pl-0 text-center">
                                                    <div :class="{'custom-font' : en}" style="color: #000;">
                                                        {{ en ? 'ເບີໂທລະສັບທີ່ສົ່ງ' : 'Number phone is' }}
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0 text-center" height="154" outlined>
                                                    <v-card-text class="text-center">
                                                        +856 2078927154
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="2" style="padding-top: 65px;">
                                                <v-card-text class="px-0" height="100%" align="center"
                                                    justify="center">
                                                    <v-icon color="#ffcc00">
                                                        mdi-transfer-right
                                                    </v-icon>
                                                </v-card-text>
                                            </v-col>
                                            <v-col cols="12" md="5" sm="5" class="pl-0 pr-3">
                                                <v-card-text class="pb-0 pl-0 text-center">
                                                    <div :class="{'custom-font' : en}" style="color: #000;">
                                                        {{ en ? 'ເບີທີ່ຈະສົ່ງ' : 'The number phone to be sent.' }}
                                                    </div>
                                                </v-card-text>
                                                <v-card class="rounded-0 text-center table-container" height="154px" outlined>
                                                    <div class="scrollable-content" :class="{'custom-font' : en}">
                                                        <div v-for="(element, index) in numsend" :key="index">
                                                        <div class="py-1"
                                                            v-if="numsend !== null && numsend !== undefined && numsend.length > 0">
                                                            {{ element }}
                                                        </div>
                                                        </div>
                                                    </div>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions class="justify-end mx-3">
                                        <v-card-actions v-if="sendAuto" >
                                            <div>{{ numsend.length }}</div>
                                            <v-icon>mdi-arrow-right-thin</v-icon>
                                            <div>{{ formatTime(numsend.length * 5) }} </div>
                                        </v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn :disabled="(sendAuto && !text )" :class="{ 'custom-font': en, 'cursor-btn': sendAuto && !text }" text color="error" @click="dialog2 = false">
                                            {{ en ? 'ຍົກເລີກ' : 'Cancel'}}
                                        </v-btn>
                                        <v-btn outlined :disabled="(sendAuto && !text )" :class="{'cursor-btn' :sendAuto && !text }" color="yellow" @click="sendMess">
                                            <v-icon>{{ sendAuto ? 'mdi-send-variant-clock' : 'mdi-send' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </v-container>
                </v-col>
            </v-row>
            <v-card-title class="pb-0">
                <h3 :class="{'custom-font' : en}">
                    {{ en ? 'ເພີ່ມເລກໂທລະສັບໄປທີ່ຫໍຖານຂໍ້ມູນ' : 'Add number phone to Database' }}
                </h3>
            </v-card-title>
            <v-divider style="background-color: #ffff00;" />
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="4" sm="4">
                        <p :class="{'custom-font' : en}">
                            {{ en ? 'ນໍາເຂົ້າໄຟລ໌ໝາຍເລກໂທລະສັບຂອງທ່ານໂດຍການຄລິກປຸ່ມ' : 'Import your phone number file by clicking' }} <span><v-icon
                                    style="color:rgb(41,163,41)">mdi-microsoft-excel</v-icon></span>
                        </p>
                        <p :class="{'custom-font' : en}">
                            {{ en ? 'ກົດ ບັນທືກ ຢູ່ເທີງໃນບອດທີ່ເດັ່ນຂື້ນມາ ເພື່ອເພີ່ມເບີໂທລະສັບໃສ່ຖານຂໍ້ມູນ' : 'Click Save in bock Pop Up to add number phone to database' }}
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
                                        <v-card-text class="yellow pa-0 ">
                                            <v-card-text class="pa-4 custom-font">
                                                <h3 :class="{'custom-font' : en}">{{ en ? 'ເພີ່ມເບີໂທລະສັບ' : 'Upload  Number phone' }}</h3> 
                                            </v-card-text>
                                            <v-spacer></v-spacer>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="4" md="3" sm="3" class="pa-0 ma-0">
                                        <v-card-actions class="mr-12 pt-3">
                                            <v-spacer></v-spacer>
                                            <v-btn class="mr-4 custom-font" color="error" text @click="deleteNum()">
                                                {{ en ? 'ຍົກເລີກ' : 'cancel' }}
                                            </v-btn>
                                            <v-btn class="mx-2 custom-font" @click="addNumber_database()"
                                                style="background-color: #000; color: #ffff00;">
                                                <v-icon>mdi-content-save-move-outline</v-icon>
                                                {{ en ? 'ເພີ່ມ' : 'Add' }}
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
                                                    <th class="text-left custom-font"
                                                        style="background-color: #000;color: #ffff00;">
                                                        {{ en ? 'ລໍາດັບ' : 'Index'}}
                                                    </th>
                                                    <th class="text-left custom-font"
                                                        style="background-color: #000;color: #ffff00;">
                                                        {{ en ? 'ເລກໂທລະສັບ' : 'Numbers'}}
                                                    </th>
                                                    <th class="text-left custom-font" style="background-color:#000;color: #ffff00;">
                                                        {{ en ? 'ເລກ WhatsApp' : 'WhatsApp'}}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in addNumber" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ item }}</td>
                                                    <td>+856 {{ item }}</td>
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
</template>
<script>
import * as XLSX from 'xlsx';
export default {
  middleware: 'auth',
    data() {
        return {
            modelSend:false,
            select:true,
            sendAuto:false,
            dialogseting: false,
            sendMessage:false,
            show: false,
            dialog: false,
            dialog2: false,
            dialog3: false,
            colNum: 1,
            rowNum: 1,
            values:0,
            value: '',
            pasend: '',
            numsend: [],
            imageqr: '',
            numberphone: "",
            addNumber: [],
            text: '',
            model: '',
            rules: [
                value => !!value || `${ this.en ? 'ບໍ່ມີເບີໂທລະສັບ' : 'No, phone number'}`,
            ],
            rules_pas: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 1 || 'Min 1 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        };
    },
    computed: {
    en() {
      return this.$store.state.en;
    },
    token(){
        return this.$store.state.tokenShow;
    },
    tooltipContent() {
      return this.en ? 'ສົ່ງຂໍ້ຄວາມອັດຕະໂນມັດ.' : 'Send Message auto.';
    },
    tooltipEditFile(){
      return this.en ? 'ເເກ້ໄຂໄຟຣຈະນໍາເຂົ້າ.' : 'Edit file import.';
    }
    },
    methods: {
        formatText(text) {
        return text.replace(/\n/g, '<br>');
        },
        formatTime(seconds) {
            if (seconds < 60) {
                return `${seconds}s`;
            } else if (seconds === 60) {
                return `1n`;
            } else if (seconds < 3600) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                return remainingSeconds > 0 
                    ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}s`
                    : `${minutes}n`;
            } else {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const remainingSeconds = seconds % 60;
                return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}s`;
            }
        },
        handleBeforeChange() {
        return new Promise((resolve) => {
            this.$Modal.confirm({
            title: this.en ? `<span class="custom-font">${'ເປິດໃຊ້ງານ'}</span>` : "Open",
            content: `<span class="custom-font">${ this.en ? 'ປິດໃຊ້ງານ' : 'Deactivate'}</span>`,
            onOk: () => {
                this.sendAuto = true;
                resolve(true);
            },
            onCancel: () => {
                this.sendAuto = false;
                resolve(false)
            },
            })
        })
        },
        sendMess(){
            if(this.sendAuto){
                this.sendMessageAuto();
            }
            else {
                this.sendMessageToWhatApp()
            }
        },
        async sendMessageToWhatApp() {
            if(this.sendMessage){
                try {                                    
                    console.log('Sending to API:', { numeros: this.numsend, mensaje: this.text });                                              
                    const response = await this.$axios.post('http://172.28.26.23:3335/sendtouser/alerttouser', {
                    numeros: this.numsend,
                    mensaje: this.text,
                    });
                    this.resultados = response.data.resultados;
                    this.renderFunc( this.en ? 'ສົ່ງຂໍ້ຄວາມສຳເລັດແລ້ວ.' : 'Messages sent successfully.', this.en ? 'ທ່ານໄດ້ສົ່ງຂໍ້ຄວາມສໍາເລັດເເລ້ວ.' : 'You sent messages submitted successfully.');
                } catch (error) {
                    console.error('Error al enviar el mensaje:', error);
                }
                this.dialog2 = false;
                this.numsend = [];
                this.numberphone = "";
            } else {
                const title =`<span :class="{'custom-font' : en}">${this.en ? 'ປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ' : 'Invalid input'}</span>`;
                const desc =`<span :class="{'custom-font' : en}">${this.en ? 'ການປ້ອນຂໍ້ມູນຂອງທ່ານອາດບໍ່ມີເບີ ຫຼື ຂໍ້ຄວາມ.' : 'Your input may not contain numbers or Message.'}</span>`
                this.error(false, title, desc);
            }
        },
        async sendMessageAuto() {
            if (this.sendMessage && this.numsend.length > 0) {
                const originalMessage = this.text;
                this.values = 0;
                for (const [index, numero] of this.numsend.entries()) {
                    try {
                        const response = await this.$axios.post('http://172.28.26.23:3335/sendtouser/alerttouser', {
                            numeros: [numero],
                            mensaje: originalMessage,
                        });
                        this.resultados = response.data.resultados;
                        this.renderFunc(
                            this.en ? 'ສົ່ງຂໍ້ຄວາມສຳເລັດແລ້ວ.' : 'Messages sent successfully.',
                            this.en ? 'ທ່ານໄດ້ສົ່ງຂໍ້ຄວາມສໍາເລັດເເລ້ວ.' : 'You sent messages submitted successfully.'
                        );
                        this.values = parseFloat((((index + 1) / this.numsend.length) * 100).toFixed(1));
                        if (index < this.numsend.length - 1) {
                            const randomDelay = Math.floor(Math.random() * (15000 - 11500)) + 11500;
                            console.log(`Waiting for ${randomDelay / 1000} seconds before sending the next message to ${this.numsend[index + 1]}`);
                            await new Promise(resolve => setTimeout(resolve, randomDelay));
                        }
                    } catch (error) {
                        console.error('Error sending message to:', numero, error);
                        break;
                    }
                }
                this.dialog2 = false;
                this.numsend = [];
                this.numberphone = "";
            } else {
                const title = `<span :class="{'custom-font' : en}">${this.en ? 'ປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ' : 'Invalid input'}</span>`;
                const desc = `<span :class="{'custom-font' : en}">${this.en ? 'ການປ້ອນຂໍ້ມູນຂອງທ່ານອາດບໍ່ມີເບີ ຫຼື ຂໍ້ຄວາມ.' : 'Your input may not contain numbers or Message.'}</span>`;
                this.error(false, title, desc);
            }
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
        handleFileUpload(tyNum, event) {
            const fileInput = tyNum === 'send_num' ? this.$refs.fileInput : this.$refs.fileAdd;
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
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, range: this.colNum - 1 });
                const extractedData = jsonData.map(row => row[this.rowNum - 1]);
                extractedData.shift();
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
            if (typeof numeber === 'string' && ( numeber.length === 8 || numeber.length >= 10)) {
                const numeros = numeber.split(',').map(numero => numero.trim());
                this.numsend = numeros.map((n) => {
                    if (n.substring(n.length - 8)) {
                        return "20" + n.substring(n.length - 8);
                    } else {
                        return '';
                    }
                }).filter(n => n !== '');
                this.show = true;
                this.sendMessage = true;
                console.log('Num:',this.numsend);
            } else {
                const title =`<span :class="{'custom-font' : en}">${this.en ? 'ປ້ອນຂໍ້ມູນເບີບໍ່ຖືກຕ້ອງ' : 'Invalid number input'}</span>`;
                const desc =`<span :class="{'custom-font' : en}">${this.en ? 'ປ້ອນເບີໂທຂອງທ່ານບໍ່ຖືກ.' : 'check your home number.'}</span>`
                this.sendMessage = false;
                this.error(false, title, desc);
            }
        },
        openAutosend(){
            this.sendAuto = !this.sendAuto;
            this.modelSend = !this.modelSend;
        },
        openBook(){
            this.select = !this.select;
            this.modelSend = !this.modelSend;
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
        },
        renderFunc(smsTitle, smsText) {
            this.text = '';
            this.pasend = ''
            this.$Notice.success({
                title: `<span class="${this.en ? 'custom-font' : ''}">${smsTitle}</span>`,
                desc: `<span class="${this.en ? 'custom-font' : ''}">${smsText}</span>`,
            });

        },
        error(nodesc, title, desc) {
            this.$Notice.error({
                title: `<span class="${this.en ? 'custom-font' : ''}">${title}</span>`,
                desc: nodesc ? '' : `<span class="${this.en ? 'custom-font' : ''}">${desc}</span>`,
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
.custom-input {
   border: 1px solid #a6a6a6;
   border-radius: 5px;
}
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

.custom-font {
    font-family: 'Noto Sans Lao', sans-serif;
}
.scrollable-content {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 10px;
}
.v-progress-circular {
  margin: 1rem;
}
.table-container ::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.table-container ::-webkit-scrollbar-thumb {
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}

.table-container ::-webkit-scrollbar-corner {
  background-color: rgb(255, 204, 0);
  border-radius: 4px;
}
.cursor-btn:hover {
  cursor: not-allowed;
}
</style>