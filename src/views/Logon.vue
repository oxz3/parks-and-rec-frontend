<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0">Welcome to Parks and Rec</h3>
            </div>
        </v-card-title>
        <!--@submit.prevent associates login to the form-->
        <form class="ma-1" @submit.prevent="login">
            <v-checkbox label="New to Parks and Rec?" v-model="isNewUser" v-if="!settings.editUser"></v-checkbox>
            <div v-if="isNewUser && !settings.editUser">
                <v-text-field
                        label="Create New Username"
                        required
                        v-model="settings.user.username">
                </v-text-field>
                <v-text-field
                        label="Create New Password"
                        required
                        v-model="settings.user.password">
                </v-text-field>
            </div>
            <div v-if="!isNewUser && !settings.editUser">
                <v-text-field
                        label="Enter Username"
                        required
                        v-model="settings.user.username">
                </v-text-field>
                <v-text-field
                        label="Enter Password"
                        required
                        v-model="settings.user.password">
                </v-text-field>
            </div>
            <div v-if="settings.editUser">
                <v-text-field
                        label="Username"
                        required
                        v-model="settings.user.username">
                </v-text-field>
                <v-text-field
                        label="Enter a NEW Password"
                        required
                        v-model="settings.user.password">
                </v-text-field>
            </div>
            <v-btn v-if="!isNewUser && !settings.editUser" color="primary" to="/" type="submit" @click="login(settings.user)">LOGON</v-btn>
            <v-btn v-if="isNewUser && !settings.editUser" color="primary" to="/" type="submit" @click="register(settings.user)">SIGN UP</v-btn>
            <v-btn v-if="settings.editUser" color="primary" to="/" type="submit" @click="updateUser">UPDATE</v-btn>
            <v-btn to="/">cancel</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            isNewUser: false,
            isAdmin: false,
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            login: function (user) {
                let username = user.username;
                let password = user.password;
                console.log('login method: ', user.username, user.password);
                this.$store.dispatch('login', { username, password})
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            register: function (user) {
                let data = {
                    username: user.username,
                    password: user.password,
                    isAdmin: this.$data.isAdmin
                };
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            updateUser: function(user){

            }
        }
    }
</script>

<style>
    v-card {
        text-align: center;
    }
</style>