<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" :title="pessoa?.pessoa_nome" nav>
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Clientes" value="clientes" @click="navigate('/clientes')"></v-list-item>
          <v-list-item prepend-icon="" title="Usuários" value="Usuarios" @click="navigate('/usuarios')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts">
import { userStore } from '@/store/user'
import type { Pessoa } from '@/types/pessoa/pessoa';
export default {
  name: 'AgendaMain',
  data() {
    return {
      drawer: true,
      rail: true,
      pessoa: undefined as Pessoa | undefined
    }
  },
  beforeMount (){
    let pessoa = userStore().getPessoa()
    console.info(pessoa)
    this.pessoa = pessoa != null ?  pessoa : undefined
  },
  methods: {
    navigate(route : string){
      this.$router.push(route);
    }
  }
}
</script>
<style></style>