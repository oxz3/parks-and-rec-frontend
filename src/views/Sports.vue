<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                        <!--displays message while user is logging in-->
                        <v-dialog
                                v-model="authStatus"
                                hide-overlay
                                width="300">
                            <v-card
                                    dark
                                    v-if="authStatus == 'logging in'">
                                <v-card-text>
                                    Logging on...
                                    <v-progress-linear
                                            indeterminate
                                            color="white"
                                            class="mb-0"
                                    ></v-progress-linear>
                                </v-card-text>
                            </v-card>
                        </v-dialog>
                        <!--list of sports-->
                        <v-layout row>
                                <v-flex>
                                <v-card>
                                    <v-toolbar color="indigo" dark>
                                    <v-toolbar-side-icon></v-toolbar-side-icon>
                                    <v-toolbar-title>Sports</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-list>
                                    <v-list-tile     v-for="item in allSports"    :key="item.name"  @click="openLeagues()">
                                    <v-list-tile-content>
                                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
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
            settings() {
                return this.$store.state.settings;
            },
            authStatus: function () {
                return this.$store.state.status;
            },
            allSports:function() {
                return this.$store.state.sports;
            }
        },
        methods: {
            closeConfirmDeletePopover(value) {
                this.$data.showDeleteModal = value;
            },
            openLeagues(){
                alert("ok")
                this.$store.dispatch("getLeagues");
                router.push('/leagueslist');
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
