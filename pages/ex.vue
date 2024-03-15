<template>
    <div>
        <v-card class="text-center" max-width="340px" :class="{'shaking': !active }"
            style="background-color: rgba(255, 255, 255, 0.6); border: 1.5px solid rgb(153, 153, 0); border-radius: 20px; margin: 0 auto; top:10%; box-shadow: 20px 10px 20px rgba(0, 0, 0, 0.5);">
            <v-avatar class="my-2 pa-4" size="90">
                <img src="~/static/Tpluslogo.png" alt="John">
            </v-avatar>
            <v-card-title class="pl-4 text-center" width="100%">
                <span class="text-h5"><span style="color: #ffff00">L</span>ogin</span>
            </v-card-title>
            {{ active }}
            <v-divider></v-divider>
            <v-form>
                <v-card-text class="py-0" style="color: #000;">
                    Buttom hi
                </v-card-text>
            </v-form>
            <v-btn @click="toggleActive">
                Ok
            </v-btn>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: true,
        };
    },
    methods: {
        toggleActive() {
            this.active = !this.active;
            if (!this.active) {
                setTimeout(() => {
                    this.active = true;
                }, 450); // Change back to true after 1 second
            }
        }
    }
};
</script>

<style scoped>
.hovered {
    background-color: rgba(255, 255, 255, 0.8);
    border-color: rgb(255, 255, 0);
}

.shaking {
    animation: shake 0.1s ease-in-out infinite alternate;
}

@keyframes shake {
    0% {
        transform: translateX(-3px);
    }

    100% {
        transform: translateX(3px);
    }
}
</style>