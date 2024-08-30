<!-- <template>
  <div>
    <v-card-text v-if="numberNull">
      <v-card-actions class="pa-0">
        <span v-if="valueSwitch5G" class="text-color" :class="{ 'custom-font': en }">
          {{ en ? 'ເປີດ' : 'Off' }}
        </span>
        <span v-else :class="{ 'custom-font': en }">{{ en ? 'ປິດ' : 'On ' }}</span>
        &nbsp;&nbsp;
        <i-Switch
          v-model="valueSwitch5G"
          size="small"
          :before-change="() => handleBeforeChange('Internet 5G', 'Internet 5G', 'valueSwitch5G', valueSwitch5G)"
        />
      </v-card-actions>
      <v-card-actions class="pa-0">
        <span v-if="valueSwitch4G" class="text-color" :class="{ 'custom-font': en }">
          {{ en ? 'ເປີດ' : 'Off' }}
        </span>
        <span v-else :class="{ 'custom-font': en }">{{ en ? 'ປິດ' : 'On ' }}</span>
        &nbsp;&nbsp;
        <i-Switch
          v-model="valueSwitch4G"
          size="small"
          :before-change="() => handleBeforeChange('Internet 4G', 'Internet 4G', 'valueSwitch4G', valueSwitch4G)"
        />
      </v-card-actions>
      <v-card-actions class="pa-0">
        <span v-if="valueSwitch3G" class="text-color" :class="{ 'custom-font': en }">
          {{ en ? 'ເປີດ' : 'Off' }}
        </span>
        <span v-else :class="{ 'custom-font': en }">{{ en ? 'ປິດ' : 'On ' }}</span>
        &nbsp;&nbsp;
        <i-Switch
          v-model="valueSwitch3G"
          :style="{ backgroundColor: valueSwitch3G ? '#e6e600' : '' }"
          size="small"
          :before-change="() => handleBeforeChange('Internet 3G', 'Internet 3G', 'valueSwitch3G', valueSwitch3G)"
        />
      </v-card-actions>
    </v-card-text>
    <v-card-text
      v-else
      style="display: flex; justify-content: center; align-items: center; height: 95vh;"
    >
      <v-card
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3 :class="{ 'custom-font': en }">{{ en ? 'ກະລຸນາປ້ອມເບີໂທລະສັບ.' : 'Enter Number phone.' }}</h3>
        <br />
        <v-icon size="85" color="rgb(102, 102, 0)">mdi-account-circle</v-icon>
        <br />
        <h2 :class="{ 'custom-font': en }"><span style="color: rgb(255, 255, 0)">{{ en ? '' : 'USER ' }}</span>{{ en ? 'ບໍ່ມີຂໍ້ມູນ' : 'data not found' }}</h2>
      </v-card>
    </v-card-text>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  props: {
    numberPhonSend: String,
    dataUser: Array,
    numberNull: Boolean,
  },
  data() {
    return {
      valueSwitch5G: false,
      valueSwitch4G: false,
      valueSwitch3G: false,
    };
  },
  computed: {
    en() {
      return this.$store.state.en;
    },
  },
  methods: {
    OffIR_Service_IR() {
      console.log(this.numberPhonSend);
      // try {
      //   const res = await this.$axios.post(
      //     'http://172.28.26.23:3100/tplushlr/OffIR-Service',
      //     {
      //       ISDN: this.numberPhonSend,
      //       Chanel: 'USSDIR',
      //     }
      //   );
      //   console.log(res);
      //   console.log(this.valueSwitch3G);
      // } catch (error) {
      //   console.error(error);
      // }
    },

    OnIR_Service_IR() {
      console.log(this.numberPhonSend);
      // try {
      //   const res = await this.$axios.post(
      //     'http://172.28.26.23:3100/tplushlr/OnIR-Service',
      //     {
      //       ISDN: this.numberPhonSend,
      //       Chanel: 'USSDIR',
      //     }
      //   );
      //   console.log(res);
      //   console.log(this.valueSwitch3G);
      // } catch (error) {
      //   console.error(error);
      // }
    },
    handleBeforeChange(title, content, switchName, status) {
      const originalStatus = this[switchName];
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title,
          content: status
            ? `<span class="custom-font">${this.en ? 'ປິດໃຊ້ງານ' : 'Deactivate'}</span>` + '\u00A0' + content
            : `<span class="custom-font">${this.en ? 'ເປິດໃຊ້ງານ' : 'Enable'}</span>` + '\u00A0' + content,
          onOk: async () => {
            if (status) {
              await this.OffIR_Service_IR();
            } else {
              await this.OnIR_Service_IR();
            }
            this[switchName] = originalStatus;
            resolve(true);
          },
          onCancel: () => {
            this[switchName] = !status;
            resolve(false);
          },
        });
      });
    },
  },
};
</script>
<style scoped>
.custom-font {
  font-family: 'Noto Sans Lao', sans-serif;
}
</style> -->
