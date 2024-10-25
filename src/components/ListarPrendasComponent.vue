<script setup>
import { $db } from '@/firebaseApp';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { onMounted, ref, watch } from 'vue';
import PopUp from './PopUp.vue';


const prendas = ref([])
const tipoDePrenda = ref([])
const filtro = ref('')
let tipos = ref([])
let popUp = ref(false)
let imagenSeleccionada = ref('')

const obtenerPrendas = () => {
    try {
        const prendasRef = collection($db, 'prendas')
        onSnapshot(prendasRef, (snapshot) => {
            prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            tipos.value = [...new Set(prendas.value.map(prenda => prenda.tipoPrenda.toLowerCase()))]
            console.log(tipos.value)

            tipoDePrenda.value = tipos
        })
    } catch (error) {
        console.error('falla al traer los productos', error)
    }
}

const filtrarPrendasPorTipo = (tipoPrenda) => {
    try {
        if (tipoPrenda) {
            const prendasRef = collection($db, 'prendas')
            const q = query(prendasRef, where('tipoPrenda', '==', tipoPrenda))
            onSnapshot(q, (snapshot) => {
                prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            })
        } else {
            //si no hay filtro, mostrara todas las prendas
            obtenerPrendas()
        }
    } catch (error) {
        console.error('falla al buscar el tipo', error)
    }
}

watch(filtro, (nuevoFiltro) => {
    filtrarPrendasPorTipo(nuevoFiltro);
});

function currencyFormatter({ value, currency }) {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        minimumFractionDigits: 0,
        currency
    })
    return formatter.format(value)
}

function modal(imagenUrl) {
    imagenSeleccionada.value = imagenUrl
    popUp.value = true
}

onMounted(() => {
    obtenerPrendas()
})


</script>

<template>

    <div class="container text-center">
        <div class="row" id="select-prendas">

            <select name="Tipo-prenda" id="prendas" v-model="filtro">
                <option value="">Todas las prendas</option>
                <option v-for="tipo in tipos" :key="tipo" :value="tipo">
                    {{ tipo }}
                </option>
            </select>

            <div class="row">
                <div class="col-12 col-md-6 col-lg-4" v-for="prenda in prendas" :key="prenda.id">
                    <div class="card mt-3" style="width: 18rem;">
                        <img :src="prenda.urlImg" class="card-img-top" alt="Imagen de la prenda"
                            @click="modal(prenda.urlImg)">
                        <div class="card-body">
                            <h5 class="card-title">{{ prenda.nombre }}</h5>
                            <p class="card-text">Talla {{ prenda.talla }}</p>
                            <p class="card-text">Precio {{ currencyFormatter({
                                value: prenda.precio, currency: 'CLP',
                            }) }}
                                CLP </p>
                            <button class="btn btn-primary">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ----------------------------------- modal ----------------------------------- -->
    <PopUp v-show="popUp" :imagen-url="imagenSeleccionada" @close="popUp = false" />
    <!-- -----------------------------------   /modal  ----------------------------------- -->

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

#imagen-modal {
    width: 100%;
    max-height: 90vh;
}

#select-prendas {
    display: flex;
    justify-content: center;
}

#prendas {
    width: 18rem;
}
</style>