<template>
  <div>
    <v-card-text
      class="px-5 py-6 scrollbar screen"
      style="background-color: #ffff; overflow-y: auto"
      :style="{ height: heightPx + 'px' }"
    >
      <v-row>
        <v-col cols="6" class="pa-0">
          <v-row>
            <v-col cols="6" class="pr-0">
              <div>
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Info</h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    style="
                      color: #ffff;
                      background-color: red;
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    BSS Status:
                    <v-spacer />
                    Un know
                    <v-icon color="#ffff" size="20">mdi-close-circle</v-icon>
                  </v-card-actions>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-cellphone-sound</v-icon>&nbsp;&nbsp;:
                    <v-spacer />
                    2078663685
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-account</v-icon>&nbsp;&nbsp;:
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color">Network name:</span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Product Type: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    style="
                      color: #ffff;
                      background-color: red;
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    CSB Status:
                    <v-spacer />
                    Idle
                    <v-icon color="#ffff" size="20">mdi-close-circle</v-icon>
                  </v-card-actions>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Offering ID: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Offering Name: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    style="
                      color: #ffff;
                      background-color: rgb(0, 230, 0);
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    BlackList Status:
                    <v-spacer />
                    No
                    <v-icon color="#ffff" size="20">mdi-close-circle</v-icon>
                  </v-card-actions>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Main Point: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Bonus Point: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Total Point: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span class="text-color"> Change Password CBS: </span>
                    <v-spacer />
                    Null
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card-text>
              </div>
              <div>
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Value Add Service</h5>
                </v-card-title>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Main Point: </span>
                  <v-spacer />
                  Null
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Bonus Point: </span>
                  <v-spacer />
                  Null
                </v-card-actions>
                <v-divider></v-divider>
              </div>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-card-title
                class="px-2 py-0"
                style="background-color: rgb(255, 255, 179); border-radius: 5px"
              >
                <h5>Life Cycle</h5>
              </v-card-title>
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="pa-1">
                  <span class="text-color"> First Active: </span>
                  <v-spacer />
                  20/03/2023 23:24:34
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Register Date: </span>
                  <v-spacer />
                  24/04/2037 00:00:00
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Active Stop: </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Suspend Stop: </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Disable Stop: </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
              <v-card-title
                class="px-2 py-0"
                style="background-color: rgb(255, 255, 179); border-radius: 5px"
              >
                <h5>Mobile Service Data</h5>
              </v-card-title>
              <v-card outlined class="mt-2 rounded-0">
                <v-card-actions class="pa-1">
                  <span class="text-color"> 5G: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitch5G"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange(
                          'Internet 5G',
                          'Internet 5G',
                          valueSwitch5G
                        )
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> ---------- </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> ---------- </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> ---------- </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> ---------- </span>
                  <v-spacer />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> 4G: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitch4G"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange(
                          'Internet 4G',
                          'Internet 4G',
                          valueSwitch4G
                        )
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> 3G: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitch3G"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange(
                          'Internet 3G',
                          'Enable Internet 3G',
                          valueSwitch3G
                        )
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> RBT: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitchRBT"
                    size="small"
                    :before-change="
                      () => handleBeforeChange('RBT', 'RBT', valueSwitchRBT)
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Voice IR: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitchVoiceIR"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange(
                          'Voice IR',
                          'Voice IR',
                          valueSwitchVoiceIR
                        )
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Data IR: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitchDataIR"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange(
                          'Data IR',
                          'Data IR',
                          valueSwitchDataIR
                        )
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <span class="text-color"> SMS: </span>
                  <v-spacer />
                  <i-Switch
                    v-model="valueSwitchSMS"
                    size="small"
                    :before-change="
                      () =>
                        handleBeforeChange('System SMS', 'MSM', valueSwitchSMS)
                    "
                  />
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
              <div class="my-2">
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Applications</h5>
                </v-card-title>
                <v-card outlined class="my-2 rounded-0">
                  <v-card-actions class="pa-1">
                    <h4 class="text-color">M-Service:</h4>
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <h4 class="text-color">M-Topup Plus:</h4>
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <h4 class="text-color">M-MoneyX:</h4>
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <h4 class="text-color">E-Bill:</h4>
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="pa-0 pl-1">
          <v-card-title
            class="px-2 py-0"
            style="background-color: rgb(255, 255, 179); border-radius: 5px"
          >
            <h5>Bill Query</h5>
          </v-card-title>
          <div class="text-center mt-1" width="100%">
            <span style="color: #737373" class="material-icons"
              >monetization_on</span
            >
          </div>
          <v-row>
            <v-col cols="4" class="pr-0 py-1">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="pa-1">
                  <v-icon>mdi-signal-cellular-3</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Package:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-currency-usd</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Transfer:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-controller</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Game:
                  </span>
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-thumbs-up-down</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Vote:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
            </v-col>
            <v-col cols="4" class="px-0 pt-1 pb-0">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="pa-1">
                  <v-icon>mdi-phone-in-talk</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Call:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-circle-multiple</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >VAS:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-credit-card-plus-outline</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Up money:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-file-document-multiple</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Lotto:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
            </v-col>
            <v-col cols="4" class="pl-0 pt-1 pb-0">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="pa-1">
                  <v-icon>mdi-email</v-icon>&nbsp;&nbsp;<span class="text-color"
                    >SMS:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-checkbox-marked-circle-plus-outline</v-icon
                  >&nbsp;&nbsp;<span class="text-color">M-money:</span>
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-emoticon</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Debug or HappyCall:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-icon>mdi-devices</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Other:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider></v-divider>
              </v-card>
            </v-col>
          </v-row>
          <div width="100%">
            <v-card-text
              class="pt-0 pb-0 px-12 mb-2 mt-1 text-center"
              style="background-color: #ffff00"
            >
              <h4>Data of 3 Month</h4>
            </v-card-text>
            <v-row>
              <v-col cols="6" class="pr-0 py-1">
                <v-card-title
                  class="px-2 py-0 rounded-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Data Package</h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-network-strength-3</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Data Package:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span style="color: #737373" class="material-icons-sharp"
                      >account_tree</span
                    >&nbsp;&nbsp;<span class="text-color">
                      Package History:
                    </span>
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-store</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Buy Data Package:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-text-box-check-outline</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Special Package:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Banking</h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-currency-usd</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Borrow and cut Money:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-plus-box-multiple</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Topup and M-Topup:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <span style="color: #737373" class="material-icons-sharp"
                      >local_atm</span
                    >&nbsp;&nbsp;<span class="text-color">Topup Banking:</span>
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-currency-usd-off</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Payment:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card-text>
              </v-col>
              <v-col cols="6" class="pl-1 py-1">
                <v-card-title
                  class="px-2 py-0 rounded-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Game</h5>
                </v-card-title>
                <v-card outlined class="pa-0 my-2 text-h12 rounded-0">
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-controller</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >UnSubscribe Game:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-controller-off</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Cancel the Game Service:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                </v-card>
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>Other</h5>
                </v-card-title>
                <v-card outlined class="pa-0 my-2 text-h12 rounded-0">
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-notification-clear-all</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >History changes:</span
                    >
                    <v-spacer />
                    <div
                      class="px-2"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-sim-outline</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Master Sim:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-alert-circle</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Information:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-backup-restore</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Reset Sim:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-menu-open</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >HLR:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-emoticon</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Happy Call:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('SMS Ticket')"
                  >
                    <v-icon style="color: rgb(102, 102, 102)"
                      >mdi-message-processing</v-icon
                    >&nbsp;<span class="text-color">SMS Ticket:</span>
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider></v-divider>
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('LTC WIFI')"
                  >
                    <v-icon style="color: rgb(102, 102, 102)"
                      >mdi-wifi-strength-3</v-icon
                    >&nbsp;<span class="text-color">LTC WIFI:</span>
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0 ? 'rgb(255, 51, 0)' : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider></v-divider>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div class="text-center">
            <v-dialog v-model="dialog" persistent width="600">
              <v-card>
                <v-card-title
                  class="text-h6 py-1"
                  style="background-color: #ffff00; color: black"
                >
                  Privacy Policy
                </v-card-title>
                <v-card-text>
                  {{ text }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                  <v-spacer></v-spacer>
                  <v-btn
                    outlined
                    style="color: rgb(153, 153, 0)"
                    @click="dialog = false"
                  >
                    close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '',
      dialog: false,
      heightPx: 0,
      number: 1,
      valueSwitch5G: false,
      valueSwitch4G: false,
      valueSwitch3G: false,
      valueSwitchRBT: false,
      valueSwitchVoiceIR: false,
      valueSwitchDataIR: false,
      valueSwitchSMS: false,
    }
  },
  mounted() {
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setSheetHeight)
  },
  methods: {
    handleBeforeChange(title, content, status) {
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title,
          content: status ? 'Unable ' + content : 'Enable ' + content,
          onOk: resolve,
        })
      })
    },
    setSheetHeight() {
      // Get the height of the computer screen
      this.heightPx = window.innerHeight - 64
    },
    showData(textValue) {
      this.text = textValue
      this.dialog = true
    },
  },
}
</script>
<style>
#screen::-webkit-scrollbar {
  display: none;
}

.text-color {
  color: rgb(102, 102, 102);
}

.scrollbar {
  overflow-x: hidden;
  /* Prevent horizontal overflow */
}

.scrollbar::-webkit-scrollbar {
  width: 4px;
  /* Set the width of the scrollbar */
  height: 2px;
}

/* Increase specificity of thumb styles */
.scrollbar::-webkit-scrollbar-thumb {
  background-color: yellow;
  /* Set the color of the thumb */
}

.small-table {
  font-size: 10px;
  /* Adjust the font size as needed */
}
</style>
