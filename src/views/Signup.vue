<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Sign up for Parks and Rec</h3>
            </div>
        </v-card-title>
        <v-form v-model="valid">
            <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="10"
                    label="Username"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="email"
                    :rules="passwordRules"
                    label="Password"
                    required
            ></v-text-field>

            <v-btn color="primary" to="/">LOGON</v-btn>
            <v-btn to="/">cancel</v-btn>
        </v-form>
    </v-card>

</template>

<script>
    export default {
        data: () => ({
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        })
    }
</script>

<style>
    v-card{
        text-align: center;
    }
</style>