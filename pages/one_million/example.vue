<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent width="600">
            <v-card>
                <v-card-title class="text-h6 py-1" style="background-color: #ffff00; color: black">
                    Privacy Policy
                </v-card-title>
                <v-card-text>

                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-1">
                    <v-spacer></v-spacer>
                    <v-btn outlined style="color: rgb(153, 153, 0);" @click="dialog = false">
                        cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-btn color="red lighten-2" @click="dialog = true">
            Click Me
        </v-btn>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },
}
</script>