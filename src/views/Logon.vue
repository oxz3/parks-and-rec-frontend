<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0">Welcome to Parks and Rec</h3>
            </div>
        </v-card-title>
        <!--@submit.prevent associates login to the form-->
        <form class="ma-1" @submit.prevent="login">
            <v-checkbox label="New to Parks and Rec?" v-model="isNewUser"></v-checkbox>
            <div v-if="isNewUser">
                <v-text-field
                        label="Create New Username"
                        required>
                </v-text-field>
                <v-text-field
                        label="Create New Password"
                        required>
                </v-text-field>
            </div>
            <div v-if="!isNewUser">
                <v-text-field
                        label="Enter Username"
                        required
                        v-model="username">
                </v-text-field>
                <v-text-field
                        label="Enter Password"
                        required
                        v-model="password">
                </v-text-field>
            </div>
            <v-btn v-if="!isNewUser" color="primary" to="/" type="submit" @click="login">LOGON</v-btn>
            <v-btn v-if="isNewUser" color="primary" to="/" type="submit">SIGN UP</v-btn>
            <v-btn to="/">cancel</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            isNewUser: false,
            isAdmin: false,
            id: null,
            username: 'Admin',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            password: 'Admin',
            passwordConfirmation: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ]
        }),
        methods: {
            login: function () {
                //let id = this.$data.id;
                let username = this.$data.username;
                let password = this.$data.password;
                console.log('login method: ', username, password);
                this.$store.dispatch('login', { username, password})
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            },
            register: function () {
                let data = {
                    username: this.$data.username,
                    password: this.$data.password,
                    isAdmin: this.$data.isAdmin
                };
                this.$store.dispatch('register', data)
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