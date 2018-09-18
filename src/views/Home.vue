<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.jpg">
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-list two-line>
                        <template v-for="(sport, index) in sports">
                            <v-list-tile :key="sport">
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="sport.name"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="sport.description"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>

                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        computed: {
            sports() {
                return this.$store.state.sports;
            }
        }
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }
</style>
