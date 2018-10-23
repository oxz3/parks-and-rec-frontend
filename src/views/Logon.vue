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
        <form class="ma-3" @submit.prevent="login">
            <v-checkbox label="New to Parks and Rec?" v-model="settings.registerUser"
                        v-if="settings.registerUser && !settings.editUser"></v-checkbox>
            <!--Register User-->
            <div v-if="settings.registerUser && !settings.editUser">
                <v-layout pb-3>
                    <v-flex pr-3>
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
                        <v-text-field
                                label="Enter Organization Name"
                                required
                                v-model="user.orgname">
                        </v-text-field>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex pl-3>
                        <v-text-field
                                label="Create New Email"
                                required
                                v-model="user.email">
                        </v-text-field>
                        <v-text-field
                                label="Create New Phone"
                                required
                                v-model="user.phone">
                        </v-text-field>
                        <v-text-field
                                label="Create New Address"
                                required
                                v-model="user.address">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <!--Admin Logon-->
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
            <!--Update User-->
            <div v-if="settings.editUser && !settings.registerUser">
                <v-layout pb-3>
                    <v-flex pr-3>
                        <v-text-field
                                label="Enter Username"
                                required
                                v-model="user.username">
                        </v-text-field>
                        <v-text-field
                                label="Enter a New Password"
                                required
                                v-model="user.password">
                        </v-text-field>
                        <v-text-field
                                label="Enter a New Organization Name"
                                required
                                v-model="user.orgname">
                        </v-text-field>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex pl-3>
                        <v-text-field
                                label="Enter New Email"
                                required
                                v-model="user.email">
                        </v-text-field>
                        <v-text-field
                                label="Enter New Phone"
                                required
                                v-model="user.phone">
                        </v-text-field>
                        <v-text-field
                                label="Enter New Address"
                                required
                                v-model="user.address">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <div class="pb-4">
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
            </div>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            isAdmin: false,
            user: {
                username: "Admin",
                password: "Admin",
                email: "",
                phone: "",
                orgname: "",
                address: ""
            }
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            login: function (user) {
                console.log('user in form: ', user);
                let username = user.username;
                let password = user.password;
                let store = this.$store;
                let router = this.$router;
                store.dispatch('login', {username, password})
                    .then(function (response) {
                        console.log(response);
                        store.dispatch('getLeagues', response)
                            .then(function () {
                                router.push('/');
                            })
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            register: function (user) {
                console.log(user);
                this.$store.dispatch('register', user)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            updateUser: function (user) {

                //perform Get first then use the result for the update payload
                let that = this;
                that.$store.dispatch('getUser', user.username)
                    .then(function (result) {
                        //set data to the result of the GetUser
                        console.log('result in logon: ', result[0]);
                        let updateUser = result[0];
                        Object.keys(user).forEach(function (key) {
                            if (user[key].length > 0) {
                                updateUser[key] = user[key];
                            }
                        });
                        that.$store.dispatch('updateUser', updateUser)
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