<script setup>
import { $db } from '@/firebaseApp';
import { collection, onSnapshot } from 'firebase/firestore';
import { onMounted, ref } from 'vue';


const prendas = ref([])

onMounted(() => {
    try {
        const prendasRef = collection($db, 'prendas')
        onSnapshot(prendasRef, (snapshot) => {
            prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        })
    } catch (error) {
        console.error('falla al traer los productos', error)
    }
})

</script>

<template>

    <div class="container text-center">
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4" v-for="prenda in prendas" :key="prenda.id">
                <div class="card mt-2" style="width: 18rem;">
                    <img :src="prenda.urlImg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ prenda.nombre }}</h5>
                        <p class="card-text">Talla {{ prenda.talla }}</p>
                        <p class="card-text">Precio {{ prenda.precio }}</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>