<template>
    <div>
        <h1>Editar usuario</h1>
        <usuario-formulario :id="$route.params.id" />
    </div>
</template>
<script setup>
import UsuarioFormulario from '@/components/UsuarioFormulario.vue';
</script>