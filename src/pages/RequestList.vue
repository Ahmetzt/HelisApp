<template>
    <div class="container">
        <b-table striped hover :items="getOrders" :fields="fields">

            <template #cell(Details)="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    Son İşlem {{ row.detailsShowing ? 'Gizle' : 'Göster'}} 
                </b-button>

                <!-- <b-button variant="warning" size="sm" class="mr-2" @click="updateRow(row.item, row.index, $event.target)">Düzenle</b-button> -->
            </template>

            <template #row-details="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-table striped hover :items="getOrderInfo" thead-tr-class="d-none" table-class="requestTable">
                            
                        </b-table>
                        <b-col><b-button size="sm" @click="row.toggleDetails">Kapat</b-button></b-col>
                        
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
                fields: [ 
                    { key: 'OrderId', label: 'Talep ID', sortable: true, }, 
                    { key: 'OrderName', label: 'Talep Türü', sortable: true, }, 
                    { key: 'OrderDate', label: 'Talep Tarihi', formatter: (value) => {
                        let d = new Date(value)
                        return d.toLocaleString()
                    } },
                    { key: 'Details', label: 'Detaylar', }, 
                ],
            }
        },
        created() {
            this.getOrdersList()
        },
        computed: {
            ...mapGetters(["getOrderTypes"]),
            ...mapGetters(["getOrderStatus"]),
            ...mapGetters(["getOrders"]),
            ...mapGetters(["getOrderInfo"]),
        },
        methods: {
            getOrdersList() {
                this.searchData.BeginDate = null
                this.searchData.EndDate = null
                console.log(this.searchData)

                this.$store.dispatch("getOrdersHistory", { ...this.searchData })
            },
        }
    }
</script>

<style scoped>

</style>

