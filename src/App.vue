<template>
    <v-app id="app">
        <v-toolbar>
            <v-toolbar-title>Parks and Rec Application

            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title>
                <span v-if="settings.user.username">
                      &nbsp; {{settings.user.username}}
                </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!--show if user clicks logout button-->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1000"
                    v-if="authStatus == 'logged off'">
                Logging Off...
            </v-snackbar>

            <!--show if Admin successfully logs on-->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1500"
                    top
                    v-if="authStatus == 'logonSuccess'">
                Welcome {{settings.user.username}}
            </v-snackbar>

            <!--show if Admin successfully creates a new user-->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1500"
                    top
                    v-if="authStatus == 'registrationSuccess'">
                Successfully Registered User: {{settings.newRegisteredUser}}
            </v-snackbar>

            <!--show if Admin successfully updates a user -->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1500"
                    top
                    v-if="authStatus == 'updateUserSuccess'">
                Successfully Updated User: {{settings.updatedUser}}
            </v-snackbar>

            <!--show if error in rest request-->
            <v-snackbar
                    v-model="error"
                    top
                    v-if="authStatus == 'error'"
                    color: red>
                ERROR: {{error}}
            </v-snackbar>

            <!--show if league is created successfully-->
            <v-snackbar
                    v-model="authStatus"
                    top
                    v-if="authStatus == 'leagueCreateSuccess'">
                Successfully created league: {{settings.newLeague}}
            </v-snackbar>


            <!--show if league is updated successfully-->
            <v-snackbar
                    v-model="authStatus"
                    top
                    v-if="authStatus == 'updateLeagueSuccess'">
                Successfully updated league: {{settings.updatedLeague}}
            </v-snackbar>

            <!--show if sport is created successfully-->
            <v-snackbar
                    v-model="authStatus"
                    top
                    v-if="authStatus == 'sportCreateSuccess'">
                Successfully created sport: {{settings.newSport}}
            </v-snackbar>

            <!--show if sport is updated successfully-->
            <v-snackbar
                    v-model="authStatus"
                    top
                    v-if="authStatus == 'updateSportSuccess'">
                Successfully updated sport: {{settings.updatedSport}}
            </v-snackbar>

            <!--if use is logged in-->
            <v-btn flat color="primary" v-if="settings.token != null" @click="logout">LOGOUT</v-btn>
            <!--go to logon screen-->
            <v-btn flat color="primary" to="/logon" v-if="settings.token == null">
                LOGON
            </v-btn>
            <v-btn flat color="primary"
                   v-if="settings.token != null && (settings.user.rolename == 'admin' || settings.user.rolename == 'Admin') && this.$router.currentRoute.name != 'logon'"
                   @click="openRegisterForm">
                REGISTER
            </v-btn>
            <v-btn flat color="primary"
                   v-if="settings.token != null && (settings.user.rolename == 'admin' || settings.user.rolename == 'Admin') &&
this.$router.currentRoute.name == 'logon'">
                REGISTER
            </v-btn>
            <v-btn flat color="primary" @click="homePage">
                <v-icon>home</v-icon>
            </v-btn>

            <!--toggle menu-->
            <v-btn
                    color="primary"
                    flat
                    @click.stop="settingsMenuOpen = !settingsMenuOpen"
                    v-if="this.$router.currentRoute.name != 'logon'">
                <v-icon>menu</v-icon>
                !logon
            </v-btn>
            <!--placehoolder menu button if logon form is open so user can't access settings-->
            <v-btn
                    color="primary"
                    flat
                    v-if="this.$router.currentRoute.name == 'logon'">
                <v-icon>menu</v-icon>
                logon
            </v-btn>
        </v-toolbar>

        <transition
                name="fade"
                mode="out-in">
            <!--Vue-Router tag that holds all views-->
            <router-view/>
        </transition>

        <!--menu that slides out with options-->
        <v-navigation-drawer
                v-if="this.$router.currentRoute.name != 'logon'"
                v-model="settingsMenuOpen"
                absolute
                temporary
                height="50%"
                right>
            <!--Menu component-->
            <settings-menu
                    v-if="this.$router.currentRoute.name != 'logon'"
                    v-model="settingsMenuOpen"
                    @close-settings-menu="closeSettingsMenu">
            </settings-menu>
        </v-navigation-drawer>

        <v-footer app>
            <span>&copy; SWENG 894 Group 7 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
    import settingsMenu from '@/components/SettingsMenu.vue'

    export default {
        components: {
            settingsMenu,
        },
        data: () => ({
            settingsMenuOpen: false,
            loadingPopover: false
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            },
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            },
            authStatus: function () {
                return this.$store.state.status
            },
            error: function () {
                return this.$store.state.error
            }
        },
        methods: {
            closeSettingsMenu(value) {
                this.$data.settingsMenuOpen = value;
            },
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        //after logout, send the user to the login page for now
                        this.$router.push('/logon');

                    })
            },
            openRegisterForm: function () {
                this.$store.dispatch('openRegisterForm');
            },
            homePage: function () {
                if (this.$store.state.settings.token != null) {
                    this.$router.push('/main')
                } else {
                    this.$router.push('/logon')
                }

            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    footer {
        flex-shrink: 0;
        padding: 20px;
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
