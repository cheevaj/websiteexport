<template>
  <div>
    <v-icon class="mt-1 ml-1" size="34" color="#000" @click="$router.go(-1)" style="position: absolute; z-index: 90; background-color: transparent;">mdi-arrow-left-circle</v-icon>
    <v-card-text class="card-text">
      <div class="custom-div">
        <v-row>
          <v-col cols="3" class="d-flex align-center justify-end pa-0">
            <h4>Name:</h4>
          </v-col>
          <v-col cols="9" class="pa-0">
            <Input
              v-model="name"
              placeholder="Enter your name..."
              clearable
              style="width: 300px; height: 34px; margin-left: 4px"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="d-flex align-center justify-end pa-0">
            <h4>Phon:</h4>
          </v-col>
          <v-col cols="9" class="pa-0">
            <Input
              v-model="numberPhon"
              type="number"
              placeholder="Enter number ( 20789... )"
              clearable
              style="width: 300px; height: 34px; margin-left: 4px"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="d-flex align-center justify-end pa-0">
            <h4>Sim Type:</h4>
          </v-col>
          <v-col cols="9" class="pa-0">
            <Select
              v-model="typeId"
              style="width: 200px; padding: 0px; margin-left: 4px"
            >
              <Option
                v-for="(item, index) in filteredType"
                :key="index"
                :value="item.typeId"
                
                class="custom-option"
              >
                {{ item.name }}
              </Option>
            </Select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="d-flex align-center justify-end pa-0">
            <h4>Code:</h4>
          </v-col>
          <v-col cols="9" class="pa-0">
            <Input
              v-model="code"
              type="number"
              placeholder="Enter Code Package ( 112 )"
              clearable
              style="width: 120px; height: 34px; margin-left: 4px"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="pa-0"></v-col>
          <v-col cols="9" class="pa-0">
            <v-btn
              :disabled="!isFormValid"
              width="300"
              style="background-color: #332900; color: #ffcc00; margin-left: 4px;"
              @click="AddPackage"
            >
              Add Packages
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      numberPhon: '',
      typeId: '',
      code: '',
      filteredType: [
        { name: 'Prepaid', typeId: 'pp' },
        { name: 'Postpaid', typeId: 'po' },
      ],
    }
  },
  computed: {
    isFormValid() {
      return this.name && this.numberPhon && this.typeId && this.code
    },
  },
  methods: {
    async AddPackage() {
      if (!this.isFormValid) {
        this.$Message.error({
          background: true,
          content: 'Please fill in all fields before submitting.',
          duration: 3,
        })
        return
      }

      try {
        const res = await this.$axios.post(
          `http://172.28.17.102:3455/active4G/addpackage`,
          {
            name: this.name,
            tel: this.numberPhon,
            type: this.typeId,
            code: this.code,
          }
        )

        if (res.status === 200) {
          this.$Message.success({
            background: true,
            content: 'Add Package success.',
            duration: 3,
          })
          this.resetForm()
        } else {
          throw new Error('Failed to add package')
        }
      } catch (error) {
        this.$Message.error({
          background: true,
          content: 'Cannot add package. Please try again.',
          duration: 3,
        })
        // console.error(error);
      }
    },
    resetForm() {
      this.name = ''
      this.numberPhon = ''
      this.typeId = ''
      this.code = ''
    },
  },
}
</script>

<style>
.custom-option {
  margin-left: -16px;
  margin-right: 8px;
}
.custom-option:hover {
  background-color: #ffcc00;
}
.card-text {
  background: linear-gradient(to bottom right, #ffff4d, #ffcc00);
  height: calc(100vh - 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.custom-div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: -80px;
}
</style>
