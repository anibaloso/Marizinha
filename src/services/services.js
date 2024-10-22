// import * as FilePond from 'filepond'

// // Encontrar el input en el DOM
// const inputElement = document.querySelector('input[type="file"]');


// // Create a multi file upload component
// const pond = FilePond.create(inputElement, {
//     multiple: true,
//     name: 'filepond'
// });

// // Add it to the DOM
// document.body.appendChild(pond.element);

import { $db } from '@/firebaseApp';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
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



/**
 *  Filtro para tipo de prenda 
 */

export const filtroTipoPrenda = async (tipoPrenda) => {
    try {
        const prendasRef = collection($db, 'prendas')
        const prendasQuery = query(prendasRef, where('tipo', '==', tipoPrenda))
        const snapshot = await getDocs(prendasQuery)
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    } catch (error) {
        console.error('falla al filtrar la prenda', error)
        return []
    }
}