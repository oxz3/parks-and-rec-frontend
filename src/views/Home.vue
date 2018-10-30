<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <card>
                        <v-card>
                            <h1>
                                Welcome to Parks and Rec.  Loading Sports and Leagues...
                            </h1>
                        </v-card>
                    </card>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                    <v-card>
                        <img alt="Vue logo" src="../assets/logo.jpg" class="pt-0">
                    </v-card>
                </v-flex>

            </v-layout>
        </v-container>
    </div>
</template>

<script>

    import router from '../router';

    export default {
        name: 'home',
        components: {
        },
        data: () => {
            return {
            }
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
            authStatus: function () {
                return this.$store.state.status;
            }
        },
        methods: {}
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }


</style>
