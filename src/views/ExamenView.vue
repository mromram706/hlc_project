<template>
    <div class="container">
        <h1 class="my-4">{{ examen.titulo }}</h1>
        <p class="mb-4 text-muted">{{ examen.fecha }}</p>
        <h3 class="mb-3">Preguntas</h3>
        <ul class="list-group">
            <li class="list-group-item d-flex align-items-start" v-for="(pregunta, index) in examen.preguntas" :key="pregunta.id">
                {{ index + 1 }}- {{ pregunta.enunciado }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useExamenesStore } from '@/store/examenesStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const examenesStore = useExamenesStore();

const examen = ref(examenesStore.getExamenById(route.params.id));
</script>