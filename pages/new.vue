<template>
    <v-container fluid>
        <div v-if="graphdisplay ==='Variant'">
            <v-sparkline :fill="fill" :gradient="graphstyle[0]" :line-width="width" :padding="padding" :smooth="radius || false"
            :value="value" auto-draw></v-sparkline>  
        </div>
        
        <v-divider></v-divider>

        <v-row>
            <v-col cols="12" md="6">
            </v-col>
            <v-col cols="12" md="6">
                <v-slider v-model="width" label="Width" min="0.1" max="10" step="0.1" thumb-label></v-slider>
            </v-col>

            <v-col cols="6">
                <v-row class="fill-height" align="center">
                    <v-switch v-model="fill" label="Filled"></v-switch>
                </v-row>
            </v-col>

            <v-col cols="12" md="6" class="pl-12">
                <v-slider v-model="radius" label="Radius" min="0" max="25" thumb-label></v-slider>
            </v-col>
            <v-row class="fill-height" align="center">
                <v-item-group mandatory>
                    <v-row>
                        <v-item v-for="(item, i) in items" :key="i" v-slot="{ active, toggle }">
                            <v-btn text style="background-color: transparent; color: transparent;"
                                @click="showgraph(item.name)">
                                <v-card flat :style="{
                                    background: graphstyle[0],
                                    border: '2px solid',
                                    borderColor: active ? '#222' : 'white'
                                }" class="text-center pa-1" @click="toggle">
                                    <v-icon size="35">
                                        {{ item.icon }}
                                    </v-icon>
                                    <small>{{ item.name }}</small>
                                </v-card>
                            </v-btn>
                        </v-item>
                    </v-row>
                </v-item-group>
            </v-row>

            <v-col cols="12" md="6" offset-md="6">
                <v-slider v-model="padding" label="Padding" min="0" max="25" thumb-label></v-slider>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
const graphstyle = [['#00c6ff', '#F0F', '#FF0']]
export default {
    data: () => ({
        fill: true,
        items: [
            { icon: 'mdi-chart-areaspline-variant', name: 'Variant' },
            { icon: 'mdi-chart-bar', name: 'Bar' },
            { icon: 'mdi-chart-pie', name: 'Pie' },
        ],
        graphstyle,
        graphdisplay: 'Variant',
        padding: 8,
        radius: 10,
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        width: 2,
    }),
    methods: {
        showgraph(name) {
            this.graphdisplay = name;
            console.log(this.graphdisplay)
        }
    }
}
</script>