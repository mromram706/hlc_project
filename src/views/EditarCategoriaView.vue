<template>
    <div>
        <h1>Editar categoría</h1>
        <categoria-formulario :id="$route.params.id" />
    </div>
</template>

<script setup>
import CategoriaFormulario from '@/components/CategoriaFormulario.vue';
</script>