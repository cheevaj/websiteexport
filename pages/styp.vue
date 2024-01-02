<template>
  <div>
    <div @mouseleave="showText = false" class="grid">
      <v-app-bar
        flat
        app
        style="background-color: rgb(102, 48, 143)"
        height="100px"
        max-height="100%"
      >
        <v-row class="grid-items">
          <v-col class="px-0" cols="12" sm="4" @mouseenter="showText = false">
            <v-app-bar-title style="display: flex; align-items: flex-start">
              <div
                style="
                  display: flex;
                  align-items: flex-start;
                  margin-right: auto;
                "
                class="grid"
              >
                <v-img
                  src="https://iblaos.com/iblaos/image/logo.svg"
                  aspect-ratio="1.777"
                  contain
                  style="
                    max-width: 100%;
                    width: 300px;
                    height: 150px;
                    margin-top: 0;
                    object-fit: cover;
                  "
                >
                </v-img>
              </div>
            </v-app-bar-title>
          </v-col>
          <v-col cols="12" sm="8">
            <v-col
              class="mx-0"
              v-if="show=== true"
              style="display: flex; align-items: center; height: 100%"
            >
              <div
                style="
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
                class="grid"
              >
                <div
                  style="min-height: 100px;"
                  text
                  @mouseenter="showText = false"
                  disabled=true
                >
                  <v-col class="wrapper"> </v-col>
                </div>

                <v-btn
                  class="about-btn"
                  style="height: 100px; color: transparent"
                  text
                  @mouseenter="showText = 'About'"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px; color: white" fontsize>
                      About
                    </div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      i<span style="text-transform: lowercase"
                        >ndoChina
                        <span style="text-transform: uppercase">B</span
                        >ank</span
                      >
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  class="about-btn"
                  style="height: 100px;color: transparent; box-shadow: none; border: none"
                  text
                  @mouseenter="showText = 'Personal'"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px; color: white" fontsize>
                      personal
                    </div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      b<span style="text-transform: lowercase">anking </span>
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  class="about-btn"
                  style="height: 100px;color: transparent; box-shadow: none; border: none"
                  text
                  @mouseenter="showText = 'Corporate'"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px; color: white" fontsize>
                      corporate
                    </div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      b<span style="text-transform: lowercase">anking </span>
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  class="about-btn"
                  style="height: 100px;color: transparent; box-shadow: none; border: none"
                  text
                  @mouseenter="showText = 'Premier'"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px; color: white" fontsize>
                      premier
                    </div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      b<span style="text-transform: lowercase">anking </span>
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  class="about-btn"
                  style="height: 100px; color: white"
                  text
                  @mouseenter="showText = false"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px" fontsize>reward</div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      P<span style="text-transform: lowercase">rogram</span>
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  class="about-btn"
                  style="height: 100px; color: white"
                  text
                  @mouseenter="showText = false"
                >
                  <div class="wrapper">
                    <div style="padding-bottom: 10px" fontsize>cool</div>
                    <div style="color: #aca8a8; text-transform: uppercase">
                      L<span style="text-transform: lowercase">ifestyle </span>
                    </div>
                  </div>
                </v-btn>
              </div>
            </v-col>
            <v-col
              v-if="show===false"
              style="
                display: flex;
                align-items: center;
                justify-content: flex-end;
                height: 100%;
              "
            >
              <div
                style="
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <v-btn
                  style="box-shadow: none;background-color:rgb(102, 48, 143);border-radius:5px;border: 1px solid;
                  "
                >
                  <v-icon size="30" >mdi-view-sequential</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-app-bar>

      <div disabled="true">
        <v-card flat class="red-background">
          <v-main>
            <v-col
              v-if="
                showText == 'About' ||
                showText == 'Personal' ||
                showText == 'Corporate' ||
                showText == 'Premier'
              "
              class="pa-0"
              style="top: 80px; position: fixed; z-index: 10"
            >
              <div class="pa-0">
                <v-col class="pa-0">
                  <v-row>
                    <v-col
                      cols="12"
                      class="pa-0"
                      style="height: 1px; width: 100%"
                    >
                      <v-row>
                        <v-col cols="4"> </v-col>
                        <v-col cols="8">
                          <v-row>
                            <v-col cols="2" disabled="true">
                              <v-icon
                                size="50"
                                color="rgb(255, 128, 0)"
                                style="
                                  bottom: 35px;
                                  width: 50px;
                                  max-width:100%;
                                  margin-left: 80px;
                                "
                                v-if="showText == 'About'"
                                >mdi-triangle-small-up</v-icon
                              >
                            </v-col>
                            <v-col cols="2">
                              <v-icon
                                size="50"
                                color="rgb(255, 128, 0)"
                                style="
                                  bottom: 35px;
                                  width: 50px;
                                  margin-left: 40px;
                                "
                                v-if="showText == 'Personal'"
                                >mdi-triangle-small-up</v-icon
                              >
                            </v-col>
                            <v-col cols="2">
                              <v-icon
                                size="50"
                                color="rgb(255, 128, 0)"
                                style="bottom: 35px; width: 50px"
                                v-if="showText == 'Corporate'"
                                >mdi-triangle-small-up</v-icon
                              >
                            </v-col>
                            <v-col cols="2">
                              <v-icon
                                size="50"
                                color="rgb(255, 128, 0)"
                                style="bottom: 35px; width: 50px; right: 55px"
                                v-if="showText == 'Premier'"
                                >mdi-triangle-small-up</v-icon
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </div>
            </v-col>
          </v-main>
        </v-card>
        <div
          v-if="showText != false"
          style="position: fixed; z-index: 100; width: 100%"
        >
          <v-card class="green-background" flat style="position: relative">
          </v-card>
          <v-card
            class="white-background"
            style="position: relative; z-index: -1"
          >
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col> hhhh </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
    <div>
      <main>
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showText: false,
      show: true
    };
  },
  mounted() {
    // Update 'show' property on component mount
    this.updateShowProperty();
    
    // Listen for window resize events and update 'show' property accordingly
    window.addEventListener('resize', this.updateShowProperty);
  },
  methods: {
    updateShowProperty() {
      // Update 'show' property based on window width
      this.show = window.innerWidth > 1160;
    }
  },
  beforeDestroy() {
    // Remove the window resize event listener to prevent memory leaks
    window.removeEventListener('resize', this.updateShowProperty);
  }
};
</script>

<style scoped>
.about-btn:hover {
  background-color: #662483;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.red-background {
  width: 100%;
  height: 13vh;
  border-radius: 0%;
}

.green-background {
  background-color: rgb(255, 128, 0);
  width: 100%;
  height: 1.5vh;
  z-index: 100;
  border-bottom-right-radius: 0%;
  border-bottom-left-radius: 0%;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Set show to false for screen width less than or equal to 1600px */
@media only screen and (max-width: 1160px) {
  .grid {
    display: none;
  }
  
  /* Update the 'show' property to false for screen width less than or equal to 1600px */
  :root {
    --show-value: false;
  }
}

/* Use the custom property to set the 'show' property */
.grid {
  display: var(--show-value, grid);
}
</style>
