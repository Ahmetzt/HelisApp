<template>
    <div class="container">

        <b-form @submit.prevent="onSubmit" class="formNew">
            <b-form-group
                id="input-group-1"
                label="Kullanıcı Adı:"
                label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model.lazy="Form.UserName"
                    placeholder="Kullanıcı Adı Giriniz"
                    disabled
                ></b-form-input>
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
                    disabled
                ></b-form-input>
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
            
            <b-button type="submit" variant="primary" style="margin-right: 5px;">Gönder</b-button>
        </b-form>
    </div>
</template>

<script>
    import { mapGetters} from "vuex";
    import { required,  minLength } from "vuelidate/lib/validators"

    export default {
        data() {
            return {
                Form: {
                    UserName: '',
                    Password: '',
                    Mail: '',
                    FirstName: '',
                    LastName: '',
                    DateOfBirth: null,
                    Address: '',
                    PhoneNumber: '',
                    RoleId: -1
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
                        this.Form.FirstName     = data.FirstName
                        this.Form.LastName      = data.LastName
                        this.Form.DateOfBirth   = data.DateOfBirth
                        this.Form.PhoneNumber   = data.PhoneNumber
                        this.Form.RoleId        = data.RoleId
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
        font-size: xx-large;
        display: flex;
    }
    .btn {
        font-size: xx-large;
        margin: 10px;
    }
</style>