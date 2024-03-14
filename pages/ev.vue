<template>
    <v-card>
      <v-form @submit.prevent="loginUser" @keydown.enter="loginUser">
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="fname" label="Username" required></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-form>
      <div>
        {{ dataresponse }}
      </div>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        fname: '',
        password: '',
        dataresponse: null,
      };
    },
    methods: {
       loginUser() {
        console.log('hhhi');
      },
    },
  };
  </script>