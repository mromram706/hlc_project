<template>
    <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center mt-5">
        <div class="mb-3 w-50">
            <label for="enunciado" class="form-label">Enunciado:</label>
            <input type="text" id="enunciado" v-model="pregunta.enunciado" required class="form-control">
        </div>
        <div class="mb-3 w-50">
            <label for="id_categoria" class="form-label">Categoría:</label>
            <select id="id_categoria" v-model="pregunta.id_categoria" required class="form-select">
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                    {{ categoria.nombre }}
                </option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">{{ esEditar ? 'Actualizar' : 'Crear' }} pregunta</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { usePreguntasStore } from '@/store/preguntasStore';
import { useCategoriasStore } from '@/store/categoriasStore';

const preguntasStore = usePreguntasStore();
const categoriasStore = useCategoriasStore();
const categorias = categoriasStore.categorias;
const pregunta = ref({ enunciado: '', id_categoria: '' });
const esEditar = ref(false); 

const handleSubmit = () => {
    preguntasStore.agregarPregunta({ ...pregunta.value });
    pregunta.value = { enunciado: '', id_categoria: '' };
};
</script>