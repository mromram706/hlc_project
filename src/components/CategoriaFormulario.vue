<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre:</label>
      <input id="nombre" v-model="categoria.nombre" class="form-control" required>
    </div>
    <button type="submit" class="btn btn-primary">{{ esEditar ? 'Actualizar' : 'Crear' }} categoría</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useRoute, useRouter } from 'vue-router';

const categoriasStore = useCategoriasStore();
const route = useRoute();
const router = useRouter();
const categoria = ref({ nombre: '' });
const esEditar = ref(false);

onMounted(() => {
  if (route.params.id) {
    esEditar.value = true;
    const categoriaExistente = categoriasStore.categorias.find(c => c.id === Number(route.params.id));
    if (categoriaExistente) {
      categoria.value = { ...categoriaExistente };
    }
  }
});

const handleSubmit = async () => {
  if (esEditar.value && route.params.id) {
    await categoriasStore.actualizarCategoria(Number(route.params.id), categoria.value);
    router.push('/categorias');
  } else {
    await categoriasStore.agregarCategoria(categoria.value);
  }
  
};
</script>