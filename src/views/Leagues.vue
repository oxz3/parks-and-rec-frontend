<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0" v-if="settings.createLeague && !settings.editLeague">
                    Create a New League</h3>
                <h3 class="headline mb-0" v-if="!settings.createLeague && settings.editLeague">
                    Edit League</h3>

            </div>
        </v-card-title>
        <form class="ma-3">
            <!--Register League-->
            <div>
                <v-layout class="pb-3">
                    <v-flex class="pr-3">
                        <v-text-field
                                label="League Name"
                                required
                                v-model="league.leagueName">
                        </v-text-field>
                        <v-text-field
                                label="Description"
                                required
                                v-model="league.description">
                        </v-text-field>
                        <v-text-field
                                label="Sport"
                                required
                                v-model="league.sportId">
                        </v-text-field>
                        <v-text-field
                                label="Age Min"
                                required
                                v-model="league.ageMin">
                        </v-text-field>
                        <v-text-field
                                label="Age Max"
                                required
                                v-model="league.ageMax">
                        </v-text-field>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex class="pl-3">
                        <v-checkbox label="Co Ed?" v-model="league.coed"></v-checkbox>
                        <v-flex>
                            <v-text-field
                                    label="Minimum Teams"
                                    required
                                    v-model="league.teamMin">
                            </v-text-field>
                            <v-text-field
                                    label="Maximum Teams"
                                    required
                                    v-model="league.teamMax">
                            </v-text-field>
                        </v-flex>

                        <v-text-field
                                label="Schedule"
                                required
                                v-model="league.leagueSchedule">
                        </v-text-field>
                        <v-text-field
                                label="Rules"
                                required
                                v-model="league.leagueRules">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <div class="pb-4">
                <v-btn v-if="!settings.editLeague && settings.createLeague" color="primary" to="/" type="submit"
                       @click="createLeague(league)">
                    CREATE LEAGUE
                </v-btn>
                <v-btn v-if="settings.editLeague && !settings.createLeague" color="primary" to="/" type="submit"
                       @click="updateLeague(league)">
                    EDIT LEAGUE
                </v-btn>
                <v-btn @click="cancel">cancel</v-btn>
            </div>
        </form>
    </v-card>
</template>

<script>
    export default {

        created: function () {

            if (this.$store.state.settings.createLeague) {
                this.league = Object.assign({}, this.$store.state.settings.templateLeague);
                console.log('league in logon form create', this.league);
            }
            if (this.$store.state.settings.editLeague) {
                this.league = Object.assign({}, this.$store.state.settings.league);
                console.log('league in logon form edit', this.league);
            }


            // `this` points to the vm instance
            console.log('a is: ' + this);
            this.league = Object.assign({}, this.$store.state.settings.league);
            console.log('league in create league component', this.league);
        }
        ,
        data: () => ({
            league: {}
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            createLeague: function (league) {
                console.log(league);
                if(!league.leagueId){
                    league.leagueId = 1;
                }
                this.$store.dispatch('createLeague', league)
                    .then(() => console.log('creating league'))
                    .catch(err => console.log(err))
            },
            updateLeague: function (league) {
                console.log(league);
                this.$store.dispatch('updateLeague', league)
                    .then(() => console.log('updating league'))
                    .catch(err => console.log(err))
            },
            cancel: function () {
                this.$store.dispatch('cancelLeaguesForm')
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style>
</style>