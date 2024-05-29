<template>
  <div class="background_color">{{ dataPointA }}</div>
</template>
<script>
export default {
  Currency: 'index',
  props: {
    dataPointA: Array,
  },
  data() {
    return {}
  },

  mounted() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      console.log('DataA:', this.dataPointA)
    },
  },
}
</script>
