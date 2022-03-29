<template>
    <div class="container">
            <div v-if="isNew || isEdit">
                <b-form @submit.prevent="onSubmit" @reset="onReset" class="formNew">
                    <b-form-group label="Dil:">
                        <b-form-radio-group v-model="Form.Language" buttons button-variant="outline-info" size="lg" @input="setLanguage">
                            <b-form-radio size="xl" name="Lang" value="tr"><flag iso="tr" /></b-form-radio>
                            <b-form-radio size="xl" name="Lang" value="en"><flag iso="gb" /></b-form-radio>
                        </b-form-radio-group>
                    </b-form-group>

                    <b-form-group
                        id="input-group-1"
                        label="Kullanıcı Adı:"
                        label-for="input-1">
                        <b-form-input
                            id="input-1"
                            v-model.lazy="Form.UserName"
                            placeholder="Kullanıcı Adı Giriniz"
                            :disabled="!isNew"
                            :state="$v.Form.UserName.$dirty ? !$v.Form.UserName.$anyError : null"
                            @blur="$v.Form.UserName.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.UserName.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.UserName.required" :state="$v.Form.UserName.required">
                                Lütfen Kullanıcı Adı Giriniz
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.UserName.minLength" :state="$v.Form.UserName.minLength">
                                Kullanıcı Adı en az 6 karakterden oluşmaktadır
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.UserName.isUnique" :state="$v.Form.UserName.isUnique">
                                Kullanıcı Adı Kullanılmaktadır
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group
                        id="input-group-11"
                        label="Mail:"
                        label-for="input-11">
                        <b-form-input
                            id="input-11"
                            v-model.lazy="Form.Mail"
                            type="email"
                            placeholder="Mail Giriniz"
                            :disabled="!isNew"
                            :state="$v.Form.Mail.$dirty ? !$v.Form.Mail.$anyError : null"
                            @blur="$v.Form.Mail.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.Mail.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.Mail.required" :state="$v.Form.Mail.required">
                                Lütfen Mail Adresi Giriniz
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.Mail.email" :state="$v.Form.Mail.email">
                                Lütfen Mail Adresini Doğru Formatta Giriniz
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.Mail.isUnique" :state="$v.Form.Mail.isUnique">
                                Mail Adresi Kullanılmaktadır
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-21" 
                        label="Parola:" 
                        label-for="input-21">
                        <b-form-input
                            id="input-21"
                            type="password"
                            v-model="Form.Password"
                            placeholder="Parola Giriniz"
                            :state="$v.Form.Password.$dirty ? !$v.Form.Password.$anyError : null"
                            @blur="$v.Form.Password.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.Password.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.Password.required" :state="$v.Form.Password.required">
                                Lütfen Parola Giriniz
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.Password.minLength" :state="$v.Form.Password.minLength">
                                Parolanız en az 6 karakterden oluşmalıdır
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-22" 
                        label="Parola:" 
                        label-for="input-22">
                        <b-form-input
                            id="input-22"
                            type="password"
                            v-model="Form.RePassword"
                            placeholder="Parola Giriniz"
                            :state="$v.Form.RePassword.$dirty ? !$v.Form.RePassword.$anyError : null"
                            @blur="$v.Form.RePassword.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.RePassword.$dirty">
                            <b-form-invalid-feedback v-if="!$v.Form.RePassword.required" :state="$v.Form.RePassword.required">
                                Lütfen Parola Giriniz
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.RePassword.minLength" :state="$v.Form.RePassword.minLength">
                                Parolanız en az 6 karakterden oluşmalıdır
                            </b-form-invalid-feedback>
                            <b-form-invalid-feedback v-else-if="!$v.Form.RePassword.sameAs" :state="$v.Form.RePassword.sameAs">
                                Parolalar birbiriyle uyuşmuyor
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>
                    
                    <b-form-group 
                        id="input-group-2" 
                        label="Ad:" 
                        label-for="input-2">
                        <b-form-input
                            id="input-2"
                            v-model="Form.FirstName"
                            placeholder="Ad Giriniz"
                            :state="$v.Form.FirstName.$dirty ? !$v.Form.FirstName.$anyError : null"
                            @blur="$v.Form.FirstName.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.FirstName.$dirty">
                            <b-form-invalid-feedback :state="$v.Form.FirstName.required">
                                Lütfen Ad Giriniz
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-3" 
                        label="Soyad:" 
                        label-for="input-3">
                        <b-form-input
                            id="input-3"
                            v-model="Form.LastName"
                            placeholder="Soyad Giriniz"
                            :state="$v.Form.LastName.$dirty ? !$v.Form.LastName.$anyError : null"
                            @blur="$v.Form.LastName.$touch()"
                        ></b-form-input>
                        <div v-if="$v.Form.LastName.$dirty">
                            <b-form-invalid-feedback :state="$v.Form.LastName.required">
                                Lütfen Soyad Giriniz
                            </b-form-invalid-feedback>
                        </div>
                    </b-form-group>

                    <b-form-group id="input-group-31" label="Telefon:" label-for="input-31">
                        <b-form-input
                            id="input-31"
                            type="text"
                            v-model="Form.PhoneNumber"
                            @change="formatPhone"
                            placeholder="Telefon Giriniz"
                        ></b-form-input>
                    </b-form-group>
                    
                    <b-button type="submit" variant="primary" class="rightFloat">Gönder</b-button>
                    <b-button type="reset" variant="warning" class="rightFloat" v-if="isNew">Temizle</b-button>
                    <b-button variant="danger" class="rightFloat" @click="onCancel">İptal</b-button>
                </b-form>
            </div>
            <div v-else>
                <b-table striped hover :items="getSecondary" :fields="fields" show-empty>
                    <template #head(Details)="data">
                        <span>{{ data.label }}</span>
                        <b-button 
                            class="editButton mr-2" 
                            variant="success"
                            title="Yeni Kullanıcı Ekle"
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
                            Kayıt Bulunamadı
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
                    { key: 'FullName', label: 'Kullanıcı' },
                    { key: 'Details', label: 'İşlem' }, 
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
        font-size: xx-large;
        margin-left: 10px;
        padding: 5px;
        border-radius: 50%;
        height: 70px;
        width: 70px;
    }
    .formNew {
        font-size: xx-large;
        width: 90%;
        margin: 20px auto;
    }
    .form-control, .custom-select {
        height: calc(4.25rem + 2px);
        font-size: xx-large;
        display: flex;
    }
    .btn {
        font-size: xx-large;
        margin: 10px;
    }
</style>