<template>
    <div class="container">
        <img src="../../assets/requests/transfer.jpg" alt="transfer" class="requestImage">
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
                    <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>Nereye</strong> </label>
            <select 
                class="form-control formElement" 
                v-model="$v.selectedAirport.$model" 
                @blur="$v.selectedAirport.$touch()">
                <option selected disabled value=-1>Hava Limanı Seçiniz</option>
                <option 
                    :disabled="airport.count == 0"
                    :value="airport.AirportId"
                    :IlId="airport.IlId"
                    :IlceId="airport.IlceId"
                    v-for="airport in getAirports"
                    :key="airport.RowId">
                    {{ airport.AirportName }}</option>
            </select>
            <div v-if="$v.selectedAirport.$dirty">       
                <small v-if="!$v.selectedAirport.checked" class="form-text text-danger">
                    Lütfen Havalimanı Seçiniz
                </small>
            </div>
        </div>
        <div class="form-group formControl">
            <label class="formLabel"> 
                   <i class="fa fa-user-alt faclass fa-lg"></i> <strong>Kişi Sayısı</strong> </label>
            <b-button v-b-modal.mdlCustomer class="formElement">{{ visitorText != "" ? visitorText : "Kişi Sayısı Seçiniz" }}</b-button>
            <div v-if="$v.searchData.Adults.$dirty">
                <small v-if="!$v.searchData.Adults.minValue" class="form-text text-danger">
                    En Az 1 Yetişkin olmalıdır
                </small>
            </div>
            <b-modal id="mdlCustomer" title="BootstrapVue" hide-header hide-footer dialog-class="mydialogclass">
                <p>Kişi Seçimi</p>
                    <div class="myDiv">
                        <table class="mytable2">
                            <tr>
                                <td colspan="3"><label> <strong>Yetişkin:</strong> </label></td>
                                <td><button @click="changeVisitor('adult', -1)">
                                        <i class="fa fa-minus faclass fa-lg"></i></button>
                                    <label > {{ searchData.Adults }} </label>
                                    <button @click="changeVisitor('adult', +1)">
                                        <i class="fa fa-plus faclass fa-lg"></i></button></td>
                            </tr>
                            <tr>
                                <td colspan="3"><label> <strong>Çocuk:</strong> </label></td>
                                <td><button @click="changeVisitor('Kids', -1)">
                                        <i class="fa fa-minus faclass fa-lg"></i></button>
                                    <label> {{ searchData.Kids }} </label>
                                    <button @click="changeVisitor('Kids', +1)">
                                        <i class="fa fa-plus faclass fa-lg"></i></button></td>
                            </tr>
                        </table>
                    </div>
                    
                <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">Kapat</b-button>
            </b-modal>
        </div>
        <div class="button-container d-flex  flex-column align-items-center buttonControl">
            <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setTransferOrder" :disabled="$v.$invalid">
                Talep Oluştur
            </button>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"

    export default {
        data() {
            return {
                searchData: {
                    IlId: null,
                    IlceId: null,
                    Kids: 0,
                    Adults: 0,
                    BeginDate: null,
                    EndDate: null,
                },
                selectedLocation: -1,
                selectedAirport: -1,
                isSearched: false,
                TransferOrder: {
                    Description: "",
                    IlId : null,
                    IlceId: null,
                    AirportId: null,
                    Adults: 0,
                    Kids: 0,
                    FromToType: null,
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
            selectedAirport: {
                required,
                minValue: 0,
                checked(val, vm) {
                    return vm.selectedAirport === -1 ? false : true
                }
            },
            searchData: {
                Adults: {
                    required,
                    minValue: minValue(1)
                },
            }
        },
        computed: {
            ...mapGetters(["getLocations"]),
            ...mapGetters(["getAirports"]),
            visitorText() {
                return (this.searchData.Adults > 0 ? " Yetişkin: " + this.searchData.Adults : "") + (this.searchData.Kids > 0 ? " Çocuk: " + this.searchData.Kids : "")
            }
        },
        methods: {
            changeVisitor(type, number) {
                this.$v.searchData.Adults.$touch()
                if (type == 'adult') {
                    this.searchData.Adults += number
                }

                if (type == 'Kids') {
                    this.searchData.Kids += number
                }
                
                this.searchData.Adults = this.searchData.Adults < 0 ? 0 : this.searchData.Adults
                this.searchData.Kids = this.searchData.Kids < 0 ? 0 : this.searchData.Kids
            },
            locationSelected() {
                this.TransferOrder.IlceId = this.selectedLocation.split('_')[0]
                this.TransferOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setTransferOrder() {
                this.TransferOrder.Description = ""
                this.TransferOrder.AirportId = this.selectedAirport
                this.TransferOrder.Adults = this.searchData.Adults
                this.TransferOrder.Kids = this.searchData.Kids
                this.TransferOrder.FromToType = 1

                this.$store.dispatch("SetTransferOrder", { ...this.TransferOrder })
            }
        }
    }
</script>

<style scoped>

</style>