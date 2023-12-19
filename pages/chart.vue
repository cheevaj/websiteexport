<template>
  <div>
    <MyChartBar :datatel="datatel" />
  </div>
</template>

<script>
import MyChartBar from '~/components/MyChartBar.vue';

export default {
  components: {
    MyChartBar,
  },
  data() {
    return {
      datatel: {
        labels: ['bank', 'car', 'taxis', 'wto', 'jst', 'vivo'],
        datasets: [{
          data: [12, 19, 7, 5, 15, 10],
        }],
      },
    };
  },
};
</script>
