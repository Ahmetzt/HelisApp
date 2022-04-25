<template>
    <div class="background" @click="closePage">
        <div v-html="getResultText"></div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    
    export default {
        computed: {
            ...mapGetters(["getResultText"]),
        },
        created() {
            setTimeout(() => {
                this.closePage()
            }, 6000);
        },
        methods: {
            closePage() {
                this.$store.dispatch("initAuth")
                    .then(response => {
                        if (response) {
                            this.$router.push({path: '/new'});
                        }
                    })
            }
        }
    };
</script>

<style scoped>
    .background {
        background-color: #1A2A32 !important;
        color: white !important;
        padding: 300px 100px;
        text-align: center;
        vertical-align: middle;
        position: fixed;
        top: 0;
        bottom: 0;
    }
</style>