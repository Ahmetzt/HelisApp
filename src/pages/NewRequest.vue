<template>
    <div class="container-fluid" style="margin-left: 8%; width: 90%">
        <div class="row mt-5">
            <div>
                <button class="mybutton" @click="openRequest('mansion')"><img class="myimage" alt="logo" src="../assets/konaklama.png"></button>
                <button class="mybutton" @click="openRequest('transfer')"><img class="myimage" alt="logo" src="../assets/Transfer.png"></button>
                <button class="mybutton" @click="openRequest('rent')"><img class="myimage" alt="logo" src="../assets/rent.png"></button>
                <button class="mybutton" @click="openRequest('restaurant')"><img class="myimage" alt="logo" src="../assets/restaurant.png"></button>
                <button class="mybutton" @click="openRequest('cleaner')"><img class="myimage" alt="logo" src="../assets/kuru.png"></button>
                <button class="mybutton" @click="openRequest('activity')"><img class="myimage" alt="logo" src="../assets/aktiviteler.png"></button>
                <button class="mybutton" @click="openRequest('assistant')"><img class="myimage" alt="logo" src="../assets/asistan.png"></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            openRequest(pageName) {
                this.$router.push({path: '/' + pageName});
            }
        }
    }
</script>

<style scoped>
    
</style>
