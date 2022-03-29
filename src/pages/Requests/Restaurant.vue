<template>
    <div class="request-container">
        <div v-if="!isSelected" class="tableRestaurant">
            <table class="table table-hover table-striped table-bordered" v-if="getRestaurants.length > 0">
                <tbody>
                    <tr v-for="restaurant in getRestaurants" :key="restaurant.RestaurantId" @click="restaurantSelected(restaurant)">
                        <!-- <td class="align-middle text-center" height=220 width=220><img :src="require(`../../assets/restaurants/${restaurant.ImageUrl}`)" alt="" border=3 height=200 width=200></td> -->
                        <td colspan="2"  class="align-middle text-center">
                            <strong class="leftFloat"> {{ restaurant.Name }} </strong>
                            <i aria-hidden="true" class="fa fa-arrow-circle-right me-2 rightFloat"></i> </td>
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
        <div v-else>
            <!-- <img src="../../assets/requests/restaurant.jpg" alt="restaurant" class="requestImage"> -->
            <img :src="require(`../../../../images/restaurants/${selectedRestaurant.ImageUrl}`)" :alt="selectedRestaurant.Name" class="requestImage">
            <div class="form-group formControl formControlFE">
                <label class="formLabel">       
                    <i class="far fa-calendar-alt faclass fa-lg"></i> <strong>Rezervasyon Tarihi</strong> </label>
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
                    <i class="fa fa-clock faclass fa-lg"></i> <strong>Rezervasyon Saati</strong> </label>
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
                <div v-if="$v.RestaurantOrder.Adults.$dirty">
                    <small v-if="!$v.RestaurantOrder.Adults.minValue" class="form-text text-danger">
                        En Az 1 Yetişkin olmalıdır
                    </small>
                </div>

                <b-modal id="mdlCustomer" title="Yolcu" hide-header hide-footer dialog-class="mydialogclass">
                    <p>Kişi Seçimi</p>
                        <div class="myDiv">
                            <table class="mytable2">
                                <tr>
                                    <td colspan="3"><label> <strong>Yetişkin:</strong> </label></td>
                                    <td><button @click="changeVisitor('adult', -1)">
                                            <i class="fa fa-minus faclass fa-lg"></i></button>
                                        <label > {{ RestaurantOrder.Adults }} </label>
                                        <button @click="changeVisitor('adult', +1)">
                                            <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                </tr>
                                <tr>
                                    <td colspan="3"><label> <strong>Çocuk:</strong> </label></td>
                                    <td><button @click="changeVisitor('Kids', -1)">
                                            <i class="fa fa-minus faclass fa-lg"></i></button>
                                        <label> {{ RestaurantOrder.Kids }} </label>
                                        <button @click="changeVisitor('Kids', +1)">
                                            <i class="fa fa-plus faclass fa-lg"></i></button></td>
                                </tr>
                            </table>
                        </div>
                        
                    <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">Kapat</b-button>
                </b-modal>
            </div>
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setRestaurantOrder" :disabled="$v.$invalid">
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
                selectedRestaurant: {},
                isSelected: false,
                requestDate: null,
                requestTime: null,
                RestaurantOrder: {
                    RestaurantId: null,
                    RequestDate : null,
                    Adults: 0,
                    Kids: 0,
                    ResultText: "Talebiniz başarı ile elimize ulaştı. En kısa sürede asistanlarımız size ulaşacaktır."
                }
            }
        },
        validations: {
            requestDate: {
                required
            },
            requestTime: {
                required
            },
            RestaurantOrder: {
                Adults: {
                    required,
                    minValue: minValue(1)
                },
            }
        },
        created() {
            eventBus.$on('returnBack', () => {
                this.isSelected = false
                eventBus.$emit('updateHeaderText', this.$t('pages.restaurant'))
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getRestaurants"]),
            visitorText() {
                return (this.RestaurantOrder.Adults > 0 ? " Yetişkin: " + this.RestaurantOrder.Adults : "") + (this.RestaurantOrder.Kids > 0 ? " Çocuk: " + this.RestaurantOrder.Kids : "")
            }
        },
        methods: {
            changeVisitor(type, number) {
                this.$v.RestaurantOrder.Adults.$touch()
                if (type == 'adult') {
                    this.RestaurantOrder.Adults += number
                }

                if (type == 'Kids') {
                    this.RestaurantOrder.Kids += number
                }
                
                this.RestaurantOrder.Adults = this.RestaurantOrder.Adults < 0 ? 0 : this.RestaurantOrder.Adults
                this.RestaurantOrder.Kids = this.RestaurantOrder.Kids < 0 ? 0 : this.RestaurantOrder.Kids
            },
            restaurantSelected(Restaurant) {
                // this.selectedRestaurant = Restaurant.RestaurantId
                this.selectedRestaurant = Object.assign(Restaurant)
                this.isSelected = true
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', Restaurant.Name)
            },
            setRestaurantOrder() {
                this.RestaurantOrder.RestaurantId = this.selectedRestaurant.RestaurantId
                this.RestaurantOrder.RequestDate = this.requestDate + " " + this.requestTime

                this.$store.dispatch("SetRestaurantOrder", { ...this.RestaurantOrder })
            }
        }
    }
</script>

<style scoped>

</style>