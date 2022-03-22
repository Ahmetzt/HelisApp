<template>
    <div class="container">
        <div v-if="!isSelected">
            <img src="../../assets/requests/assistant.jpg" alt="Asistan" class="requestImage">
                
            <div class="row formControl formControlFE" v-if="getAssistantType.length > 0" style="background: none; box-shadow: none; max-width: 97%">
                <div style="width: 100%">
                    <button class="mybutton" style="height: 60%;" v-for="assistant in getAssistantType" :key="assistant.AssistantTypeId" @click="AssistanSelected(assistant)">
                        <img class="myimage" :src="require(`../../../../images/asistantType/png/${assistant.PNGUrl}`)" :alt="assistant.Description"></button>
                </div>
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
                <select 
                    class="form-control formElement" 
                    v-model="$v.selectedLocation.$model" 
                    @blur="$v.selectedLocation.$touch()"
                    @change="locationSelected">
                    <option selected disabled value=-1>İl veya İlçe Seçiniz</option>
                    <option 
                        :disabled="location.count == 0"
                        :value="location.IlceId + '_' + location.IlId"
                        :IlId="location.IlId"
                        :IlceId="location.IlceId"
                        v-for="location in getLocations"
                        :key="location.RowId">
                        {{ location.Ilce.length > 0 ? location.Ilce + ", " : "" }} {{ location.Il }}</option>
                </select>
                <div v-if="$v.selectedLocation.$dirty">       
                    <small v-if="!$v.selectedLocation.checked" class="form-text text-danger">
                        Lütfen Lokasyon Seçiniz
                    </small>
                </div>
            </div>
            <div class="form-group formControl">
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
            <div class="form-group formControl">
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
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setAssistantOrder" :disabled="$v.$invalid">
                    Talep Oluştur
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {required} from "vuelidate/lib/validators"
    import {eventBus} from "../../main"

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
                    ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır.",
                }
            }
        },
        validations: {
            selectedLocation: {
                required,
                minValue: 0,
                checked(val, vm) {
                    return vm.selectedLocation === -1 ? false : true
                }
            },
            requestDate: {
                required
            },
            requestTime: {
                required
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
            ...mapGetters(["getLocations"]),
            ...mapGetters(["getAssistantType"]),
        },
        methods: {
            AssistanSelected(assistant) {
                this.selectedAssistant.AssistantTypeId = assistant.AssistantTypeId
                this.selectedAssistant.ImageUrl = assistant.ImageUrl
                this.selectedAssistant.Description = assistant.Description
                this.isSelected = true
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', assistant.Description)
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