<template>
    <div>
      <!-- Conditionally render the content based on the desserts array -->
      <div v-for="(item, index) in desserts" :key="index">
        {{ item.i }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      desserts: Array,
    },
    data() {
      return {
        datavalue: null,
        loading: true,
      };
    },
    methods: {
       getData() {
        try {
          // Calculate values based on SERVICE_GROUP
          this.datavalue = this.calculateDataValue(this.desserts, 'hi');
          this.dataset = this.desserts.map((item) => ({
            name: item.i, // Assuming "i" is a property in your dessert objects
          }));
          console.log('h', this.datavalue + 'fi');
          console.log('hfff', this.desserts);
          if (this.desserts === undefined) {
            console.error('Response is undefined');
            throw new Error('Response is undefined');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors as needed, e.g., show an error message to the user
          throw error;
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
  
      async fetchData() {
        try {
          await this.getData();
          // Handle logic after data is fetched
          this.graphShow();
          this.loading = false;
        } catch (error) {
          // Handle errors here
          console.error('Error in fetchData:', error);
        }
      },
  
      graphShow() {
        // Implement your graphShow logic here
        console.log('Graph is shown!');
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  