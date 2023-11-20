<template>
    <div class="center">
        <v-card class="py-8 px-6 text-center" elevation="12" max-width="800" width="100%">
            <div>
                <div v-if="currentStep === 1">
                    <!-- Step 1 content -->
                    <v-card elevation="0">
                        <v-card-text>
                            <v-row><v-spacer></v-spacer><v-img width="96" height="96" src="https://zapcommerce.blob.core.windows.net/imagens-frontend/public/password-96.png"></v-img><v-spacer></v-spacer></v-row>
                        </v-card-text>
                        <v-card-title>Esqueceu sua senha?</v-card-title>
                        <v-card-subtitle>Informe o email de acesso:</v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-text-field density="compact" placeholder="email de acesso"
                                    prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>
                                <v-spacer></v-spacer>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
                <div v-if="currentStep === 2">
                    <!-- Step 2 content -->
                    <p>Step 2 Content</p>
                </div>
                <div v-if="currentStep === 3">
                    <!-- Step 3 content -->
                    <p>Step 3 Content</p>
                </div>
            </div>
            <!-- Navigation Buttons -->
            <v-btn @click="handlePrevious" v-if="currentStep > 1">Anterior</v-btn>
            <v-btn @click="handleNext" v-if="currentStep < 3">Próximo</v-btn>
        </v-card>
    </div>
</template>
  
<script lang="ts">
export default {
    name: 'RecuperarSenha',
    data() {
        return {
            currentStep: 1,
        };
    },
    methods: {
        handleNext() {
            console.info('Next');
            this.currentStep += 1;
        },
        handlePrevious() {
            console.info('Previous');
            this.currentStep -= 1;
        },
    },
};
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
  