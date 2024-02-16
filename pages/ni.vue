<template>
    <div>
      <v-app-bar class="pa-0" :collapse="!collapseOnScroll" :height="collapseOnScroll ? '100px' : '20px'" absolute color="deep-purple accent-4" dark shrink-on-scroll prominent>
        <v-btn @click="collapseOnScroll = !collapseOnScroll">
          <v-icon>
            mdi-menu-up-outline
          </v-icon>
        </v-btn>
      </v-app-bar>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        collapseOnScroll: true,
      };
    },
  };
  </script>
  