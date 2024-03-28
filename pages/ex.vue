<template>
  <div>
    <v-btn
      class="pa-0"
      text
      style="background-color: transparent; color: transparent"
      @mouseenter="showMenu = true"
    >
      <v-card-text :style="{ color: showMenu ? '#ffff00' : '#000' }">
        Menu <v-icon v-if="!showMenu">mdi-chevron-down</v-icon>
        <v-icon v-else>mdi-chevron-up</v-icon>
      </v-card-text>
    </v-btn>
    <v-list v-if="showMenu">
        <v-card class="text-center" width="150px" @mouseleave="showMenu = false">
            <v-list-item v-for="(item, index) in menuItem" :key="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-card>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    menuItem() {
      // Your menu item data
      return [{ title: 'Item 1' }, { title: 'Item 2' }, { title: 'Item 3' }]
    },
  },
}
</script>
