<template>
    <div class="container">
        <img src="../../assets/requests/rent.jpg" alt="boat" class="requestImage">
        <div class="form-group formControl formControlFE">
            <label class="formLabel"> 
                <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>Lokasyon</strong> </label>
            <input 
                type="text" 
                class="form-control formElement"
                v-model="getSessionDetail.CurrentLocation"
                disabled
            >
        </div>
        <div class="form-group formControl">
            <label class="formLabel"> 
                <i class="fa fa-random faclass fa-lg"></i> <strong>Araç Türü</strong> </label>
            <label class="formRadio">
                <input type="radio" name="VehicleType" v-model="VehicleType" @change="changeType" value="1"/>
                <i class="fa fa-car faclass fa-lg"></i> Araç
            </label>    
            <label class="formRadio">
                <input type="radio" name="VehicleType" v-model="VehicleType" @change="changeType" value="2"/>
                <i class="fa fa-ship faclass fa-lg"></i> Bot
            </label>
        </div>
        <div class="form-group formControl">
            <label class="formLabel"> 
                <span v-show="VehicleType == 2" ><i class="fa fa-ship faclass fa-lg"></i> <strong>Bot</strong></span> 
                <span v-show="VehicleType == 1" ><i class="fa fa-car faclass fa-lg"></i> <strong>Araç</strong></span>  </label>
            <select 
                class="form-control formElement" 
                v-model="$v.selectedVehicle.$model" 
                @blur="$v.selectedVehicle.$touch()">
                <option selected disabled value=-1>{{ VehicleType == 1 ? 'Araç Seçiniz' : VehicleType == 2 ? 'Bot Seçiniz' : '' }}</option>
                <option 
                    :disabled="vehicle.count == 0"
                    :value="vehicle.VehicleId"
                    v-for="vehicle in getVehiclesByType(VehicleType == 1 ? 'Araç' : VehicleType == 2 ? 'Tekne' : '')"
                    :key="vehicle.VehicleId">
                    {{ vehicle.Model }}</option>
            </select>
            <div v-if="$v.selectedVehicle.$dirty">
                <small v-if="!$v.selectedVehicle.checked" class="form-text text-danger">
                    Lütfen Araç veya Bot Seçiniz
                </small>
            </div>
        </div>
        <div class="form-group formControl">
            <label class="formLabel"> 
                <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>Kiralama Başlangıç Tarihi</strong> </label>
            <input 
                type="date" 
                class="formElement" 
                :placeholder="RentOrder.BeginDate == null || RentOrder.BeginDate == '' ? 'Tarih Seçiniz' : ''" 
                id="dateEnter" 
                v-model="RentOrder.BeginDate"
                @blur="$v.RentOrder.BeginDate.$touch()">
            <div v-if="$v.RentOrder.BeginDate.$dirty">
                <small v-if="!$v.RentOrder.BeginDate.required" class="form-text text-danger">
                    Lütfen Giriş Tarihi Seçiniz
                </small>
            </div>
        </div>
        <div class="form-group formControl">
            <label class="formLabel"> 
                <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>Kiralama Bitiş Tarihi</strong> </label>
            <input 
                type="date" 
                class="formElement" 
                :placeholder="RentOrder.EndDate == null || RentOrder.EndDate == '' ? 'Tarih Seçiniz' : ''" 
                id="dateBack" 
                v-model="RentOrder.EndDate"
                @blur="$v.RentOrder.EndDate.$touch()">
            <div v-if="$v.RentOrder.EndDate.$dirty">
                <small v-if="!$v.RentOrder.EndDate.required" class="form-text text-danger">
                    Lütfen Çıkış Tarihi Seçiniz
                </small>
            </div>
        </div>
        <div class="button-container d-flex  flex-column align-items-center buttonControl">
            <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setRentOrder" :disabled="$v.$invalid">
                Talep Oluştur
            </button>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";
    import {required} from "vuelidate/lib/validators"

    export default {
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
                    ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır."
                },
                VehicleType: 1,
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
                    required
                },
                EndDate: {
                    required
                },
            }
        },
        computed: {
            ...mapGetters(["getLocations", "getVehicles", "getSessionDetail", "getVehiclesByType"]),
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