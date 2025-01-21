<!-- <template>
    <div>
        <div ref="resizableCol2" @mousedown="startResize">
            <v-card class="rounded-0" width="100%" :height="heightPx + 'px'" :style="{ width: col1Width + 'px' }" color="#ffff00"
              outlined>
              <v-toolbar color="#000" dark>
                <v-toolbar-title style="color: #ffff00">
                  <div :class="{ 'custom-font': en }">{{ en ? 'ສະແດງຕາຕະລາງ' : 'Table display' }}</div>
                  <input v-model="col1Width" class="resizable" type="range" color="#ffff00" :min="minCol1Width"
                    :max="maxCol1Width" />
                </v-toolbar-title>
              </v-toolbar>
              <v-list class="table-container" subheader two-line flat :height="heightPx + 'px'">
                <v-list-item-group class="table-title-hiegth table-container">
                  <v-list-item v-for="item in columns" :key="item.key">
                    <template #default="{ active }">
                      <v-list-item-action>
                        <v-checkbox v-model="item.active" :input-value="active"></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </div>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        data: this.getMockData(),
        targetKeys: this.getTargetKeys(),
      };
    },
    methods: {
      getMockData() {
        const mockData = [];
        for (let i = 1; i <= 20; i++) {
          mockData.push({
            key: i.toString(),
            label: 'Content ' + i,
            description: 'The desc of content ' + i,
            disabled: Math.random() * 3 < 1,
          });
        }
        return mockData;
      },
      getTargetKeys() {
        return this.getMockData()
          .filter(() => Math.random() * 2 > 1)
          .map((item) => item.key);
      },
      render(item) {
        return item.label;
      },
      handleChange(newTargetKeys, direction, moveKeys) {
        console.log(newTargetKeys);
        console.log(direction);
        console.log(moveKeys);
        this.targetKeys = newTargetKeys;
      },
    },
  };
  </script>
   -->