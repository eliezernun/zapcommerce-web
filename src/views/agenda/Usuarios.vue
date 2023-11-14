<template>
    <div class="pessoas-container">
        <v-card width="800">
            <v-card-item>
                <v-card>
                    <UserList :usuarios="[]"/>
                </v-card>
            </v-card-item>
            <v-card-text>
                This is content
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
import UserList from '@/components/UserList.vue';

    export default {
    name: 'Usuarios',
    components: { UserList }
}
</script>
<style>
.pessoas-container {
    margin: 55px;
    width: 80vw;
    height: 80vh;
}
</style>