<script setup>
import { RouterView } from 'vue-router';
import NavBarComponent from './components/NavBarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <NavBarComponent />
    <main class="flex-fill py-2">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
