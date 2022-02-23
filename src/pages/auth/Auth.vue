<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-12 card card-primary "
                 :class="{'border-primary' : isUser, 'border-success' : !isUser }">
                <!-- <h3
                        :class="{'text-primary' : isUser, 'text-success' : !isUser }"
                        class="text-center mb-3 mt-3">Helis Giriş</h3>

                <img class="img-fluid" alt="logo" src="../../assets/helisLogo.png"/> -->
                <hr>
                <div v-if="!isNew">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label>E-posta Adresiniz</label>
                            <input v-model="User.email" type="email" class="form-control"
                                placeholder="E-posta adresinizi giriniz"
                                style="font-size: xx-large; height: auto">
                        </div>
                        <div class="form-group" :style="{visibility: !isForgotten ? 'visible' : 'hidden'}">
                            <label>Şifre</label>
                            <input v-model="User.password" type="password" class="form-control" placeholder="Şifreniz..."
                                style="font-size: xx-large; height: auto">
                        </div>
                        <div class="button-container d-flex  flex-column align-items-center">
                            <!-- <button type="submit" :class="{'btn-primary' : isUser, 'btn-success' : !isUser }"
                                    class="btn btn-block mb-2">
                                {{ isUser ? 'Giriş Yap' : 'Kayıt Ol' }}
                            </button> -->
                            <button type="submit" :class="{'button-yellow' : !isForgotten, 'button-blue' : isForgotten }"
                                    class="btn btn-block mb-2">
                                {{ !isForgotten ? 'Giriş Yap' : 'Mail Sıfırla' }}
                            </button>
                            <span class="loginErSpan" v-show="IsError">
                                {{ LoginError }}
                            </span>
                            <a href="#" @click.prevent="isUser=!isUser" class="text-secondary" style="display: none">
                                {{ isUser ? 'Üye değilim' : 'Üyeliğim var'}}
                            </a>
                            <a href="#" @click.prevent="isForgotten=!isForgotten" class="text-secondary">
                                {{ isForgotten ? 'Parolamı Hatırlıyorum' : 'Parolamı Unuttum'}}
                            </a>
                            <a href="#" @click.prevent="onCancel" class="text-secondary">
                                Kayıt Olunuz
                            </a>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <b-form @submit.prevent="onSubmit" @reset="onReset">
                        <b-form-group
                            id="input-group-1"
                            label="Kullanıcı Adı:"
                            label-for="input-1">
                            <b-form-input
                                id="input-1"
                                v-model.lazy="Form.UserName"
                                placeholder="Kullanıcı Adı Giriniz"
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
                            label-for="input-11"
                        >
                            <b-form-input
                                id="input-11"
                                v-model.lazy="Form.Mail"
                                type="email"
                                placeholder="Mail Giriniz"
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

                        <b-form-group id="input-group-21" label="Parola:" label-for="input-21">
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

                        <b-form-group id="input-group-2" label="Ad:" label-for="input-2">
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

                        <b-form-group id="input-group-3" label="Soyad:" label-for="input-3">
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

                        <b-form-group label="Hotel:" label-for="select1">
                            <b-form-select
                                id="select1"
                                v-model="Form.MansionId"
                                :state="$v.Form.MansionId.$dirty ? !$v.Form.MansionId.$anyError : null"
                                @input="setMansion"
                            >
                                <option selected disabled value="-1">Lütfen Hotel Seçiniz</option>
                                <option v-for="Mansion in getMansions" :value="Mansion.MansionId" :key="Mansion.MansionId">{{ Mansion.Name }}
                                </option>
                            </b-form-select>
                                <div v-if="$v.Form.MansionId.$dirty">
                                    <b-form-invalid-feedback v-if="!$v.Form.MansionId.minValue" :state="$v.Form.MansionId.minValue">
                                        Lütfen Otel Seçiniz
                                    </b-form-invalid-feedback>
                                </div>
                        </b-form-group>

                        <b-form-group label="Block:" label-for="select2" v-if="IsBlocky" >
                            <b-form-select
                                id="select2"
                                v-model="Form.BlockId"
                                :state="$v.Form.BlockId.$dirty ? !$v.Form.BlockId.$anyError : null"
                                @input="setBlock"
                            >
                                <option selected disabled value="-1">Lütfen Blok Seçiniz</option>
                                <option v-for="Block in getBlocks" :value="Block.BlockId" :key="Block.BlockId">{{ Block.Name }}
                                </option>
                            </b-form-select>
                                <div v-if="$v.Form.BlockId.$dirty">
                                    <b-form-invalid-feedback v-if="!$v.Form.BlockId.minValue" :state="$v.Form.BlockId.minValue">
                                        Lütfen Blok Seçiniz
                                    </b-form-invalid-feedback>
                                </div>
                        </b-form-group>

                        <b-form-group label="Oda:" label-for="select3" v-if="IsRoom">
                            <b-form-select
                                id="select3"
                                v-model="Form.PossessionId"
                                :state="$v.Form.PossessionId.$dirty ? !$v.Form.PossessionId.$anyError : null"
                                @input="$v.Form.PossessionId.$touch()"
                            >
                                <option selected disabled value="-1">Lütfen Oda No Seçiniz</option>
                                <option v-for="Possession in getPossessions" :value="Possession.PossessionId" :key="Possession.PossessionId">{{ Possession.No }}
                                </option>
                            </b-form-select>
                                <div v-if="$v.Form.PossessionId.$dirty">
                                    <b-form-invalid-feedback v-if="!$v.Form.PossessionId.minValue" :state="$v.Form.PossessionId.minValue">
                                        Lütfen Oda No Seçiniz
                                    </b-form-invalid-feedback>
                                </div>
                        </b-form-group>

                        
                        
                        <b-form-group id="input-group-4" label="Giriş Tarihi:" label-for="input-4">
                            <b-form-input
                                id="input-4"
                                v-model="Form.BeginDate"
                                placeholder="Lütfen Giriş Tarihi Seçiniz"
                                :state="$v.Form.BeginDate.$dirty ? !$v.Form.BeginDate.$anyError : null"
                                @blur="$v.Form.BeginDate.$touch()"
                                type="date" 
                            ></b-form-input>
                            <div v-if="$v.Form.BeginDate.$dirty">
                                <b-form-invalid-feedback :state="$v.Form.BeginDate.required">
                                    Lütfen Giriş Tarihi Seçiniz
                                </b-form-invalid-feedback>
                            </div>
                        </b-form-group>


                        <b-form-group id="input-group-41" label="Çıkış Tarihi:" label-for="input-41">
                            <b-form-input
                                id="input-41"
                                v-model="Form.EndDate"
                                placeholder="Lütfen Çıkış Tarihi Seçiniz"
                                :state="$v.Form.EndDate.$dirty ? !$v.Form.EndDate.$anyError : null"
                                @blur="$v.Form.EndDate.$touch()"
                                type="date" 
                            ></b-form-input>
                            <div v-if="$v.Form.EndDate.$dirty">
                                <b-form-invalid-feedback :state="$v.Form.EndDate.required">
                                    Lütfen Çıkış Tarihi Seçiniz
                                </b-form-invalid-feedback>
                            </div>
                        </b-form-group>

                        <b-button type="submit" variant="primary" style="margin-right: 5px;">Gönder</b-button>
                        <b-button type="reset" variant="warning" style="margin-right: 5px;">Temizle</b-button>
                        <b-button variant="danger" style="margin-right: 5px;" @click="onCancel">İptal</b-button>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import {required, email, minLength, minValue } from "vuelidate/lib/validators"
    import axios from "axios"

    export default {
        data() {
            return {
                User: {
                    email: null,
                    password: null
                },
                isUser: true,
                isForgotten: false,
                isNew: false,
                Form: {
                    UserName: '',
                    Password: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
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
                        required
                    },
                    EndDate: {
                        required
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

                let Mansion = this.$store.getters.getMansions.find(x => x.MansionId == this.Form.MansionId)

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
                this.Form = {
                    UserName: '',
                    Password: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
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
                if (this.isNew) {
                    this.$v.Form.$touch()

                    if (this.$v.Form.$anyError) {
                        // Sorgu
                        JSON.stringify(this.$v.Form.$model);
                    } else {
                        // alert(JSON.stringify(this.Form))
                        this.Form.PhoneNumber = this.Form.PhoneNumber.replace(/\D/g,'')
                        this.$store.dispatch("Register", { ...this.Form })
                            .then(() =>{
                                    this.User.email = this.Form.Mail
                                    this.User.password = this.Form.Password
                                    this.isNew = false
                                    this.onSubmit()
                                }
                            )
                    }

                } else {
                    this.$store.dispatch("login", { ...this.User, isUser : this.isUser, isForgotten : this.isForgotten })
                        .then(data => {
                            if (data.UserId > 0) {
                                
                                this.$store.dispatch("initAuth")
                            } else {
                                this.IsError = true
                                this.LoginError = data.Session
                            }
                        })
                }
            },
            onCancel() {
                this.onReset()
                this.isNew = !this.isNew
            }
        }
    }
</script>

<style scoped>
    .button-submit {
        color: #fff;
        background-color: #D6B761;
        border-color: #D6B761;
    }
    .button-forget {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }
    .container {
        margin: auto;
        max-width: 90%;
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

    .card-primary {
        padding: 15px;
    }

    .loginErSpan {
        color: red;
        font-size: xx-large;
        text-align: center;
    }
</style>
