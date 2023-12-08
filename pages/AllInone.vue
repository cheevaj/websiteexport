<template>
  <div ref="pdfContent">
    {{ desserts }}

    <!--Sto title table-->
  </div>
</template>
  <script>
// import VueResizeDirective from 'vue-resize-directive'
// Vue.use(VueResizeDirective)
// import html2pdf from 'html2pdf.js'
export default {
  Currency: 'DefaultLayout',
  data() {
    return {
      desserts: [],

      date: new Date(
        Date.now() -
          24 * 60 * 60 * 1000 -
          new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
      menu: false,
      dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
      menus: false,
      dateshow: false,
      // r:[],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      this.loading = true

      try {
        const startDate = this.date
        const endDate = this.dates

        const res = await this.$axios.$get(
          `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
            startDate
          )}&endDate=${encodeURIComponent(endDate)}`
        )

        console.log(res)

        const lastIndexes = {}
        const firstIndexes = {}
        const resolvebyIndex = {}
        const indateIndex = {}
        const inownerIndex = {}

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof inownerIndex[currentTicketID] === 'undefined') {
            inownerIndex[currentTicketID] = i - 3
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof lastIndexes[currentTicketID] === 'undefined') {
            lastIndexes[currentTicketID] = i
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof indateIndex[currentTicketID] === 'undefined') {
            indateIndex[currentTicketID] = i - 2
          }
        }

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof resolvebyIndex[currentTicketID] === 'undefined') {
            resolvebyIndex[currentTicketID] = i - 1
          }
        }

        for (let i = 0; i < res.length; i++) {
          const currentTicketID = res[i].TICKETID
          if (typeof firstIndexes[currentTicketID] === 'undefined') {
            firstIndexes[currentTicketID] = i
          }
        }

        const desserts = Object.values(firstIndexes).map((firstIndex) => {
          const firstItem = res[firstIndex]
          const lastItemIndex = lastIndexes[firstItem.TICKETID]
          const lastItem = res[lastItemIndex]
          const resolveItemIndex = resolvebyIndex[firstItem.TICKETID]
          const resolveItem =
            resolveItemIndex !== undefined ? res[resolveItemIndex] : null
          const inprogressItemIndex = indateIndex[firstItem.TICKETID]
          const inprogressItem = //  -2
            inprogressItemIndex !== undefined ? res[inprogressItemIndex] : null
          const inownerItemIndex = inownerIndex[firstItem.TICKETID]
          const inownerItem =
            inownerItemIndex !== undefined ? res[inownerItemIndex] : null

          const date1 = new Date(inprogressItem.QUEUED_DATE)
          const date2 = new Date(firstItem.QUEUED_DATE)
          const date3 = new Date(resolveItem.QUEUED_DATE)
          const date4 = new Date(lastItem.QUEUED_DATE)

          const timecare = date1 - date2
          const hours = Math.floor(timecare / (1000 * 60 * 60))
          const minutes = Math.floor(
            (timecare % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecaretplus = (timecare, hours, minutes)
          // --------------------------------
          // const timedotplus = resolvedateValue.getDate() - qeuredateValue.getDate()
          const timedo = date3 - date2
          const hoursdo = Math.floor(timedo / (1000 * 60 * 60))
          const minutesdo = Math.floor(
            (timedo % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timedotplus = (timedo, hoursdo, minutesdo)
          // --------------------------------

          const timecenter = date4 - date3
          const hourscenter = Math.floor(timecenter / (1000 * 60 * 60))
          const minutescenter = Math.floor(
            (timecenter % (1000 * 60 * 60)) / (1000 * 60)
          )
          const timecolsebycenter = (timecenter, hourscenter, minutescenter)
          // Add your custom logic here using firstItem and lastItem
          return {
            TICKETID: firstItem.TICKETID,
            CLASSIFICATION: firstItem.CLASSIFICATION,
            MSISDN: firstItem.MSISDN,
            SERVICE_GROUP: firstItem.SERVICE_GROUP,
            COMMODITY: firstItem.COMMODITY,
            CREATEDBY: firstItem.CREATEDBY,
            CREATIONDATE: firstItem.CREATIONDATE,
            QUEUED_DATE: firstItem.QUEUED_DATE,
            QUEUED_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_DATE: inprogressItem.QUEUED_DATE,
            INPROGRESS_OWNER: inownerItem.QUEUED_OWNER,
            INPROGRESS_OWNERGROUP: firstItem.OWNERGROUP,
            INPROGRESS_CHANGBY: inownerItem.INPROGRESS_CHANGEBY,
            RESOLVE_DATE: resolveItem.QUEUED_DATE,
            RESOLVE_OWNER: inprogressItem.QUEUED_OWNER,
            RESOLVE_OWNERGROUP: inprogressItem.OWNERGROUP,
            RESOLVE_CHANGBY: inprogressItem.INPROGRESS_CHANGEBY,
                TIME_CARE_TPLUS: timecaretplus, // inprogressdateValue - qeuredateValue
                TIME_DO_TPLUS: timedotplus, // resolvedateValue - qeuredateValue
            WORKLONG_DESCRIPTOIN: firstItem.FIRST_WORKLOG_DESCRIPTION,
            MODIFY_DATE: resolveItem.QUEUED_DATE,
            MODIFYBY: firstItem.FIRST_WORKLOG_MODIFYBY,
            PROVINCE: firstItem.PROVINCE,
            DISTRICT: firstItem.DISTRICT,
            VILLAGE: firstItem.VILLAGE,
            COMPLAIN_BY: firstItem.COMPLAIN_BY,
            CLOSE_DATE: lastItem.QUEUED_DATE,
            CLOSE_BY: lastItem.INPROGRESS_CHANGEBY,
            STATUS_TICKET: lastItem.STATUS,
            TIME_CLOSE_BY_CENTER: timecolsebycenter, // colsedateValue - resolvedateValue
          }
        })

        console.log(desserts)

        this.desserts = desserts
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle errors as needed, e.g., show an error message to the user
      }

      this.loading = false
    },
  },
  computed: {},
}
</script>
  <style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.table-container {
  max-height: 450px;
  overflow-y: auto;
}
.table-container ::-webkit-scrollbar {
  width: 2px;
}
.table-container ::-webkit-scrollbar-thumb {
  background-color: #ffff00;
  border-radius: 4px;
}
table-container ::-webkit-scrollbar-corner {
  background-color: #ffff00;
  border-radius: 4px;
}
</style>
    