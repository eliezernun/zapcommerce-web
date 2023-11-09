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
        <v-list density="compact" nav v-for="l in links">
          <v-list-item :prepend-icon="l.icon" :title="l.text" :value="l.index" @click="navigate(l.path)"> <v-tooltip
              activator="parent" location="start">{{ l.text }}</v-tooltip></v-list-item>
          <v-divider></v-divider>
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
import { AgendaLinksNavegacao } from '@/router/agenda/index'
import { Route } from "@/types/router/route";
export default {
  name: 'AgendaMain',
  data() {
    return {
      drawer: true,
      rail: true,
      pessoa: undefined as Pessoa | undefined,
      links: undefined as Route[] | undefined
    }
  },
  beforeMount() {
    let pessoa = userStore().getPessoa()
    this.pessoa = pessoa != null ? pessoa : undefined
    this.links = AgendaLinksNavegacao();
  },
  methods: {
    navigate(route: string) {
      this.$router.push(route);
    }
  }
}
</script>
<style></style>