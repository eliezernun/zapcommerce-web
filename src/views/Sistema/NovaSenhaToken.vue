<template>
    <div class="center">
        <v-card class="py-8 px-6 text-center" elevation="12" max-width="800" width="100%">
            <div>
                <v-card elevation="0">
                    <v-card-text>
                        <v-row><v-spacer></v-spacer><v-img width="96" height="96"
                                src="https://zapcommerce.blob.core.windows.net/imagens-frontend/public/password-96.png"></v-img><v-spacer></v-spacer></v-row>
                    </v-card-text>
                    <v-card-title>Esqueceu sua senha?</v-card-title>
                    <v-card-subtitle>{{ $route.params.token }}</v-card-subtitle>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </div>
        </v-card>
    </div>
</template>
<script lang="ts">
export default {
    name: 'NovaSenhaToken'

}

</script>
<style scoped>
.center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}
</style>