<!-- <template>
    <div>
      <v-btn @click="fetchData">Search</v-btn>
      <p>{{ data }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: null,
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await this.$axios.post('/api/tplushlr/StatusIR-Service', {
            ISDN: '2076003800',
          });
          this.data = response.data;
          console.log(this.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  };
  </script>
   -->