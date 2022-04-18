<template>
    <div class="container">
        <b-table striped hover :items="getOrders" :fields="fields" :tbody-tr-class="rowClass">
            <template #head()="scope">
                <div class="text-nowrap">
                    {{ $t(`RequestList.label.${scope.label}`) }} 
                </div>
            </template>

            <template #cell(Details)="row">
                <b-button size="lg" @click="row.toggleDetails" class="mr-2" variant="outline-primary">
                    {{ $t('RequestList.label.Detail') + " " + (row.detailsShowing ? $t('RequestList.label.Hide') : $t('RequestList.label.Show')) }} 
                </b-button>
            </template>

            <template #row-details="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-table striped hover :items="row.item.OrderInfo" thead-tr-class="d-none" table-class="requestTable">
                            
                            <template #cell(Column)="row">
                                <!-- {{ data.index + 1 }} -->
                                {{ $t(`RequestList.details.${row.value}`) }} 
                            </template>
                        </b-table>
                        <b-col><b>{{ $t(`RequestList.label.RequestDate`) }} :</b> {{ row.item.OrderDate | formatDate }}</b-col>
                        <b-col class="smallCloseButton">
                            <b-button size="lg" @click="row.toggleDetails" variant="outline-primary">{{ $t('Request.label.close') }}</b-button>
                        </b-col>
                        
                    </b-row>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                searchData: {
                    OrderType: null,
                    BeginDate: null,
                    EndDate: null,
                    OrderStatus: null,
                },
                selectedOrder: {
                    OrderStatus: null,
                    OrderId: null,
                    Note: null,
                    OrderType: null,
                },
                fields: [ 
                    { key: 'OrderId', label: 'OrderId', sortable: true, }, 
                    { key: 'OrderType', label: 'OrderType', sortable: true, formatter: (value) => { 
                        return this.getOrderTypesById(value).OrderName
                    } }, 
                    { key: 'OrderStatus', label: 'OrderStatus', formatter: (value) => { 
                        return this.getOrderStatusById(value).StatusName
                    } }, 
                    { key: 'Details', label: 'Details', }, 
                ],
            }
        },
        filters: {
            formatDate: function (value){
                let d = new Date(value)
                return d.toLocaleString()
            },
        },
        created() {
            this.getOrdersList()
        },
        computed: {
            ...mapGetters(["getOrderTypes"]),
            ...mapGetters(["getOrderStatus"]),
            ...mapGetters(["getOrders"]),
        },
        methods: {
            getOrdersList() {
                this.searchData.BeginDate = null
                this.searchData.EndDate = null
                console.log(this.searchData)

                this.$store.dispatch("getOrdersHistory", { ...this.searchData })
            },
            getOrderStatusById(id) {
                return this.$store.getters.getOrderStatusById(id);
            },
            getOrderTypesById(id) {
                return this.$store.getters.getOrderTypesById(id);
            },
            rowClass(item, type) {
                if (!item || type !== 'row') return
                return  'OrderStatus-' + item.OrderStatus
            }
        }
    }
</script>

<style lang="scss">
    .OrderStatus {
        &-1 {
            background-color: #00fffa !important
        }
        &-2 {
            background-color: #ffed07 !important
        }
        &-3 {
            background-color: #ff7b00ec !important
        }
        &-4 {
            background-color: #24c868 !important
        }
        &-5 {
            background-color: #fe0019 !important
        }
    }
</style>

