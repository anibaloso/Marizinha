<script setup>
import { ref } from 'vue';
import { $db, storage } from '@/firebaseApp';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from 'firebase/firestore';

const nombrePrenda = ref('')
const precioPrenda = ref('')
const tallaPrenda = ref('')
const imagenPrenda = ref(null)
const tipoPrenda = ref('')
const url = ref('')

const uploadImage = async (event) => {
    const file = event.target.files[0];
    const storageReference = storageRef(storage, `images/${file.name}`); // Ruta de almacenamiento

    // Subir la imagen
    await uploadBytes(storageReference, file);

    //se obtiene la URL de la imagen subida
    url.value = await getDownloadURL(storageReference);

    console.log('Imagen subida, URL:', url);

    // Aquí puedes guardar la URL en tu base de datos o usarla en tu aplicación.

    return url.value
};

const onFileChange = (e) => {
    imagenPrenda.value = e.target.files[0];
    console.log('Imagen seleccionada:', imagenPrenda.value);
};


const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        if (!imagenPrenda.value) {
            throw new Error("Debe seleccionar una imagen antes de continuar");

        }
        // Esperamos a que la imagen se suba y obtenga la URL
        const imageUrl = await uploadImage({ target: { files: [imagenPrenda.value] } });

        //guardando los datos en firestore
        const prendasRef = collection($db, 'prendas')
        await addDoc(prendasRef, {
            nombre: nombrePrenda.value,
            precio: precioPrenda.value,
            talla: tallaPrenda.value,
            tipoPrenda: tipoPrenda.value,
            urlImg: imageUrl,
        })
        //se limpian los campos
        nombrePrenda.value = '';
        precioPrenda.value = '';
        tallaPrenda.value = '';

        const fileInput = document.querySelector('#imagen-prenda')
        if (fileInput) {
            fileInput.value = ''
        }

        tipoPrenda.value = ''
        alert('Producto guardado con éxito');

    } catch (error) {
        console.error('Falla al guardar la prenda', error)
    }

}

</script>

<template>
    <h1>Pagina para subir archivos</h1>

    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Nombre Prenda</label>
            <input type="text" class="form-control" id="nombre-prenda" v-model="nombrePrenda">
        </div>
        <div class="mb-3">
            <label class="form-label">Precio Prenda</label>
            <input type="text" class="form-control" id="precio-prenda" v-model="precioPrenda">
        </div>
        <div class="mb-3">
            <label class="form-label">Talla Prenda</label>
            <input type="text" class="form-control" id="talla-prenda" v-model="tallaPrenda">
        </div>
        <div class="mb-3">
            <label class="form-label">Tipo Prenda</label>
            <input type="text" class="form-control" id="tipo-prenda" v-model="tipoPrenda">
        </div>
        <div class="mb-3">
            <label class="form-label">Imagen de la prenda</label>
            <input type="file" @change="onFileChange" class="form-control" id="imagen-prenda" />
        </div>
        <button type="submit" class="btn btn-primary">Guardar Producto</button>
    </form>
    <div>
    </div>


</template>

<style scoped>
img {
    width: 20rem;
    height: auto;
}
</style>