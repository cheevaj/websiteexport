<template>
    <div>
      <div>{{ desserts }}</div>
      <div>
        new 2
        <newf :desserts="desserts" />
      </div>
    </div>
  </template>
  
  <script>
  import newf from './newf.vue';
  
  export default {
    components: {
      newf,
    },
    data() {
      return {
        desserts: [{ i: 'hi' }, { l: 'hello' }], // Set your actual desserts data here
      };
    },
    mounted() {
      // Call your data fetching method here
    },
  };
  </script>
  