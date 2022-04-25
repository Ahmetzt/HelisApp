<template>
    <div class="request-container">
        <div v-if="!isSearched" class="headerMain">
            <div>
                <img src="../../../../images/requests/jpg/konaklama.jpg" alt="konaklama" class="requestImage">

                <!-- <div class="form-group formControl formControlFE">
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
                
                <div class="form-group formControl formControlFE">
                    <label class="formLabel"> 
                        <i class="fas fa-hotel faclass fa-lg"></i> <strong>{{ $t('Request.label.mansion') }}</strong> </label>
                    <select 
                        class="form-control formElement" 
                        v-model="$v.searchData.MansionId.$model" 
                        @blur="$v.searchData.MansionId.$touch()">
                        <option selected disabled value=-1>{{ $t('Request.placeholder.selectProject') }}</option>
                        <option 
                            :disabled="mansion.count == 0"
                            :value="mansion.MansionId"
                            v-for="mansion in getMansionsList"
                            :key="mansion.MansionId">
                            {{ mansion.Name }}</option>
                    </select>
                    <div v-if="$v.searchData.MansionId.$dirty">
                        <small v-if="!$v.searchData.MansionId.checked" class="form-text text-danger">
                            {{ $t('Request.warning.noProject') }}
                        </small>
                    </div>
                </div>

                <div :class="FromToClass">
                    <div class="form-group">
                        <label class="formLabel"> 
                            <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.beginDate') }}</strong> </label>
                        <input 
                            type="date" 
                            class="formElement" 
                            :placeholder="searchData.BeginDate == null || searchData.BeginDate == '' ? $t('Request.placeholder.date') : ''" 
                            id="dateEnter" 
                            v-model="searchData.BeginDate"
                            @blur="$v.searchData.BeginDate.$touch()">
                        <div v-if="$v.searchData.BeginDate.$dirty">
                            <small v-if="!$v.searchData.BeginDate.required" class="form-text text-danger">
                                {{ $t('Request.warning.noBeginDate') }}
                            </small>
                            <small v-else-if="!$v.searchData.BeginDate.noPast" class="form-text text-danger">
                                {{ $t('Request.warning.noPast') }}
                            </small>
                            <small v-else-if="!$v.searchData.BeginDate.dateMax" class="form-text text-danger">
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
                            <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.endDate') }}</strong> </label>
                        <input 
                            type="date" 
                            class="formElement" 
                            :placeholder="searchData.EndDate == null || searchData.EndDate == '' ? $t('Request.placeholder.date') : ''" 
                            id="dateBack" 
                            v-model="searchData.EndDate"
                            @blur="$v.searchData.EndDate.$touch()">
                        <div v-if="$v.searchData.EndDate.$dirty">
                            <small v-if="!$v.searchData.EndDate.required" class="form-text text-danger">
                                {{ $t('Request.warning.noEndDate') }}
                            </small>
                            <small v-else-if="!$v.searchData.EndDate.dateMin" class="form-text text-danger">
                                {{ $t('Request.warning.dateMin') }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="form-group formControl">
                    <label class="formLabel"> 
                        <i class="fa fa-user-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.people') }}</strong> </label>
                    <b-button v-b-modal.mdlCustomer class="formElement formButton">{{ visitorText != "" ? visitorText : $t('Request.placeholder.people') }}</b-button>
                    <div v-if="$v.searchData.Adults.$dirty">
                        <small v-if="!$v.searchData.Adults.minValue" class="form-text text-danger">
                            {{ $t('Request.warning.adultObliged') }}
                        </small>
                    </div>

                    <b-modal id="mdlCustomer" hide-header hide-footer dialog-class="mydialogclass">
                        <p>{{ $t('Request.label.selectPeople') }}</p>
                            <div class="myDiv">
                                <table class="mytable2">
                                    <tr>
                                        <td colspan="3"><label> <strong>{{ $t('Request.label.adult') }}</strong> </label></td>
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
                            
                        <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">{{ $t('Request.label.close') }}</b-button>
                    </b-modal>
                </div>

                <div class="button-container d-flex  flex-column align-items-center buttonControl" @blur="$v.searchData.EndDate.$touch()">
                    <button type="submit" class="btn btn-block mb-2 button-yellow" @click="onSearched" :disabled="$v.$invalid">
                        {{ $t('Request.label.hotelSearch') }}
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
        <div v-else>
            <table class="table table-hover table-striped table-bordered" v-if="getMansionsList.length > 0">
                <tbody>
                    <tr v-for="Mansion in getMansionsList" :key="Mansion.MansionId" @click="setMansionOrder(Mansion)">
                        <td class="align-middle text-center" height=220 width=220><img :src="require(`../../../../images/hotels/${Mansion.ImageUrl}`)" alt="" border=3 height=200 width=200></td>
                        <td colspan="2"  class="align-middle text-left">
                            <strong> {{ Mansion.Name }} </strong>
                            <br> {{ Mansion.Definition}} <br> 
                            <i class="fa fa-bed me-2" aria-hidden="true"></i> {{ Mansion.Description}} <br>
                            <i aria-hidden="true" class="far fa-arrow-alt-circle-right me-2 rightArrow"></i> </td>
                    </tr>
                </tbody>
            </table>
            <div class="alert alert-warning" v-else>
                <strong>{{ $t('Request.warning.noMansion') }}</strong>
                <br>
                <small>{{ $t('Request.warning.noMansionDetail') }}
                </small>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"
    import {eventBus} from "../../main"
    import Footer from "../../components/Footer.vue";

    export default {
        components: {
            Footer
        },
        data() {
            return {
                searchData: {
                    MansionId: -1,
                    IlId: null,
                    IlceId: null,
                    Kids: 0,
                    Adults: 0,
                    BeginDate: null,
                    EndDate: null,
                },
                selectedLocation: -1,
                isSearched: false,
                MansionOrder: {
                    MansionId: -1,
                    BeginDate : null,
                    EndDate: null,
                    Adults: 0,
                    Kids: 0,
                    ResultText: ""
                },
                FromTo: true,
            }
        },
        filters: {
            formatDate: function (value){
                let d = new Date(value)
                return d.toLocaleDateString()
            },
        },
        validations: {
            // selectedLocation: {
            //     required,
            //     minValue: 0,
            //     checked(val, vm) {
            //         return vm.selectedLocation === -1 ? false : true
            //     }
            // },
            searchData: {
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
                Adults: {
                    required,
                    minValue: minValue(1)
                },
                MansionId: {
                    checked(val) {
                        return val == -1 ? false : true
                    }
                }
            }
        },
        created() {
            eventBus.$on('returnBack', () => {
                this.isSearched = false
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getLocations"]),
            ...mapGetters(["getMansionsList"]),
            visitorText() {
                return (this.searchData.Adults > 0 ? " " + this.$t('Request.label.adult') + " " + this.searchData.Adults : "") + 
                    (this.searchData.Kids > 0 ? " " + this.$t('Request.label.kid') + " " + this.searchData.Kids : "")
            },
            FromToClass() {
                return 'formControl formMoving' + (this.FromTo ? ' formMoving-upSide': ' formMoving-downSide')
            },
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
                this.searchData.IlceId = this.selectedLocation.split('_')[0]
                this.searchData.IlId = this.selectedLocation.split('_')[1]
            },
            onSearched() {
                // this.$store.dispatch("setMansionSearch", { ...this.searchData })
                // eventBus.$emit('submitPage')
                // this.isSearched = true

                this.setMansionOrder(this.$store.getters.getMansionsList.find(x => x.MansionId == this.searchData.MansionId))
            },
            setMansionOrder(Mansion) {
                this.MansionOrder.MansionId = Mansion.MansionId
                this.MansionOrder.BeginDate = this.searchData.BeginDate
                this.MansionOrder.EndDate = this.searchData.EndDate
                this.MansionOrder.Adults = this.searchData.Adults
                this.MansionOrder.Kids = this.searchData.Kids
                this.MansionOrder.ResultText = this.$t('Request.text.mansionResult').replace('#Mansion#', Mansion.Name)
                    .replace('#BeginDate#', this.$options.filters.formatDate(this.searchData.BeginDate))
                    .replace('#EndDate#', this.$options.filters.formatDate(this.searchData.EndDate))

                this.$store.dispatch("SetMansionOrder", { ...this.MansionOrder })
            }
        }
    }
</script>

<style>

</style>