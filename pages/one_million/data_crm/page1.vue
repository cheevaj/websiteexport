<template>
    <div>
        <v-btn @click="handleSearch">Button</v-btn>
        <div class="background_color"><page2 :dataPointA="dataPointA"/></div>
    </div>
</template>
<script>
import page2 from './page2.vue'
export default {
  Currency: 'page2',
  components: { page2 },
  data() {
    return {
      dataPointA: [],
    }
  },

  mounted() {
    // this.handleSearch()
  },
  methods: {
    async handleSearch() {
      try {
        const response = await this.$axios.post(
          'http://172.28.26.23:9085/api/spnv/query-register-history',
          {
            ClientIP: '1.1.1.1',
            UserId: 'APITPLUS',
            Chanel: 'TPLUS',
            Msisdn: '2076964253',
            PageNo: 1,
            PageSize: 10,
          }
        )
        this.dataPointA = response.data.Detail;
      } catch (error) {
        this.dataResponse = []
        console.error('Error fetching data:', error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
