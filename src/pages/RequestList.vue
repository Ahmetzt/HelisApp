<template>
    <div class="container">
        <b-table striped hover :items="getOrders" :fields="fields">
            
            <template #cell(Details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    Detay {{ row.detailsShowing ? 'Gizle' : 'Göster'}} 
                </b-button>

                <!-- <b-button variant="warning" size="sm" class="mr-2" @click="updateRow(row.item, row.index, $event.target)">Düzenle</b-button> -->
            </template>

            <template #row-details="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-table striped hover :items="row.item.OrderInfo" thead-tr-class="d-none" table-class="requestTable">
                            
                        </b-table>
                        <b-col><b>Talep Tarihi:</b> {{ row.item.OrderDate | formatDate }}</b-col>
                        <b-col class="smallCloseButton"><b-button size="sm" @click="row.toggleDetails">Kapat</b-button></b-col>
                        
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
                    { key: 'OrderId', label: 'Talep ID', sortable: true, }, 
                    { key: 'OrderType', label: 'Talep Türü', sortable: true, formatter: (value) => { 
                        return this.getOrderTypesById(value).OrderName
                    } }, 
                    // { key: 'OrderDate', label: 'Talep Tarihi', formatter: (value) => {
                    //     let d = new Date(value)
                    //     return d.toLocaleString()
                    // } },
                    { key: 'OrderStatus', label: 'Talep Durumu', formatter: (value) => { 
                        return this.getOrderStatusById(value).StatusName
                    } }, 
                    { key: 'Details', label: 'Detaylar', }, 
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
        }
    }
</script>

<style scoped>

</style>

