<template>

    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                        <v-toolbar color="gray" dark>
                            <v-toolbar-title v-if="settings.selectedOption == 'sports'">
                                 <span v-if="settings.user.orgname">
                                    {{settings.user.orgname}}
                                </span>
                                Sports
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon v-if="settings.user.rolename != 'User'"
                                   @click="openSports">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-spacer></v-spacer>

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

                        <!-- sports list with nested leagues lists -->
                        <v-list>
                            <v-divider></v-divider>
                            <v-list-group
                                    v-for="sport in userSports"
                                    no-action>
                                <v-list-tile slot="activator">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ sport.name }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{sport.description}}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action v-if="settings.user.rolename != 'User'">
                                        <v-btn icon @click="openLeagues(sport)">
                                            <v-icon>
                                                add
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-action v-if="settings.user.rolename != 'User'">
                                        <v-btn icon @click="updateSport(sport)">
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-action v-if="settings.user.rolename != 'User'">
                                        <v-btn icon @click="deleteSport(sport)">
                                            <v-icon>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider></v-divider>

                                <!--nested leagues list for sport-->
                                <v-list-tile
                                        v-for="league in sport.leagues"
                                        :key="league.leagueId"
                                        @click="">
                            <v-list-tile-content>
                                    <v-list-tile-title>{{ league.leagueName }}</v-list-tile-title>
                                     <v-list-tile-sub-title>{{league.description}}
                                      </v-list-tile-sub-title>
                                </v-list-tile-content>
                                    <v-list-tile-action v-if="settings.user.rolename != 'User'">
                                        <v-btn icon @click="updateLeague(league, sport)">
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-action v-if="settings.user.rolename != 'User'">
                                        <v-btn icon @click="deleteLeague(league)">
                                            <v-icon>
                                                delete
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </v-list-group>
                            <v-divider></v-divider>
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

    import DeleteConfirmPopover from "@/components/DeleteConfirmPopover.vue";
    import router from '../router';

    export default {
        name: 'home',
        components: {
            DeleteConfirmPopover
        },
        data: () => {
            return {
                showDeleteModal: false,
                sportsWithLeagues: []
            }
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
            authStatus: function () {
                return this.$store.state.status;
            }
            ,
            sports: function () {
                return this.$store.state.sports;
            },
            userSports: function () {
                return this.$store.state.userSports;
            },
            leagues: function () {
                return this.$store.state.leagues;
            }
        },
        methods: {
            //leagues
            closeConfirmDeletePopover(value) {
                this.$data.showDeleteModal = value;
            },
            openLeagues(sport) {
                this.$store.dispatch("openCreateLeague", sport);
            },
            updateLeague(league, currentSport) {
                this.$store.dispatch("openUpdateLeague", {league: league, currentSport: currentSport});
            },
            deleteLeague: function (league) {
                this.$store.dispatch("deleteLeague", league);
                this.$store.dispatch("getAllSports")

            },
            //sports
            openSports() {
                this.$store.dispatch("openCreateSport");
                router.push('/sports');
            },
            updateSport(sport) {
                this.$store.dispatch("openUpdateSport", sport);
            },
            deleteSport: function (sport) {;
                this.$store.dispatch("deleteSport", sport).then(function (result) {
                    $store.dispatch('getAllSports');
                    router.push('/main');

                });
            }
        }
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }


</style>
