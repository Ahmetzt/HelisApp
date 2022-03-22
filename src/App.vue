<template>
    <div>
        <Header  :class="logoutClass"/>
        <router-view></router-view>
    </div>
</template>
<script>
    import Header from "./components/Header";
    import { SidebarMenu } from 'vue-sidebar-menu'

    export default {
        components: {
            Header,
            // eslint-disable-next-line vue/no-unused-components
            SidebarMenu
        },
        created(){
            this.$store.dispatch("initAuth")
        },
        computed: {
            logoutClass() {
                return {
                    'd-none': !this.$store.getters.isAuthenticated || this.$store.getters.isResultPage
                }
            }
        },
    }
</script>

<style>
    body {
        font-size: xx-large !important;
        background-color: #f6f6f6;
        font-family: poppins;
    }
    
    .button-yellow {
        color: #fff;
        background-color: #D6B761;
        border-color: #D6B761;
        font-size: xx-large;
        height: 100px;
    }
    .button-blue {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
        font-size: xx-large;
        height: 100px;
    }
    .bg-menu {
        background-color: #1A2A32 !important;
    }
    .nav-component {
        max-width: 1280px;
        margin: 0 auto;
    }
    
    .formControl {
        /* border: 1px solid black; */
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 20px;
        padding: 5px;
        font-size: xx-large !important;
        margin-bottom: 20px;
        padding-left: 3%;
        margin-left: 3%;
        max-width: 94%
    }

    .formControlFE {
        margin-top: -85px; 
        position: relative; 
        background-color: #f6f6f6;
    }

    .requestImage {
        width: 100%; 
        height: 25vh; 
        object-fit: cover;
    }

    .listImage {
        width: 100%; 
        height: 21vh; 
        object-fit: cover;
    }

    .buttonControl {
        margin-top: 50px;
        margin-left: 3%;
        max-width: 94%;
        font-size: xx-large !important;

    }

    .form-group {
        margin-bottom: 35px;
    }

    .container {
        padding: 0;
        max-width: 100%;
        margin: auto;
    }

    .formLabel {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
        font-size: xx-large !important;
    }

    .formElement {
        width: 90%;
        font-size: xx-large !important;
        height: auto;
        margin-bottom: 20px;
        margin-left: 60px;
        padding: 15px;
    }

    .formDDL {
        width: 50%; 
        border: 7px solid #000000; 
        margin-top: 5px; 
        margin-left: 15px; 
        background-color: #ccc; 
        border-radius: 10px;
    }

    .formCB {
        width: 25px;
        height: 25px;
    }

    .faclass {
        width: 40px !important;
    }

    .rightArrow {
        float: right; 
        font-size: 50px; 
        margin-top: -30px; 
        margin-right: 25px;
    }

    .mytable2 {
        width: 100%;
    }
    
    .mytable2 td {
        margin: 4px;
        padding: 10px;
    }

    .mytable2 td:last-child {
        float: right;
        margin-right: 15px;
    }

    .mytable2 tr:last-child {
        border-top: 1px solid #d5d7e7;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: rgb(213, 215, 231);
    }

    .mytable2 td button {    
        border: 2px outset #212529;
        border-radius: 20px;
        height: 100px;
        width: 100px;
        cursor: pointer;
    }

    .mytable2 td label {    
        padding: 20px 30px;
    }

    .mydialogclass {
        
        max-width: initial;
        display: flex;
        -ms-flex-align: center;
        align-items: flex-end;
        height: 100%;
        margin: 0;
        font-size: 60px;
    }

    .mydialogclass button {
        font-size: 60px;
        border-radius: 20px;
    }
    
    .myDiv {
        border-radius: 30px;
        border: solid 4px #d5d7e7;
        padding: 10px;
        margin: 0 5px;
    }
    
    .fade {
        transition: all 1s;
    }

    .mydialogclass p {    
        margin-left: 30px;
    }

    .modal-backdrop {
        opacity: .5
    }

    .mytable {
        width: 100%;
    }
    
    .mytable td {
        margin: 4px;
        padding: 10px;
    }

    .mytable td button {
            
        border: 1px outset #212529;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }

    .mybutton {
        background-size: cover;
        width: 47%;
        margin: 1%;
        border: none;
        padding: 0;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        background-color: white;
        height: 47%;
    }

    .myimage {
        background-color: white;
        /* width: 70%; */
        padding: 50px;
        height: 80%;
    }

    .tableRestaurant {
        margin: 50px 15px;
        line-height: 1.5;
        white-space: pre;
        /* padding: 11px; */
    }

    .smallCloseButton {
        flex-grow: 0 !important;
        margin-right: 20px;
    }

    input[type=date], input[type=datetime-local], input[type=month], input[type=time] {
        background-color: #fff;
        border: 1px solid #ced4da;
    }

    .formElement input {
        border: none;
        box-sizing: border-box;
        outline: 0;
        padding: .75rem;
        position: relative;
        width: 100%;
    }

    input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
    
    input[type="date"]:before, input[type="time"]:before {
        color: lightgrey;
        content: attr(placeholder) !important;
        margin-right: 0.5em;
    }
</style>