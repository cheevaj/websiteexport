<template>
  <div class="demo-split">
    <Split v-model="split" min="0" max="1110">
      <template #left>
        <v-card v-if="split > 0.02" class="demo-split-pane"> Left Pane </v-card>
      </template>
      <template #right>
        <div class="demo-split-pane">
          
        </div>
      </template>
    </Split>
  </div>
</template>
<script>
export default {
  data() {
    return {
      split: 0,
    }
  },
}
</script>

<style>
.demo-split {
  height: 90vh;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>
