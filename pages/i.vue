<template>
  <v-list subheader two-line flat>
    <v-list-item-group>
      <v-list-item v-for="item in columns" :key="item.key">
        <template v-slot:default="{ active }">
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
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { key: 'TICKETID', title: 'TICKETID', active: false },
        { key: 'CLASSIFICATION', title: 'CLASSIFICATION', active: false },
        { key: 'MSISDN', title: 'MSISDN', active: false },
        { key: 'OWNERGROUP', title: 'OWNERGROUP', active: false },
        { key: 'SERVICE_GROUP', title: 'SERVICE_GROUP', active: false },
        { key: 'COMMODITY', title: 'COMMODITY', active: false },
      ],
    };
  },
};
</script>
