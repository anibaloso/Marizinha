<script setup>
import { defineEmits, defineProps } from 'vue';


const props = defineProps({
    imagenUrl: {
        type: String,
        required: true,
    },
    nombreUrl: {
        type: String,
        required: true,
    }
})
</script>

<template>
    <div class="pop-up" @click="$emit('close')">
        <div class="pop-up-inner ">
            <h1>{{ nombreUrl }}</h1>
            <img :src="imagenUrl" alt="Imagen de la prenda" class="imagen-prenda  ">

        </div>
    </div>
</template>

<style scoped>
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
    /* background-color: #52a07e; */
    z-index: 20;
    display: flex;
    flex-direction: column;
    max-width: 50vh;
    min-width: 50vh;


}

.imagen-prenda {
    opacity: 1;
    justify-content: center;
}
</style>