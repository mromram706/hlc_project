<template>
  <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center mt-5">
      <div class="mb-3 w-50">
          <label for="nombre" class="form-label">Nombre:</label>
          <input type="text" id="nombre" v-model="usuario.nombre" required class="form-control">
      </div>

      <div class="mb-3 w-50">
          <label for="rol" class="form-label">Rol:</label>
          <select id="rol" v-model="usuario.rol" required class="form-select">
              <option>Alumno</option>
              <option>Profesor</option>
          </select>
      </div>

      <div class="mb-3 w-50">
          <label for="contraseña" class="form-label">Contraseña:</label>
          <input type="password" id="contraseña" v-model="usuario.contraseña" required class="form-control">
      </div>

      <button type="submit" class="btn btn-primary">{{ esEditar ? 'Actualizar' : 'Crear' }} usuario</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUsuariosStore } from '@/store/usuariosStore';
import { useRoute, useRouter } from 'vue-router';

const usuariosStore = useUsuariosStore();
const route = useRoute();
const router = useRouter();
const usuario = ref({ nombre: '', rol: '', contraseña: '' });
const esEditar = ref(false);

onMounted(async () => {
    
  if (route.params.id) {
    esEditar.value = true;
    const usuarioExistente = usuariosStore.obtenerUsuario(Number(route.params.id));
    if (usuarioExistente) {
      usuario.value = {...usuarioExistente};
    } else {
      router.push('/404');
    }
  }
});

const handleSubmit = async () => {
  if (esEditar.value) {
    await usuariosStore.actualizarUsuario(Number(route.params.id), usuario.value);
  } else {
    await usuariosStore.agregarUsuario(usuario.value);
  }
  router.push('/listar-usuarios');
};
</script>