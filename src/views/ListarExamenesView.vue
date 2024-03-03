<template>
    <div class="container mt-5">
        <h1 class="mb-4">Exámenes</h1>
        <router-link to="/crear-examen" class="btn btn-success mb-3">Crear</router-link>
        <div>
            <h2 class="mb-3">Lista de Exámenes</h2>
            <button @click="ordenarPorFecha" class="btn btn-primary mb-3">Ordenar por fecha</button>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Título</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="examen in examenesOrdenados" :key="examen.id">
                        <td>{{ examen.titulo }}</td>
                        <td>{{ examen.fecha }}</td>
                        <td>
                            <router-link v-if="sesionStore.usuario.rol === 'Profesor'" :to="`/examen/${examen.id}`" class="btn btn-primary">Ver</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useExamenesStore } from '@/store/examenesStore';
import { useSesionStore } from '@/store/sesion';
const sesionStore = useSesionStore();
const examenesStore = useExamenesStore();
const examenesOrdenados = ref([...examenesStore.examenes]);
const ordenarPorFecha = () => {
    examenesStore.cambiarOrden();
    examenesOrdenados.value = [...examenesStore.examenesOrdenados];
};
</script>