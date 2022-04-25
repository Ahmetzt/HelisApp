<template>
    <div class="container">
        <div class="PropertyInfo">
            <span class="PropertyInfo-Span" v-show="PropertyInfo.Mansion != ''"> <b>{{ $t('Property.Info.Hotel') }}:</b> {{ PropertyInfo.Mansion }} </span>
            <span class="PropertyInfo-Span" v-show="PropertyInfo.Block != ''"> <b>{{ $t('Property.Info.Block') }}:</b> {{ PropertyInfo.Block }} </span>
            <span class="PropertyInfo-Span" v-show="PropertyInfo.No != ''"> <b>{{ $t('Property.Info.No') }}:</b> {{ PropertyInfo.No }} </span>
            <span class="PropertyInfo-Span" v-show="PropertyInfo.Info != ''"> <b>{{ $t('Property.Info.Info') }}:</b> {{ PropertyInfo.Info }} </span>
            <div class="PropertyInfo-CB">
                <input class="PropertyInfo-CB-input" v-model="IsRentable" type="checkbox" name="Rentable" id="cbRentable" @change="SetPossessionType">
                <label class="PropertyInfo-CB-label" for="cbRentable">{{ $t('Property.Info.Rentable') }}</label>
            </div>
        </div>

        <div class="Rentable">
            <div class="Rentable-New" v-if="IsRentable">
                <button class="Rentable-New-Button btn btn-success" v-if="RentableBegin == 1" @click="RentableBegin = 2">
                    {{ $t('Property.Rent.NewRentable') }}
                </button>
                <div class="Rentable-New-Form" v-else-if="RentableBegin == 2">
                    <div class="Rentable-New-Form-Unused">
                        <v-date-picker
                            v-model="SelectedDates"
                            range
                            locale="tr-tr"
                            :first-day-of-week="1"
                            dark
                            flat
                            no-title>
                            <v-btn
                                text
                                color="primary"
                                @click="AddDates"
                                :disabled="IsContinue"
                            >{{ $t('Property.Rent.Add') }}</v-btn>
                        </v-date-picker>

                        <div class="Rentable-New-Form-Unused-List" v-show="NotPermittedDates.length > 0">
                            <span class="Rentable-New-Form-Unused-List-Header">{{ $t('Property.Rent.NoUsedDays') }}</span>
                            <div class="Rentable-New-Form-Unused-List-Content">
                                <div class="Rentable-New-Form-Unused-List-Content-Row" v-for="(date, index) in NotPermittedDates" :key="date.id">
                                    <span> {{ date.BeginDate | formatDate }} - {{ date.EndDate | formatDate }} </span>
                                    <button class="Rentable-New-Form-Unused-List-Content-Row-Button" @click="RemoveDates(index)"> <i class="fas fa-times"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                    <div class="Rentable-New-Form-Approve">
                        <input class="Rentable-New-Form-Approve-input" v-model="IsContinue" type="checkbox" name="WholeYear" id="cbWholeYear" @change="ClearDates">
                        <label class="Rentable-New-Form-Approve-label" for="cbWholeYear">{{ $t('Property.Rent.RentWholeYear') }}</label>
                    </div>
                    
                    <button class="Rentable-New-Form-Button btn btn-success" :disabled="!IsContinue && NotPermittedDates.length == 0" @click="RentableBegin = 3">
                        {{ $t('Property.Rent.Continue') }}
                    </button>
                </div>
                <div class="Rentable-New-Form" v-else-if="RentableBegin == 3">
                    <div class="Rentable-New-Form-Approve">
                        <input class="Rentable-New-Form-Approve-input" v-model="IsApproved" type="checkbox" name="Approved" id="cbApproved">
                        <label class="Rentable-New-Form-Approve-label" for="cbApproved">{{ $t('Property.Rent.ApproveRent') }}</label>
                    </div>
                    
                    <button class="Rentable-New-Form-Button btn btn-success" :disabled="!IsApproved" @click="ApproveRentable">
                        {{ $t('Property.Rent.Send') }}
                    </button>
                </div>
                <div class="Rentable-New-Result" v-else>
                    {{ $t('Property.Rent.ApproveSent') }}
                </div>
            </div>
            <div class="Rentable-Status" v-else>
                <span class="Rentable-Status-Info">
                    {{ getRentableStatus }}
                </span>
                <div class="Rentable-Status-RequestTime">
                    {{ $t('Property.Rent.RequestDate') }}: {{ RentableInfo.RequestTime | formatDate }}
                </div>
                <div class="Rentable-Status-LastUpdate">
                    {{ $t('Property.Rent.Finishing') }}: {{ RentableInfo.LastUpdate | formatDateTime }}
                </div>
                <div class="Rentable-Status-TimeList" v-show="RentableInfo.TimeList">
                    <hr>
                    <span class="Rentable-Status-TimeList-Header">
                        {{ $t('Property.Rent.NoDates') }}
                    </span>
                    <span v-for="date in RentableInfo.TimeList" :key="date.id">
                        {{ date.BeginDate | formatDate }} - {{ date.EndDate | formatDate }}
                    </span>
                </div>
            </div>
        </div>

        <div class="BookingHistory" v-show="BookingHistory.length > 0">
            <span class="BookingHistory-header">
                {{ $t('Property.Rent.RentHistory') }}
            </span>
            
            <b-table class="BookingHistory-table" striped hover :items="BookingHistory" :fields="BookingFields">
                <template #head()="scope">
                    <div class="text-nowrap">
                        {{ $t(`Property.Rent.${scope.label}`) }} 
                    </div>
                </template>
                <template #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    // import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                PropertyInfo: [],
                RentableInfo: [],
                BookingHistory: [],
                BookingFields: [ 
                    { key: 'index', label: 'Index' },
                    { key: 'User', label: 'User' },
                    { key: 'DateSpan', label: 'DateSpan', 
                        formatter: (value, key, item) => {
                            var bd = new Date(item.BeginDate)
                            var ed = new Date(item.EndDate)

                            return bd.toLocaleDateString() + ' - ' + ed.toLocaleDateString()
                        } 
                    }, 
                ],
                IsRentable: false,
                RentableBegin: 1,
                SelectedDates: [],
                NotPermittedDates: [],
                IsApproved: false,
                IsContinue: false,
                NewRentable: {
                    Year: 2022,
                    Info: '',
                    TimeList: '',
                }
            }
        },
        filters: {
            formatDate: function (value){
                let d = new Date(value)
                return d.toLocaleDateString()
            },
            formatDateTime: function (value){
                let d = new Date(value)
                return d.toLocaleString()
            },
        },
        created(){
            this.GetPropertyInfo()
            this.GetBookingHistory()
        },
        computed: {
            getRentableStatus() {
                return this.RentableInfo.length == 0 ? '' : this.$store.getters.getRentableStatusNameById(this.RentableInfo.RequestStatus);
            },
        },
        methods: {
            GetPropertyInfo() {
                this.$store.dispatch("GetPropertyInfo")
                    .then(data =>{
                        this.PropertyInfo = data
                        this.IsRentable = this.PropertyInfo.PossessionType == 1

                        if (!this.IsRentable) {
                            this.GetRentableInfo()
                        }
                    })
            },
            GetBookingHistory() {
                this.$store.dispatch("GetBookingHistory")
                    .then(data =>{
                        this.BookingHistory = data
                        console.log(this.BookingHistory)
                    })
            },
            GetRentableInfo() {
                this.$store.dispatch("GetRentableInfo")
                    .then(data =>{
                        this.RentableInfo = data
                    })
            },
            SetPossessionType() {
                // this.IsRentable = !this.IsRentable
                this.$store.dispatch("SetPossessionType", (this.IsRentable ? 1 : 2))
                    .then(() => {
                        this.GetPropertyInfo()
                    })
            },
            AddDates() {
                if (this.SelectedDates.length < 2) {
                    console.log("Tarih Aralığı seçiniz")
                } else {
                    let d1 = new Date(this.SelectedDates[0])
                    let d2 = new Date(this.SelectedDates[1])

                    if (d1 > d2) {
                        let hold = d1
                        d1 = d2
                        d2 = hold
                    }

                    d1 = d1.toISOString().substr(0, 10)
                    d2 = d2.toISOString().substr(0, 10)
                    this.NotPermittedDates.push({ BeginDate: d1, EndDate: d2, Info: '' })

                    console.log(this.NotPermittedDates)
                    this.NewRentable.TimeList = JSON.stringify(this.NotPermittedDates)
                }
                this.SelectedDates = []
            },
            RemoveDates(n) {
                this.NotPermittedDates.splice(n, 1)
            },
            ClearDates() {
                this.NotPermittedDates = []
            },
            ApproveRentable() {
                this.RentableBegin = 3
                this.$store.dispatch("SetRentable", { ...this.NewRentable } )
                    .then(() => {
                        this.GetPropertyInfo()
                        
                        setTimeout(() => {
                            this.GetPropertyInfo()
                        }, 5000);
                    })
            },
        }
    }
</script>

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        gap: 50px;
        width: 80%;
    }

    .PropertyInfo {
        margin-top: 40px;
        padding: 30px 50px;
        display: flex;
        flex-direction: column;
        background-color: white;
        gap: 20px;

        &-CB {
            display: flex;
            flex-direction: row;
            gap: 10px;
            margin-top: 10px;
            justify-content: center;
            align-items: center;
            display: none;

            &-input {
                width: 25px;
                height: 25px;
            }

            &-label {
                margin: 0;
            }
        }
    }

    .BookingHistory {
        width: 100%;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 30px 0px 0px;
        background-color: white;

        &-header {
            font-weight: 900;
            font-size: 40px;
        }

        &-table {
            margin: 0;
        }
    }

    .Rentable {
        padding: 30px 50px;
        display: flex;
        flex-direction: column;
        background-color: white;

        &-New {
            font-size: 40px;
            width: 100%;
            display: flex;
            justify-content: center;

            & > * {
                font-size: 40px;
            }
            &-Button {
                border-radius: 10px;
                height: 75px;
            }
            &-Form {
                justify-content: center;
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 50px;

                & > * {
                    font-size: 40px !important;
                }

                &-Unused {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 20px;

                    &-List {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                        
                        &-Header {
                            font-weight: 900;
                        }

                        &-Content {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;

                            &-Row {
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                margin: 0 20px;

                                &-Button {
                                    color: #ff0000;
                                }
                            }
                        }
                    }
                }

                &-Approve {
                    align-self: center;
                    display: flex;
           
                    &-label {
                        margin: -15px 0 0 10px;
                    }

                    &-input {
                        width: 45px;
                        height: 45px;
                    }
                }

                &-Button {
                    border-radius: 10px;
                    height: 75px;
                }
            }
            &-Result {
                font-weight: 900;
            }
        }
        &-Status {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 20px;
            
            & > * {
                font-size: 40px;
            }
            &-Info {
                font-weight: 900;
            }
            &-RequestTime {

            }
            &-LastUpdate {

            }
            &-TimeList {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 10px;

                &-Header {
                    font-weight: 900;
                }
            }
        }
    }

    .v-picker {
        font-size: 40px !important;

        th, &__title__btn {
            font-size: 40px !important;
        }

        &__body {
            width: 100% !important;
        }
    }

    .v-date-picker {
            font-size: 40px;

        &-table {
            height: 100% !important;
            .v-btn {
                font-size: 40px !important;
            }
            tbody {
                tr {
                    height: 90px;
                }
            }
        }
        &-header {
            & > * {
                font-size: 60px !important;
            }
            
            padding: 4px 40px !important;
        }
        &-header__value {
            font-size: 60px !important;
        }
    }

    .v-btn {
        height: 50px !important;
        width: 100%;

        &__content {
            font-size: 45px;
        }

        &--rounded {
            height: 80px !important;
            width: 80px !important;
            border-radius: 40px !important;
        }
    }
    
    .v-card__actions>.v-btn.v-btn {
        padding: 30px 8px !important;
    }

    .v-icon {
        font-size: 70px !important;
    }

</style>