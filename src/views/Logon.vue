<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0" v-if="!settings.token">Welcome to Parks and Rec</h3>
                <h3 class="headline mb-0" v-if="settings.token && settings.registerUser && !settings.editUser">
                    Register a New User</h3>
                <h3 class="headline mb-0" v-if="settings.token && settings.editUser && !settings.registerUser">
                    Edit User</h3>

            </div>
        </v-card-title>
        <!--@submit.prevent associates login to the form-->
        <form class="ma-1" @submit.prevent="login">
            <v-checkbox label="New to Parks and Rec?" v-model="settings.registerUser"
                        v-if="settings.registerUser && !settings.editUser"></v-checkbox>
            <div v-if="settings.registerUser && !settings.editUser">
                <v-text-field
                        label="Create New Username"
                        required
                        v-model="user.username">
                </v-text-field>
                <v-text-field
                        label="Create New Password"
                        required
                        v-model="user.password">
                </v-text-field>
            </div>
            <div v-if="!settings.registerUser && !settings.editUser">
                <v-text-field
                        label="Enter Username"
                        required
                        v-model="user.username">
                </v-text-field>
                <v-text-field
                        label="Enter Password"
                        required
                        v-model="user.password">
                </v-text-field>
            </div>
            <div v-if="settings.editUser">
                <v-text-field
                        label="Enter Username"
                        required
                        v-model="user.username">
                </v-text-field>
                <v-text-field
                        label="Enter a NEW Password"
                        required
                        v-model="user.password">
                </v-text-field>
            </div>
            <v-btn v-if="!settings.editUser && !settings.registerUser" color="primary" to="/" type="submit"
                   @click="login(user)">
                LOGON
            </v-btn>
            <v-btn v-if="settings.registerUser && !settings.editUser" color="primary" to="/" type="submit"
                   @click="register(user)">
                REGISTER
            </v-btn>
            <v-btn v-if="settings.editUser && !settings.registerUser" color="primary" to="/" type="submit"
                   @click="updateUser(user)">UPDATE
            </v-btn>
            <v-btn @click="cancel">cancel</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            isAdmin: false,
            user: {
                username: "",
                password: ""
            }
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
                this.$store.dispatch('login', {username, password})
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            register: function (user) {
                let data = {
                    username: user.username,
                    password: user.password
                };
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            updateUser: function (user) {

                //perform Get first then use the result for the update payload
                let that = this;
                that.$store.dispatch('getUser', user.username)
                    .then(function (result) {
                        //set data to the result of the GetUser
                        result[0].password = user.password;
                        that.$store.dispatch('updateUser', result[0])
                            .then(() => that.$router.push('/'))
                            .catch(err => console.log(err))
                    })

            },
            cancel: function () {
                this.$store.dispatch('cancelLogonForm')
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style>
    v-card {
        text-align: center;
    }
</style>