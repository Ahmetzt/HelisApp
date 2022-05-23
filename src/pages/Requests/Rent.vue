<template>
    <div class="request-container headerMain">
        <div>
            <img src="../../../../images/requests/jpg/rent.jpg" alt="boat" class="requestImage">
            <div class="form-group formControl formControlFE">
                <label class="formLabel"> 
                    <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.location') }}</strong> </label>
                <input 
                    type="text" 
                    class="form-control formElement"
                    v-model="getSessionDetail.CurrentLocation"
                    disabled
                >
            </div>
            <div class="form-group formControl">
                <label class="formLabel"> 
                    <i class="fa fa-random faclass fa-lg"></i> <strong>{{ $t('Request.label.vehicleType') }}</strong> </label>
                <label class="formRadio">
                    <input type="radio" name="VehicleType" v-model="VehicleType" @change="changeType" value="1"/>
                    <i class="fa fa-car faclass fa-lg"></i> {{ $t('Request.label.car') }}
                </label>    
                <label class="formRadio">
                    <input type="radio" name="VehicleType" v-model="VehicleType" @change="changeType" value="2"/>
                    <i class="fa fa-ship faclass fa-lg"></i> {{ $t('Request.label.boat') }}
                </label>
            </div>
            <div class="form-group formControl">
                <label class="formLabel"> 
                    <span v-show="VehicleType == 2" ><i class="fa fa-ship faclass fa-lg"></i> <strong>{{ $t('Request.label.boat') }}</strong></span> 
                    <span v-show="VehicleType == 1" ><i class="fa fa-car faclass fa-lg"></i> <strong>{{ $t('Request.label.car') }}</strong></span>  </label>
                <select 
                    class="form-control formElement" 
                    v-model="$v.selectedVehicle.$model" 
                    @blur="$v.selectedVehicle.$touch()">
                    <option selected disabled value=-1>{{ VehicleType == 1 ? $t('Request.placeholder.selectCar')  : VehicleType == 2 ? $t('Request.placeholder.selectBoat')  : '' }}</option>
                    <option 
                        :disabled="vehicle.count == 0"
                        :value="vehicle.VehicleId"
                        v-for="vehicle in getVehiclesByType(VehicleType == 1 ? 'Otomobil' : VehicleType == 2 ? 'Tekne' : '')"
                        :key="vehicle.VehicleId">
                        {{ vehicle.Model }}</option>
                </select>
                <div v-if="$v.selectedVehicle.$dirty">
                    <small v-if="!$v.selectedVehicle.checked" class="form-text text-danger">
                        {{ $t('Request.warning.noVehicle') }}
                    </small>
                </div>
            </div>
            <div :class="FromToClass">
                <div class="form-group">
                    <label class="formLabel"> 
                        <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.rentBeginDate') }}</strong> </label>
                    <input 
                        type="date" 
                        class="formElement" 
                        :placeholder="RentOrder.BeginDate == null || RentOrder.BeginDate == '' ? $t('Request.placeholder.date') : ''" 
                        id="dateEnter" 
                        v-model="RentOrder.BeginDate"
                        @blur="$v.RentOrder.BeginDate.$touch()">
                    <div v-if="$v.RentOrder.BeginDate.$dirty">
                        <small v-if="!$v.RentOrder.BeginDate.required" class="form-text text-danger">
                            {{ $t('Request.warning.noBeginDate') }}
                        </small>
                        <small v-else-if="!$v.RentOrder.BeginDate.noPast" class="form-text text-danger">
                            {{ $t('Request.warning.noPast') }}
                        </small>
                        <small v-else-if="!$v.RentOrder.BeginDate.dateMax" class="form-text text-danger">
                            {{ $t('Request.warning.dateMax') }}
                        </small>
                    </div>
                </div>
                <div class="formMoving-Between">
                    <div class="formMoving-Line">

                    </div>
                    <b-button class="formMoving-Button" @click="FromTo = !FromTo">
                        <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon>
                    </b-button>
                </div>
                <div class="form-group">
                    <label class="formLabel"> 
                        <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.rentEndDate') }}</strong> </label>
                    <input 
                        type="date" 
                        class="formElement" 
                        :placeholder="RentOrder.EndDate == null || RentOrder.EndDate == '' ? $t('Request.placeholder.date') : ''" 
                        id="dateBack" 
                        v-model="RentOrder.EndDate"
                        @blur="$v.RentOrder.EndDate.$touch()">
                    <div v-if="$v.RentOrder.EndDate.$dirty">
                        <small v-if="!$v.RentOrder.EndDate.required" class="form-text text-danger">
                            {{ $t('Request.warning.noEndDate') }}
                        </small>
                        <small v-else-if="!$v.RentOrder.EndDate.dateMin" class="form-text text-danger">
                            {{ $t('Request.warning.dateMin') }}
                        </small>
                    </div>
                </div>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setRentOrder" :disabled="$v.$invalid">
                    {{ $t('Request.label.newRequest') }}
                </button>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";
    import {required} from "vuelidate/lib/validators"
    import Footer from "../../components/Footer.vue";

    export default {
        components: {
            Footer
        },
        data() {
            return {
                visitorText: "",
                selectedLocation: -1,
                selectedVehicle: -1,
                RentOrder: {
                    VehicleId: null,
                    IlId : null,
                    IlceId: null,
                    BeginDate : null,
                    EndDate: null,
                    ResultText: ""
                },
                VehicleType: 1,
                FromTo: true,
            }
        },
        validations: {
            selectedVehicle: {
                required,
                minValue: 0,
                checked(val, vm) {
                    return vm.selectedVehicle === -1 ? false : true
                }
            },
            RentOrder: {
                BeginDate: {
                    required,
                    dateMax(val, { EndDate }) {
                        return EndDate != null && val > EndDate ? false : true
                    },
                    noPast(val) {
                        return (new Date(val)).toLocaleDateString() >= (new Date()).toLocaleDateString()
                    },
                },
                EndDate: {
                    required,
                    dateMin(val, { BeginDate }) {
                        return BeginDate != null && val < BeginDate ? false : true
                    },
                },
            }
        },
        computed: {
            ...mapGetters(["getLocations", "getVehicles", "getSessionDetail", "getVehiclesByType"]),
            FromToClass() {
                return 'formControl formMoving' + (this.FromTo ? ' formMoving-upSide': ' formMoving-downSide')
            },
        },
        methods: {
            locationSelected() {
                this.RentOrder.IlceId = this.selectedLocation.split('_')[0]
                this.RentOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setRentOrder() {
                this.RentOrder.Description = ""
                this.RentOrder.VehicleId = this.selectedVehicle
                this.RentOrder.FromToType = 1
                this.RentOrder.ResultText = this.$t('Request.text.rentResult')

                this.$store.dispatch("SetRentOrder", { ...this.RentOrder })
            },
            changeType() {
                this.selectedVehicle = -1
                this.$v.selectedVehicle.$reset()
            }
        }
    }
</script>

<style scoped>

</style>