
<template>
    <v-card class="mx-auto text-center" color="#ffff00" dark>
        <v-card-text class="pa-1">
            <v-sheet color="rgba(0, 0, 0, 0.9)">
                <v-card-text class="px-12">
                    <P>24-06-2023</P>
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </v-card-text>
                <v-card-text class="pb-0" style="min-height: 350px;">
                    <div v-if="graphdisplay === 'Variant'" class="text-center">
                        <v-sparkline :fill="fill" :gradient="graphstyle[0]" :line-width="width" padding="6"
                            :smooth="radius || false" :value="value" auto-draw>
                            <template v-slot:label="{ index }">
                                {{ name[index] }}
                            </template>
                        </v-sparkline>
                    </div>
                </v-card-text>
                <div class="px-1">
                    <v-divider style="background-color: #ffff00;"></v-divider>
                </div>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6" class="pl-12">
                            <v-row class="fill-height" align="center">
                                <v-switch v-model="fill" label="Filled"></v-switch>
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
                                                    borderColor: active ? '#ff9900' : 'white'
                                                }" class="text-center pa-1" @click="toggle">
                                                    <v-icon size="35"
                                                        :style="{ color: graphdisplay === item.name ? '#ff9900' : '#fff' }">
                                                        {{ item.icon }}
                                                    </v-icon>
                                                    <small
                                                        :style="{ color: graphdisplay === item.name ? '#ff9900' : '#fff' }">{{
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
        <v-card-actions class="justify-center">
            <v-btn class="py-6 px-8" text style="color: black;">
                Close
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    data: () => ({
        fill: false,
        items: [
            { icon: 'mdi-chart-areaspline-variant', name: 'Variant' },
            { icon: 'mdi-chart-bar', name: 'Bar' },
            { icon: 'mdi-chart-pie', name: 'Pie' },
        ],
        graphstyle,
        graphdisplay: 'Variant',
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