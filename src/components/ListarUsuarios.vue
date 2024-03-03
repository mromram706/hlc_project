<template>
    <div class="d-flex flex-wrap">
        <div v-for="usuario in usuariosStore.usuarios" :key="usuario.id" class="card m-2">
            <div class="card-body">
                <h5 class="card-title">{{ usuario.nombre }}</h5>
                <p class="card-text">{{ usuario.rol }}</p>
                <p class="card-text">{{ usuario.contraseña }}</p>
                <button @click="eliminarUsuario(usuario.id)" class="btn btn-danger">Eliminar</button>
                <button @click="editarUsuario(usuario.id)" class="btn btn-primary">Editar</button>
            </div>
            
        </div>
        
    </div>
    <button @click="crearUsuario" class="btn btn-primary">Crear usuario</button>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUsuariosStore } from '@/store/usuariosStore';
import { useRouter } from 'vue-router';

const usuariosStore = useUsuariosStore();
const router = useRouter();
const crearUsuario = () => {
    router.push('/usuario');
};
onMounted(async () => {
    await usuariosStore.cargarUsuarios();
});

const eliminarUsuario = (id) => {
    usuariosStore.eliminarUsuario(id);
};

const editarUsuario = (id) => {
    router.push(`/usuario/${id}`);
};
</script>