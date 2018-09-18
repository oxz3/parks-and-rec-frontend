<template>
    <v-app id="app">
        <v-toolbar>
            <!--<v-btn icon @click.stop="fixed = !fixed">-->
            <!--<v-icon>remove</v-icon>-->
            <!--</v-btn>-->
            <!--<router-link to="/">Home</router-link> |-->
            <!--<router-link to="/about">About</router-link>-->
            <v-toolbar-title >Parks and Rec Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" to="/signup">
                SIGN UP
            </v-btn>
            <v-btn flat color="primary"to="/logon">
                LOG ON
            </v-btn>
            <v-btn flat color="primary" to="/">
                <v-icon>home</v-icon>
            </v-btn>
        </v-toolbar>

        <router-view/>
        <!--<template>-->
            <!--<div>-->
                <!--<v-btn color="success">Success</v-btn>-->
                <!--<v-btn color="error">Error</v-btn>-->
                <!--<v-btn color="warning">Warning</v-btn>-->
                <!--<v-btn color="info">Info</v-btn>-->
            <!--</div>-->
        <!--</template>-->

        <v-footer :fixed="fixed" app>
            <span>&copy; SWENG 897 Group 4 2018</span>
        </v-footer>
    </v-app>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
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
