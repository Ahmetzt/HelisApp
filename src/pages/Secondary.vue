<template>
    <div class="container">
            <div v-if="isNew || isEdit">
                <b-form @submit.prevent="onSubmit" @reset="onReset" class="formNew">
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
                            :disabled="!isNew"
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
                        id="input-group-11"
                        :label="$t('Auth.Mail.title')"
                        label-for="input-11">
                        <b-form-input
                            id="input-11"
                            v-model.lazy="Form.Mail"
                            type="email"
                            :placeholder="$t('Auth.Mail.placeholder')"
                            :disabled="!isNew"
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
                    
                    <b-button type="submit" variant="primary" class="rightFloat"> {{ $t('Auth.submit') }} </b-button>
                    <b-button type="reset" variant="warning" class="rightFloat" v-if="isNew"> {{ $t('Auth.reset') }} </b-button>
                    <b-button variant="danger" class="rightFloat" @click="onCancel"> {{ $t('Auth.cancel') }} </b-button>
                </b-form>
            </div>
            <div v-else>
                <b-table striped hover :items="getSecondary" :fields="fields" show-empty>
                    <template #head()="scope">
                        <div class="text-nowrap">
                            {{ $t(`Auth.Secondary.${scope.label}`) }} 
                        </div>
                    </template>
                    
                    <template #head(Details)="data">
                        <span>{{ data.label }}</span>
                        <b-button 
                            class="editButton mr-2" 
                            variant="success"
                            :title="$t('Auth.newUser')"
                            @click="newUser()">
                            <i class="fa fa-user-plus"></i>
                        </b-button>
                    </template>

                    <template #cell(index)="data">
                        {{ data.index + 1 }}
                    </template>

                    <template #cell(Details)="row">
                        <b-button variant="info" class="editButton" @click="updateUser(row.item, row.index, $event.target)">
                            <i class="fa fa-user-edit"></i>
                        </b-button>
                    </template>

                    <template #empty="">
                        <div class="emptyRecords">
                            {{ $t('Auth.noRecords') }}
                        </div>
                    </template>
                </b-table>
            </div>
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    import { required, email, minLength, sameAs } from "vuelidate/lib/validators"
    import axios from "axios"
    import {eventBus} from "../main"

    export default {
        data() {
            return {
                fields: [ 
                    'index',
                    { key: 'FullName', label: 'User' },
                    { key: 'Details', label: 'Details' }, 
                ],
                isNew: false,
                isEdit: false,
                Form: {
                    UserId: -1,
                    UserName: '',
                    Password: '',
                    RePassword: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: 3,
                    Language: 'tr',
                },
            }
        },
        validations() {
            return {
                Form: {
                    UserName: {
                        required,
                        minLength: minLength (6),
                        isUnique(UserName) {
                            return UserName.length >= 6 && this.isNew ?
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
                            return Mail.length >= 6 && this.isNew ?
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
                }
            }
        },
        created(){
            this.secondaryList()
            eventBus.$on('returnBack', () => {
                this.isEdit = false
                this.isNew = false
                eventBus.$emit('updateHeaderText', this.$t('pages.secondary'))
            })
        },
        destroyed() {
            eventBus.$off('returnBack');
        },
        computed: {
            ...mapGetters(["getSecondary"]),
        },
        methods: {
            secondaryList() {
                this.$store.dispatch("ListSecondary")
            },
            formatPhone() {
                let x = this.Form.PhoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                this.Form.PhoneNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            },
            onReset() {
                this.Form = {
                    UserId: -1,
                    UserName: '',
                    Password: '',
                    RePassword: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: 3,
                    Language: localStorage.Lang,
                }
                this.$v.Form.$reset()
            },
            onSubmit() {
                this.$v.Form.$touch()

                if (this.$v.Form.$anyError) {
                    // Sorgu
                    JSON.stringify(this.$v.Form.$model);
                } else {
                    if (this.isNew) {
                        this.Form.PhoneNumber = this.Form.PhoneNumber.replace(/\D/g,'')
                        this.$store.dispatch("RegisterSecondary", { ...this.Form })
                            .then(() =>{
                                    this.isNew=false
                                    this.secondaryList()
                                    this.onReset()
                                }
                            )
                    } else {
                        this.Form.PhoneNumber = this.Form.PhoneNumber.replace(/\D/g,'')
                        this.$store.dispatch("UpdateSecondary", { ...this.Form })
                            .then(() =>{
                                    this.isEdit = false
                                    this.secondaryList()
                                    this.onReset()
                                }
                            )
                    }
                }

            },
            onCancel() {
                this.onReset()
                this.isNew = false
                this.isEdit = false
                eventBus.$emit('updateHeaderText', this.$t('pages.secondary'))
                eventBus.$emit('unsubmitPage')
            },
            newUser() {
                this.onReset()
                this.isNew = true
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', this.$t('pages.newUser'))
            },
            updateUser(User) {
                this.Form.UserId = User.UserId
                this.Form.UserName = User.UserName
                this.Form.Mail = User.Mail
                this.Form.Password = User.Password
                this.Form.RePassword = User.Password
                this.Form.FirstName = User.FirstName
                this.Form.LastName = User.LastName
                this.Form.DateOfBirth = User.DateOfBirth
                this.Form.PhoneNumber = User.PhoneNumber
                this.Form.Language = User.Language
                this.isEdit = true
                eventBus.$emit('submitPage')
                eventBus.$emit('updateHeaderText', User.UserName)
            },
            setLanguage() {
                console.log(this.Form.Language)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .emptyRecords {
        text-align: center;
        font-weight: 900;
    }
    .editButton {
        font-size: 40px;
        margin-left: 10px;
        padding: 5px;
        border-radius: 50%;
        height: 70px;
        width: 70px;
    }
    .formNew {
        font-size: 40px;
        width: 90%;
        margin: 20px auto;
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
</style>