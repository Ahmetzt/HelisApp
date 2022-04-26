<template>
    <div class="request-container">
        <div v-if="!isSelected">
            <table class="table" v-if="getActivityType.length > 0">
                <tbody>
                    <tr v-for="activity in getActivityType" :key="activity.ActivityTypeId" @click="ActivitySelected(activity)">
                        <td class="activityTD">
                            <img :src="require(`../../../../images/activityType/${activity.ImageUrl}`)" :alt="activity.Name" border=3 class="listImage">
                            <div class=activityText><strong> {{ $t(`ActivityType.${activity.LangCode}`) }} </strong></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="alert alert-warning" v-else>
                <strong>{{ $t('Request.warning.noActivity') }}</strong>
                <br>
                <small>{{ $t('Request.warning.noActivityDetail') }}
                </small>
            </div>

        </div>
        <div v-else class="headerMain">
            <div>
                <img :src="require(`../../../../images/activityType/${selectedActivity.ImageUrl}`)" :alt="selectedActivity.Name" class="requestImage">
                <div class="form-group formControl formControlFE">
                    <label class="formLabel"> 
                        <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.toWhere') }}</strong> </label>
                    <input 
                        type="text" 
                        class="form-control formElement"
                        v-model="getSessionDetail.CurrentLocation"
                        disabled>
                </div>
                
                <!--<div class="form-group formControl formControlFE">
                    <label class="formLabel"> 
                        <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.toWhere') }}</strong> </label>
                    <select 
                        class="form-control formElement" 
                        v-model="$v.selectedLocation.$model" 
                        @blur="$v.selectedLocation.$touch()"
                        @change="locationSelected">
                        <option selected disabled value=-1>{{ $t('Request.placeholder.selectLocation') }}</option>
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
                            {{ $t('Request.warning.noLocation') }}
                        </small>
                    </div>
                </div> -->
                
                <div class="formTwoCols">
                    <div class="form-group formControl formTwoCols-inner">
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
                            <small v-else-if="!$v.requestDate.noPast" class="form-text text-danger">
                                {{ $t('Request.warning.noPast') }}
                            </small>
                        </div>
                    </div>
                    <div class="form-group formControl formTwoCols-inner">
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
                        <i class="fa fa-user-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.people') }}</strong> </label>
                    <b-button v-b-modal.mdlCustomer class="formElement formButton">{{ visitorText != "" ? visitorText : $t('Request.placeholder.people') }}</b-button>
                    <div v-if="$v.ActivityOrder.Adults.$dirty">
                        <small v-if="!$v.ActivityOrder.Adults.minValue" class="form-text text-danger">
                            {{ $t('Request.warning.adultObliged') }}
                        </small>
                    </div>

                    <b-modal id="mdlCustomer" title="BootstrapVue" hide-header hide-footer dialog-class="mydialogclass">
                        <p>{{ $t('Request.label.selectPeople') }}</p>
                            <div class="myDiv">
                                <table class="mytable2">
                                    <tr>
                                        <td colspan="3"><label> <strong>{{ $t('Request.label.adult') }}</strong> </label></td>
                                        <td><button @click="changeVisitor('adult', -1)">
                                                <i class="fa fa-minus faclass fa-lg"></i></button>
                                            <label > {{ ActivityOrder.Adults }} </label>
                                            <button @click="changeVisitor('adult', +1)">
                                                <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3"><label> <strong>{{ $t('Request.label.kid') }}</strong> </label></td>
                                        <td><button @click="changeVisitor('Kids', -1)">
                                                <i class="fa fa-minus faclass fa-lg"></i></button>
                                            <label> {{ ActivityOrder.Kids }} </label>
                                            <button @click="changeVisitor('Kids', +1)">
                                                <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                    </tr>
                                </table>
                            </div>
                            
                        <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">{{ $t('Request.label.close') }}</b-button>
                    </b-modal>
                </div>

                <div class="button-container d-flex  flex-column align-items-center buttonControl">
                    <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setActivityOrder" :disabled="$v.$invalid">
                        {{ $t('Request.label.newRequest') }}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"
    import {eventBus} from "../../main"
    import Footer from "../../components/Footer.vue"

    export default {
        components: {
            Footer
        },
        data() {
            return {
                selectedActivity: {
                    ActivityTypeId: null,
                    ImageUrl: '',
                    Name: '',
                },
                selectedLocation: -1,
                isSelected: false,
                requestDate: null,
                requestTime: null,
                ActivityOrder: {
                    ActivityTypeId: null,
                    IlId : null,
                    IlceId: null,
                    RequestDate : null,
                    Adults: 0,
                    Kids: 0,
                    ResultText: ""
                }
            }
        },
        validations: {
            // selectedLocation: {
            //     required,
            //     minValue: 0,
            //     checked(val, vm) {
            //         return vm.selectedLocation === -1 ? false : true
            //     }
            // },
            requestDate: {
                required,
                noPast(val) {
                    return (new Date(val)).toLocaleDateString() >= (new Date()).toLocaleDateString()
                },
            },
            requestTime: {
                required
            },
            ActivityOrder: {
                Adults: {
                    required,
                    minValue: minValue(1)
                }
            }
        },
        created() {
            this.$store.dispatch("getActivityTypeList")
            
            eventBus.$on('returnBack', () => {
                this.isSelected = false
                eventBus.$emit('updateHeaderText', this.$t('pages.activity'))
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getLocations", "getActivityType", "getSessionDetail"]),
            visitorText() {
                return (this.ActivityOrder.Adults > 0 ? " " + this.$t('Request.label.adult') + " " + this.ActivityOrder.Adults : "") + 
                    (this.ActivityOrder.Kids > 0 ? " " + this.$t('Request.label.kid') + " " + this.ActivityOrder.Kids : "")
            }
        },
        methods: {
            changeVisitor(type, number) {
                this.$v.ActivityOrder.Adults.$touch()
                if (type == 'adult') {
                    this.ActivityOrder.Adults += number
                }

                if (type == 'Kids') {
                    this.ActivityOrder.Kids += number
                }
                
                this.ActivityOrder.Adults = this.ActivityOrder.Adults < 0 ? 0 : this.ActivityOrder.Adults
                this.ActivityOrder.Kids = this.ActivityOrder.Kids < 0 ? 0 : this.ActivityOrder.Kids
            },
            ActivitySelected(activity) {
                this.selectedActivity.ActivityTypeId = activity.ActivityTypeId
                this.selectedActivity.ImageUrl = activity.ImageUrl
                this.selectedActivity.Name = activity.Name
                this.isSelected = true
                
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', this.$t(`ActivityType.${activity.LangCode}`))
            },
            locationSelected() {
                this.ActivityOrder.IlceId = this.selectedLocation.split('_')[0]
                this.ActivityOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setActivityOrder() {
                this.ActivityOrder.ActivityTypeId = this.selectedActivity.ActivityTypeId
                this.ActivityOrder.RequestDate = this.requestDate + " " + this.requestTime
                this.ActivityOrder.ResultText = this.$t('Request.text.activityResult')

                this.$store.dispatch("SetActivityOrder", { ...this.ActivityOrder })
            }
        }
    }
</script>

<style scoped>

</style>