<template>
    <v-card class="ma-3">
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Logon to Parks and Rec</h3>
            </div>
        </v-card-title>
        <form class="ma-1">
            <v-text-field
                    label="Username"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"></v-text-field>
            <v-text-field
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