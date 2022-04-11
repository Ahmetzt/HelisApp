<template>
    <div class="container mt-5">
        <div class="authMain">
            <hr>
            
            <div class="loginLang">
                <input 
                    type="radio" 
                    id="rd_tr" 
                    name="Lang" 
                    v-model="Lang" 
                    class="loginLang-cb" 
                    value="tr" 
                    @change="setLanguage">
                <label for="rd_tr"><flag iso="tr" /></label>
                <input 
                    type="radio" 
                    id="rd_en" 
                    name="Lang" 
                    v-model="Lang" 
                    class="loginLang-cb" 
                    value="en" 
                    @change="setLanguage">
                <label for="rd_en"><flag iso="gb" /></label>
                
            </div>
            <hr>
            <div v-if="!IsNew" >
                <form @submit.prevent="onSubmit" class="loginForm">
                    <div class="loginForm-group">
                        <label> {{ $t('Auth.Lmail.title') }} </label>
                        <input 
                            v-model="User.email" 
                            class="form-control"
                            >
                    </div>
                    <div class="loginForm-group" :style="{visibility: !IsForgotten ? 'visible' : 'hidden'}">
                        <label> {{ $t('Auth.Lpassword.title') }} </label>
                        <input 
                            v-model="User.password" 
                            type="password" 
                            class="form-control" 
                            >
                    </div>
                    <div class="button-container align-items-center">
                        <button type="submit" :class="{'button-submit' : !IsForgotten, 'button-forget' : IsForgotten }"
                                class="btn btn-block">
                            {{ !IsForgotten ? $t('Auth.submitSignUp') : $t('Auth.submitReset') }}
                        </button>
                        <span class="loginErSpan" v-show="IsError">
                            {{ LoginError }}
                        </span>
                        <a href="#" @click.prevent="IsUser=!IsUser" class="text-secondary d-none">
                            {{ IsUser ? 'Üye değilim' : 'Üyeliğim var'}}
                        </a>
                        <a href="#" @click.prevent="IsForgotten=!IsForgotten" class="text-secondary">
                            {{ IsForgotten ? $t('Auth.submitNotForgetton') : $t('Auth.submitForgetton') }}
                        </a>
                        <a href="#" @click.prevent="onCancel" class="text-secondary">
                            {{ $t('Auth.submitRegister') }}
                        </a>
                    </div>
                </form>
            </div>
            <div v-else>
                <b-form @submit.prevent="onSubmit" @reset="onReset">
                    <b-form-group
                        :label="$t('Auth.UserName.title')"
                        label-for="input-1">
                        <b-form-input
                            id="input-1"
                            v-model.lazy="Form.UserName"
                            :state="$v.Form.UserName.$dirty ? !$v.Form.UserName.$anyError : null"
                            @blur="$v.Form.UserName.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.UserName.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.UserName.required" :state="$v.Form.UserName.required">
                                {{ $t('Auth.UserName.required') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.UserName.minLength" :state="$v.Form.UserName.minLength">
                                {{ $t('Auth.UserName.minLength') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.UserName.isUnique" :state="$v.Form.UserName.isUnique">
                                {{ $t('Auth.UserName.isUnique') }}
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group
                        :label="$t('Auth.Mail.title')"
                        label-for="input-11">
                        <b-form-input
                            id="input-11"
                            v-model.lazy="Form.Mail"
                            type="email"
                            :state="$v.Form.Mail.$dirty ? !$v.Form.Mail.$anyError : null"
                            @blur="$v.Form.Mail.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.Mail.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.Mail.required" :state="$v.Form.Mail.required">
                                {{ $t('Auth.Mail.required') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.Mail.email" :state="$v.Form.Mail.email">
                                {{ $t('Auth.Mail.email') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.Mail.isUnique" :state="$v.Form.Mail.isUnique">
                                {{ $t('Auth.Mail.isUnique') }}
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group 
                        :label="$t('Auth.Password.title')"
                        label-for="input-21">
                        <b-form-input
                            id="input-21"
                            type="password"
                            v-model="Form.Password"
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
                        :label="$t('Auth.RePassword.title')"
                        label-for="input-22">
                        <b-form-input
                            id="input-22"
                            type="password"
                            v-model="Form.RePassword"
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
                        :label="$t('Auth.FirstName.title')"
                        label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="Form.FirstName"
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
                        :label="$t('Auth.LastName.title')"
                        label-for="input-3">
                        <b-form-input
                            id="input-3"
                            v-model="Form.LastName"
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
                        :label="$t('Auth.PhoneNumber.title')"
                        label-for="input-31">
                        <b-form-input
                            id="input-31"
                            type="text"
                            v-model="Form.PhoneNumber"
                            @change="formatPhone"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group 
                        :label="$t('Auth.MansionId.title')"
                        label-for="select1">
                        <b-form-select
                            id="select1"
                            v-model="Form.MansionId"
                            :state="$v.Form.MansionId.$dirty ? !$v.Form.MansionId.$anyError : null"
                            @input="setMansion"
                        >
                            <option selected disabled value="-1">{{ $t('Auth.MansionId.placeholder') }}</option>
                            <option v-for="Mansion in getMansions" :value="Mansion.MansionId" :key="Mansion.MansionId">{{ Mansion.Name }}
                            </option>
                        </b-form-select>
                            <div v-if="$v.Form.MansionId.$dirty">
                                <b-form-invalid-feedback v-if="!$v.Form.MansionId.minValue" :state="$v.Form.MansionId.minValue">
                                    {{ $t('Auth.MansionId.minValue') }}
                                </b-form-invalid-feedback>
                            </div>
                    </b-form-group>

                    <b-form-group 
                        :label="$t('Auth.BlockId.title')"
                        label-for="select2" 
                        v-if="IsBlocky" >
                        <b-form-select
                            id="select2"
                            v-model="Form.BlockId"
                            :state="$v.Form.BlockId.$dirty ? !$v.Form.BlockId.$anyError : null"
                            @input="setBlock"
                        >
                            <option selected disabled value="-1">{{ $t('Auth.BlockId.placeholder') }}</option>
                            <option v-for="Block in getBlocks" :value="Block.BlockId" :key="Block.BlockId">{{ Block.Name }}
                            </option>
                        </b-form-select>
                            <div v-if="$v.Form.BlockId.$dirty">
                                <b-form-invalid-feedback v-if="!$v.Form.BlockId.minValue" :state="$v.Form.BlockId.minValue">
                                    {{ $t('Auth.BlockId.minValue') }}
                                </b-form-invalid-feedback>
                            </div>
                    </b-form-group>
                    <b-form-group 
                        :label="$t('Auth.PossessionId.title')"
                        label-for="select3" 
                        v-if="IsRoom"
                        >
                        <b-form-select
                            id="select3"
                            v-model="Form.PossessionId"
                            :state="$v.Form.PossessionId.$dirty ? !$v.Form.PossessionId.$anyError : null"
                            @input="$v.Form.PossessionId.$touch()"
                        >
                            <option selected disabled value="-1">{{ $t('Auth.PossessionId.placeholder') }}</option>
                            <option v-for="Possession in getPossessions" :value="Possession.PossessionId" :key="Possession.PossessionId">{{ Possession.No }}
                            </option>
                        </b-form-select>
                            <div v-if="$v.Form.PossessionId.$dirty">
                                <b-form-invalid-feedback v-if="!$v.Form.PossessionId.minValue" :state="$v.Form.PossessionId.minValue">
                                    {{ $t('Auth.PossessionId.minValue') }}
                                </b-form-invalid-feedback>
                            </div>
                    </b-form-group>
                    
                    <b-form-group 
                        id="input-group-4" 
                        :label="$t('Auth.BeginDate.title')"
                        label-for="input-4" 
                        v-if="IsDated">
                        <b-form-input
                            id="input-4"
                            v-model="Form.BeginDate"
                            :placeholder="Form.BeginDate == null || Form.BeginDate == '' ? $t('Auth.BeginDate.placeholder') : ''" 
                            :state="$v.Form.BeginDate.$dirty ? !$v.Form.BeginDate.$anyError : null"
                            @blur="$v.Form.BeginDate.$touch()"
                            type="date" 
                        ></b-form-input>
                        <div v-if="$v.Form.BeginDate.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.BeginDate.required" :state="$v.Form.BeginDate.required">
                                {{ $t('Auth.BeginDate.required') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.BeginDate.dateMax" :state="$v.Form.BeginDate.dateMax">
                                {{ $t('Auth.BeginDate.dateMax') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.BeginDate.isBusy" :state="$v.Form.BeginDate.isBusy">
                                {{ $t('Auth.BeginDate.busyRoom') }}
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-41" 
                        :label="$t('Auth.EndDate.title')"
                        label-for="input-41" 
                        v-if="IsDated">
                        <b-form-input
                            id="input-41"
                            v-model="Form.EndDate"
                            :placeholder="Form.EndDate == null || Form.EndDate == '' ? $t('Auth.EndDate.placeholder') : ''" 
                            :state="$v.Form.EndDate.$dirty ? !$v.Form.EndDate.$anyError : null"
                            @blur="$v.Form.EndDate.$touch()"
                            type="date" 
                        ></b-form-input>
                        <div v-if="$v.Form.EndDate.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.EndDate.required" :state="$v.Form.EndDate.required">
                                {{ $t('Auth.EndDate.required') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.EndDate.dateMin" :state="$v.Form.EndDate.dateMin">
                                {{ $t('Auth.EndDate.dateMin') }}
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.EndDate.isBusy" :state="$v.Form.EndDate.isBusy">
                                {{ $t('Auth.EndDate.busyRoom') }}
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group>
                        <input class="approveCB-input" v-model="Form.IsApproved" type="checkbox" name="IsApproved" id="cbIsApproved">
                        <label class="approveCB-label" for="cbIsApproved">{{$t('Auth.IsApproved.title')}}</label>
                        <div v-if="$v.Form.IsApproved.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.IsApproved.checked" :state="$v.Form.IsApproved.checked">
                                {{ $t('Auth.IsApproved.checked') }}
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-button type="submit" variant="primary" class="rightFloat"> {{ $t('Auth.submit') }} </b-button>
                    <b-button type="reset" variant="warning" class="rightFloat"> {{ $t('Auth.reset') }} </b-button>
                    <b-button variant="danger" class="rightFloat" @click="onCancel"> {{ $t('Auth.cancel') }} </b-button>
                </b-form>
            </div>
        </div>
        <div class="footerAuth">
            <img src="../../../../images/logo/logoBlack.png" alt="Helis">
        </div>
    </div>
</template>
<script>
    import { mapGetters} from "vuex";
    import { required, email, minLength, sameAs, minValue, requiredIf } from "vuelidate/lib/validators"
    import axios from "axios"

    export default {
        data() {
            return {
                User: {
                    email: null,
                    password: null
                },
                IsUser: true,
                IsForgotten: false,
                IsNew: false,
                Form: {
                    UserName: '',
                    Password: '',
                    RePassword: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    Language: 'tr',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: 2,
                    MansionId: -1,
                    BlockId: -1,
                    PossessionId: -1,
                    BeginDate: null,
                    EndDate : null,
                    Info: '',
                    IsApproved: false,
                },
                IsBlocky: false,
                IsRoom: false,
                LoginError: '',
                IsError: false,
                IsDated: false,
                Lang: 'tr',
            }
        },
        created () {
            let locale = localStorage.getItem("Lang")
            if (locale != null) {
                this.Lang = locale
                this.Form.Language = this.Lang
                this.$store.dispatch("SetLocale", this.Lang)
            }
        },
        validations() {
            return {
                Form: {
                    UserName: {
                        required,
                        minLength: minLength (6),
                        isUnique(UserName) {
                            return UserName.length >= 6 ?
                                axios.get("User/CheckUserName?UserName=" + UserName)
                                    .then(response => { return response.data})
                                : true
                        }
                    },
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
                    Mail: {
                        required,
                        email,
                        isUnique(Mail) {
                            return Mail.length >= 6 ?
                                axios.get("User/CheckMail?Mail=" + Mail)
                                    .then(response => { return response.data})
                                : true
                        }
                    },
                    FirstName: {
                        required
                    },
                    LastName: {
                        required
                    },
                    MansionId: {
                        minValue: minValue (1)
                    },
                    BlockId: {
                        minValue: minValue(this.IsBlocky ? 1 : -1)
                    },
                    PossessionId: {
                        minValue: minValue (1)
                    },
                    BeginDate: {
                        required: requiredIf(function() {
                            return this.IsDated;
                        }),
                        dateMax(val, { EndDate }) {
                            return EndDate != null && val > EndDate ? false : true
                        },
                        isBusy(PossessionId, BeginDate, EndDate) {
                            return PossessionId > 0 && BeginDate != null && EndDate != null ?
                                axios.get("User/CheckBusy?PossessionId=" + PossessionId + "&BeginDate=" + BeginDate + "&EndDate=" + EndDate)
                                    .then(response => { return response.data})
                                : true
                        }
                    },
                    EndDate: {
                        required: requiredIf(function() {
                            return this.IsDated;
                        }),
                        dateMin(val, { BeginDate }) {
                            return BeginDate != null && val < BeginDate ? false : true
                        },
                        isBusy(PossessionId, BeginDate, EndDate) {
                            return PossessionId > 0 && BeginDate != null && EndDate != null ?
                                axios.get("User/CheckBusy?PossessionId=" + PossessionId + "&BeginDate=" + BeginDate + "&EndDate=" + EndDate)
                                    .then(response => { return response.data})
                                : true
                        }
                    },
                    IsApproved: {
                        checked (val) {
                            return val
                        }
                    },
                }
            }
        },
        computed: {
            ...mapGetters(["getMansions", "getPossessionStatus", "getBlocks", "getPossessions", "getPossessionsByBlock"]),
        },
        methods: {
            formatPhone() {
                let x = this.Form.PhoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                this.Form.PhoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            },
            setMansion() {
                this.$v.Form.MansionId.$touch()
                this.Form.BlockId = -1
                this.Form.PossessionId = -1
                this.$v.Form.BeginDate.$reset()
                this.$v.Form.EndDate.$reset()

                let Mansion = this.$store.getters.getMansions.find(x => x.MansionId == this.Form.MansionId)
                this.IsDated = Mansion.PossessionType == 4

                if (Mansion.IsBlocky) {
                    // this.ResetBlock()
                    this.IsBlocky = true
                    this.IsRoom = false
                    this.$store.dispatch("ListBlocksNS", this.Form.MansionId)
                    .then(() => {
                        this.$v.Form.BlockId.$reset()
                    })
                } else {
                    this.IsRoom = true
                    this.IsBlocky = false
                    this.$store.dispatch("ListPossessionsNS", { MansionId: this.Form.MansionId })
                    .then(() => {
                        this.$v.Form.PossessionId.$reset()
                    })
                }
            },
            setBlock() {
                this.$v.Form.BlockId.$touch()
                this.Form.PossessionId = -1
                this.IsRoom = true
                this.$store.dispatch("ListPossessionsNS", { MansionId: this.Form.MansionId, BlockId: this.Form.BlockId })
                    .then(() => {
                        this.$v.Form.PossessionId.$reset()
                    })
            },
            onReset() {
                this.IsBlocky = false
                this.IsRoom = false
                this.IsError = false
                this.IsDated = false
                this.Form = {
                    UserName: '',
                    Password: '',
                    RePassword: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    Language: 'tr',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: 2,
                    MansionId: -1,
                    BlockId: -1,
                    PossessionId: -1,
                    BeginDate: null,
                    EndDate : null,
                    Info: '',
                    IsApproved: false,
                }
                this.User = {
                    email: null,
                    password: null
                }
                this.$v.Form.$reset()
            },
            onSubmit() {
                if (this.IsNew) {
                    this.$v.Form.$touch()

                    if (this.$v.Form.$anyError) {
                        // Sorgu
                        JSON.stringify(this.$v.Form.$model);
                    } else {
                        // alert(JSON.stringify(this.Form))
                        this.Form.PhoneNumber = this.Form.PhoneNumber.replace(/\D/g,'')
                        this.$store.dispatch("Register", { ...this.Form })
                            .then(() => {
                                    this.User.email = this.Form.Mail
                                    this.User.password = this.Form.Password
                                    this.IsNew = false
                                    this.onSubmit()
                                }
                            )
                    }

                } else {
                    this.$store.dispatch("login", { ...this.User, IsUser : this.IsUser, IsForgotten : this.IsForgotten })
                        .then(data => {
                            if (data.UserId > 0) {
                                
                                this.$store.dispatch("initAuth")
                            } else {
                                this.IsError = true
                                this.LoginError = this.$t(`ErrorMsg.${data.ErrorCode}`)
                            }
                        })
                }
            },
            onCancel() {
                this.onReset()
                this.IsNew = !this.IsNew
            },
            setLanguage() {
                // this.$i18n.locale = this.Form.Language
                this.Form.Language = this.Lang
                this.$store.dispatch("SetLocale", this.Lang)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        &-submit {
            background-color: #D6B761;
            border-color: #D6B761;
            color: #fff !important;
            font-size: 40px;
            height: 100px;
        }
        &-forget {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff !important;
            font-size: 40px;
            height: 100px;
        }
        & > * {
            color: #fff !important;
            font-size: 40px;
            height: 100px;
        }
        
        color: #fff !important;
        font-size: 40px;
        height: 100px;
    }
    .container {
        margin: auto;
        max-width: 90%;
        min-height: calc(100vh - 100px);
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

    .card-primary {
        padding: 15px;
    }

    .loginErSpan {
        color: red;
        font-size: 40px;
        text-align: center;
    }

    .loginLang {
        display: inline-flex;
        height: 120px;
        width: 100%;

        &-cb
         {
            display: none;

            &:checked + label {
                border-color: #e0e0e0;
                background: #e0e0e0;
            }
        }

        span {
            font-size: 80px;
        }

        label {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            margin: 0 10px;
            border: 2px solid lightgrey;
            transition: all 0.3s ease;
        }
    }

    .loginForm {
        margin-top: 200px;

        &-group {
            margin-bottom: 50px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
    }

    .button-container {
        
            display: flex;
            flex-direction: column;
            gap: 15px;
    }

    .approveCB {
        &-input {
            width: 50px;
            height: 50px;
        }
        &-label {
            margin-left: 15px;
            text-decoration: underline;
            vertical-align: top;
        }
    }

    .authMain {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
</style>
