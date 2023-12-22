<template>
    <div>
      <div>ff</div>
      <v-btn @click="navigateToData1">Go to Data1</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        desserts: [],
        date: new Date(
          Date.now() - 24 * 60 * 60 * 1000 - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        value: [],
        names: [],
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          const startDate = this.date;
          const endDate = this.dates;
          const res = await this.$axios.$get(
            `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
              startDate
            )}&endDate=${encodeURIComponent(endDate)}`
          );
  
          // Calculate values based on SERVICE_GROUP
          this.datavalue = this.calculateDataValue(res, 'DATA');
          this.vasvalue = this.calculateDataValue(res, 'VAS');
          this.voicevalue = this.calculateDataValue(res, 'VOICE');
          this.smsvalue = this.calculateDataValue(res, 'SMS');
          this.grandtotal =
            this.datavalue + this.vasvalue + this.voicevalue + this.smsvalue;
  
          this.names = ['DATA', 'VAS', 'VOICE', 'SMS'];
          this.value = [
            this.datavalue,
            this.vasvalue,
            this.voicevalue,
            this.smsvalue,
          ];
  
          this.desserts = this.names.map((item, index) => ({
            name: item,
            value: this.value[index],
          }));
          console.log('h', this.desserts);
          if (res === undefined) {
            console.error('Response is undefined');
            return 'Response is undefined';
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
  
      calculateDataValue(data, serviceGroup) {
        // Assuming "SERVICE_GROUP" is the key you want to filter on
        return data.reduce((sum, entry) => {
          if (entry.SERVICE_GROUP === serviceGroup) {
            // Adjust the logic based on the field you want to sum
            return sum + 1;
          }
          return sum;
        }, 0);
      },
  
      navigateToData1() {
        // Pass desserts as a parameter to the Data1 route
        // this.$router.push({ name: 'graph', params: { desserts: this.desserts } });
      },
    },
  };
  </script>
  