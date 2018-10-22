<template>
    <v-card class="ma-3">
        <!--@submit.prevent associates login to the form-->
        <form class="ma-1">
            <!--Register League-->
            <div v-if="settings.createLeague && !settings.editLeague">
                <v-layout pb-3>
                    <v-flex pr-3>
                        <v-text-field
                                label="League Name"
                                required
                                v-model="league.leaguename">
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
                        <v-checkbox label="Co Ed?" v-model="league.coed"></v-checkbox>
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex pl-3>
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
            <v-btn v-if="!settings.editleague && !settings.registerleague" color="primary" to="/" type="submit"
                   @click="login(league)">
                CREATE LEAGUE
            </v-btn>
            <v-btn @click="cancel">cancel</v-btn>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            createLeague: function (league) {
                console.log(league);
                this.$store.dispatch('createLeague', league)
                    .then(() => console.log('creating leaugue'))
                    .catch(err => console.log(err))
            },
            updateLeague: function (league) {

            },
            cancel: function () {
                this.$store.dispatch('cancelLeagueForm')
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style>
</style>