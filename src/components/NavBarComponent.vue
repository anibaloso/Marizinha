<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" :to="{ name: 'home' }">
                <img src="https://firebasestorage.googleapis.com/v0/b/marizinha-a7d92.appspot.com/o/images%2FlogoRecortado.jpg?alt=media&token=aaeab4dc-212c-4d34-8eea-3f4cd9dc37aa"
                    alt="logo">
            </RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'contacto' }">Contacto
                        </RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink class="nav-link active" :to="{ name: 'subirArchivos' }">Subir Archivo
                        </RouterLink>
                    </li> -->


                </ul>

            </div>
        </div>
    </nav>
</template>

<style scoped>
* {
    font-size: 30px;
    font-weight: bolder;
}
</style>