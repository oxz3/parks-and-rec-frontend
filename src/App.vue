<template>
    <v-app id="app">
        <v-toolbar>
            <v-toolbar-title>Parks and Rec Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <!--go to sign up screen-->
            <v-btn flat color="primary" to="/signup">
                SIGN UP
            </v-btn>
            <!--go to logon screen-->
            <v-btn flat color="primary" to="/logon">
                LOG ON
            </v-btn>
            <!--go to home screen-->
            <v-btn flat color="primary" to="/">
                <v-icon>home</v-icon>
            </v-btn>
            <!--toggle menu-->
            <v-btn
                    color="primary"
                    flat
                    @click.stop="menu = !menu">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>

        <!--Vue-Router tag that holds all views-->
        <router-view/>

        <!--menu that slides out with options-->
        <v-navigation-drawer
                v-model="menu"
                absolute
                temporary
                right>
            <!--Menu component-->
            <settings-menu></settings-menu>
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
            settingsMenu
        },
        data: () => ({
            menu: null,
        })
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
