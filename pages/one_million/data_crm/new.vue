<!-- <template>
    <div>
        
        <div class="background_color">{{ getCurrentMonthYear() }}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },

  mounted() {
    this.getCurrentMonthYear();
  },
  methods: {
    getCurrentMonthYear() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      return `${year}${month}`;
    },
  },
}
</script> -->
