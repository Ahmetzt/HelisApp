<template>
    <div class="container container-fluid">
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
        
        <b-modal 
            id="modal-1" 
            content-class="NRmodal" 
            dialog-class="NRmodal-dialog" 
            centered 
            ok-only 
            title="Uyarı" 
            v-model="ModalShow" 
            okVariant="success" 
            okTitle="Tamam" 
            headerClass="NRmodal-header">
            <p class="my-4"> {{ WarningText }} </p>
        </b-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                WarningText: "",
                ModalShow: false,
            }
        },
        methods: {
            openRequest(pageName) {
                var Session = this.$store.getters.getSessionDetail
                // console.log(process.env.VUE_APP_I18N_LOCALE)
                //this.$i18n.locale = 'tr'

                switch (pageName) {
                    case "mansion":
                        if (Session.BookingId > 0 || Session.PossessionId > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "transfer":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "rent":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "restaurant":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "cleaner":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "activity":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "assistant":
                        if (Session.BookingId < 0 || Session.PossessionId < 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    default:
                        this.$router.push({path: '/' + pageName});
                        break;
                }
                
            },
            openModal(text){
                this.ModalShow = true
                this.WarningText = text
            },
        }
    }
</script>

<style  lang="scss">
    .container {
        margin-left: 10%; 
        width: 90%
    }

    .NRmodal {  
        font-size: xx-large;

        &-header {
            font-size: 40px;
        }

        &-dialog {
            width: 85%;
            margin: 0 auto;
            max-width: none;
            transition: transform .7s ease-out !important;
        }
    }
</style>
