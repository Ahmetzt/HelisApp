<template>
    <div class="container">
        <div v-if="!isSearched">
            <img src="../../assets/requests/konaklama.jpg" alt="konaklama" class="requestImage">
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
                    <i class="fa fa-calendar-alt faclass fa-lg"></i> <strong>Giriş Tarihi</strong> </label>
                <input 
                    type="date" 
                    class="formElement" 
                    :placeholder="searchData.BeginDate == null || searchData.BeginDate == '' ? 'Tarih Seçiniz' : ''" 
                    id="dateEnter" 
                    v-model="searchData.BeginDate"
                    @blur="$v.searchData.BeginDate.$touch()">
                <div v-if="$v.searchData.BeginDate.$dirty">
                    <small v-if="!$v.searchData.BeginDate.required" class="form-text text-danger">
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
                    :placeholder="searchData.EndDate == null || searchData.EndDate == '' ? 'Tarih Seçiniz' : ''" 
                    id="dateBack" 
                    v-model="searchData.EndDate"
                    @blur="$v.searchData.EndDate.$touch()">
                <div v-if="$v.searchData.EndDate.$dirty">
                    <small v-if="!$v.searchData.EndDate.required" class="form-text text-danger">
                        Lütfen Çıkış Tarihi Seçiniz
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

                <b-modal id="mdlCustomer" title="Kişi Seçimi" hide-header hide-footer dialog-class="mydialogclass">
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

            <div class="button-container d-flex  flex-column align-items-center buttonControl" @blur="$v.searchData.EndDate.$touch()">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="onSearched" :disabled="$v.$invalid">
                    Hotel Ara
                </button>
            </div>

        </div>
        <div v-else>
            <table class="table table-hover table-striped table-bordered" v-if="getMansionsByLocation.length > 0">
                <tbody>
                    <tr v-for="Mansion in getMansionsByLocation" :key="Mansion.MansionId" @click="setMansionOrder(Mansion)">
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
                <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
                <br>
                <small>Detaylı açıklama burada yer almaktadır wait and see :)
                </small>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"
    import {eventBus} from "../../main"

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
                isSearched: false,
                MansionOrder: {
                    MansionId: null,
                    BeginDate : null,
                    EndDate: null,
                    Adults: 0,
                    Kids: 0,
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
            searchData: {
                BeginDate: {
                    required
                },
                EndDate: {
                    required
                },
                Adults: {
                    required,
                    minValue: minValue(1)
                },
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
            ...mapGetters(["getMansionsByLocation"]),
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
                this.searchData.IlceId = this.selectedLocation.split('_')[0]
                this.searchData.IlId = this.selectedLocation.split('_')[1]
            },
            onSearched() {
                this.$store.dispatch("setMansionSearch", { ...this.searchData })
                eventBus.$emit('submitPage')
                this.isSearched = true
            },
            setMansionOrder(Mansion) {
                this.MansionOrder.MansionId = Mansion.MansionId
                this.MansionOrder.BeginDate = this.searchData.BeginDate
                this.MansionOrder.EndDate = this.searchData.EndDate
                this.MansionOrder.Adults = this.searchData.Adults
                this.MansionOrder.Kids = this.searchData.Kids
                this.MansionOrder.ResultText = "<b>" + Mansion.Name + "</b>" + " için " + this.searchData.BeginDate + " - " + 
                    this.searchData.BeginDate + " tarihli konaklama talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır."

                this.$store.dispatch("SetMansionOrder", { ...this.MansionOrder })
            }
        }
    }
</script>

<style>

</style>