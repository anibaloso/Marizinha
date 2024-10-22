<script setup>
import { $db } from '@/firebaseApp';
import { filtroTipoPrenda } from '@/services/services';
import { collection, onSnapshot } from 'firebase/firestore';
import { computed, onMounted, ref, watch } from 'vue';


const prendas = ref([])
const tipoDePrenda = ref([])
const filtro = ref('')
let tipos = ref([])
const mostrarModal = ref(false);
const imagenSeleccionada = ref(null);


onMounted(() => {
    try {
        const prendasRef = collection($db, 'prendas')
        onSnapshot(prendasRef, (snapshot) => {
            prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            tipos.value = [...new Set(prendas.value.map(prenda => prenda.tipoPrenda))]
            tipoDePrenda.value = tipos
        })
    } catch (error) {
        console.error('falla al traer los productos', error)
    }


})

//computed para obtener tipos unicos de prendas
const tiposUnicos = computed(() => {
    return [...new Set(prendas.value.map(prenda => prenda.tipoPrenda))]
})


const algunasPrendas = async (tipoPrenda) => {
    try {
        if (tipoPrenda) {  // Solo filtrar si tipoPrenda tiene un valor
            prendas.value = await filtroTipoPrenda(tipoPrenda);
        } else {
            // Si no hay filtro, cargar todas las prendas de nuevo
            const prendasRef = collection($db, 'prendas');
            onSnapshot(prendasRef, (snapshot) => {
                prendas.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            });
        }
    } catch (error) {
        console.error('falla al filtrar prenda', error)
    }
}


watch(filtro, async (nuevoFiltro) => {

    await algunasPrendas(nuevoFiltro);

});

// Función para abrir el modal con la imagen seleccionada
const abrirModal = (imagenUrl) => {
    imagenSeleccionada.value = imagenUrl;
    mostrarModal.value = true;
};

// Función para cerrar el modal
const cerrarModal = () => {
    mostrarModal.value = false;
    imagenSeleccionada.value = null;
};

</script>

<template>

    <div class="container text-center">
        <div class="row">
            <select name="Tipo-prenda" id="prendas" v-model="filtro">

                <option value="">Seleccione tipo de prenda</option>
                <option v-for="tipo in tiposUnicos" :key="tipo" :value="tipo">
                    {{ tipo }}
                </option>
            </select>
            <div class="col-12 col-md-6 col-lg-4" v-for="prenda in prendas" :key="prenda.id">
                <div class="card mt-3" style="width: 18rem;">
                    <img :src="prenda.urlImg" class="card-img-top" alt="Imagen de la prenda"
                        @click="abrirModal(prenda.urlImg)">
                    <div class="card-body">
                        <h5 class="card-title">{{ prenda.nombre }}</h5>
                        <p class="card-text">Talla {{ prenda.talla }}</p>
                        <p class="card-text">Precio {{ prenda.precio }}</p>
                        <button href="#" class="btn btn-primary ">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ----------------------------------- modal ----------------------------------- -->

    <div v-if="mostrarModal" class="modal" @click="cerrarModal">
        <div class="modal-content" @click.stop>
            <span class="close" @click="cerrarModal">&times;</span>
            <img :src="imagenSeleccionada" alt="Imagen grande">
        </div>

    </div>

    <!-- -----------------------------------   /modal  ----------------------------------- -->

    <!-- 
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div> -->

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
</style>