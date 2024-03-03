<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PieComponent from './components/PieComponent.vue';
import NavBar from './components/NavBar.vue';
import { useSesionStore } from '@/store/sesion';
import { useUsuariosStore } from '@/store/usuariosStore';

const router = useRouter();
const sesionStore = useSesionStore();
const sesionUser = sesionStore.usuario;
const usuariosStore = useUsuariosStore();

const cerrarSesion = () => {
  sesionStore.clearUser();
  router.push('/login');
};

onMounted(async () => {
   await usuariosStore.cargarUsuarios();

  const sesion = localStorage.getItem('sesion');
  if (sesion) {
    const datosSesion = JSON.parse(sesion);
    sesionStore.setUser(datosSesion);
  }
});
</script>

<template>
  <div class="container-fluid">
    <nav-bar @cerrarSesion="cerrarSesion" :sesionUser="sesionUser" titulo="Mi página" />
    <main>
      <RouterView />
    </main>
    <pie-component/>
  </div>
</template>

<style scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

</style>