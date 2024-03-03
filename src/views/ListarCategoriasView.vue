<template>
    <div class="container mt-5">
        <h1 class="mb-4">Categorías</h1>
        <categoria-formulario ref="formulario"/>
        <div class="mt-5">
            <h2 class="mb-3">Lista de Categorías</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.id">
                        <td>{{ categoria.nombre }}</td>
                        <td>
                            <button @click="editarCategoria(categoria)" class="btn btn-success">Editar</button>
                            <button @click="eliminarCategoria(categoria.id)" class="btn btn-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import CategoriaFormulario from '@/components/CategoriaFormulario.vue';
import { useCategoriasStore } from '@/store/categoriasStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formulario = ref(null);
const categoriasStore = useCategoriasStore();
const categorias = categoriasStore.categorias;

const router = useRouter();
const eliminarCategoria = (id) => {
    categoriasStore.eliminarCategoria(id);
};
const editarCategoria = (categoria) => {
// Import the 'router' object from the Vue Router package

router.push(`/categorias/editar/${categoria.id}`);
};
</script>