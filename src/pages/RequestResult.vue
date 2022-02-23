<template>
    <div class="background" @click="closePage">
        <p>
            {{getResultText}}
        </p>
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
            }
        }
    };
</script>

<style scoped>
    .background {
        background-color: #1A2A32 !important;
        color: white !important;
        height: 97vh;
        padding: 300px 100px;
        text-align: center;
        vertical-align: middle;
    }
</style>