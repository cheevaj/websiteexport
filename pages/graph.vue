<template>
    <v-card class="mx-auto text-center" color="#ffff00" dark>
        <v-card-text class="pa-1">
            <v-sheet color="#fff">
                <v-card-text class="pa-0">
                    <div class="text-left" style="background-color: #ffffff;">
                        <v-card-actions class="py-1">
                            <v-btn fab x-small text style="background-color: #000000" @click="$router.go(-1)">
                                <v-icon color="#ffff00" size="25">mdi-arrow-left</v-icon>
                            </v-btn>
                            <v-card-text class="text-center pa-0">
                                <v-list-item-action class="pa-0">
                                    <v-card-actions class="py-1">
                                        <h3 style="color: black;">24-06-2023</h3>
                                        <h2 class="mx-4" style="color: #000000;"><span style="color: #7d7d15;">To</span></h2>
                                        <h3 style="color: black;">24-06-2023</h3>
                                    </v-card-actions>
                                    </v-list-item-action>
                            </v-card-text>
                        </v-card-actions>
                    </div>
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </v-card-text>
                <v-card-text class="pb-0">
                    <v-row>
                        <v-col cols="12" sm="7">
                            <div v-if="graphdisplay === 'Bar'" class="text-center">
                                <MyChartBar />
                            </div>
                            <div v-if="graphdisplay === 'Pie'">
                                <MyChartPie />
                            </div>
                            <div v-if="graphdisplay === 'Variant'">
                                <MyChartVariant />
                            </div>
                        </v-col>
                        <!-- <v-divider vertical style="background-color: #ffff00;"></v-divider> -->
                        <v-col cols="12" sm="5">
                            <v-card-text style="color: #000000;">
                                hi
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card-text>
                <div class="px-1">
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </div>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" class="pl-12">
                            <v-row class="fill-height" align="center">
                                <!-- <v-switch v-model="fill" label="Filled"></v-switch> -->
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                            <v-slider v-model="width" label="Width" min="1" max="4.5" step="0.1" thumb-label></v-slider>
                        </v-col>
                        <v-col cols="6" class="pl-12">
                            <v-row class="fill-height" align="center">
                                <v-item-group mandatory>
                                    <v-row>
                                        <v-item v-for="(item, i) in items" :key="i" v-slot="{ active, toggle }">
                                            <v-btn text style="background-color: transparent; color: transparent;"
                                                @click="showgraph(item.name)">
                                                <v-card flat :style="{
                                                    background: graphstyle[0],
                                                    border: '2px solid',
                                                    borderColor: active ? '#000' : 'white'
                                                }" class="text-center pa-1" @click="toggle">
                                                    <v-icon size="35"
                                                        :style="{ color: graphdisplay === item.name ? '#000' : '#fff' }">
                                                        {{ item.icon }}
                                                    </v-icon>
                                                    <small
                                                        :style="{ color: graphdisplay === item.name ? '#000' : '#fff' }">{{
                                                            item.name }}</small>
                                                </v-card>
                                            </v-btn>
                                        </v-item>
                                    </v-row>
                                </v-item-group>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                            <v-slider v-model="radius" label="Radius" min="0" max="10" thumb-label style="b"></v-slider>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-sheet>
        </v-card-text>
        <v-card-text>
            <div class=" font-thin" style="color: #fff;">
                Sales Last 24h
            </div>
            <div class="text-h5 font-thin" style="color: black;">
                Sales Last 24h
            </div>
        </v-card-text>

        <v-card-text class="py-0">

            <v-divider style="background-color: black;"></v-divider>
        </v-card-text>

    </v-card>
</template>
<script>
import MyChartPie from '~/components/MyChartPie.vue';
import MyChartBar from '~/components/MyChartBar.vue';
import MyChartVariant from '~/components/MyChartVariant.vue';

const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    components: {
        MyChartPie,
        MyChartBar,
        MyChartVariant,
    },
    data: () => ({
        fill: false,
        items: [
            { icon: 'mdi-chart-bar', name: 'Bar' },
            { icon: 'mdi-chart-areaspline-variant', name: 'Variant' },
            { icon: 'mdi-chart-pie', name: 'Pie' },
        ],
        graphstyle,
        graphdisplay: 'Bar',
        radius: 2,
        value: [6, 0, 1, 8, 2, 9, 0],
        name: ['a', 'gi', 'dig', 'sen', 'ci', 'ji', 'fig'],
        width: 1.5,
    }),
    methods: {
        showgraph(name) {
            this.graphdisplay = name;
            console.log(this.graphdisplay)
        }
    }
}
</script>
  