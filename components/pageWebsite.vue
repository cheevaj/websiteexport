<template>
    <div>
      <v-sheet flat class="mx-auto fill-height pt-0" style="background-color: rgb(255, 255, 230); box-shadow: inset;">
        <v-slide-group class="pt-0 px-4 pb-4 text-center" active-class="success" show-arrows justify="center">
          <v-slide-item v-for="(item, index) in itemsss" :key="index">
            <v-card :outlined="buttonWeb === index ? false : true" :bordered="false" class="mt-12 mx-2 px-2 mb-2"
              style="height: 250px; width: 200px;" @mouseenter="buttonWeb = index" @mouseleave="buttonWeb = false">
              <div style="height: 40px;">
                <v-card flat height="74px" width="74" size="avatarSize"
                  style="padding: 2px;bottom: 40px; left: 55px; border-radius: 50%; background-color:rgb(217, 217, 217);">
                  <v-card flat height="70" width="70" size="avatarSize" style="border-radius: 50%;">
                    <v-img white="100%" height="100%" :src="item.avatar" />
                  </v-card>
                </v-card>
              </div>
              <div style="border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                <v-card-text class="pb-0 pl-0 text-center">
                  <h2 style="color: rgb(102, 102, 0);">
                    {{ item.title }}
                  </h2>
                </v-card-text>
                <v-divider class="mx-4" style="background-color: rgb(102, 102, 0);" />
              </div>
              <v-card-text class=" py-1" height="60px">
                {{ item.subtitle }}
              </v-card-text>
              <v-btn class="mt-2" :outlined="buttonWeb === index ? false : true" style="color:rgb(230, 230, 0);"
                :style="{backgroundColor:buttonWeb === index ? '#000' : '#ffff'}" @click="openLinkInNewTab(item.link)"> Login
              </v-btn>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </template>
  <script>
  export default {
    data: () => ({
      buttonWeb: false,
      // All website 
      itemsss: [
        {
          avatar: 'https://tplus.la/Black-Tplus-logo.png',
          title: 'MyCCare Web',
          subtitle: 'TPLUS has been developed and remains an important part of VimpelCom.',
          link: 'http://10.30.6.94:7878/Replaceisdn/index.php',
        },
        {
          avatar: 'https://tse4.mm.bing.net/th?id=OIP.Es4Sc4gJqjV7Lh9BDs21WwHaEK&pid=Api&P=0&h=220',
          title: 'Vas Service',
          subtitle: 'TPLUS has been developed and remains an important part of VimpelCom.',
          link: 'http://10.30.6.94:9999/Hlred.php',
        },
        {
          avatar: 'http://172.28.17.137:7789/Services/asset/images//logo-round.png',
          title: 'TPLUS',
          subtitle: 'TPLUS has been developed and remains an important part of VimpelCom.',
          link: 'http://172.28.17.137:7789/Services/?mode=login',
        },
      ],
    }),
    methods: {
      openLinkInNewTab(link) {
        window.open(link, '_blank')
      },
    },
  }
  </script>
  
  <style>
  .colorBK {
    background-color: #ffff00;
  }
  </style>
  