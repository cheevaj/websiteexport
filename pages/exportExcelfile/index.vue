<template>
  <div class="arrow-container pa-4">
    <v-card-actions class="text-center arrow-content pa-0">
      <div class="arrow-right"></div>
      <v-spacer></v-spacer>
      <h2>Not Data</h2>
      <v-spacer></v-spacer>
      <div class="arrow-left"></div>
    </v-card-actions>
  </div>
</template>

<style scoped>
.arrow-container {
  display: flex;
  align-items: center;
}

.arrow-left,
.arrow-right {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
}

.arrow-left {
  border-right: 25px solid rgb(255, 255, 255);
}

.arrow-right {
  border-left: 25px solid rgb(255, 255, 255);
}

.arrow-content {
  background: linear-gradient(to left,rgb(0, 255, 0), rgb(250, 255, 0), rgb(255, 64, 0));
  background-size: 100% 100%;
  animation: gradient-animation 3s ease infinite;
  color: white; /* Ensure the text is readable on the gradient background */
  padding: 20px;
  flex: 1; /* Expand to fill available space */
  text-align: center; /* Center the text */
  position: relative; /* Ensure the arrows stay in place */
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
