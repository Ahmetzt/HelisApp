<template>
    <div class="requestContainer">
        <div class="mybuttonGroup">
            <button class="mybutton" @click="openRequest('mansion')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/konaklama.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/mansion.svg">
                <p class="menuP">{{ $t('pages.mansion') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('transfer')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/Transfer.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/transfer.svg">
                <p class="menuP">{{ $t('pages.transfer') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('rent')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/rent.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/rent.svg">
                <p class="menuP">{{ $t('pages.rent') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('restaurant')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/restaurant.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/restaurant.svg">
                <p class="menuP">{{ $t('pages.restaurant') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('cleaner')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/kuru.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/cleaner.svg">
                <p class="menuP">{{ $t('pages.cleaner') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('activity')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/aktiviteler.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/activity.svg">
                <p class="menuP">{{ $t('pages.activity') }}</p>
            </button>
            <button class="mybutton" @click="openRequest('assistant')">
                <!-- <img class="myimage" alt="logo" src="../../../images/requests/png/asistan.png"> -->
                <img class="menuImage" alt="logo" src="../../../images/requests/svg/assistant.svg">
                <p class="menuP">{{ $t('pages.assistant') }}</p>
            </button>
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
                        if (Session.BookingId <= 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "transfer":
                        if (Session.CurrentPossession > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "rent":
                        if (Session.CurrentPossession > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "restaurant":
                        if (Session.CurrentPossession > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "cleaner":
                        if (Session.CurrentPossession > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "activity":
                        if (Session.CurrentPossession > 0) {
                            this.$router.push({path: '/' + pageName});
                        } else {
                            this.openModal(this.$t(`NRauthorizedMessage.${pageName}`))
                        }
                        break;
                    case "assistant":
                        if (Session.CurrentPossession > 0) {
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
    .requestContainer {
        max-width: 94%;
        margin: 3rem auto;
    }

    .NRmodal {  
        font-size: 40px;

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
