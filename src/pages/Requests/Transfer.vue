<template>
    <div class="request-container headerMain">
        <div>
            <img src="../../../../images/requests/jpg/transfer.jpg" alt="transfer" class="requestImage">
            
            <div :class="FromToClass">
                <div class="">
                    <label class="formLabel"> 
                        <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ FromTo ? $t('Request.label.fromWhere') : $t('Request.label.toWhere') }}</strong> </label>
                    <input 
                        type="text" 
                        class="form-control formElement"
                        v-model="getSessionDetail.CurrentLocation"
                        disabled>
                </div>
                <div class="formMoving-Between">
                    <div class="formMoving-Dotted">

                    </div>
                    <div class="formMoving-Line">

                    </div>
                    <b-button class="formMoving-Button" @click="FromTo = !FromTo">
                        <b-icon icon="arrow-down-up" aria-hidden="true"></b-icon>
                    </b-button>
                </div>
                <div class="">
                    <label class="formLabel"> 
                        <i class="fa fa-map-marker-alt faclass fa-lg"></i> <strong>{{ FromTo ? $t('Request.label.toWhere') : $t('Request.label.fromWhere') }}</strong> </label>
                    <select 
                        class="form-control formElement" 
                        v-model="$v.selectedAirport.$model" 
                        @blur="$v.selectedAirport.$touch()">
                        <option selected disabled value=-1>{{ $t('Request.placeholder.selectAirport') }}</option>
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
                            {{ $t('Request.warning.noAirport') }}
                        </small>
                    </div>
                </div>
            </div>
            
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
                <div v-if="$v.TransferOrder.Adults.$dirty">
                    <small v-if="!$v.TransferOrder.Adults.minValue" class="form-text text-danger">
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
                                    <label > {{ TransferOrder.Adults }} </label>
                                    <button @click="changeVisitor('adult', +1)">
                                        <i class="fa fa-plus faclass fa-lg"></i></button></td>
                            </tr>
                            <tr>
                                <td colspan="3"><label> <strong>{{ $t('Request.label.kid') }}</strong> </label></td>
                                <td><button @click="changeVisitor('Kids', -1)">
                                        <i class="fa fa-minus faclass fa-lg"></i></button>
                                    <label> {{ TransferOrder.Kids }} </label>
                                    <button @click="changeVisitor('Kids', +1)">
                                        <i class="fa fa-plus faclass fa-lg"></i></button></td>
                            </tr>
                        </table>
                    </div>
                        
                    <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">{{ $t('Request.label.close') }}</b-button>
                </b-modal>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setTransferOrder" :disabled="$v.$invalid">
                    {{ $t('Request.label.newRequest') }}
                </button>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>

    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"
    import Footer from "../../components/Footer.vue";

    export default {
        components: {
            Footer
        },
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
                    ResultText: ""
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
                required,
                noPast(val) {
                    return (new Date(val)).toLocaleDateString() >= (new Date()).toLocaleDateString()
                },
            },
            requestTime: {
                required
            },
        },
        computed: {
            ...mapGetters(["getLocations", "getAirports", "getSessionDetail"]),
            visitorText() {
                return (this.TransferOrder.Adults > 0 ? " " + this.$t('Request.label.adult') + " " + this.TransferOrder.Adults : "") + 
                    (this.TransferOrder.Kids > 0 ? " " + this.$t('Request.label.kid') + " " + this.TransferOrder.Kids : "")
            },
            FromToClass() {
                return 'formControl formMoving formControlFE' + (this.FromTo ? ' formMoving-upSide': ' formMoving-downSide')
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
                this.TransferOrder.ResultText = this.$t('Request.text.transferResult')

                this.$store.dispatch("SetTransferOrder", { ...this.TransferOrder })
            }
        }
    }
</script>

<style scoped>

</style>