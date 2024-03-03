<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mi Super Página</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item" v-if="sesionStore.isUserLoggedIn && sesionStore.usuario.rol === 'Profesor'">
            <router-link class="nav-link" to="/listar-usuarios">Listar Usuarios</router-link>
          </li>
          <li class="nav-item" v-if="sesionStore.isUserLoggedIn && sesionStore.usuario.rol === 'Profesor'">
            <router-link class="nav-link" to="/categorias">Categorías</router-link>
          </li>
          <li class="nav-item" v-if="sesionStore.isUserLoggedIn && sesionStore.usuario.rol === 'Profesor'">
            <router-link class="nav-link" to="/preguntas">Preguntas</router-link>
          </li>
          <li class="nav-item" v-if="sesionStore.isUserLoggedIn">
            <router-link class="nav-link" to="/examenes">Exámenes</router-link>
          </li>
          <li class="nav-item" v-if="sesionStore.isUserLoggedIn && sesionStore.usuario.rol === 'Profesor'">
        <button @click="editarUsuario" class="btn btn-outline-light">{{ 'Bienvenido ' + sesionStore.usuario.nombre }}</button>
      </li>
      <li class="nav-item" v-if="sesionStore.isUserLoggedIn && sesionStore.usuario.rol !== 'Profesor'">
        <span class="text-light">{{ 'Bienvenido ' + sesionStore.usuario.nombre }}</span>
      </li>
          
          <li class="nav-item">
            <button v-if="sesionStore.isUserLoggedIn" @click="cerrarSesion" class="btn btn-danger">Cerrar
              sesión</button>
            <button v-else @click="() => router.push('/login')" class="btn btn-success">Iniciar sesión</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSesionStore } from '@/store/sesion';
import { useRouter } from 'vue-router';
const router = useRouter();
const sesionStore = useSesionStore();

const editarUsuario = () => {
  if (sesionStore.usuario) {
    router.push({ path: `/usuario/${sesionStore.usuario.id}` });
  } else {
    console.error('sesionStore.usuario es undefined');
  }
};
const cerrarSesion = () => {
  sesionStore.clearUser();
  router.push('/login');
};
</script>

<style scoped></style>