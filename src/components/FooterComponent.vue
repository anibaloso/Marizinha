<template>
    <div class="container">
        <div class="row">
            <div class="col-6 text-center ">
                <h5>Redes Sociales</h5>

                <div class="row " id="redes">
                    <div class="col-6 text-center">
                        <a href="https://www.instagram.com/marizinhaboutique/"><i
                                class="fa-brands fa-instagram me-5"></i></a>
                        <a href="https://www.facebook.com/marizinharoupas"><i
                                class="fa-brands fa-square-facebook ms-5"></i></a>
                    </div>
                </div>
            </div>
            <div class="col-6 text-center ">
                <h5>Contacto</h5>
                <div class="row " id="contacto">
                    <div class="col-6">
                        <i class="fa-solid fa-phone"></i>

                        <p>(+56) 9 8765 4321</p>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>
.container {
    margin-top: 2rem;
}

.fa-solid {
    align-items: center;
}

#contacto {
    display: flex;
    align-items: center;
    justify-content: center;
}

i {
    font-size: xx-large;
}

.fa-phone {
    font-size: large;

}

#redes {
    display: flex;
    justify-content: space-around;
}
</style>