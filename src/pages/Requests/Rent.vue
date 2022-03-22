<template>
    <div class="container">
        <img src="../../assets/requests/rent.jpg" alt="boat" class="requestImage">
        <div class="form-group formControl formControlFE">
            <label class="formLabel"> 
                <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>Nereden</strong> </label>
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
                <i class="fa fa-ship faclass fa-lg"></i> <strong>Araç</strong> </label>
            <select 
                class="form-control formElement" 
                v-model="$v.selectedVehicle.$model" 
                @blur="$v.selectedVehicle.$touch()">
                <option selected disabled value=-1>Araç veya Bot Seçiniz</option>
                <option 
                    :disabled="vehicle.count == 0"
                    :value="vehicle.VehicleId"
                    v-for="vehicle in getVehicles"
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
                <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>Giriş Tarihi</strong> </label>
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
                <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>Çıkış Tarihi</strong> </label>
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
            ...mapGetters(["getLocations"]),
            ...mapGetters(["getVehicles"]),
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
            }
        }
    }
</script>

<style scoped>

</style>