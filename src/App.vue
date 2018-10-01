<template>
    <v-app id="app">
        <v-toolbar>
            <v-toolbar-title>Parks and Rec Application</v-toolbar-title>
            <v-spacer></v-spacer>

            <!--show if user clicks logout button-->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1000"
                    v-if="authStatus == 'logged off'">
                Logging Off...
            </v-snackbar>

            <!--show if use succesfully logs on-->
            <v-snackbar
                    v-model="authStatus"
                    :timeout="1500"
                    top
                    v-if="authStatus == 'successful logon'">
                welcome {{settings.user.username}}
            </v-snackbar>
            <!--if use is logged in-->
            <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
            <!--go to logon screen-->
            <v-btn flat color="primary" to="/logon">
                <v-icon>power_settings_new</v-icon>
            </v-btn>
            <!--go to home screen-->
            <v-btn flat color="primary" to="/">
                <v-icon>home</v-icon>
            </v-btn>
            <!--toggle menu-->
            <v-btn
                    color="primary"
                    flat
                    @click.stop="settingsMenuOpen = !settingsMenuOpen">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>

        <!--Vue-Router tag that holds all views-->
        <router-view/>

        <!--menu that slides out with options-->
        <v-navigation-drawer
                v-model="settingsMenuOpen"
                absolute
                temporary
                height="50%"
                right>
            <!--Menu component-->
            <settings-menu
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
                        this.$router.push('/logon')
                    })
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
</style>
