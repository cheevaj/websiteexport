<template>
  <div
    class="background_color scrollbar"
    style="background-color: #e6e6e6; overflow-y: auto"
  >
    <v-card-actions
      class="pa-1"
      style="position: fixed; z-index: 100; left: 1px"
    >
      <v-btn
        fab
        x-small
        text
        style="background-color: #ffff00"
        @click="$router.go(-1)"
      >
        <v-icon color="#000" size="25">mdi-arrow-left</v-icon>
      </v-btn>
      <div style="position: fixed; z-index: 100; right: 1px">
        <v-card-actions class="pa-0">
          <transition name="move-right">
            <div v-show="buttonanime" class="transition-box">
              <v-card-actions class="pa-0">
                <div style="display: flex">
                  <form @submit.prevent="handleSearch">
                    <Input
                      v-model="numberPhon"
                      placeholder="Serial number is 20789..."
                      clearable
                      style="width: 250px; height: 34px; margin-top: 1px"
                      @keydown.enter="handleSearch"
                    />
                  </form>
                  <v-btn
                    :loading="loading"
                    small
                    text
                    @click="handleSearch"
                    style="
                      height: 31px;
                      background-color: #000;
                      color: #ffff00;
                      margin-top: 1px;
                      margin-left: 1px;
                      padding-left: 4px;
                      padding-right: 4px;
                    "
                  >
                    Search
                  </v-btn>
                  <v-btn
                    text
                    x-small
                    height="32px"
                    @click="buttonanime = !buttonanime"
                    style="padding: 0; margin-top: 1px"
                  >
                    <v-icon>mdi-chevron-double-right</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </div>
          </transition>
          <v-btn
            v-if="!buttonanime"
            fab
            text
            x-small
            height="32px"
            @click="buttonanime = !buttonanime"
            style="padding: 0"
          >
            <v-icon>mdi-chevron-double-left</v-icon>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card-actions>
    <v-card-text
      v-if="Object.keys(dataResponse).length > 0"
      class="py-2"
      style="background-color: rgb(255, 255, 204)"
    >
      <h2 class="text-center">
        List Data
        <!-- <v-divider class="mx-4" style="background-color: rgb(102, 102, 0)" /> -->
      </h2>
    </v-card-text>
    <v-card
      v-if="Object.keys(dataResponse).length > 0"
      outlined
      class="rounded-0 scrollbar px-4"
      style="
        width: 100%;
        position: fixed;
        height: calc(100vh - 14vh);
        left: 0;
        overflow: y;
        z-index: 10;
        background-color: #f2f2f2;
      "
    >
      <v-container
        v-if="Object.keys(dataResponse).length === 1"
        class="pt-0 pb-2"
      >
        <v-row>
          <v-col
            cols="12"
            v-for="(item, index) in dataResponse"
            :key="index"
            class="st_padding pt-0 mt-0"
            :class="[index === dataResponse.length - 1 ? 'pb-6' : 'pb-0']"
          >
            <v-card
              :outlined="outlined !== index"
              class="pa-2"
              @mouseover="outlined = index"
              @mouseleave="outlined = false"
            >
              <v-card-text>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-format-list-numbered</v-icon
                    >
                    Data Set:&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    index + 1
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-phone-in-talk-outline</v-icon
                    >
                    SIS :&nbsp;</span
                  ><span class="color_back font_size_18">{{
                    item.RECEIVER_ISDN
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-numeric-9-plus-box-multiple</v-icon
                    >
                    Receiver Amount :&nbsp;</span
                  ><span class="color_back font_size_18">{{
                    item.RECEIVER_AMOUNT_F
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-calendar-range-outline</v-icon
                    >
                    Create DATE :&nbsp;</span
                  ><span class="color_back font_size_18">{{
                    formatAdjustDate(item.CDATE)
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-text-box-edit-outline</v-icon
                    >
                    Result Description :&nbsp;</span
                  ><span class="color_back font_size_18">{{
                    item.RESULT_DESC
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-blinds-vertical-closed</v-icon
                    >
                    transfer Amount : &nbsp;</span
                  ><span class="color_back font_size_18">{{
                    item.TRANSFER_AMOUNT
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-4">
                  <span class="colo_text font_size_18"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-account-circle-outline</v-icon
                    >
                    USER ID :&nbsp;</span
                  ><span class="color_back font_size_18">{{
                    item.USER_ID
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <div v-else class="pt-0 pb-2">
        <v-row>
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="3"
            lg="3"
            xl="3"
            v-for="(item, index) in dataResponse"
            :key="index"
            class="st_padding pt-0 mt-4"
            :class="[index === dataResponse.length - 1 ? 'pb-6' : 'pb-0']"
          >
            <v-card
              :outlined="outlined !== index"
              class="pa-2"
              @mouseover="outlined = index"
              @mouseleave="outlined = false"
            >
              <v-card-text class="pa-0">
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-format-list-numbered</v-icon
                    >
                    Data Set:&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    index + 1
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-phone-in-talk-outline</v-icon
                    >
                    SIS :&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    item.RECEIVER_ISDN
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-numeric-9-plus-box-multiple</v-icon
                    >
                    Receiver Amount :&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    item.RECEIVER_AMOUNT_F
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-calendar-range-outline</v-icon
                    >
                    Create DATE :&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    formatAdjustDate(item.CDATE)
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-text-box-edit-outline</v-icon
                    >
                    Result Description :&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    item.RESULT_DESC
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-blinds-vertical-closed</v-icon
                    >
                    transfer Amount : &nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    item.TRANSFER_AMOUNT
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
                <v-card-actions class="pa-1">
                  <span class="colo_text font_size_12"
                    ><v-icon size="20" color="rgb(204, 204, 0)"
                      >mdi-account-circle-outline</v-icon
                    >
                    USER ID :&nbsp;</span
                  ><v-spacer /><span class="color_back font_size_12">{{
                    item.USER_ID
                  }}</span>
                </v-card-actions>
                <v-divider class="color_back"></v-divider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
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
        v-if="data_num"
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3>Enter New number phone.</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-database-alert</v-icon>
        </div>
        <br />
        <h2><span style="color: rgb(255, 255, 0)">Number</span>is not found</h2>
      </v-card>
      <v-card
        v-else
        min-width="450"
        min-height="300"
        class="text-center"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <h3>Enter your number phone.</h3>
        <br />
        <div class="mouse_senter" @click="buttonanime = !buttonanime">
          <v-icon size="85" color="rgb(128, 128, 0)">mdi-phone-classic</v-icon>
        </div>
        <br />
        <h2><span style="color: rgb(255, 255, 0)">Data</span> not found</h2>
      </v-card>
    </v-card-text>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'
export default {
  middleware: 'auth',
  Currency: 'index',
  data() {
    return {
      outlined: true,
      loading: false,
      data_num: false,
      dataResponse: {},
      numberPhon: '',
      buttonanime: true,
      numsend: [],
    }
  },
  methods: {
    async handleSearch() {
      this.loading = true
      const Num = this.numberPhon.split(',').map((num) => num.trim())
      try {
        const response = await this.$axios.post(
          'http://172.28.17.102:9970/data/findnumbersoxay',
          {
            telephone: Num,
          }
        )
        if (response.data && response.data.Detail) {
          this.dataResponse = response.data.Detail
        } else {
          // Handle case where response doesn't have the expected structure
          this.dataResponse = {}
        }
        this.data_num = true
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
    formatAdjustDate(dateString) {
      const date = new Date(dateString)
      const formattedDate = date
        .toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(',', '') // remove comma from the formatted string
      return formattedDate
    },
    handleFileUpload(event) {
      const fileInput = this.$refs.fileInput // ---- undefined
      if (event.target.files.length > 0) {
        const file = event.target.files[0]
        fileInput.value = ''
        this.readFile(file)
      } else {
        console.log('No file selected')
      }
    },
    readFile(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        // -------------- Assuming phone numbers are in the specified column (colNum)
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: 0,
        })
        // console.log(jsonData)

        // ---------------- Extract data from the specified column and row
        const extractedData = jsonData.map((row) => row[0])

        // ---------------- Remove the header (assuming the header is in the first row)
        extractedData.shift()

        // --------------- Set this.numsend to the extracted phone numbers
        this.numsend = extractedData.map((cell) => String(cell))
        this.numberPhon = this.numsend.join(', ') // Convert array back to comma-separated string
        // console.log(this.numberPhon)
      }
      reader.readAsBinaryString(file)
    },
  },
}
</script>

<style>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.colo_red {
  color: #ff0000;
}
.st_padding {
  padding-left: 2px;
  padding-right: 2px;
}
.background_color {
  background-color: rgb(242, 242, 242);
}
.mouse_senter {
  cursor: pointer;
}
.colo_text {
  color: rgb(115, 115, 115);
}
.color_back {
  color: rgb(77, 77, 0);
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
.font_size_18 {
  font-size: 18px;
  /* Adjust the font size as needed */
}
.font_size_12 {
  font-size: 12px;
  /* Adjust the font size as needed */
}
/* Increase specificity of thumb styles */
.scrollbar::-webkit-scrollbar-thumb {
  background-color: yellow;
  /* Set the color of the thumb */
}
</style>
