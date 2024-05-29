<template>
  <div>
    <v-card height="400" width="300">
      <v-card height="100%" width="100%">
        <v-card-title> Menu </v-card-title>
        <v-divider></v-divider>
        <v-btn
          class="pa-0"
          :text = "colortext === 'MenuAll' ? false : true"
          width="100%"
          style="background-color: transparent; color: transparent"
          @click="toggleItemStatus('../one_million')"
          @mouseenter="colortext = 'MenuAll'"
          @mouseleave="colortext = false"
        >
          <v-card-actions class="pa-0 red">
            <v-card-text
              :style="{ color: colortext === 'MenuAll' ? '#ffff00' : '#000' }"
            >
              <v-icon style="bottom: 2px"> mdi-monitor-screenshot</v-icon>
              One Screen
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-btn>
        <v-divider></v-divider>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colortext: false,
    }
  },
  methods: {
    toggleItemStatus(ToPath) {
      // Navigate to the specified path and pass the menuItem value as a query parameter
      this.$router.push({
        path: ToPath,
        query: { menuItem: false }, // Pass the menuItem parameter as false
      })
    },
  },
}
</script>
