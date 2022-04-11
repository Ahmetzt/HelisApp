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

<style lang="scss">
    body {
        font-size: 40px !important;
        background-color: #f6f6f6;
        font-family: 'SF Pro Display';
        // font-family: auto;
    }
    
    .button-yellow {
        color: #FFFFFF;
        background-color: #D6B761;
        border-color: #D6B761;
        font-size: 40px;
        height: 100px;
    }
    .button-blue {
        color: #FFFFFF;
        background-color: #007bff;
        border-color: #007bff;
        font-size: 40px;
        height: 100px;
    }
    .button-green {
        color: #FFFFFF;
        background-color: #7cd840;
        border-color: #7cd840;
        font-size: 40px;
        height: 100px;
    }
    .bg-menu {
        background-color: #1A2A32 !important;
    }
    .nav-component {
        max-width: 1280px;
        margin: 0 auto;
    }
    
    .rightFloat {
        float: right;
    }
    
    .leftFloat {
        float: left; 
        margin-left: 5px;
    }

    .formControl {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 20px;
        padding: 5px;
        font-size: 40px !important;
        margin-bottom: 20px;
        padding-left: 3%;
        margin-left: 3%;
        max-width: 94%;
        background-color: #FFFFFF;
    }

    .formControlFE {
        margin-top: 40px; 
        position: relative; 
        background-color: #FFFFFF;
    }

    .formAssistant {
        background: none;
        box-shadow: none;
        max-width: 94%;
        margin: -85px auto 5px !important;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0;
        row-gap: 20px;
    }

    .formAssistantImage {
        background-color: white;
        padding: 70px;
        height: 350px;
    }

    .formAssistantButton {
        box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
        background-color: white;
        width: 48%;
        margin-bottom: 40px;
    }

    .activityTD {
        position: relative;
        padding: 0 !important;
        border: none;
    }

    .activityText {
        position: absolute; 
        right: 16px; 
        bottom: 8px; 
        color: white; 
        font-size: 50px;
    }
    .requestImage {
        width: 100%; 
        height: 25vh; 
        object-fit: cover;
        display: none;
    }

    .listImage {
        width: 100%; 
        height: 21vh; 
        object-fit: cover;
        margin-bottom: 5px;
    }

    .buttonControl {
        margin-top: 70px;
        margin-left: 3%;
        max-width: 94%;

        & > * {
            padding: 30px;
            height: 100%;
        }
    }

    .form-group {
        margin-bottom: 35px;
    }

    .container {
        padding: 0;
        max-width: 100%;
        margin: auto;
    }

    .request-container {
        padding: 0;
        width: 100%;
        margin: 0;
    }

    .formLabel {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
        font-size: 40px !important;
    }

    .formElement {
        width: calc(100% - 80px);
        font-size: 40px !important;
        height: auto;
        margin-bottom: 20px;
        margin-left: 60px;
        padding: 15px;
        border: 1px solid #ced4da;
    }

    .formButton {
        background-color: white;
        color: black;
    }

    .formTwoCols {
        display: flex;
        flex-direction: row;
        width: 97%;
        background: none;

        &-inner {
            width: 47%;
            background-color: #FFFFFF;
        }
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
   
    input[type="radio"] {
        -webkit-appearance: none;
        appearance: none;

        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid currentColor;
        border-radius: 50%;
        transform: translateY(-0.075em);

        display: grid;
        place-content: center;
    }

    input[type="radio"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        background-color: CanvasText;
    }

    input[type="radio"]:checked::before {
        transform: scale(1);
    }

    .formRadio {
        margin-left:60px;
        display: flex;
        gap: 20px;
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
        width: 49%;
        // margin: 1%;
        border: none;
        padding: 0;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        background-color: white;
        height: 22%;
        aspect-ratio: 1 / 1;
        justify-content: space-evenly;
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }

    .mybuttonGroup {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        row-gap: 20px;
    }

    .myimage {
        background-color: white;
        padding: 50px;
        height: 80%;
    }

    .menuImage {
        height: 30%;
    }

    .menuP {
        font-weight: 700;
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
        background-color: #FFFFFF;
        border: 1px solid #ced4da;
    }

    .formElement input {
        border: none;
        box-sizing: border-box;
        outline: 0;
        padding: .75rem;
        position: relative;
        width: 100%;
        background-color: #FFFFFF;
        border: 1px solid #ced4da;
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

    .formMoving {
        display: flex;
        gap: 2px;
        background-color: #FFFFFF;
        position: relative;

        //Flex Direction
        &-upSide {
            flex-direction: column;
        }

        &-downSide {
            flex-direction: column-reverse;
        }

        & > * {
            position: relative;
            // background-color: #FFFFFF;
            background: none;
        }

        &-Between {
            display: flex;
            flex-direction: row;
            margin: 0 20px 0px 60px;
        }

        &-Dotted {
                border-left: 8px dotted #000;
                margin-left: -34px;
                margin-top: -130px;
                position: absolute;
                height: 205px;
        }

        &-Line {
            border-top: 3px solid #E3E0DB;
            margin-top: 25px;
            width: 100%;
        }

        &-Button {
            background-color: #FFFFFF;
            font-size: 30px;
        }
    }
    
    .footerAuth {
        text-align: center;
        margin: 50px 0;

        & > img {
            width: 50%;
        }
    }
</style>