<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Logon to Parks and Rec</h3>
            </div>
        </v-card-title>
        <form>
            <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="10"
                    label="Username"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
            ></v-text-field>
            <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="Password"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
            ></v-text-field>
            <v-btn color="primary" to="/">LOGON</v-btn>
            <v-btn to="/">cancel</v-btn>
        </form>

    </v-card>
</template>