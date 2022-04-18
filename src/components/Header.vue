<template>
    <b-navbar
        toggleable="lg"
        type="light"
        class="navbar-dark"
    > 
        <b-navbar-nav v-if="!isHome">
            <b-button class="nav-item" variant="dark" @click="returnBack">
                <a class="nav-link nav-brand">
                    <i class="fa fa-chevron-left me-2" aria-hidden="true"></i>
                </a>
            </b-button> 
        </b-navbar-nav>
        <b-navbar-brand class="mx-auto" v-else>
            <router-link class="navbar-brand nav-brand me-5" to="/new">
                <img class="img-fluid fullWidth" alt="logo" src="../../../images/logo/logoWhite.png"/>
            </router-link>
        </b-navbar-brand>
        <b-navbar-nav v-if="!isHome">
            <b-nav-text class="nav-text">{{urlText}}</b-nav-text>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" v-model="showCollapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="nav-main">
                <b-button class="nav-close" @click="showCollapse = false">
                    <i class="far fa-times-circle me-2" aria-hidden="true"></i>
                </b-button>
                <b-button name="hakkimizda" class="nav-item" variant="dark" >
                    <router-link class="nav-link" to="/about">
                        <i class="fa fa-briefcase me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.about') }}
                    </router-link>
                </b-button>
                <b-button name="yeniislem" class="nav-item" variant="dark" >
                    <router-link class="nav-link" to="/new">
                        <i class="fas fa-calendar-plus me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.new') }}
                    </router-link>
                </b-button> 
                <b-button name="admin" class="nav-item" variant="dark" v-if="$store.state.roleId == 1">
                    <router-link class="nav-link" to="/admin">
                        <i class="fa fa-plane me-2" aria-hidden="true"></i>&nbsp;Admin
                    </router-link>
                </b-button> 
                <b-button name="property" class="nav-item" variant="dark" v-if="$store.state.PossessionId != 0">
                    <router-link class="nav-link" to="/property">
                        <i class="fas fa-house-user me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.property') }}
                    </router-link>
                </b-button> 
                <b-button name="islemMenu" class="nav-item" variant="dark">
                    <router-link class="nav-link" to="/requests">
                        <i class="fa fa-history me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.requests') }}
                    </router-link>
                </b-button>
                <b-button name="secondary" class="nav-item" variant="dark" v-if="$store.state.PossessionId != 0">
                    <router-link class="nav-link" to="/secondary">
                        <i class="fa fa-users me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.secondary') }}
                    </router-link>
                </b-button> 
                <b-button name="settings" class="nav-item" variant="dark">
                    <router-link class="nav-link" to="/settings">
                        <i class="fa fa-user-cog me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.settings') }}
                    </router-link>
                </b-button> 
                <b-button name="logout" class="nav-item" variant="dark" >
                    <a @click.prevent="logout" class="nav-link" href="#">
                        <i class="fa fa-sign-out-alt me-2" aria-hidden="true"></i>&nbsp; {{ $t('pages.logout') }}
                    </a>
                </b-button> 
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>
<script>
    import {eventBus} from "../main"
    export default {
        data() {
            return {
                urlText: "AnaSayfa",
                backPath: "/new",
                isHome: true,
                isSubmitted: false,
                showCollapse: false,
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("logout")
            },
            returnBack() {
                if (this.isSubmitted) {
                    this.isSubmitted = false
                    eventBus.$emit('returnBack')
                }
                else {
                    
                    this.$router.push("/")
                }
            }
        },
        computed: {
            logoutClass() {
                return {
                    'd-none': !this.$store.getters.isAuthenticated
                }
            },
        },
        mounted() {
            eventBus.$on('submitPage', () => {
                this.isSubmitted = true
            }),
            eventBus.$on('unsubmitPage', () => {
                this.isSubmitted = false
            }),
            eventBus.$on('updateHeaderText', (text) => {
                this.urlText = text
            })
        },
        watch: {
            $route: {
                immediate: true,
                handler(to, from) {
                    console.log(from)
                    // document.title = to.meta.title || 'Some Default Title';
                    this.showCollapse = false
                    this.isHome = false
                    this.isSubmitted = false
                    if (to.fullPath == '/' || to.fullPath == '/new') {
                        this.isHome = true
                    }
                    this.urlText = this.$t(`pages.${to.fullPath.substring(1)}`)
                }
            },
        }
    }
</script>

<style scoped>
    .navbar {
        background-color: #1A2A32;
        color: white;
        padding: 40px 50px;
    }

    .navbar-brand {
        width: auto;
        display: flex;
        margin: auto;
        margin-left: 70px;
        width: 350px;
    }

    .navbar-nav {
        text-decoration: none;
        font-weight: 600;
        align-items: start !important;
    }
    
    .navbar-collapse {
        position: fixed;
        left: 50%;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #1A2A32;
        z-index: 1;
        padding: 25px 40px;
        box-shadow: -5px 0px 10px #0000008e;
        height: auto !important;
    }

    .navbar-text {
        color: white;
    }

    .navbar-toggler, .nav .navbar-nav, .nav-collapse {
        font-size: 50px !important;
    }

    .nav-item {
        font-weight: 500;
        text-align: center;
        color: inherit;
        background-color: #1A2A32;
        font-size: 40px !important;
        border: none;
    }

    .nav-close {
        background-color: #1A2A32;
        font-size: 60px !important;
        border: none;
        align-self: end;
        margin-bottom: 50px;
        margin-left: auto;
    }

    .nav-main {
        margin-left: auto; 
        margin-right: 10px; 
        align-items: center; 
        margin-top: 20px;
    }

    .nav-brand {
        border: none; 
        background-color: #1A2A32;
    }

    .nav-link {
        color: white !important;
    }

    .router-link-active {
        /* border: 1px solid white;
        border-radius: 30px;
        background-color: #1a4a8d; */
        color: #D9BA63 !important;
    }

    .custom-toggler .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,102,203, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
    }

    .custom-toggler.navbar-toggler {
        border-color: rgb(255,102,203);
    }
    
    .fullWidth {
        width: 100%;
    }
    
    .nav-text {
        padding: 16px
    }
</style>