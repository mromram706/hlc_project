<template>
    <div class="container mt-5">
        <h1 class="mb-4">Preguntas</h1>
        <pregunta-formulario />
        <div class="mt-5">
            <h2 class="mb-3">Lista de Preguntas</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Enunciado</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
        <tr v-for="pregunta in preguntas" :key="pregunta.id">
            <td>{{ pregunta.enunciado }}</td>
            <td>{{ nombreCategoria(pregunta.id_categoria) }}</td>
            <td>
                <button @click="eliminarPregunta(pregunta.id)" class="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import PreguntaFormulario from '@/components/PreguntaFormulario.vue';
import { usePreguntasStore } from '@/store/preguntasStore';
import { useCategoriasStore } from '@/store/categoriasStore';

const preguntasStore = usePreguntasStore();
const preguntas = preguntasStore.preguntas;
const categoriasStore = useCategoriasStore();
const categorias = categoriasStore.categorias;
const nombreCategoria = (id) => {
    const categoria = categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Desconocido';
};
const eliminarPregunta = (id) => {
    preguntasStore.eliminarPregunta(id);
};
</script>