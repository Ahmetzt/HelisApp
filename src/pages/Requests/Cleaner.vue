<template>
    <div class="request-container headerMain">
        <div>
            <img src="../../../../images/requests/jpg/cleaner.jpg" alt="kurutemizleme" class="requestImage">
            <div class="form-group formControl formControlFE">
                <label class="formLabel"> 
                    <i class="fas fa-user-circle faclass fa-lg"></i>&nbsp; 
                    <label for="cbWM"><strong>&nbsp;{{ $t('Request.label.productWM') }}</strong></label> 
                </label>
                <div class="formOneLine">
                    <button @click="changeProduct('WomanMan', -1)">
                        <i class="fa fa-minus faclass fa-lg"></i>
                    </button>
                    <label > {{ CleanerOrder.WomanMan }} </label>
                    <button @click="changeProduct('WomanMan', +1)">
                        <i class="fa fa-plus faclass fa-lg"></i>
                    </button>
                </div>
                <div v-if="$v.productControl.$dirty">
                    <small v-if="!$v.productControl.checked" class="form-text text-danger">
                        {{ $t('Request.warning.noProduct') }}
                    </small>
                </div>
            </div>
            <div class="form-group formControl">
                <label class="formLabel"> 
                    <i class="fas fa-tape faclass fa-lg"></i>&nbsp; 
                    <label for="cbHM"><strong>&nbsp;{{ $t('Request.label.productHT') }}</strong></label> 
                </label>
                <div class="formOneLine">
                    <button @click="changeProduct('HomeTextiles', -1)">
                        <i class="fa fa-minus faclass fa-lg"></i>
                    </button>
                    <label > {{ CleanerOrder.HomeTextiles }} </label>
                    <button @click="changeProduct('HomeTextiles', +1)">
                        <i class="fa fa-plus faclass fa-lg"></i>
                    </button>
                </div>
                <div v-if="$v.productControl.$dirty">
                    <small v-if="!$v.productControl.checked" class="form-text text-danger">
                        {{ $t('Request.warning.noProduct') }}
                    </small>
                </div>
            </div>
            <div class="form-group formControl">
                <label class="formLabel"> 
                    <i class="fas fa-child faclass fa-lg"></i>&nbsp; 
                    <label for="cbCP"><strong>&nbsp;{{ $t('Request.label.productCP') }}</strong></label> 
                </label>
                <div class="formOneLine">
                    <button @click="changeProduct('ChildProduct', -1)">
                        <i class="fa fa-minus faclass fa-lg"></i>
                    </button>
                    <label > {{ CleanerOrder.ChildProduct }} </label>
                    <button @click="changeProduct('ChildProduct', +1)">
                        <i class="fa fa-plus faclass fa-lg"></i>
                    </button>
                </div>
                <div v-if="$v.productControl.$dirty">
                    <small v-if="!$v.productControl.checked" class="form-text text-danger">
                        {{ $t('Request.warning.noProduct') }}
                    </small>
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
            <div class="button-container d-flex  flex-column align-items-center buttonControl">
                <button type="submit" class="btn btn-block mb-2 button-yellow" @click="setCleanerOrder" :disabled="$v.$invalid">
                    {{ $t('Request.label.newRequest') }}
                </button>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
    import {required} from "vuelidate/lib/validators"
    import Footer from "../../components/Footer.vue"

    export default {
        components: {
            Footer
        },
        data() {
            return {
                CleanerOrder: {
                    WomanMan: 0,
                    HomeTextiles: 0,
                    ChildProduct: 0,
                    RequestDate: null,
                    ResultText: ""
                },
                WMchecked: false,
                HTchecked: false,
                CPchecked: false,
                requestDate: null,
                requestTime: null,
                productControl: false,
            }
        },
        validations: {
            requestDate: {
                required
            },
            requestTime: {
                required
            },
            productControl: {
                required,
                minValue: 0,
                checked(val, vm) {
                    return vm.CleanerOrder.WomanMan < 1 && vm.CleanerOrder.HomeTextiles < 1 && vm.CleanerOrder.ChildProduct < 1 ? false : true
                }
            },
        },
        methods: {
            setCleanerOrder() {
                this.CleanerOrder.RequestDate = this.requestDate + " " + this.requestTime
                this.CleanerOrder.ResultText = this.$t('Request.text.cleanerResult')

                this.$store.dispatch("SetCleanerOrder", { ...this.CleanerOrder })
            },
            changeProduct(type, number) {
                this.$v.productControl.$touch()
                if (type == 'WomanMan') {
                    this.CleanerOrder.WomanMan += number
                }
                else if (type == 'HomeTextiles') {
                    this.CleanerOrder.HomeTextiles += number
                }
                else if (type == 'ChildProduct') {
                    this.CleanerOrder.ChildProduct += number
                }
                
                this.CleanerOrder.WomanMan = this.CleanerOrder.WomanMan < 0 ? 0 : this.CleanerOrder.WomanMan
                this.CleanerOrder.HomeTextiles = this.CleanerOrder.HomeTextiles < 0 ? 0 : this.CleanerOrder.HomeTextiles
                this.CleanerOrder.ChildProduct = this.CleanerOrder.ChildProduct < 0 ? 0 : this.CleanerOrder.ChildProduct
            },
        }
    }
</script>

<style scoped>
    .formOneLine {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0px 0px 20px 60px;
        padding: 10px 25px;
        background-color: #fff;
        border: 1px solid #ced4da;
    }
</style>