<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                        <v-toolbar color="gray" dark>
                            <v-toolbar-side-icon></v-toolbar-side-icon>

                            <v-toolbar-title>Leagues</v-toolbar-title>
                        </v-toolbar>
                        <v-spacer></v-spacer>
                        <v-list two-line class="pr-1">
                            <template v-for="league in leagues">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="league.name"></v-list-tile-title>
                                        <v-list-tile-sub-title >{{league.description}}: {{league.currentMembers}} / {{league.maxMembers}}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-btn icon>
                                            <v-icon color="grey lighten-1">info</v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
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
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import VListTileAction from "vuetify/src/components/VList/VListTileAction";

    export default {
        name: 'home',
        components: {
            VListTileAction,
            HelloWorld
        },
        computed: {
            sports() {
                return this.$store.state.sports;
            },
            leagues() {
                return this.$store.state.leagues;
            }
        }
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }


</style>
