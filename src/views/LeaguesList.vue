<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                          <!--list of leagues-->
                        <v-layout row>
                                <v-flex>
                                <v-card>
                                    <v-toolbar color="indigo" dark>
                                    <v-toolbar-title>Leagues</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-list>
                                    <v-list-tile     v-for="item in allLeagues"    :key="item.description">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="item.description"></v-list-tile-title>
                                    </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                                </v-card>
                                </v-flex>
                        </v-layout>
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

    import DeleteConfirmPopover from "@/components/DeleteConfirmPopover.vue";
    import router from '../router';

    export default {
        name: 'home',
        components: {
            DeleteConfirmPopover
        },
        data: () => {
            return {
                showDeleteModal: false
            }
        },
        computed: {
            authStatus: function () {
                return this.$store.state.status;
            },
            allLeagues: function() {
                return this.$store.state.leagues;
            }
        },
        methods: {
            closeConfirmDeletePopover(value) {
                this.$data.showDeleteModal = value;
            },
            openLeagues(){
                this.$store.dispatch("openCreateLeague");
                router.push('/leagues');
            },
            updateLeague(league){
                this.$store.dispatch("openUpdateLeague", league);
            }
        }
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }


</style>
