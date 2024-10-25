<script setup>
import { defineEmits, defineProps } from 'vue';


const props = defineProps({
    imagenUrl: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <div class="pop-up" @click="$emit('close')">
        <div class="pop-up-inner">

            <img :src="imagenUrl" alt="Imagen de la prenda" class="imagen-prenda">

        </div>
    </div>
</template>

<style scoped>
* {
    background-color: #52a07e;

}

.pop-up {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100vh;
    width: 100%;
    padding: 32px 16px 120px;
    background-color: rgba(0, 0, 0, 0.6);
    /* Fondo semitransparente */
    display: grid;
    place-items: center;
    backdrop-filter: blur(9px);
}

.pop-up-inner {
    background-color: #52a07e;
    z-index: 20;
}

.imagen-prenda {
    opacity: 1;

}

img {}


.pop-up-close {
    cursor: pointer;
    color: white;
    font-size: 3rem;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
}

.btn-danger {
    background-color: red;
}
</style>