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
        <v-card>
            <img alt="Vue logo"  class="ma-3" height="200px" width="900px" src="../assets/logo.jpg">
        </v-card>

        <!--@submit.prevent associates login to the form-->
        <form class="ma-3" @submit.prevent="login" v-model="valid" ref="form">
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
                                :type="'password'"
                                v-model="user.password">
                        </v-text-field>

                        <!--roles dropdown-->
                        <v-select
                                item-text="value"
                                item-value="key"
                                v-model="user.rolename"
                                :items="roles"
                                solo
                                label="Role"
                        ></v-select>
                        <!--if the user being registered role is Admin-->
                        <v-text-field
                                v-if="user.rolename !== 'User'"
                                label="Enter Organization Name"
                                required
                                v-model="user.orgname">
                        </v-text-field>
                        <!-- if user being registered is a User (set orgid to that of Admin creating the user)-->
                        <v-text-field
                                v-if="user.rolename == 'User'"
                                label="Organization Name"
                                required
                                readonly
                                v-model="settings.user.orgname">
                        </v-text-field>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex pl-3>
                        <v-text-field
                                label="Create New Email"
                                required
                                :rules="emailRules"
                                v-model="user.email">
                        </v-text-field>
                        <v-text-field
                                label="Create New Phone"
                                required
                                mask="(###) ### - ####"
                                :rules="phoneRules"
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
                        :type="'password'"
                        v-model="user.password">
                </v-text-field>
            </div>
            <!--Update User-->
            <div v-if="settings.editUser && !settings.registerUser">
                <v-layout pb-3>
                    <v-flex pr-3>
                        <v-text-field
                                label="Username"
                                required
                                readonly
                                v-model="user.username">
                        </v-text-field>
                        <v-text-field
                                label="Enter a New Password"
                                required
                                :type="'password'"
                                v-model="user.password">
                        </v-text-field>

                        <!--roles dropdown-->
                        <v-select
                                item-text="value"
                                item-value="key"
                                v-model="user.rolename"
                                :items="roles"
                                solo
                                label="Role"
                        ></v-select>

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
                                :rules="emailRules"
                                v-model="user.email">
                        </v-text-field>
                        <v-text-field
                                label="Enter New Phone"
                                required
                                mask="(###) ### - ####"
                                :rules="phoneRules"
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
                <v-btn v-if="settings.registerUser && !settings.editUser" color="primary" to="/" type="submit"
                       @click="cancel">
                    CANCEL
                </v-btn>
                <v-btn v-if="settings.editUser && !settings.registerUser" color="primary" to="/" type="submit"
                       @click="cancel">CANCEL
                </v-btn>

            </div>
        </form>
    </v-card>
</template>

<script>
    export default {

        created: function () {
            console.log('a is: ' + this);
            if (this.$store.state.settings.registerUser) {
                this.user = Object.assign({}, this.$store.state.settings.templateUser);
                console.log('user in logon form register', this.user);
            }
            if (this.$store.state.settings.editUser) {
                this.user = Object.assign({}, this.$store.state.settings.user);
                console.log('user in logon form edit', this.user);
            }
        },

        data: () => ({
            isAdmin: false,
            valid: false,
            user: {
                username: "",
                password: ""
            },
            roles: [
                {key: "Admin", value: "Admin"},
                {key: "User", value: "User"}
            ],
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            phoneRules: [
                (v) => !!v || 'Phone Number is required',
                (v) => /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(v) || 'Phone Number must be valid'
            ]
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            },
            sports() {
                return this.$store.state.sports;
            },
            leagues() {
                return this.$store.state.leagues;
            }
        },
        methods: {
            /*
            login: function (user) {
                console.log('user in form: ', user);
                let username = user.username;
                let password = user.password;
                let store = this.$store;
                let router = this.$router;
                let that = this;
                let sportsListPromise = undefined;
                store.dispatch('login', {username, password})
                    .then(function (response) {
                        
                        console.log(response);
                        //get user info
                        //perform Get first then use the result for the update payload
                        that.$store.dispatch('getUser', user.username)
                            .then(function (result) {
                                //set data to the result of the GetUser
                                console.log('result in logon: ', result[0]);
                                let currentUser = result[0];
                                Object.keys(user).forEach(function (key) {
                                    if (user[key].length > 0) {
                                        currentUser[key] = user[key];
                                    }
                                });
                                console.log('this is the current user: ', currentUser, user);
                                that.$store.dispatch('setUser', currentUser);
                            }).then(function () {
                            store.dispatch('getLeagues', store.state.sports)
                                .then(function (leaguesResult) {
                                    console.log(leaguesResult);
                                    store.dispatch('getSports', response)
                                        .then(function (sportsResult) {
                                            console.log(sportsResult);
                                            if (sportsResult.length > 0) {
                                                sportsListPromise = new Promise((resolve, reject) =>
//                                                if(sportsResult.length > 0) {
                                                        sportsResult.forEach(function (sportResult) {
                                                            store.dispatch('getSportByName', sportResult)
                                                                .then(function (sportNameResult) {
                                                                    console.log('sport by name result:', sportNameResult);
                                                                    store.dispatch('addSportToList', sportNameResult)
                                                                        .then(function (result) {
                                                                            console.log('result of sports in login:', result);
                                                                            that.buildSportLeaguesLists(sportsResult, leaguesResult);
                                                                            setTimeout(function () {
                                                                                console.log('in timeout');
                                                                                router.push('/main')
                                                                            }, 2000)
                                                                        });
                                                                });
                                                        })
                                                );
                                            }
                                            else {
                                                router.push('/main')
                                            }
                                        });
                                })
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }).catch(function (error) {
                    console.log(error);
                })
            }, */

            login: function (user) {
                console.log('user in form: ', user);
                let username = user.username;
                let password = user.password;
                let store = this.$store;
                let router = this.$router;
                let that = this;
                let sportsListPromise = undefined;
                store.dispatch('login', {username, password})
                    .then(function (response) {
                        console.log(response);
                        //get user info
                        //perform Get first then use the result for the update payload
                        that.$store.dispatch('getUser', user.username)
                            .then(function (result) {
                                //set data to the result of the GetUser
                                console.log('result in logon: ', result[0]);
                                let currentUser = result[0];
                                Object.keys(user).forEach(function (key) {
                                    if (user[key].length > 0) {
                                        currentUser[key] = user[key];
                                    }
                                });
                                console.log('this is the current user: ', currentUser, user);
                                that.$store.dispatch('setUser', currentUser);
                            }).then(function () {
                            store.dispatch('getAllSports')
                                .then(function (sportsResult) {
                                    console.log(sportsResult);
                                    router.push('/main')
                                });
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }).catch(function (error) {
                    console.log(error);
                })
            },
            register: function (user) {
                if (user.rolename === 'User') {
                    user.orgid = this.$store.state.settings.user.orgid;
                    user.orgname = this.$store.state.settings.user.orgname;
                }
                console.log('user to register: ', user);
                if (this.$store.state.settings.token !== null) {
                    this.$store.dispatch('register', user)
                        .then(() => this.$router.push('/main'))
                        .catch(err => console.log(err))
                } else {
                    this.$router.push('/logon')
                }
            },
            updateUser: function (updateUser) {
                if (this.$store.state.settings.token !== null) {
                    this.$store.dispatch('updateUser', updateUser)
                        .then(() => this.$router.push('/main'))
                        .catch(err => console.log(err))
                } else {
                    this.$router.push('/logon')
                }

            },
            cancel: function () {
                this.$store.dispatch('cancelLogonForm')
                    .then(() => this.$router.push('/main'))
                    .catch(err => console.log(err))
            },
            //match sports and leagues to show league sublists
            buildSportLeaguesLists(sports, leagues) {
                let store = this.$store;
                sports.forEach(function (sport) {
                    leagues.forEach(function (league) {
                        if (league.sportId === sport.id && !league.addedToSportList) {
                            store.dispatch("addLeagueToSportList", {sportId: sport.id, league: league});
                        }
                    })
                })
            }
        }
    }
</script>

<style>
    v-card {
        text-align: center;
    }
</style>