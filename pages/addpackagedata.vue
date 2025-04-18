<template>
  <div>
    <v-icon class="mt-1 ml-1" size="34" color="#000" @click="$router.go(-1)" style="position: absolute; z-index: 90; background-color: transparent;">mdi-arrow-left-circle</v-icon>
    <v-card-text class="card-text">
        <AddPackage />
    </v-card-text>
  </div>
</template>
<style>
  .card-text {
    background: linear-gradient(to bottom right, #ffff4d, #ffcc00);
    height: calc(100vh - 2px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  </style>
  