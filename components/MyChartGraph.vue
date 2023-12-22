
<template>
    <div>
      <canvas id="myChart"></canvas>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        menu: false,
        dates: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10), // + 'T00:00:00.000Z',
        menus: false,
        dateshow: true,
      }
    },
    mounted() {
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new this.$Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
      console.log(myChart)
  
    },
    methods: {
    //   async getData() {
  
    //     // const hours = Math.floor(datelang / (1000 * 60 * 60))
    //     // if (datelang >= 0) {
  
    //     // console.log(hours)
    //     this.loading = true
  
    //     try {
    //       const startDate = this.date
    //       const endDate = this.dates
    //       const res = await this.$axios.$get(
    //         `http://172.28.26.23:3000/ticket?startDate=${encodeURIComponent(
    //           startDate
    //         )}&endDate=${encodeURIComponent(endDate)}`
    //       )
    //       console.log(res)
    //     } catch (error) {
    //       console.error('Error fetching data:', error)
    //       // Handle errors as needed, e.g., show an error message to the user
        // }
    //   },
  
    }
  };
  </script>
    