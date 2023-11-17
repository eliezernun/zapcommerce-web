<template>
  <div class="container">
    <div class="centered">
      <div v-for="i in buttons">
        <v-btn @click="pushRoute(i.path, i.modulo)" elevation="12" size="large"><v-icon >{{ i.icon }}</v-icon>{{ i.text }}</v-btn>
      </div>
    </div>
    <div class="logout-container">
      <v-btn color="red-lighten-1" elevation="12" size="large">Sair <v-icon icon="mdi-location-exit" end ></v-icon></v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { userStore } from '@/store/user';
import { Modulos } from '@/types/enums/modulos';
import { buttonsModulos } from '@/constantes/modulosBtn';

interface ButtonItem {
  text: string;
  icon: string;
  path: string;
  modulo: Modulos;
}

export default {
  name: 'Sistemas',
  setup() {
    const store = userStore();
    return {
      store,
    };
  },
  data: () => ({
    buttons: <ButtonItem[]>([])
  }),

  beforeMount() {
    let modulos: Modulos[] | undefined = this.store.getUsuario()?.outros_sistemas;
    if( modulos?.length == 1 ){
      switch(modulos[0]){
        case Modulos.AGENDA :
          this.$router.push('/agenda')
        break;
        case Modulos.LOJA :
          this.$router.push('/loja')
        default:
          this.$router.push('/login')
      }
    }
    buttonsModulos.forEach(item => {
      if (modulos?.includes(item.modulo)) {
        this.buttons.push(item)
      }
    })
  },
  mounted() {
      this.notificar()
  },
  methods: {
    pushRoute(r: string, contexto: Modulos){
      this.store.setContexto(contexto);
      this.$router.push(r);
    },
    notificar (){
      
    }
  },
};
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  /* Adjust the height based on your requirements */
}
.centered {
  display: flex;
  flex-direction: row;
  text-align: center;
}
.centered button {
  margin: 5px;
}
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  padding: 20px;
  margin-top: 20px;
}
</style>