<template>
  <div>
    <v-card-text
      v-if="numberNull"
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
                  <h5 class="custom-font">{{ en ? 'ຂໍ້ມູນ' : 'Info' }}</h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    :class="{ 'custom-font': en }"
                    style="
                      color: #ffff;
                      background-color: rgb(0, 230, 0);
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    {{ en ? 'ສະຖານະຂອງ BSS' : 'BSS Status:' }}
                    <v-spacer />
                    {{ en ? 'ບໍ່ຮູ້' : 'Un know' }}&nbsp;
                    <v-icon color="#ffff" size="20">mdi-check-circle</v-icon>
                  </v-card-actions>
                  <div v-if="uRegister.length > 0">
                    <div v-for="(item, index) in uRegister" :key="index">
                      <v-card-actions class="pa-1">
                        &nbsp;<v-icon>mdi-cellphone-sound</v-icon>&nbsp;&nbsp;
                        <span
                          class="text-color custom-font"
                          :class="[{ 'custom-font': en }]"
                          >{{ en ? 'ເບີໂທ' : 'Number' }}</span
                        >:
                        <v-spacer />
                        <h6 class="font_size_14">{{ numberPhonSend }}</h6>
                      </v-card-actions>
                      <v-divider />
                      <v-card-actions class="pa-1">
                        <v-icon>mdi-account</v-icon>&nbsp;&nbsp;<span
                          class="text-color custom-font"
                          :class="[{ 'custom-font': en }]"
                          >{{ en ? 'ຊື່ ແລະ ນາມສະກຸນ' : 'Name' }}</span
                        >:
                        <v-spacer />
                        <span class="custom-font"
                          >{{ item.Name }}&nbsp;{{ item.Surname }}</span
                        >
                      </v-card-actions>
                      <v-divider />
                      <v-card-actions class="pa-1">
                        <v-icon>mdi-human-male-female</v-icon>&nbsp;&nbsp;<span
                          class="text-color"
                          :class="{ 'custom-font': en }"
                          >{{ en ? 'ເພດ' : 'Gender' }}</span
                        >:
                        <v-spacer />
                        <span :class="{ 'custom-font': en }">{{
                          en
                            ? item.Gender === 'M'
                              ? 'ຊາຍ'
                              : 'ຍີງ'
                            : item.Gender === 'M'
                            ? 'Male'
                            : 'Female'
                        }}</span>
                      </v-card-actions>
                      <v-divider />
                      <v-card-actions class="pa-1">
                        <v-icon>mdi-image</v-icon>&nbsp;&nbsp;<span
                          class="text-color"
                          :class="{ 'custom-font': en }"
                          >{{ en ? 'ຮູບພາບ' : 'Image' }}</span
                        >:&nbsp;&nbsp;
                        <span v-if="!showImage">
                          {{ truncateText(item.Photo, 20) }}</span
                        >
                        <v-spacer />
                        <v-icon
                          v-if="!showImage"
                          class="hover-pointer"
                          @click="showImage = !showImage"
                          >mdi-eye-off</v-icon
                        >
                        <v-icon
                          v-else
                          class="hover-pointer"
                          @click="showImage = !showImage"
                          >mdi-eye</v-icon
                        >
                      </v-card-actions>
                      <v-card-actions
                        class="pt-0 pb-1 pl-0 pr-1 hover-pointer"
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: center;
                        "
                        @click="showData('image')"
                      >
                        <v-card
                          v-if="showImage"
                          outlined
                          class="pa-0"
                          style="height: 300px; width: 270px"
                        >
                          <v-img :src="item.Photo" height="100%" width="100%" />
                        </v-card>
                      </v-card-actions>
                      <v-divider />
                    </div>
                  </div>
                  <div v-else class="pa-0">
                    <v-card-actions class="pa-1">
                      <v-icon>mdi-cellphone-sound</v-icon>&nbsp;&nbsp;<span
                        class="text-color"
                        :class="{ 'custom-font': en }"
                        >{{ en ? 'ເລກເບີ:' : 'Number:' }}</span
                      >
                      <v-spacer />
                      <h6 class="font_size_14">{{ numberPhonSend }}</h6>
                    </v-card-actions>
                    <v-card-text
                      class="pt-2 text-center"
                      :class="{ 'custom-font': en }"
                      style="color: rgb(166, 166, 166)"
                    >
                      <h5 :class="{ 'custom-font': en }">
                        {{
                          en
                            ? 'ເບີນີ້ຍັງບໍ່ໄດ້ລົງທະບຽນ'
                            : 'Number is not register'
                        }}
                      </h5>
                    </v-card-text>
                    <v-divider />
                  </div>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-list-status</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ສະຖານະ' : 'Status' }}</span
                    >:
                    <v-spacer />
                    <span :class="{ 'custom-font': en }">{{
                      selectInform.formattedResult.postpaidNumber.Status
                    }}</span>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-cash-100</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ຈໍານອນເງິນປົກກະຕີ' : 'Basic Balance' }}</span
                    >:
                    <v-spacer />
                    <h5>
                      <span :class="{ 'custom-font': en }"
                        >{{
                          formatResultDesc(vasSerVices.BasicBalance)
                        }}&nbsp;Kip</span
                      >
                    </h5>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-access-point-network</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ອີນເຕີເນັດເຫຼືອ' : 'Internet remains' }}</span
                    >:
                    <v-spacer />
                    <h5>
                      <span :class="{ 'custom-font': en }"
                        >{{ getPackageValueByIndex(packagesCount) }}&nbsp;</span
                      >
                    </h5>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-identifier</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">{{
                      en ? 'ລະຫັດອິນເຕີເນັດ:' : 'Product ID:'
                    }}</span>
                    <v-spacer />
                    {{ simType.Mainproduct }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-network-strength-2</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">{{
                      en ? 'ຊື່ອິນເຕີເນັດ:' : 'Product name:'
                    }}</span>
                    <v-spacer />
                    {{ simType.mainProductName }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-sim</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">{{
                      en ? 'ປະເພດຊີນ:' : 'SIM Type:'
                    }}</span>
                    <v-spacer />
                    {{ simType.simType }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-card-account-details</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">{{
                      en ? 'ປະເພດບັດ:' : 'Card Type:'
                    }}</span>
                    <v-spacer />
                    {{ vasSerVices.result3.CardType }}
                  </v-card-actions>
                  <v-divider />
                </v-card-text>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-title
                    class="px-2 py-0"
                    style="
                      background-color: rgb(255, 255, 179);
                      border-radius: 5px;
                    "
                  >
                    <h5 :class="{ 'custom-font': en }">
                      {{
                        en
                          ? 'ຂໍ້ມູນໜີ້ຂອງລູກຄ້າ'
                          : 'Customer credit information'
                      }}
                    </h5>
                  </v-card-title>
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-cash-multiple</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຖານເງິນທັງໝົດ:' : 'Credit limit:' }}
                    </span>
                    <v-spacer />
                    <span>{{
                      formatResultDesc(selectInform.balance.CreditLimit)
                    }}</span>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-inbox-arrow-up</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຈໍານວນເງິນທີ່ໃຊ້ແລ້ວ:' : 'Current Usage:' }}
                    </span>
                    <v-spacer />
                    <span>{{
                      formatResultDesc(selectInform.balance.TotalUsage)
                    }}</span>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-inbox-arrow-down</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຈໍານວນ Outstanding:' : 'Out Standing:' }}
                    </span>
                    <v-spacer />
                    <span>{{
                      formatResultDesc(selectInform.balance.OutStanding)
                    }}</span>
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-inbox-arrow-up</v-icon>&nbsp;&nbsp;
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຈໍານວນເງິນທັງໝົດຍັງເຫຼືອ:' : 'Total Remain:' }}
                    </span>
                    <v-spacer />
                    <span>{{
                      formatResultDesc(selectInform.balance.TotalRemain)
                    }}</span>
                  </v-card-actions>
                  <v-divider />
                </v-card-text>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    :class="{ 'custom-font': en }"
                    style="
                      color: #ffff;
                      background-color: red;
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    {{ en ? 'ສະຖານະຂອງ CSB:' : 'CSB Status:' }}
                    <v-spacer />
                    {{ en ? 'ບໍ່ເຮັດວຽກ' : 'Idle' }}&nbsp;
                    <v-icon color="#ffff" size="20">mdi-close-circle</v-icon>
                  </v-card-actions>
                  <v-card-actions class="pa-1 mt-1">
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ລະຫັດຫຼັກຂອງ Offering:' : 'Main Offering ID:' }}
                    </span>
                    <v-spacer />
                    {{ vasSerVices.result.MainOfferingID }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1 mt-1">
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຊື່ຫຼັກຂອງ Offering:' : 'Main Offering Name:' }}
                    </span>
                    <v-spacer />
                    {{
                      selectInform.formattedResult.postpaidNumber
                        .MainOfferingName
                    }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1 mt-1">
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ລະຫັດ Offering:' : 'Offering ID:' }}
                    </span>
                    <v-spacer />
                    {{ selectInform.formattedResult.postpaidNumber.subID[0] }}
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <span class="text-color" :class="{ 'custom-font': en }">
                      {{ en ? 'ຊື່ Offering:' : 'Offering Name:' }}
                    </span>
                    <v-spacer />
                    {{
                      selectInform.formattedResult.postpaidNumber.subNames[0]
                    }}
                  </v-card-actions>
                  <v-divider />
                </v-card-text>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-card-actions
                    class="pa-1"
                    :class="{ 'custom-font': en }"
                    style="
                      color: #ffff;
                      background-color: rgb(0, 230, 0);
                      border-radius: 4px;
                    "
                  >
                    <v-icon size="20" color="#ffff" class="pr-2"
                      >mdi-eye</v-icon
                    >
                    {{ en ? 'ສະຖານະຂອງບັນຊີດໍາ: ' : 'BlackList Status:' }}
                    <v-spacer />
                    {{ en ? 'ປິດ' : 'No' }}&nbsp;
                    <v-icon color="#ffff" size="20">mdi-close-circle</v-icon>
                  </v-card-actions>
                </v-card-text>
              </div>
              <div>
                <v-card-title
                  class="mt-2 px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ການບໍລິການເພີ່ມມູນຄ່າ' : 'Value Add Service' }}
                  </h5>
                </v-card-title>
                <v-card-actions class="pa-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ຄະແນນຫຼັກ:' : 'Main Point:' }}
                  </span>
                  <v-spacer />
                  {{
                    this.dataPoint.MainPoint !== ''
                      ? this.dataPoint.MainPoint
                      : 0
                  }}
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ຄະແນນໂບນັດ:' : 'Bonus Point:' }}
                  </span>
                  <v-spacer />
                  {{
                    this.dataPoint.BonusPoint !== ''
                      ? this.dataPoint.BonusPoint
                      : 0
                  }}
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ຄະແນນທັງໝົດ:' : 'Total Point:' }}
                  </span>
                  <v-spacer />
                  {{ this.dataPoint.Total !== '' ? this.dataPoint.Total : 0 }}
                </v-card-actions>
                <v-divider />
              </div>
              <v-card-title
                class="mt-2 px-2 py-0"
                style="background-color: rgb(255, 255, 179); border-radius: 5px"
              >
                <h5 :class="{ 'custom-font': en }">
                  {{ en ? 'ການຕັດເງີນ 3000 ກິບ' : 'Cut Money 3000 kip' }}
                </h5>
              </v-card-title>
              <v-card-text class="pa-0 pt-2 text-h12">
                <v-card-actions class="rounded-0 px-1 py-0" width="100%">
                  <span
                    ><v-icon color="#737373">mdi-calendar-check</v-icon></span
                  >&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                  >
                    {{ en ? 'ຕັດເງີນຫຼ້າສຸດ:' : 'Latest Cut:' }}
                  </span>
                  <v-spacer />
                  <h6
                    class="font_size_12"
                    :class="{ 'custom-font': en }"
                    :style="{
                      color: cutMoney3K
                        ? 'rgb(38, 38, 38)'
                        : 'rgb(115, 115, 115)',
                    }"
                  >
                    {{
                      cutMoney3K
                        ? cutMoney3K
                        : `${en ? 'ຍັງບໍ່ມີຂໍ້ມູນ' : 'Not data'}`
                    }}
                  </h6>
                </v-card-actions>
                <v-divider />
              </v-card-text>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-card-title
                class="px-2 py-0"
                style="background-color: rgb(255, 255, 179); border-radius: 5px"
              >
                <h5 :class="{ 'custom-font': en }">
                  {{ en ? 'ວົງຈອນຊີວິດ' : 'Life Cycle' }}
                </h5>
              </v-card-title>
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="py-1 pl-2 pr-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ເປີດໃຊ້ງານທໍາອິດ:' : 'First Active:' }}
                  </span>
                  <v-spacer />
                  {{ vasSerVices.result3.ActiveDate }}
                </v-card-actions>
                <v-divider />
                <v-card-actions class="py-1 pl-2 pr-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ເບີໂທຖືກບຣາ:' : 'Call Barring:' }}
                  </span>
                  <v-spacer />
                  {{ vasSerVices.result4.CallBarring }}
                </v-card-actions>
                <v-divider />
                <v-card-actions class="py-1 pl-2 pr-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ວັນທີ່ໝົດອາຍຸ:' : 'Expire Date:' }}
                  </span>
                  <v-spacer />
                  {{ vasSerVices.result4.ExpireDate }}
                </v-card-actions>
                <v-divider />
                <v-card-actions class="py-1 pl-2 pr-1">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ໂຈະໃຊ້ງານ:' : 'Suspend:' }}
                  </span>
                  <v-spacer />
                  {{ vasSerVices.result4.Suspend }}
                </v-card-actions>
                <v-divider />
              </v-card>
              <v-card-title
                class="px-2 py-0"
                style="background-color: rgb(255, 255, 179); border-radius: 5px"
              >
                <h5 :class="{ 'custom-font': en }">
                  {{ en ? 'ຂໍ້ມູນການບໍລິການມືຖື' : 'Mobile Service Data' }}
                </h5>
              </v-card-title>
              <v-card outlined class="mt-2 rounded-0">
                <v-card-actions class="pa-1">
                  <span class="text-color"> 3G: </span>
                  <v-spacer />
                  <v-card-actions class="pa-0">
                    <span
                      v-if="valueSwitch3G"
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ເປີດ' : 'Off' }}</span
                    >
                    <span v-else :class="{ 'custom-font': en }">{{
                      en ? 'ປິດ' : 'On '
                    }}</span>
                    &nbsp;&nbsp;
                    <!-- disabled -->
                    <i-Switch
                      v-model="valueSwitch3G"
                      size="small"
                      :before-change="
                        () =>
                          handleBeforeChange(
                            en ? 'ອີນເຕີເນັດ 3G' : 'Internet 3G',
                            en ? 'ອີນເຕີເນັດ 3G' : 'Internet 3G',
                            'valueSwitch3G',
                            valueSwitch3G
                          )
                      "
                      true-color="#ffff00"
                    />
                  </v-card-actions>
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <span class="text-color"> 4G: </span>
                  <v-spacer />
                  <v-card-actions class="pa-0">
                    <span
                      v-if="valueSwitch4G"
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ເປີດ' : 'Off' }}</span
                    >
                    <span v-else :class="{ 'custom-font': en }">{{
                      en ? 'ປິດ' : 'On'
                    }}</span>
                    &nbsp;&nbsp;
                    <i-Switch
                      v-model="valueSwitch4G"
                      size="small"
                      :before-change="
                        () =>
                          handleBeforeChange(
                            en ? 'ອີນເຕີເນັດ 4G' : 'Internet 4G',
                            en ? 'ອີນເຕີເນັດ 4G' : 'Internet 4G',
                            'valueSwitch4G',
                            valueSwitch4G
                          )
                      "
                      true-color="#ffff00"
                    />
                  </v-card-actions>
                  <!-- <span><v-icon small>mdi-circle</v-icon> | <v-icon color="rgb(0, 230, 0)" small>mdi-circle</v-icon></span> -->
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <span class="text-color"> 5G: </span>
                  <v-spacer />
                  <v-card-actions class="pa-0">
                    <span
                      v-if="valueSwitch5G"
                      class="text-color"
                      :class="{ 'custom-font': en }"
                    >
                      {{ en ? 'ເປີດ' : 'Off' }}
                    </span>
                    <span v-else :class="{ 'custom-font': en }">{{
                      en ? 'ປິດ' : 'On '
                    }}</span>
                    &nbsp;&nbsp;
                    <i-Switch
                      v-model="valueSwitch5G"
                      disabled
                      size="small"
                      :before-change="
                        () =>
                          handleBeforeChange(
                            en ? 'ອີນເຕີເນັດ 5G' : 'Internet 5G',
                            en ? 'ອີນເຕີເນັດ 5G' : 'Internet 5G',
                            'valueSwitch5G',
                            valueSwitch5G
                          )
                      "
                      true-color="#ffff00"
                    />
                  </v-card-actions>
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1 card-title rounded-0">
                  <span class="text-color" :class="{ 'custom-font': en }">
                    {{ en ? 'ການບໍລິການ IR ຈາກ TPlus' : 'TPlus IR Service' }}
                  </span>
                  <v-spacer />
                  <v-card-actions class="pa-0">
                    <!-- <span v-if="valueSwitchIRService" class="text-color" :class="{ 'custom-font': en }">{{ en ? 'ເປີດ' : 'Off' }}</span>
                    <span v-else :class="{ 'custom-font': en }">{{ en ? 'ປິດ' : 'On' }}</span> -->
                    &nbsp;&nbsp;
                    <i-Switch
                      v-model="valueSwitchIRService"
                      size="small"
                      :before-change="
                        () =>
                          handleBeforeChange(
                            en ? 'ການບໍລິການ IR' : 'IR Service',
                            en ? 'ການບໍລິການ IR' : 'IR Service',
                            'valueSwitchIRService',
                            valueSwitchIRService
                          )
                      "
                      true-color="#e6e600"
                    />
                  </v-card-actions>
                </v-card-actions>
                <v-card-actions class="pa-1">
                  <span class="text-color"> RBT: </span>
                  <v-spacer />
                  <span
                    v-if="valueSwitchIRService"
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ເປີດ' : 'Off' }}</span
                  >
                  <span v-else :class="{ 'custom-font': en }">{{
                    en ? 'ປິດ' : 'On'
                  }}</span>
                </v-card-actions>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Voice IR: </span>
                  <v-spacer />
                  <span
                    v-if="valueSwitchIRService"
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ເປີດ' : 'Off' }}</span
                  >
                  <span v-else :class="{ 'custom-font': en }">{{
                    en ? 'ປິດ' : 'On '
                  }}</span>
                </v-card-actions>
                <v-card-actions class="pa-1">
                  <span class="text-color"> Data IR: </span>
                  <v-spacer />
                  <span
                    v-if="valueSwitchIRService"
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ເປີດ' : 'Off' }}</span
                  >
                  <span v-else :class="{ 'custom-font': en }">{{
                    en ? 'ປິດ' : 'On '
                  }}</span>
                </v-card-actions>
                <v-card-actions class="pa-1">
                  <span class="text-color"> SMS: </span>
                  <v-spacer />
                  <span
                    v-if="valueSwitchIRService"
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ເປີດ' : 'Off' }}</span
                  >
                  <span v-else :class="{ 'custom-font': en }">{{
                    en ? 'ປິດ' : 'On '
                  }}</span>
                </v-card-actions>
              </v-card>
              <div class="my-2">
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ແອັບ' : 'Applications' }}
                  </h5>
                </v-card-title>
                <v-card outlined class="my-2 rounded-0">
                  <v-btn
                    class="rounded-0 pl-1 pr-0 py-0"
                    width="100%"
                    small
                    text
                    :disabled="
                      vasSerVices.result.MyEZLoad.Last_Login ||
                      vasSerVices.result.MyEZLoad.Last_Login
                        ? false
                        : true
                    "
                    @click="showData('TPlus-App')"
                  >
                    &nbsp;<span><h4 class="text-color">My TPlus-App:</h4></span>
                    <v-spacer />
                    <span class="font_size_12">
                      <div
                        class="py-1"
                        :class="[
                          vasSerVices.result.MyEZLoad.Last_Login.length <= 9
                            ? 'px-2'
                            : 'px-1',
                          { 'custom-font': en },
                        ]"
                        style="border-radius: 0px; color: #ffff"
                        :style="{
                          backgroundColor: vasSerVices.result.MyEZLoad
                            .Last_Login
                            ? 'rgb(0, 230, 0)'
                            : 'rgb(179, 179, 179)',
                        }"
                      >
                        {{
                          vasSerVices.result.MyEZLoad.Last_Login
                            ? '01'
                            : `${en ? 'ບໍ່ມີຂໍ້ມູນ' : 'Not data'}`
                        }}
                      </div>
                    </span>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 pl-1 pr-0 py-0"
                    width="100%"
                    small
                    text
                    :disabled="
                      vasSerVices.result.MyEZLoad.Last_Login ||
                      vasSerVices.result.MyEZLoad.Last_Login
                        ? false
                        : true
                    "
                    @click="showData('EZLoad')"
                  >
                    &nbsp;<span><h4 class="text-color">My EZLoad:</h4></span>
                    <v-spacer />
                    <span class="font_size_12">
                      <div
                        class="py-1"
                        :class="[
                          vasSerVices.result.MyEZLoad.Last_Login.length <= 9
                            ? 'px-2'
                            : 'px-1',
                          { 'custom-font': en },
                        ]"
                        style="border-radius: 0px; color: #ffff"
                        :style="{
                          backgroundColor: vasSerVices.result.MyEZLoad
                            .Last_Login
                            ? 'rgb(0, 230, 0)'
                            : 'rgb(179, 179, 179)',
                        }"
                      >
                        {{
                          vasSerVices.result.MyEZLoad.Last_Login
                            ? '01'
                            : `${en ? 'ບໍ່ມີຂໍ້ມູນ' : 'Not data'}`
                        }}
                      </div>
                    </span>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 pl-1 pr-0 py-0"
                    width="100%"
                    small
                    text
                    :disabled="
                      vasSerVices.result.MyEZLoad.Last_Login ||
                      vasSerVices.result.MyEZLoad.Last_Login
                        ? false
                        : true
                    "
                    @click="showData('M-MoneyX')"
                  >
                    &nbsp;<span><h4 class="text-color">M-MoneyX:</h4></span>
                    <v-spacer />
                    <span class="font_size_12">
                      <div
                        class="py-1"
                        :class="[
                          vasSerVices.result.MyEZLoad.Last_Login.length <= 9
                            ? 'px-2'
                            : 'px-1',
                          { 'custom-font': en },
                        ]"
                        style="border-radius: 0px; color: #ffff"
                        :style="{
                          backgroundColor: vasSerVices.result.MyEZLoad
                            .Last_Login
                            ? 'rgb(0, 230, 0)'
                            : 'rgb(179, 179, 179)',
                        }"
                      >
                        {{
                          vasSerVices.result.MyEZLoad.Last_Login
                            ? '01'
                            : `${en ? 'ບໍ່ມີຂໍ້ມູນ' : 'Not data'}`
                        }}
                      </div>
                    </span>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 pl-1 pr-0 py-0"
                    width="100%"
                    small
                    text
                    :disabled="
                      vasSerVices.result.MyEZLoad.Last_Login ||
                      vasSerVices.result.MyEZLoad.Last_Login
                        ? false
                        : true
                    "
                    @click="showData('M-MoneyX')"
                  >
                    &nbsp;<span
                      ><h4 class="text-color" :class="{ 'custom-font': en }">
                        {{ en ? 'ອື່ນໆ:' : 'Other:' }}
                      </h4></span
                    >
                    <v-spacer />
                    <span class="font_size_12">
                      <div
                        class="py-1"
                        :class="[
                          vasSerVices.result.MyEZLoad.Last_Login.length <= 9
                            ? 'px-2'
                            : 'px-1',
                          { 'custom-font': en },
                        ]"
                        style="border-radius: 0px; color: #ffff"
                        :style="{
                          backgroundColor: vasSerVices.result.MyEZLoad
                            .Last_Login
                            ? 'rgb(0, 230, 0)'
                            : 'rgb(179, 179, 179)',
                        }"
                      >
                        {{
                          vasSerVices.result.MyEZLoad.Last_Login
                            ? '01'
                            : `${en ? 'ບໍ່ມີຂໍ້ມູນ' : 'Not data'}`
                        }}
                      </div>
                    </span>
                  </v-btn>
                  <v-divider />
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
            <h5 :class="{ 'custom-font': en }">
              {{ en ? 'ຂໍ້ມູນຂອງໃບບີນ' : 'Bill Query' }}
            </h5>
          </v-card-title>
          <div class="text-center mt-2" width="100%"></div>
          <v-row>
            <v-col cols="4" class="pr-0 py-1">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions
                  class="pa-1"
                  :class="{ 'hover-pointer': dataHPackage.length !== 0 }"
                  @click="
                    dataHPackage.length !== 0
                      ? showData('Package History')
                      : false
                  "
                >
                  <v-icon>mdi-signal-cellular-3</v-icon>&nbsp;&nbsp;
                  <span
                    class="text-color"
                    :class="[{ 'custom-font': en }, { font_size_14: en }]"
                    >{{ en ? 'ປະວັດເຕີມແພັກເກັດ:' : 'History Packages:' }}</span
                  >
                  <v-spacer />
                  <h4 class="text-color font_size_14">
                    {{ dataHPackage.length }}
                  </h4>
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-currency-usd</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ການໂອນ:' : 'Transfer:' }}</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-controller</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ເກມ:' : 'Game:' }}
                  </span>
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-thumbs-up-down</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ລົງຄະແນນສຽງ:' : 'Vote:' }}</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
              </v-card>
            </v-col>
            <v-col cols="4" class="px-0 pt-1 pb-0">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions class="pa-1">
                  <v-icon>mdi-phone-in-talk</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ໂທ:' : 'Call:' }}</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-circle-multiple</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >VAS:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-credit-card-plus-outline</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ຂື້ນເງີນ:' : 'Up money:' }}</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-file-document-multiple</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Lotto:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
              </v-card>
            </v-col>
            <v-col cols="4" class="pl-0 pt-1 pb-0">
              <v-card outlined class="my-2 rounded-0">
                <v-card-actions
                  class="pa-1"
                  :class="{ 'hover-pointer': SMS.length !== 0 }"
                  @click="SMS.length !== 0 ? showData('History-SMS') : false"
                >
                  <v-icon>mdi-email</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ປະຫວັດຂໍ້ຄວາມ:' : 'SMS:' }}</span
                  >
                  <v-spacer />
                  <h4 class="text-color font_size_14">
                    {{ SMS.length }}
                  </h4>
                </v-card-actions>
                <v-divider />
                <v-card-actions
                  class="pa-1"
                  :class="{ 'hover-pointer': dataHPackage.length !== 0 }"
                  @click="
                    dataHPackage.length !== 0 ? showData('M-moneyX') : false
                  "
                >
                  <v-icon>mdi-checkbox-marked-circle-plus-outline</v-icon
                  >&nbsp;&nbsp;<span class="text-color">M-moneyX:</span>
                  <v-spacer />
                  <h4 class="text-color font_size_14">
                    {{ dataHPackage.length }}
                  </h4>
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-emoticon</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    >Debug or HappyCall:</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
                <v-card-actions class="pa-1">
                  <v-icon>mdi-devices</v-icon>&nbsp;&nbsp;<span
                    class="text-color"
                    :class="{ 'custom-font': en }"
                    >{{ en ? 'ອື່ນໆ:' : 'Other:' }}</span
                  >
                  <v-spacer />
                  0
                </v-card-actions>
                <v-divider />
              </v-card>
            </v-col>
          </v-row>
          <div width="100%">
            <v-card-text
              class="pt-0 pb-0 px-12 mb-2 mt-1 text-center"
              style="background-color: #ffff00"
            >
              <h4 :class="{ 'custom-font': en }">
                {{ en ? 'ຂໍ້ມູນໄລຍະ 1 ເດືອນ' : 'Data of 1 Month' }}
              </h4>
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
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ຂໍ້ມູນແພັກເກັດ' : 'Data Package' }}
                  </h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    :disabled="packagesCount === 0"
                    @click="
                      packagesCount !== 0 ? showData('Data-Package') : false
                    "
                  >
                    <v-icon color="#737373">mdi-network-strength-3</v-icon
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{ en ? 'ຂໍ້ມູນແພັກເກັດ:' : 'Data Package:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          packagesCount === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      {{ packagesCount }}
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Buy-Data-Package')"
                  >
                    <v-icon color="#737373">mdi-store</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{
                        en ? 'ຂໍ້ມູນຊື້ເເພັກເກັດ:' : 'Buy Data Package:'
                      }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Special-Package')"
                  >
                    <v-icon color="#737373">mdi-text-box-check-outline</v-icon
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{ en ? 'ເເພັກເກັດພີເສດ:' : 'Special Package:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                </v-card-text>
                <v-card-title
                  class="mt-2 px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ທະນາຄານ' : 'Banking' }}
                  </h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Borrow-and-cut-Money')"
                  >
                    <v-icon color="#737373">mdi-currency-usd</v-icon
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{
                        en ? 'ຢືມ ແລະ ຕັດເງິນ:' : 'Borrow and cut Money:'
                      }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Topup')"
                  >
                    <v-icon color="#737373">mdi-plus-box-multiple</v-icon
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{ en ? 'ເຕີມເງິນ:' : 'Topup:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Topup-Banking')"
                  >
                    <span style="color: #737373" class="material-icons-sharp"
                      >local_atm</span
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{
                        en ? 'ເຕີມເງິນຜ່ານທະນາຄານ:' : 'Topup Banking:'
                      }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('Payment')"
                  >
                    <v-icon color="#737373">mdi-currency-usd-off</v-icon
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{ en ? 'ການຈ່າຍເງິນ:' : 'Payment:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    :disabled="dataSoXay.length === 0"
                    @click="showData('Soxay-App')"
                  >
                    <v-icon color="#737373">mdi-weight-gram</v-icon
                    >&nbsp;&nbsp;<span class="text-color"> Soxay-App: </span>
                    <v-spacer />
                    <div
                      class="py-1"
                      :class="dataSoXay.length <= 9 ? 'px-2' : 'px-1'"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          dataSoXay.length === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      {{ dataSoXay.length }}
                    </div>
                  </v-btn>
                  <v-divider />
                </v-card-text>
                <v-card-title
                  class="mt-2 px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5>C'Care</h5>
                </v-card-title>
                <v-card-text class="pa-0 pt-2 text-h12">
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    :disabled="dataCCare.length === 0"
                    @click="showData('History Top-up')"
                  >
                    <span
                      ><v-icon color="#737373">mdi-text-box-plus</v-icon></span
                    >&nbsp;&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                    >
                      {{ en ? 'ປະຫວັດການເຕີມເງີນ' : 'History Top-up' }}
                      {{
                        '(' +
                        monthAndYear().substring(0, 4) +
                        '/' +
                        monthAndYear().substring(4) +
                        ')'
                      }}:
                    </span>
                    <v-spacer />
                    <div
                      class="py-1"
                      :class="dataCCare.length <= 9 ? 'px-2' : 'px-1'"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          dataCCare.length === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      {{ dataCCare.length }}
                    </div>
                  </v-btn>
                  <v-divider />
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
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ເກມ' : 'Game' }}
                  </h5>
                </v-card-title>
                <v-card outlined class="pa-0 my-2 text-h12 rounded-0">
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-controller</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ເລີກຕິດຕາມເກມ:' : 'Unsubscribe Game:' }}</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-controller-off</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{
                        en
                          ? 'ຍົກເລີກການບໍລິການເກມ:'
                          : 'Cancel the Game Service:'
                      }}</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                </v-card>
                <v-card-title
                  class="px-2 py-0"
                  style="
                    background-color: rgb(255, 255, 179);
                    border-radius: 5px;
                  "
                >
                  <h5 :class="{ 'custom-font': en }">
                    {{ en ? 'ອື່ນໆ' : 'Other' }}
                  </h5>
                </v-card-title>
                <v-card outlined class="pa-0 my-2 text-h12 rounded-0">
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('History changes')"
                  >
                    <v-icon>mdi-notification-clear-all</v-icon>&nbsp;<span
                      class="text-color"
                      :class="[{ 'custom-font': en }, { font_size_14: en }]"
                      >{{ en ? 'ປະຫວັດການປ່ຽນແປງ:' : 'History changes:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-btn
                    class="rounded-0 px-1 py-0"
                    width="100%"
                    small
                    text
                    @click="showData('SMS Ticket')"
                  >
                    <v-icon style="color: rgb(102, 102, 102)"
                      >mdi-message-processing</v-icon
                    >&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'SMS Ticket:' : 'SMS Ticket:' }}</span
                    >
                    <v-spacer />
                    <div
                      class="px-2 py-1"
                      style="border-radius: 2px; color: #ffff"
                      :style="{
                        backgroundColor:
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
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
                          number === 0
                            ? 'rgb(179, 179, 179)'
                            : 'rgb(0, 230, 0)',
                      }"
                    >
                      2
                    </div>
                  </v-btn>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-sim-outline</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Master Sim:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-alert-circle</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ຂໍ້ມູນ:' : 'Information:' }}</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-backup-restore</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      :class="{ 'custom-font': en }"
                      >{{ en ? 'ຣີເຊັດຊີນ:' : 'Reset Sim:' }}</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-menu-open</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >HLR:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                  <v-card-actions class="pa-1">
                    <v-icon>mdi-emoticon</v-icon>&nbsp;&nbsp;<span
                      class="text-color"
                      >Happy Call:</span
                    >
                    <v-spacer />
                  </v-card-actions>
                  <v-divider />
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div class="text-center">
            <v-dialog
              v-model="dialog"
              class="scrollbar"
              :persistent="text === 'image' ? false : true"
              :width="text === 'image' ? '600' : '80%'"
              height="calc(100vh - 18vh)"
            >
              <v-card
                class="scrollbar"
                style="
                  height: calc(100vh - 13vh);
                  background-color: rgb(255, 255, 80);
                "
              >
                <v-card-actions
                  v-if="text !== 'image'"
                  class="pa-0 BK_color_YL color_Iconclose scrollbar text-center"
                >
                  <v-spacer />
                  <v-card-title class="py-1" :class="{ 'custom-font': en }">
                    <h3>{{ en ? 'ຂໍ້ມູນທັງໝົດ' : 'All information' }}</h3>
                  </v-card-title>
                  <v-spacer />
                  <v-btn
                    fab
                    x-small
                    outlined
                    style="color: rgb(128, 128, 0); margin-right: 4px"
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-card-text
                  class="scrollbar"
                  style="
                    height: calc(100vh - 19vh) - 4px;
                    padding-left: 3px;
                    padding-right: 3px;
                    padding-top: 0px;
                    padding-bottom: 2px;
                  "
                >
                  <DataSet
                    v-if="text === 'Package History'"
                    :dataHPackage="dataHPackage"
                  />
                  <CCareTopUp
                    v-else-if="text === 'History Top-up'"
                    :dataCCare="dataCCare"
                  />
                  <SoXayApp
                    v-else-if="text === 'Soxay-App'"
                    :dataSoXay="dataSoXay"
                  />
                  <EZLoad
                    v-else-if="text === 'EZLoad'"
                    :data="vasSerVices.result"
                  />
                  <TPlusApp
                    v-else-if="text === 'TPlus-App'"
                    :data="vasSerVices.result"
                  />
                  <MMoneyx
                    v-else-if="text === 'M-MoneyX'"
                    :data="vasSerVices.result"
                  />
                  <DataPackage
                    v-else-if="text === 'Data-Package'"
                    :data="checkData"
                  />
                  <smsOneScreen v-else-if="text === 'History-SMS'" :SMS="SMS" />
                </v-card-text>
                <v-card
                  v-if="text === 'image'"
                  style="
                    max-width: 600px;
                    max-height: 80%;
                    margin-left: 2px;
                    margin-bottom: 2px;
                  "
                >
                  <v-img
                    v-for="(item, index) in uRegister"
                    :key="index"
                    :src="item.Photo"
                    :style="computeImageStyle(item)"
                  />
                </v-card>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text
      v-else
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 95vh;
      "
    >
      <v-card
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 :class="{ 'custom-font': en }">
          {{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ' : 'Enter your number phone.' }}
        </h3>
        <br />
        <v-icon size="85" color="rgb(128, 128, 0)"
          >mdi-monitor-dashboard</v-icon
        >
        <br />
        <h2 :class="{ 'custom-font': en }">
          <span :class="{ 'custom-font': en }" style="color: rgb(255, 255, 0)"
            >CRM</span
          >
          {{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'data not found' }}
        </h2>
      </v-card>
    </v-card-text>
  </div>
</template>
<script>
import DataSet from '../data_crm/dataSet'
import CCareTopUp from '../data_crm/ccaretopup'
import SoXayApp from '../data_crm/soXayApp'
import EZLoad from '../data_crm/EZLoad'
import TPlusApp from '../data_crm/TPlusApp'
import MMoneyx from '../data_crm/MMoneyx'
import DataPackage from '../data_crm/dataPackage'
import smsOneScreen from '../data_crm/smsOneScreen'
export default {
  middleware: 'auth',
  Currency: 'index',
  props: {
    numberPhonSend: String,
    dataPoint: Object,
    dataHPackage: Array,
    numberNull: Boolean,
    dataSoXay: Array,
    cutMoney3K: String,
    uRegister: Array,
    selectInform: Object,
    vasSerVices: Object,
    simType: Object,
    checkData: Object,
    SMS: Array,
    statusIR:Object,
  },
  components: {
    DataSet,
    CCareTopUp,
    EZLoad,
    SoXayApp,
    TPlusApp,
    MMoneyx,
    DataPackage,
    smsOneScreen,
  },
  data() {
    return {
      text: '',
      dialog: false,
      dataCCare: [],
      heightPx: 0,
      number: 0,
      showImage: false,
      valueSwitch5G: false,
      valueSwitch4G: false,
      valueSwitch3G: false,
      valueSwitchIRService: false,
      valueSwitchSMS: false,
      menu: [
        { name: 'Package 1', value: 1 },
        { name: 'Package 2', value: 2 },
        { name: 'Package 3', value: 3 },
        { name: 'Package 4', value: 4 },
        { name: 'Package 5', value: 5 },
      ],
    }
  },
  mounted() {
    this.dataOfCCare()
    this.setSheetHeight()
    window.addEventListener('resize', this.setSheetHeight)
    if (this.vasSerVices && this.vasSerVices.result3) {
      this.valueSwitch4G = this.vasSerVices.result3.gprs4g === 'Off'
      this.valueSwitch3G = this.vasSerVices.result3.gprs3g === 'Off'
    }
    if (this.statusIR && this.statusIR.ResultVLR) {
      this.valueSwitchIRService = this.statusIR.ResultVLR === 'On'
    }
  },
  watch: {
    vasSerVices(newVal) {
      if (newVal && newVal.result3) {
        this.valueSwitch4G = newVal.result3.gprs4g === 'Off'
        this.valueSwitch3G = newVal.result3.gprs3g === 'Off'
      }
    },
    statusIR(newVal) {
      if (newVal && newVal.ResultVLR) {
        this.valueSwitchIRService = newVal.ResultVLR === 'On'
      }
    },
  },
  computed: {
    en() {
      return this.$store.state.en
    },
    packagesCount() {
      return this.checkData?.processedData?.packages
        ? Object.keys(this.checkData.processedData.packages).length
        : 0
    },
  },
  methods: {
    getPackageValueByIndex() {
      if (this.checkData?.processedData?.packages) {
        const packages = this.checkData.processedData.packages
        const packageKeys = Object.keys(packages)
        const convertToKB = (size) => {
          const value = parseFloat(size)
          if (size.includes('GB')) {
            return value * 100;
          } else if (size.includes('MB')) {
            return value * 10;
          } else if (size.includes('KB')) {
            return value;
          }
          return 0;
        }
        const maxKey = packageKeys.reduce((max, key) => {
          return convertToKB(packages[key].packagevalue) >
            convertToKB(packages[max].packagevalue)
            ? key
            : max
        }, packageKeys[0])

        return packages[maxKey]?.packagevalue || '0MB'
      }
      return '0MB'
    },
    handleBeforeChange(title, content, switchName, status) {
      const originalStatus = this[switchName]
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title: this.en ? `<span class="custom-font">${title}</span>` : title,
          content: status
            ? `<span class="custom-font">${
                this.en ? 'ປິດໃຊ້ງານ' : 'Deactivate'
              }</span>` +
              '\u00A0' +
              `<span class="custom-font">${content}</span>`
            : `<span class="custom-font">${
                this.en ? 'ເປິດໃຊ້ງານ' : 'Enable'
              }</span>` +
              '\u00A0' +
              `<span class="custom-font">${content}</span>`,
          onOk: async () => {
            if (title ==='IR Service' || title === 'ການບໍລິການ IR') {
              
              if (status) {
                await this.OffIR_Service()
              } else {
                await this.OnIR_Service()
              }
            }
            this[switchName] = originalStatus
            resolve(true)
          },
          onCancel: () => {
            this[switchName] = !status
            resolve(false)
          },
        })
      })
    },
    async OffIR_Service() {
      try {
        const res = await this.$axios.post(
          'http://172.28.26.23:3100/tplushlr/OffIR-Service',
          {
            ISDN: this.numberPhonSend,
            Chanel: 'USSDIR',
          }
        )
        res.statusText === 'OK' ? this.messageModal('success') : this.messageModal('error');
      } catch (error) {
        console.error(error)
      }
    },
    async OnIR_Service() {
      try {
        const res = await this.$axios.post(
          'http://172.28.26.23:3100/tplushlr/OnIR-Service',
          {
            ISDN: this.numberPhonSend,
            Chanel: 'USSDIR',
          }
        )
        res.statusText === 'OK' ? this.messageModal('success') : this.messageModal('error');
      } catch (error) {
        console.error(error)
      }
    },
    setSheetHeight() {
      this.heightPx = window.innerHeight - 64
    },
    monthAndYear() {
      const now = new Date()
      const year = now.getFullYear()
      const month = (now.getMonth() + 1).toString().padStart(2, '0')
      return `${year}${month}`
    },
    async dataOfCCare() {
      const Month = this.monthAndYear()
      const month = Number(Month)
      const apiCalls = [
        this.$axios.post(
          'http://172.28.17.102:9960/finddate/findcareregister',
          {
            datetime: month,
          }
        ),
      ]
      try {
        const responses = await Promise.all(apiCalls)
        const [ccareDetailResponse] = responses
        this.dataCCare = ccareDetailResponse ? ccareDetailResponse.data : []
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    showData(textValue) {
      if (textValue === 'image') {
        this.uRegister.forEach((item) => this.computeImageStyle(item))
      }
      this.text = textValue
      this.dialog = true
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) return text
      return text.substring(0, maxLength) + '...'
    },
    computeImageStyle(item) {
      const img = new Image()
      img.src = item.Photo
      const height = img.height
      const width = img.width
      if (height > width * 1.5) {
        return {
          maxWidth: '600px',
          height: 'auto',
        }
      } else {
        return {
          maxWidth: '100%',
          height: 'auto',
        }
      }
    },
    formatResultDesc(value) {
      const num = Number(value)
      if (!isNaN(num)) {
        return new Intl.NumberFormat().format(num)
      }
      return value
    },
    messageModal (type) {
        this.$Message[type]({
        background: true,
        content: !this.valueSwitchIRService ? `<span class="custom-font">${type === 'success' ? 'ເປິດໃຊ້ງານສໍາເລັດ.' : 'ເປິດໃຊ້ງານບໍ່ສໍາເລັດ.'}` : `<span class="custom-font">${type === 'success' ? 'ປິດໃຊ້ງານສໍາເລັດ.' : 'ປິດໃຊ້ງານບໍ່ສໍາເລັດ.'}`
      });
    }
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
}

.scrollbar::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: rgb(255, 204, 0);
}

.small-table {
  font-size: 10px;
}
.hover-pointer {
  cursor: pointer;
  background-color: none;
}
.hover-pointer:hover {
  background-color: rgb(242, 242, 242);
}
.card-title {
  background-color: rgb(255, 255, 179);
  border-radius: 5px;
  transition: background-color 0.3s;
}
.background_color {
  background-color: rgb(255, 255, 77);
}
.font_size_14 {
  font-size: 14px;
}
.font_size_12 {
  font-size: 12px;
}
.BK_color_YL {
  background-color: rgb(255, 255, 80);
}
.color_Iconclose {
  color: rgb(51, 51, 0);
}
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>
