<script setup>
import { $db } from '@/firebaseApp';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';


const prendas = ref([])
const tipoDePrenda = ref([])

onMounted(() => {
    try {
        const prendasRef = collection($db, 'prendas')
        onSnapshot(prendasRef, (snapshot) => {
            prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            const tipos = [...new Set(prendas.value.map(prenda => prenda.tipoPrenda))]
            tipoDePrenda.value = tipos
        })
    } catch (error) {
        console.error('falla al traer los productos', error)
    }

})

async function deletePrenda(id) {
    try {
        const prendaRef = doc($db, 'prendas', id)
        await deleteDoc(prendaRef)
        alert('Prenda eliminada ✨')
    } catch (error) {
        alert('Falla al eliminar una prenda')
        console.error('Falla al eliminar una prenda', error)
    }
}

</script>

<template>

    <div class="container text-center">
        <div class="row">

            <div class="col-12 col-md-6 col-lg-4" v-for="prenda in prendas" :key="prenda.id">
                <div class="card mt-3" style="width: 18rem;">
                    <img :src="prenda.urlImg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ prenda.nombre }}</h5>
                        <p class="card-text">Talla {{ prenda.talla }}</p>
                        <p class="card-text">Precio Valor {{ prenda.precio }}</p>
                        <button @click.prevent="deletePrenda(prenda.id)" class="btn btn-primary ">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-img-top {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 15rem;
}
</style>