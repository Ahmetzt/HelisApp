<template>
    <div class="request-container">
        <img src="../../assets/requests/transfer.jpg" alt="transfer" class="requestImage">
        
        <div :class="FromToClass">
            <div class="">
                <label class="formLabel"> 
                    <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ FromTo ? "Nereden" : "Nereye" }}</strong> </label>
                <!-- <select 
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
                </div> -->
                <input 
                    type="text" 
                    class="form-control formElement"
                    v-model="getSessionDetail.CurrentLocation"
                    disabled>
            </div>
            <div class="formMoving-Between">
                <div class="formMoving-Line">

                </div>
                <b-button class="formMoving-Button" @click="FromTo = !FromTo">
                    <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon>
                </b-button>
            </div>
            <div class="">
                <label class="formLabel"> 
                    <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ FromTo ? "Nereye" : "Nereden" }}</strong> </label>
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
        <div class="form-group formControl">
            <label class="formLabel"> 
                <i class="fa fa-user-alt faclass fa-lg"></i> <strong>Kişi Sayısı</strong> </label>
            <b-button v-b-modal.mdlCustomer class="formElement">{{ visitorText != "" ? visitorText : "Kişi Sayısı Seçiniz" }}</b-button>
            <div v-if="$v.TransferOrder.Adults.$dirty">
                <small v-if="!$v.TransferOrder.Adults.minValue" class="form-text text-danger">
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
                                    <label > {{ TransferOrder.Adults }} </label>
                                    <button @click="changeVisitor('adult', +1)">
                                        <i class="fa fa-plus faclass fa-lg"></i></button></td>
                            </tr>
                            <tr>
                                <td colspan="3"><label> <strong>Çocuk:</strong> </label></td>
                                <td><button @click="changeVisitor('Kids', -1)">
                                        <i class="fa fa-minus faclass fa-lg"></i></button>
                                    <label> {{ TransferOrder.Kids }} </label>
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
                selectedLocation: -1,
                selectedAirport: -1,
                isSearched: false,
                requestDate: null,
                requestTime: null,
                TransferOrder: {
                    Description: "",
                    IlId : null,
                    IlceId: null,
                    AirportId: null,
                    Adults: 0,
                    Kids: 0,
                    FromToType: 1,
                    RequestDate : null,
                    ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır."
                },
                FromTo: true
            }
        },
        validations: {
            selectedAirport: {
                required,
                minValue: 0,
                checked(val, vm) {
                    return vm.selectedAirport === -1 ? false : true
                }
            },
            TransferOrder: {
                Adults: {
                    required,
                    minValue: minValue(1)
                },
            },
            requestDate: {
                required
            },
            requestTime: {
                required
            },
        },
        computed: {
            ...mapGetters(["getLocations", "getAirports", "getSessionDetail"]),
            visitorText() {
                return (this.TransferOrder.Adults > 0 ? " Yetişkin: " + this.TransferOrder.Adults : "") + (this.TransferOrder.Kids > 0 ? " Çocuk: " + this.TransferOrder.Kids : "")
            },
            FromToClass() {
                return 'formControl formMoving' + (this.FromTo ? ' formMoving-upSide': ' formMoving-downSide')
            }
        },
        methods: {
            changeVisitor(type, number) {
                this.$v.TransferOrder.Adults.$touch()
                if (type == 'adult') {
                    this.TransferOrder.Adults += number
                }

                if (type == 'Kids') {
                    this.TransferOrder.Kids += number
                }
                
                this.TransferOrder.Adults = this.TransferOrder.Adults < 0 ? 0 : this.TransferOrder.Adults
                this.TransferOrder.Kids = this.TransferOrder.Kids < 0 ? 0 : this.TransferOrder.Kids
            },
            locationSelected() {
                this.TransferOrder.IlceId = this.selectedLocation.split('_')[0]
                this.TransferOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setTransferOrder() {
                this.TransferOrder.Description = ""
                this.TransferOrder.AirportId = this.selectedAirport
                this.TransferOrder.FromToType = this.FromTo ? 1 : 2
                this.TransferOrder.RequestDate = this.requestDate + " " + this.requestTime

                this.$store.dispatch("SetTransferOrder", { ...this.TransferOrder })
            }
        }
    }
</script>

<style scoped>

</style>