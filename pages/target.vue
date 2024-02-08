<template>
  <div class="pt-0">
    <MyChartBar :chartType="selectedChart" :v1="v1" :v2="v2" :n="n" :vall='vall'/>
  </div>
</template>

<script>
import MyChartBar from '~/components/MyChartBar.vue'; // Adjust the path based on your actual structure
export default {
  components: {
    MyChartBar,
  },
  data() {
    return {
      expand: 'btn-1',
      n: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      vall: [27, 21, 30, 18, 20, 20],
      v1: [10, 13, 23, 10, 18, 11],
      v2: [17, 8, 7, 5, 8, 2, 9],
      selectedChart: 'bar',
    };
  },
};
</script>
