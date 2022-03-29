<template>
    <div class="request-container">
        <div v-if="!isSelected">
            <img src="../../assets/requests/assistant.jpg" alt="Asistan" class="requestImage">
                
            <div class="formControl formAssistant" v-if="getAssistantType.length > 0" >
                    <button class="formAssistantButton" v-for="assistant in getAssistantType" :key="assistant.AssistantTypeId" @click="AssistanSelected(assistant)">
                        <img class="formAssistantImage" :src="require(`../../../../images/asistantType/png/${assistant.PNGUrl}`)" :alt="assistant.Description"></button>
            </div>
            <div class="alert alert-warning" v-else>
                <strong>Bir Asistan Görüntülenemiyor</strong>
                <br>
                <small>Detaylı açıklama burada yer almaktadır wait and see :)
                </small>
            </div>            
        </div>
        <div v-else>
            <img :src="require(`../../../../images/asistantType/jpg/${selectedAssistant.ImageUrl}`)" :alt="selectedAssistant.Description" class="requestImage">
            <div class="form-group formControl formControlFE">
                <label class="formLabel"> 
                    <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>Nereye</strong> </label>
                <input 
                    type="text" 
                    class="form-control formElement"
                    v-model="getSessionDetail.CurrentLocation"
                    disabled>
            </div>
            <div class="form-group formControl" v-if="!isSupport">
                <label class="formLabel">       
                    <i class="far fa-calendar-alt faclass fa-lg"></i> <strong>Tarih</strong> </label>
                <input 
                    type="date" 
                    class="formElement" 
                    :placeholder="requestDate == null || requestDate == '' ? 'Tarih Seçiniz' : ''" 
                    id="dateEnter" 
                    v-model="requestDate"
                    @blur="$v.requestDate.$touch()">
                <div v-if="$v.requestDate.$dirty">
                    <small v-if="!$v.requestDate.required" class="form-text text-danger">
                        Lütfen Saat Seçiniz
                    </small>
                </div>
            </div>
            <div class="form-group formControl" v-if="!isSupport">
                <label class="formLabel">       
                    <i class="fa fa-clock faclass fa-lg"></i> <strong>Saat</strong> </label>
                <input 
                    type="time" 
                    class="formElement" 
                    :placeholder="requestTime == null || requestTime == '' ? 'Saat Seçiniz' : ''" 
                    id="dateBack" 
                    v-model="requestTime"
                    @blur="$v.requestTime.$touch()">
                <div v-if="$v.requestTime.$dirty">
                    <small v-if="!$v.requestTime.required" class="form-text text-danger">
                        Lütfen Saat Seçiniz
                    </small>
                </div>
            </div>
            <div class="form-group formControl">
                <label class="formLabel">       
                    <i class="fa fa-info faclass fa-lg"></i> <strong>Mesajınız</strong> </label>
                <input 
                    class="formElement" 
                    v-model="AssistantOrder.Note"
                    placeholder="Mesajınızı Yazınız"
                    @blur="$v.AssistantOrder.Note.$touch()">
                <div v-if="$v.AssistantOrder.Note.$dirty">
                    <small v-if="!$v.AssistantOrder.Note.required" class="form-text text-danger">
                        Lütfen Not Giriniz
                    </small>
                </div>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setAssistantOrder" :disabled="$v.$invalid">
                    Talep Oluştur
                </button>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl" v-if="isSupport">
                <button type="submit" class="btn btn-block mb-2 button-green">
                    <i class="fa fa-phone faclass fa-lg"></i> Canlı Desteğe Ulaşın
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { requiredIf } from "vuelidate/lib/validators"
    import { eventBus } from "../../main"

    export default {
        data() {
            return {
                selectedAssistant: {
                    AssistantTypeId: null,
                    ImageUrl: '',
                    Description: '',
                },
                selectedLocation: -1,
                isSelected: false,
                requestDate: null,
                requestTime: null,
                AssistantOrder: {
                    AssistantTypeId: null,
                    IlId : null,
                    IlceId: null,
                    RequestDate : null,
                    Note: '', 
                    ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır.",
                }
            }
        },
        validations: {
            requestDate: {
                required: requiredIf(function() {
                    return !this.isSupport;
                }),
            },
            requestTime: {
                required: requiredIf(function() {
                    return !this.isSupport;
                }),
            },
            AssistantOrder: {
                Note: {
                    required: requiredIf(function() {
                        return this.isSupport;
                    }),
                }
            },
        },
        created() {
            eventBus.$on('returnBack', () => {
                this.isSelected = false
                eventBus.$emit('updateHeaderText', this.$t('pages.assistant'))
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getLocations", "getAssistantType", "getSessionDetail"]),
            isSupport() {
                return this.selectedAssistant.Description == "Destek" ? true : false
            }
        },
        methods: {
            AssistanSelected(assistant) {
                this.selectedAssistant.AssistantTypeId = assistant.AssistantTypeId
                this.selectedAssistant.ImageUrl = assistant.ImageUrl
                this.selectedAssistant.Description = assistant.Description
                this.CleanSelection();
                this.isSelected = true
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', assistant.Description)
            },
            CleanSelection() {

                this.requestDate = null
                this.requestTime = null
                this.AssistantOrder.AssistantTypeId = null
                this.AssistantOrder.RequestDate = null
                this.AssistantOrder.Note = ''
            },
            locationSelected() {
                this.AssistantOrder.IlceId = this.selectedLocation.split('_')[0]
                this.AssistantOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setAssistantOrder() {
                this.AssistantOrder.AssistantTypeId = this.selectedAssistant.AssistantTypeId
                this.AssistantOrder.RequestDate = this.requestDate + " " + this.requestTime

                this.$store.dispatch("SetAssistantOrder", { ...this.AssistantOrder })
            }
        }
    }
</script>

<style scoped>

</style>