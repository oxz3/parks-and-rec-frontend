<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0">Welcome to Parks and Rec</h3>
            </div>
        </v-card-title>
        <form class="ma-1">
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
                        required>
                </v-text-field>
                <v-text-field
                        label="Enter Password"
                        required>
                </v-text-field>
            </div>
            <v-btn v-if="!isNewUser" color="primary" to="/">LOGON</v-btn>
            <v-btn v-if="isNewUser" color="primary" to="/">SIGN UP</v-btn>
            <v-btn to="/">cancel</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            isNewUser: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ]
        })
    }
</script>

<style>
    v-card {
        text-align: center;
    }
</style>