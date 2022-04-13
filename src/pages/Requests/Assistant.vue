<template>
    <div class="request-container">
        <div v-if="!isSelected">
            <img src="../../../../images/requests/jpg/assistant.jpg" alt="Asistan" class="listImage">
                
            <div class="formControl formAssistant" v-if="getAssistantType.length > 0" >
                <button class="mybutton" v-for="assistant in getAssistantType" :key="assistant.AssistantTypeId" @click="AssistanSelected(assistant)">
                    <img class="menuImage" :src="require(`../../../../images/asistantType/png/${assistant.PNGUrl}`)" :alt="assistant.Description">
                    <!-- <p class="menuP">{{ $t('pages.transfer') }}</p> -->
                    <p class="menuP">{{ $t(`AssistantType.${assistant.LangCode}`) }}</p>
                </button>
            </div>
            <div class="alert alert-warning" v-else>
                <strong>{{ $t('Request.warning.noAssistant') }}</strong>
                <br>
                <small>{{ $t('Request.warning.noAssistantDetail') }}
                </small>
            </div>            
        </div>
        <div v-else class="headerMain">
            <div>
                <img :src="require(`../../../../images/asistantType/jpg/${selectedAssistant.ImageUrl}`)" :alt="selectedAssistant.Description" class="requestImage">
                <div class="form-group formControl formControlFE">
                    <label class="formLabel"> 
                        <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.toWhere') }}</strong> </label>
                    <input 
                        type="text" 
                        class="form-control formElement"
                        v-model="getSessionDetail.CurrentLocation"
                        disabled>
                </div>
                
                <div class="formTwoCols">
                    <div class="form-group formControl formTwoCols-inner" v-if="!isSupport">
                        <label class="formLabel">
                            <i class="far fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.date') }}</strong> </label>
                        <input 
                            type="date" 
                            class="formElement" 
                            :placeholder="requestDate == null || requestDate == '' ? $t('Request.placeholder.date') : ''" 
                            id="dateEnter" 
                            v-model="requestDate"
                            @blur="$v.requestDate.$touch()">
                        <div v-if="$v.requestDate.$dirty">
                            <small v-if="!$v.requestDate.required" class="form-text text-danger">
                                {{ $t('Request.warning.noDate') }}
                            </small>
                        </div>
                    </div>
                    <div class="form-group formControl formTwoCols-inner" v-if="!isSupport">
                        <label class="formLabel">       
                            <i class="fa fa-clock faclass fa-lg"></i> <strong>{{ $t('Request.label.time') }}</strong> </label>
                        <input 
                            type="time" 
                            class="formElement" 
                            :placeholder="requestTime == null || requestTime == '' ? $t('Request.placeholder.time') : ''" 
                            id="dateBack" 
                            v-model="requestTime"
                            @blur="$v.requestTime.$touch()">
                        <div v-if="$v.requestTime.$dirty">
                            <small v-if="!$v.requestTime.required" class="form-text text-danger">
                                {{ $t('Request.warning.noTime') }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="form-group formControl">
                    <label class="formLabel">       
                        <i class="fa fa-info faclass fa-lg"></i> <strong>{{ $t('Request.label.note') }}</strong> </label>
                    <input 
                        class="formElement" 
                        v-model="AssistantOrder.Note"
                        :placeholder="$t('Request.placeholder.note')"
                        @blur="$v.AssistantOrder.Note.$touch()">
                    <div v-if="$v.AssistantOrder.Note.$dirty">
                        <small v-if="!$v.AssistantOrder.Note.required" class="form-text text-danger">
                            {{ $t('Request.warning.noNote') }}
                        </small>
                    </div>
                </div>

                <div class="button-container d-flex  flex-column align-items-center buttonControl">
                    <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setAssistantOrder" :disabled="$v.$invalid">
                        {{ $t('Request.label.newRequest') }}
                    </button>
                </div>

                <div class="button-container d-flex  flex-column align-items-center buttonControl" v-if="isSupport">
                    <button type="submit" class="btn btn-block mb-2 button-green">
                        <i class="fa fa-phone faclass fa-lg"></i> {{ $t('Request.label.liveSupport') }}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { requiredIf } from "vuelidate/lib/validators"
    import { eventBus } from "../../main"
    import Footer from "../../components/Footer.vue"

    export default {
        components: {
            Footer
        },
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
                    ResultText: "",
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
                eventBus.$emit('updateHeaderText', this.$t(`AssistantType.${assistant.LangCode}`))
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
                this.AssistantOrder.ResultText = this.$t('Request.text.assistantResult')

                this.$store.dispatch("SetAssistantOrder", { ...this.AssistantOrder })
            }
        }
    }
</script>

<style scoped>

</style>