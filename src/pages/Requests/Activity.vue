<template>
    <div class="container">
        <div v-if="!isSelected">
            
            <table class="table" v-if="getActivityType.length > 0">
                <tbody>
                    <tr v-for="activity in getActivityType" :key="activity.ActivityTypeId" @click="ActivitySelected(activity)">
                        <td class="align-middle text-center" style="position: relative;">
                            <img :src="require(`../../assets/activityType/${activity.ImageUrl}`)" :alt="activity.Name" border=3 class="listImage">
                            <div style="position: absolute; right: 16px; bottom: 8px; color: white; font-size: xxx-large;"><strong> {{ activity.Name }} </strong></div>
                        </td>
                        <!-- <td colspan="2"  class="align-middle text-center">
                            <strong style="float: left; margin-left: 5px"> {{ activity.Name }} </strong>
                            <i aria-hidden="true" class="fa fa-arrow-circle-right me-2" style="float: right;"></i> </td> -->
                    </tr>
                </tbody>
            </table>
            <div class="alert alert-warning" v-else>
                <strong>Yapılacak Bir Aktivite Bulunmuyor</strong>
                <br>
                <small>Detaylı açıklama burada yer almaktadır wait and see :)
                </small>
            </div>

        </div>
        <div v-else>
            <img :src="require(`../../../../images/activityType/${selectedActivity.ImageUrl}`)" :alt="selectedActivity.Name" class="requestImage">
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
                <div v-if="$v.ActivityOrder.Adults.$dirty">
                    <small v-if="!$v.ActivityOrder.Adults.minValue" class="form-text text-danger">
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
                                        <label > {{ ActivityOrder.Adults }} </label>
                                        <button @click="changeVisitor('adult', +1)">
                                            <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                </tr>
                                <tr>
                                    <td colspan="3"><label> <strong>Çocuk:</strong> </label></td>
                                    <td><button @click="changeVisitor('Kids', -1)">
                                            <i class="fa fa-minus faclass fa-lg"></i></button>
                                        <label> {{ ActivityOrder.Kids }} </label>
                                        <button @click="changeVisitor('Kids', +1)">
                                            <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                </tr>
                            </table>
                        </div>
                        
                    <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">Kapat</b-button>
                </b-modal>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setActivityOrder" :disabled="$v.$invalid">
                    Talep Oluştur
                </button>
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
            requestDate: {
                required
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
            eventBus.$on('returnBack', () => {
                this.isSelected = false
                eventBus.$emit('updateHeaderText', this.$t('pages.activity'))
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getLocations"]),
            ...mapGetters(["getActivityType"]),
            visitorText() {
                return (this.ActivityOrder.Adults > 0 ? " Yetişkin: " + this.ActivityOrder.Adults : "") + (this.ActivityOrder.Kids > 0 ? " Çocuk: " + this.ActivityOrder.Kids : "")
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
                eventBus.$emit('updateHeaderText', activity.Name)
            },
            locationSelected() {
                this.ActivityOrder.IlceId = this.selectedLocation.split('_')[0]
                this.ActivityOrder.IlId = this.selectedLocation.split('_')[1]
            },
            setActivityOrder() {
                this.ActivityOrder.ActivityTypeId = this.selectedActivity.ActivityTypeId
                this.ActivityOrder.RequestDate = this.requestDate + " " + this.requestTime

                this.$store.dispatch("SetActivityOrder", { ...this.ActivityOrder })
            }
        }
    }
</script>

<style scoped>

</style>