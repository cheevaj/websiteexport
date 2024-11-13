<template>
  <div>
    <v-card
      class="rounded-0 scrollbar"
      flat
      style="
        overflow-y: auto;
        left: 0;
        height: 548px;
        background-color: #f2f2f2;
      "
    >
      <v-card
        height="548px"
        flat
        fixed-header
        class="elevation-1 custom-font "
      >
        <v-card flat class="py-2 px-4 table-container" height="548px">
          <Tree :data="result" class="table-container"></Tree>
        </v-card>
        <v-btn
          text
          fab
          x-small
          class="custom-font custom-btn"
          style="
            position: absolute;
            right: 16px;
            top: 8px;
          "
          @click="province"
          ><v-icon color="rgb(255, 204, 0)">mdi-restore</v-icon></v-btn
        >
        <v-btn
          text
          small
          class="custom-font custom-btn"
          style="
            position: absolute;
            right: 16px;
            bottom: 8px;
            background-color: rgb(255, 204, 0);
          "
          @click="addqueqeue = true"
          >ຈອງຄິວ</v-btn
        >
        <v-dialog v-model="addqueqeue" persistent width="480">
          <v-card>
            <v-stepper
              v-model="e1"
              flat
              style="background-color: rgb(242, 242, 242)"
            >
              <v-card-actions class="pa-0">
                <v-stepper-header style="width: 480px; height: 60px">
                  <v-stepper-step
                    :complete="e1 > 1"
                    step="1"
                    class="custom-font"
                  >
                    ເລືອກເເຂວງ
                  </v-stepper-step>
                  <v-divider></v-divider>
                  <v-stepper-step
                    :complete="e1 > 2"
                    step="2"
                    class="custom-font"
                  >
                    ປ້ອມເບີໂທ
                  </v-stepper-step>
                  <v-btn
                    text
                    x-small
                    class="icon-close"
                    style="
                      border-radius: 0px;
                      border-bottom-left-radius: 50%;
                      height: 34px;
                      width: 34px;
                    "
                    @click="resetAddQueue"
                  >
                    <v-icon size="20">mdi-close</v-icon>
                  </v-btn>
                </v-stepper-header>
              </v-card-actions>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card-actions class="pa-0" style="text-align: center">
                    <v-card
                      outlined
                      class="table-container"
                      style="
                        height: 200px;
                        width: 100%;
                        z-index: 100;
                        overflow-y: auto;
                      "
                    >
                      <Menu
                        style="margin-left: 2px; width: 99%"
                        @on-select="getProvinceName"
                      >
                        <Submenu
                          v-for="(item, index) in dataprovince"
                          :key="index"
                          :name="item.id"
                        >
                          <template #title>
                            <h3
                              class="custom-font"
                              @click="provinceBranch(item.province, item.id)"
                            >
                              {{ item.province }}
                            </h3>
                          </template>
                          <MenuItem
                            v-for="(pvitem, index) in provincetplus[item.id] ||
                            []"
                            :key="index"
                            :name="pvitem.id"
                            class="custom-font"
                          >
                            {{ pvitem.BNameL }}
                          </MenuItem>
                        </Submenu>
                      </Menu>
                    </v-card>
                  </v-card-actions>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card-actions class="pa-0" style="text-align: center">
                    <v-card
                      outlined
                      class="pa-4"
                      style="
                        height: 100%;
                        width: 100%;
                        z-index: 100;
                        overflow-y: auto;
                      "
                    >
                      <h3
                        class="custom-font"
                        style="text-decoration: underline"
                      >
                        {{ ProvinceName.BNameL }}
                      </h3>
                      <v-divider></v-divider>
                      <br />
                      <v-card-actions>
                        <h3 class="custom-font">ເບີໂທລະສັບ:</h3>
                        &nbsp;&nbsp;
                        <h2>
                          <Input
                            v-model="phoneAddQueue"
                            size="large"
                            placeholder="ເບີໂທລະສັບ..."
                            clearable
                            class="custom-font"
                          />
                        </h2>
                      </v-card-actions>
                    </v-card>
                  </v-card-actions>
                  <v-card-actions>
                    <v-btn text class="rounded-0" @click="e1 = 1">
                      <v-icon>mdi-chevron-double-left</v-icon></v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      class="custom-btn custom-font"
                      style="
                        background-color: rgb(255, 204, 0);
                        color: #ffff;
                        border: 1px solid #bfbfbf;
                        margin-left: 10px;
                      "
                      @click="addQueue"
                    >
                      ຈອງຄິວ
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          persistent
          max-width="420"
        >
          <v-card style="background-color: rgb(242, 242, 242)">
            <v-toolbar
              color="rgb(255, 215, 0)"
              dark
              flat
              class="d-flex justify-center"
            >
              <h2 class="custom-font">ບັດຄິວ</h2>
              <v-btn
                text
                x-small
                class="icon-close"
                style="
                  border-radius: 0px;
                  border-bottom-left-radius: 50%;
                  height: 34px;
                  width: 34px;
                  position: fixed;
                  top: 0px;
                  right: 0px;
                  z-index: 100;
                "
                @click="dialog = false"
              >
                <v-icon size="20">mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <br />
            <v-card-text>
              <v-card outlined>
                <v-card-text>
                  <v-card-actions class="py-2">
                    <h4 class="custom-font">ເບີໂທລະສັບ:</h4>
                    &nbsp;&nbsp;
                    <v-card
                      class="px-4 py-2"
                      outlined
                      style="border: 2px solid rgb(242, 242, 242)"
                    >
                      <h3>{{ BillQueue.phonenumber }}</h3>
                    </v-card>
                  </v-card-actions>
                  <v-card-actions class="py-2">
                    <h4 class="custom-font">ສາຂາ:</h4>
                    &nbsp;&nbsp;
                    <v-card
                      class="px-4 py-2"
                      outlined
                      style="border: 2px solid rgb(242, 242, 242)"
                    >
                      <h3 class="custom-font">{{ BillQueue.BNameL }}</h3>
                    </v-card>
                  </v-card-actions>
                  <v-card-actions class="py-2">
                    <h4 class="custom-font">ເລກທີ່ຄິວ:</h4>
                    &nbsp;&nbsp;
                    <v-card
                      class="px-4 py-2"
                      outlined
                      style="border: 2px solid rgb(242, 242, 242)"
                    >
                      <h4 class="custom-font">{{ BillQueue.myqueue }}</h4>
                    </v-card>
                  </v-card-actions>
                  <v-card-actions class="py-2">
                    <h4 class="custom-font">ເວລາຈອງຄິວ:</h4>
                    &nbsp;&nbsp;
                    <v-card
                      class="px-4 py-2"
                      outlined
                      style="border: 2px solid rgb(242, 242, 242)"
                    >
                      <h3 class="custom-font">{{ BillQueue.time }}</h3>
                    </v-card>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  Currency: 'DefaultLayout',
  data() {
    return {
      e1: 1,
      addqueqeue: false,
      taskqueue: [],
      provincetplus: {},
      dataprovince: [],
      ProvinceName: {},
      phoneAddQueue: '',
      Idprovince: 0,
      values: 0,
      BillQueue: {},
      dialog: false,
      result: [],
    }
  },
  mounted() {
    this.province()
  },
  methods: {
    getProvinceName(item) {
      const provinceArray = this.provincetplus[this.Idprovince] || []
      const matchedProvince = provinceArray.find(
        (province) => province.id === item
      )
      this.ProvinceName = matchedProvince || {}
      this.e1 = 2
    },
    async addQueue() {
      if (!this.phoneAddQueue || !this.ProvinceName.id) {
        this.messageModal('error', 'Phone number or branch is missing!')
        return
      }
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:3600/queue/add',
          {
            phonenumber: this.phoneAddQueue,
            branchid: this.ProvinceName.id,
          }
        )
        if (response && response.data) {
          this.BillQueue = {
            ...response.data,
            BNameL: this.ProvinceName.BNameL,
          }
          this.resetAddQueue()
          this.messageModal('success', 'ຈອງຄິວສໍາເລັດເເລ້ວ')
          this.province();
          this.dialog = true
          console.log(this.BillQueue)
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            console.log('Server error: 500')
          } else if (error.response.status === 402) {
            this.active = false
            this.messageModal(
              'warning',
              `ສາຂາ ${this.ProvinceName.BNameL} ຄິວເຕັມແລ້ວ ບໍ່ສາມາດຈອງຄິວໄດ້!`
            )
          } else {
            console.log(`Error: ${error.response.status}`)
            this.messageModal('error', 'ຈອງຄິວບໍ່ສໍາເລັດເເລ້ວ')
          }
        } else {
          console.error('Network error or no response:', error)
          this.messageModal('error', 'ຈອງຄິວບໍ່ສໍາເລັດເເລ້ວ')
        }
      }
    },
    resetAddQueue() {
      this.addqueqeue = false
      this.e1 = 1
      this.ProvinceName = {}
      this.phoneAddQueue = ''
    },
    selectItem(index) {
      this.selectedItem = index
    },
    async provinceBranch(name, id) {
      this.Idprovince = id
      if (this.provincetplus[id]) {
        return
      }
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:3600/branch/findbranchbyprovince',
          {
            province: name,
          }
        )
        this.$set(this.provincetplus, id, response.data)
        // console.log('Dat-:', this.provincetplus)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async province() {
      try {
        const response = await this.$axios
          .post('http://172.28.17.102:3600/branch/findallbranch')
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 500) {
                console.log('Server error: 500')
                return []
              } else if (error.response.status === 404) {
                return []
              } else {
                console.log(`Error: ${error.response.status}`)
              }
            } else {
              console.error('Network error or no response:', error)
            }
            return null
          })
        this.dataprovince = response.data ? response.data : []
        // console.log('Data province:', this.dataprovince)
        this.sendMessageAuto()
      } catch (error) {
        console.error('Error fetching data:', error.message)
        if (error.response) {
          console.error('Response data:', error.response.data)
          console.error('Status:', error.response.status)
        }
      }
    },
    async sendMessageAuto() {
      if (this.dataprovince.length > 0) {
        this.values = 0;
        this.result = [];

        for (let i = 0; i < this.dataprovince.length; i++) {
          const provinceObj = this.dataprovince[i];
          const provinceName = provinceObj.province;
          
          try {
            const response = await this.$axios.post(
              'http://172.28.17.102:3600/branch/findbranchbyprovince',
              { province: provinceName }
            );

            let queue = 0;
            const provinceData = {
              title: `${provinceName} ( ${queue} )`,
              expand: false,
              children: [],
            };
            for (const branch of response.data) {
              const branchId = branch.id;
              const res = await this.$axios.post(
                'http://172.28.17.102:3600/monitor/queuebranch',
                { branchid: branchId }
              );
              const branchChildren = res.data.map((item) => ({
                title: `+ 
                  ເລກຄິວ: ${item.queuenumber} 
                  ເລກໂທລະສັບ: ${item.phonenumber} 
                  ເວລາຈອງ: ${this.formatAdjustDate(item.createdAt)}
                `,
              }));
              queue += branchChildren.length;
              provinceData.children.push({
                title: `${branch.BNameL} ( ${branchChildren.length} )`,
                expand: true,
                children: branchChildren,
              });
            }
            provinceData.title = `${provinceName} ( ${queue} )`;
            this.result.push(provinceData);

            this.values = parseFloat(
              (((i + 1) / this.dataprovince.length) * 100).toFixed(1)
            );
          } catch (error) {
            console.error(
              `Error sending message to province: ${provinceName}`,
              error
            );
            break;
          }
        }
      } else {
        console.log('No provinces found in dataprovince');
      }
    },
    formatAdjustDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
    },
    messageModal(type, content) {
      this.$Message[type]({
        background: true,
        dangerouslyUseHTMLString: true,
        content: `<span class="custom-font">${content}</span>`,
      })
    },
    errorMessage(title, des) {
      this.$Notice.error({
        dangerouslyUseHTMLString: true,
        title: `<span class="custom-font">${title}</span>`,
        desc: `<span class="custom-font">${des}</span>`,
      })
    },
  },
}
</script>

<style scoped>
.stacked-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-queue {
  position: absolute;
  width: 340px;
  height: 200px;
  background-color: #ffff4d;
  left: 0;
  top: 0;
  transform: translateY(15px) translateX(110px);
}
.border-card {
  border: 1px solid rgb(96, 96, 96);
}
.custom-card-queue {
  background-color: #ffff4d;
  color: #000;
  min-height: 250px;
}
.custom-queue:nth-child(1) {
  z-index: 9;
  transform: translateY(0px) translateX(110px);
}

.custom-queue:nth-child(2) {
  z-index: 8;
  transform: translateY(5px) translateX(100px);
}

.custom-queue:nth-child(3) {
  z-index: 7;
  transform: translateY(10px) translateX(90px);
}

.custom-queue:nth-child(4) {
  z-index: 6;
  transform: translateY(15px) translateX(80px);
}

.custom-queue:nth-child(5) {
  z-index: 5;
  transform: translateY(20px) translateX(70px);
}

.custom-queue:nth-child(6) {
  z-index: 4;
  transform: translateY(25px) translateX(60px);
}

.custom-queue:nth-child(7) {
  z-index: 3;
  transform: translateY(30px) translateX(50px);
}
.custom-queue:nth-child(8) {
  z-index: 2;
  transform: translateY(35px) translateX(40px);
}
.custom-queue:nth-child(9) {
  z-index: 1;
  transform: translateY(40px) translateX(30px);
}
.custom-queue:nth-child(n + 10) {
  z-index: 0;
  transform: translateY(45px) translateX(20px);
}
.custom-card {
  border: 1px solid rgb(166, 166, 166);
  border-radius: 4px;
  padding: 16px;
  min-height: 280px;
}
.color-queue {
  background-color: rgb(38, 38, 38);
  color: #ffff;
  height: 60px;
}
.custom-data {
  padding-left: 8px;
  background-color: #ffff;
  color: #000;
}
.border-avatar {
  border: 1px solid #d5d5d5;
}
.shadow-card {
  box-shadow: inset 0px 4px 4px 2px rgba(0, 0, 0, 0.5);
}
.shadow-card-text {
  box-shadow: inset 0px 1px 2px 2px rgba(0, 0, 0, 0.5);
}
.custom-number-queue {
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  border: 2px solid #bfbfbf;
  background-color: #f2f2f2;
  color: #8c8c8c;
}
.text-color {
  color: #ffff;
  border: 1px solid #8c8c8c;
}
.text-color:hover {
  color: #000;
}
.custom-btn:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  outline: 2px solid rgb(179, 179, 0);
}
.custom-slide {
  transition: box-shadow 0.3s ease;
  outline: 0px solid #f2f2f2;
}
.table-container {
  scrollbar-width: thin;
  scrollbar-color: rgb(255, 215, 0) #ffffff;
  overflow-y: auto;
}

.table-container::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: rgb(255, 215, 0);
  border-radius: 1px;
}

.table-container::-webkit-scrollbar-track {
  background-color: #ffffff;
}
.custom-moues:hover {
  cursor: pointer;
}
.marquee-text {
  display: inline-block;
  white-space: nowrap;
  animation: scroll-left 10s linear infinite;
}

@keyframes scroll-left {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.marquee-text:hover {
  animation-play-state: paused;
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
.mouse-hover-menu:hover {
  color: rgb(255, 215, 0);
}
.icon-close {
  color: rgb(89, 89, 89);
  background-color: rgb(217, 217, 217);
}
.icon-close:hover {
  color: rgb(255, 215, 0);
  background-color: rgb(64, 64, 64);
}
</style>
