<template>
    <div>
        <div class="text-center mb-4">
            <v-btn color="primary" @click="alert = !alert">
                Toggle
            </v-btn>
        </div>
        <div>
            <v-alert style="width: 350px;" :value="alert" text type="success" icon="mdi-check-circle-outline" transition="scale-transition">
                Download the file successfully.
            </v-alert>
            <v-alert style="width: 350px;" :value="alert" text type="error" icon="mdi-close-circle-outline" transition="scale-transition">
                <span>
                    Download the file is error.
                </span>
                <v-divider style="background-color: rgb(183, 183, 183);"></v-divider>
                <small>gg</small>
            </v-alert>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            alert: true,
        }
    },
}
</script>