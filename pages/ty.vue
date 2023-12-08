<template>
  <div>ff</div>
</template>
<script>
export default {
  data() {
    return {
      desserts: [],
      item: [],
      dessertsfirst: [],
      date: new Date(
        Date.now() -
          24 * 60 * 60 * 1000 -
          new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
      dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10), // + 'T00:00:00.000Z',
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const startDate = this.date
        const endDate = this.dates
        const config = {
          headers: {
            'ngrok-skip-browser-warning': 'true', // Include the custom header
          },
        }

        const res = await this.$axios.$get(
          `https://0514-115-84-68-228.ngrok-free.app/ticket?startDate=${encodeURIComponent(
            startDate
          )}&endDate=${encodeURIComponent(endDate)}`,
          config
        )

            // this.desserts = uniqueDesserts.map((item, index) => {


        const lastIndexes = {}

        for (let i = res.length - 1; i >= 0; i--) {
          const currentTicketID = res[i].TICKETID

          if (typeof lastIndexes[currentTicketID] === 'undefined') {
            lastIndexes[currentTicketID] = i
          }
          // console.log('this is  : ', i)
        }

        // const inprogressowner = lastIndexes
        // const inprogressownerValue = res[inprogressowner]?.CLASSIFICATION || ''

        // console.log('hello :', inprogressownerValue)
        // console.log('this is lastindexes : ', lastIndexes)

        const firstIndexes = {}
        for (let i = 0; i < res.length; i++) {
          const currentTicketID = res[i].TICKETID
          if (typeof firstIndexes[currentTicketID] === 'undefined') {
            // Store the first index for the current TICKETID group
            firstIndexes[currentTicketID] = i
          }
        }

        // console.log(firstIndexes)

        // Create this.desserts based on the last indexes
        this.item = Object.values(lastIndexes).map((lastIndex) => {
          const lastItem = res[lastIndex]
          console.log( lastItem.QUEUED_DATE)
          for (let i = 1; i < lastItem.length; i++) {
            console.log(lastItem)
          }
          // console.log('ii',lastItem)
          return lastItem
        })

        this.dessertsfirst = Object.values(firstIndexes).map(
          (firstIndexes) => res[firstIndexes]
        )
        // console.log(this.dessertsfirst)
      // }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>