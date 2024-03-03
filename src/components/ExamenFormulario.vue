<template>
  <div class="d-flex justify-content-center align-items-center "  >
        <form @submit.prevent="crearExamen">
            <div class="mb-3 ">
                <label for="titulo" class="form-label">Título:</label>
                <input id="titulo" v-model="titulo" type="text" class="form-control" required>
            </div>
            <div class="mb-3 ">
                <label for="fecha" class="form-label">Fecha:</label>
                <input id="fecha" v-model="fecha" type="date" class="form-control" required>
            </div>
            <div class="mb-3 ">
                <label for="id_categoria" class="form-label">Categoría:</label>
                <select id="id_categoria" v-model="idCategoriaSeleccionada" class="form-select">
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                        {{ categoria.nombre }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <h2>Preguntas</h2>
                <div v-for="pregunta in preguntasFiltradas" :key="pregunta.id" class="form-check d-flex align-items-start">
                    <input class="form-check-input" type="checkbox" :value="pregunta.id" v-model="preguntasSeleccionadas">
                    <label class="form-check-label">
                        {{ pregunta.enunciado }}
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Crear Examen</button>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useExamenesStore } from '@/store/examenesStore';
import { usePreguntasStore } from '@/store/preguntasStore';
import { useCategoriasStore } from '@/store/categoriasStore';
import { useRouter } from 'vue-router';


const router = useRouter();
const examenesStore = useExamenesStore();
const preguntasStore = usePreguntasStore();
const categoriasStore = useCategoriasStore();
const titulo = ref('');
const fecha = ref('');
const idCategoriaSeleccionada = ref('');
const preguntasSeleccionadas = ref([]);
const preguntas = preguntasStore.preguntas;
const categorias = categoriasStore.categorias;

const preguntasFiltradas = computed(() => {
    if (idCategoriaSeleccionada.value) {
        return preguntas.filter(pregunta => pregunta.id_categoria === idCategoriaSeleccionada.value);
    }
    return preguntas;
});

const crearExamen = () => {
    examenesStore.crearExamen({
        titulo: titulo.value,
        fecha: fecha.value,
        preguntas: preguntasSeleccionadas.value.map(id => preguntas.find(pregunta => pregunta.id === id)),
    });    
    router.push('/examenes');
    
};
</script>