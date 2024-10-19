import * as FilePond from 'filepond'

// Encontrar el input en el DOM
const inputElement = document.querySelector('input[type="file"]');


// Create a multi file upload component
const pond = FilePond.create(inputElement,{
    multiple: true,
    name: 'filepond'
});

// Add it to the DOM
document.body.appendChild(pond.element);