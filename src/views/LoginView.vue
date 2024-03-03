<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSesionStore } from '@/store/sesion';

const router = useRouter();
const nombre = ref("");
const contraseña = ref("");
const rol = ref("");
const sesionStore = useSesionStore();

const iniciarSesion = async () => {
  try {
    const response = await fetch('public/datos.json');
    const data = await response.json();
    const usuarioValido = data.find(usuario =>
      usuario.nombre === nombre.value &&
      usuario.contraseña === contraseña.value &&
      usuario.rol === rol.value
    );

    if (usuarioValido) {
      sesionStore.setUser({ id: usuarioValido.id, nombre: nombre.value, rol: rol.value });
      router.push("/");
    } else {
      alert("Datos de inicio de sesión incorrectos");
    }
  } catch (error) {
    console.error("Error al cargar el fichero JSON:", error);
  }
};
</script>

<template>
  <div id="contenedor-login" class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div id="login" class="card p-4" style="width: 20rem;">
      <div id="elementos-login" class="card-body">
        <h5 class="card-title mb-4">Iniciar Sesión</h5>

        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre:</label>
          <input type="text" id="nombre" v-model="nombre" placeholder="Nombre" class="form-control">
        </div>

        <div class="mb-3">
          <label for="contraseña" class="form-label">Contraseña:</label>
          <input type="password" id="contraseña" v-model="contraseña" placeholder="Contraseña" class="form-control">
        </div>

        <div class="mb-3">
          <label for="rol" class="form-label">Rol:</label>
          <select id="rol" v-model="rol" class="form-select">
            <option value="" disabled selected>Selecciona un rol</option>
            <option value="Profesor">Profesor</option>
            <option value="Alumno">Alumno</option>
          </select>
        </div>

        <button @click="iniciarSesion" class="btn btn-primary">Iniciar Sesión</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<style scoped></style>