<template>
    <div class="request-container headerMain">
        <div>
            <div v-if="!isSelected" class="tableRestaurant">
                <table class="table table-hover table-striped table-bordered" v-if="getRestaurants.length > 0">
                    <tbody>
                        <tr v-for="restaurant in getRestaurants" :key="restaurant.RestaurantId" @click="restaurantSelected(restaurant)">
                            <td colspan="2"  class="align-middle text-center">
                                <strong class="leftFloat"> {{ restaurant.Name }} </strong>
                                <i aria-hidden="true" class="fa fa-arrow-circle-right me-2 rightFloat"></i> </td>
                        </tr>
                    </tbody>
                </table>
                <div class="alert alert-warning" v-else>
                    <strong>{{ $t('Request.warning.noRestaurant') }}</strong>
                    <br>
                    <small>{{ $t('Request.warning.noRestaurantDetail') }}
                    </small>
                </div>

                
            </div>

            <div v-else>
                <img :src="require(`../../../../images/restaurants/${selectedRestaurant.ImageUrl}`)" :alt="selectedRestaurant.Name" class="requestImage">

                <div class="formControlFE formTwoCols">
                    <div class="form-group formControl formTwoCols-inner">
                        <label class="formLabel">       
                            <i class="far fa-calendar-alt faclass fa-lg"></i> <strong>{{ $t('Request.label.reservationDate') }}</strong> </label>
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
                        </div>
                    </div>
                    <div class="form-group formControl formTwoCols-inner">
                        <label class="formLabel">       
                            <i class="fa fa-clock faclass fa-lg"></i> <strong>{{ $t('Request.label.reservationTime') }}</strong> </label>
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
                    <div v-if="$v.RestaurantOrder.Adults.$dirty">
                        <small v-if="!$v.RestaurantOrder.Adults.minValue" class="form-text text-danger">
                            {{ $t('Request.warning.adultObliged') }}
                        </small>
                    </div>

                    <b-modal id="mdlCustomer" title="Yolcu" hide-header hide-footer dialog-class="mydialogclass">
                        <p>{{ $t('Request.label.selectPeople') }}</p>
                            <div class="myDiv">
                                <table class="mytable2">
                                    <tr>
                                        <td colspan="3"><label> <strong>{{ $t('Request.label.adult') }}</strong> </label></td>
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
                            
                        <b-button class="mt-3" block @click="$bvModal.hide('mdlCustomer')">{{ $t('Request.label.close') }}</b-button>
                    </b-modal>
                </div>
                <div class="button-container d-flex  flex-column align-items-center buttonControl">
                    <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setRestaurantOrder" :disabled="$v.$invalid">
                        {{ $t('Request.label.newRequest') }}
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {required, minValue} from "vuelidate/lib/validators"
    import {eventBus} from "../../main"
    import Footer from "../../components/Footer.vue"

    export default {
        components: {
            Footer
        },
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
                    ResultText: ""
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
                return (this.RestaurantOrder.Adults > 0 ? " " + this.$t('Request.label.adult') + " " + this.RestaurantOrder.Adults : "") + 
                    (this.RestaurantOrder.Kids > 0 ? " " + this.$t('Request.label.kid') + " " + this.RestaurantOrder.Kids : "")
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
                this.RestaurantOrder.ResultText = this.$t('Request.text.restaurantResult')

                this.$store.dispatch("SetRestaurantOrder", { ...this.RestaurantOrder })
            }
        }
    }
</script>

<style scoped>

</style>