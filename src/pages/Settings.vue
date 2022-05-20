<template>
    <div class="container">

        <b-form @submit.prevent="onSubmit" class="formNew">

            <b-form-group :label="$t('Auth.Language.title')">
                <b-form-radio-group v-model="Form.Language" buttons button-variant="outline-info" size="lg" @input="setLanguage">
                    <b-form-radio size="xl" name="Lang" value="tr"><flag iso="tr" /></b-form-radio>
                    <b-form-radio size="xl" name="Lang" value="en"><flag iso="gb" /></b-form-radio>
                </b-form-radio-group>
            </b-form-group>

            <b-form-group
                id="input-group-1"
                :label="$t('Auth.UserName.title')"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model.lazy="Form.UserName"
                    :placeholder="$t('Auth.UserName.placeholder')"
                    disabled
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-11"
                :label="$t('Auth.Mail.title')"
                label-for="input-11">
                <b-form-input
                    id="input-11"
                    v-model.lazy="Form.Mail"
                    type="email"
                    :placeholder="$t('Auth.Mail.placeholder')"
                    disabled
                ></b-form-input>
            </b-form-group>

            <b-form-group 
                id="input-group-21" 
                :label="$t('Auth.Password.title')"
                label-for="input-21">
                <b-form-input
                    id="input-21"
                    type="password"
                    v-model="Form.Password"
                    :placeholder="$t('Auth.Password.placeholder')"
                    :state="$v.Form.Password.$dirty ? !$v.Form.Password.$anyError : null"
                    @blur="$v.Form.Password.$touch()"
                ></b-form-input>
                <div v-if="$v.Form.Password.$dirty">
                    <b-form-invalid-feedback v-if="!$v.Form.Password.required" :state="$v.Form.Password.required">
                        {{ $t('Auth.Password.required') }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.Form.Password.minLength" :state="$v.Form.Password.minLength">
                        {{ $t('Auth.Password.minLength') }}
                    </b-form-invalid-feedback>
                </div>
            </b-form-group>

            <b-form-group 
                id="input-group-22" 
                :label="$t('Auth.RePassword.title')"
                label-for="input-22">
                <b-form-input
                    id="input-22"
                    type="password"
                    v-model="Form.RePassword"
                    :placeholder="$t('Auth.RePassword.placeholder')"
                    :state="$v.Form.RePassword.$dirty ? !$v.Form.RePassword.$anyError : null"
                    @blur="$v.Form.RePassword.$touch()"
                ></b-form-input>
                <div v-if="$v.Form.RePassword.$dirty">
                    <b-form-invalid-feedback v-if="!$v.Form.RePassword.required" :state="$v.Form.RePassword.required">
                        {{ $t('Auth.RePassword.required') }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.Form.RePassword.minLength" :state="$v.Form.RePassword.minLength">
                        {{ $t('Auth.RePassword.minLength') }}
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.Form.RePassword.sameAs" :state="$v.Form.RePassword.sameAs">
                        {{ $t('Auth.RePassword.sameAs') }}
                    </b-form-invalid-feedback>
                </div>
            </b-form-group>

            <b-form-group 
                id="input-group-2" 
                :label="$t('Auth.FirstName.title')"
                label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="Form.FirstName"
                    :placeholder="$t('Auth.FirstName.placeholder')"
                    :state="$v.Form.FirstName.$dirty ? !$v.Form.FirstName.$anyError : null"
                    @blur="$v.Form.FirstName.$touch()"
                ></b-form-input>
                <div v-if="$v.Form.FirstName.$dirty">
                    <b-form-invalid-feedback :state="$v.Form.FirstName.required">
                        {{ $t('Auth.FirstName.required') }}
                    </b-form-invalid-feedback>
                </div>
            </b-form-group>

            <b-form-group 
                id="input-group-3" 
                :label="$t('Auth.LastName.title')"
                label-for="input-3">
                <b-form-input
                    id="input-3"
                    v-model="Form.LastName"
                    :placeholder="$t('Auth.LastName.placeholder')"
                    :state="$v.Form.LastName.$dirty ? !$v.Form.LastName.$anyError : null"
                    @blur="$v.Form.LastName.$touch()"
                ></b-form-input>
                <div v-if="$v.Form.LastName.$dirty">
                    <b-form-invalid-feedback :state="$v.Form.LastName.required">
                        {{ $t('Auth.LastName.required') }}
                    </b-form-invalid-feedback>
                </div>
            </b-form-group>

            <b-form-group 
                id="input-group-31" 
                :label="$t('Auth.PhoneNumber.title')"
                label-for="input-31">
                <b-form-input
                    id="input-31"
                    type="text"
                    v-model="Form.PhoneNumber"
                    @change="formatPhone"
                    :placeholder="$t('Auth.PhoneNumber.placeholder')"
                ></b-form-input>
            </b-form-group>
            
            <b-button type="submit" class="rightFloat submitButton">
                {{ $t('Auth.save') }}
            </b-button>
        </b-form>
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    import { required, sameAs, minLength } from "vuelidate/lib/validators"

    export default {
        data() {
            return {
                Form: {
                    UserName: '',
                    Password: '',
                    RePassword: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: -1,
                    Language: 'tr',
                },
            }
        },
        validations() {
            return {
                Form: {
                    Password: {
                        required,
                        minLength: minLength (6)
                    },
                    RePassword: {
                        required,
                        minLength: minLength (6),
                        sameAs: sameAs(vm => {
                            return vm.Password
                        })
                    },
                    FirstName: {
                        required
                    },
                    LastName: {
                        required
                    },
                }
            }
        },
        created(){
            this.SelfInfo()
        },
        computed: {
            ...mapGetters(["getSecondary"]),
        },
        methods: {
            SelfInfo() {
                this.$store.dispatch("GetSelfInfo")
                    .then(data => {
                        this.Form.UserName      = data.UserName
                        this.Form.Mail          = data.Mail
                        this.Form.Password      = data.Password
                        this.Form.RePassword    = data.Password
                        this.Form.FirstName     = data.FirstName
                        this.Form.LastName      = data.LastName
                        this.Form.DateOfBirth   = data.DateOfBirth
                        this.Form.PhoneNumber   = data.PhoneNumber
                        this.Form.RoleId        = data.RoleId
                        this.Form.Language      = data.Language
                    })
            },
            formatPhone() {
                let x = this.Form.PhoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                this.Form.PhoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            },
            onSubmit() {
                this.$v.Form.$touch()

                if (this.$v.Form.$anyError) {
                    // Sorgu
                    JSON.stringify(this.$v.Form.$model);
                } else {
                        this.Form.PhoneNumber = this.Form.PhoneNumber.replace(/\D/g,'')
                        this.$store.dispatch("UpdateSelf", { ...this.Form })
                            .then(() =>{
                                this.$router.push({path: '/new'});
                            })
                }

            },
            setLanguage() {
                console.log(this.Form.Language)
                // this.$i18n.locale = this.Form.Language
                // this.$store.dispatch("SetLocale", this.Form.Language)
                this.$store.dispatch("SetLocale", this.Form.Language)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin: auto;
        max-width: 90%;
    }

    .form-control, .custom-select {
        height: calc(4.25rem + 2px);
        font-size: 40px;
        display: flex;
    }
    .btn {
        font-size: 40px;
        margin: 10px;
    }
    .submitButton {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
</style>