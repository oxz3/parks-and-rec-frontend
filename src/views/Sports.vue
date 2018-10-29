<template>
    <v-card class="ma-3">
        <v-card-title class="justify-center">
            <div>
                <h3 class="headline mb-0" v-if="settings.createSport && !settings.editSport">
                    Create a New Sport</h3>
                <h3 class="headline mb-0" v-if="!settings.createSport && settings.editSport">
                    Edit Sport</h3>

            </div>
        </v-card-title>
        <form class="ma-3">
            <!--Register Sport-->
            <div>
                <v-layout class="pb-3">
                    <v-flex class="pr-3">
                        <v-text-field
                                label="Sport Name"
                                required
                                v-model="sport.name">
                        </v-text-field>
                        <v-text-field
                                label="Description"
                                required
                                v-model="sport.description">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </div>
            <div class="pb-4">
                <v-btn v-if="!settings.editSport && settings.createSport" color="primary" to="/" type="submit"
                       @click="createSport(sport)">
                    CREATE SPORT
                </v-btn>
                <v-btn v-if="settings.editSport && !settings.createSport" color="primary" to="/" type="submit"
                       @click="updateSport(sport)">
                    EDIT SPORT
                </v-btn>
                <v-btn @click="cancel">cancel</v-btn>
            </div>
        </form>
    </v-card>
</template>

<script>
    export default {

        created: function () {

            if (this.$store.state.settings.createSport) {
                this.sport = Object.assign({}, this.$store.state.settings.templateSport);
                console.log('Sport in logon form create', this.sport);
            }
            if (this.$store.state.settings.editSport) {
                this.sport = Object.assign({}, this.$store.state.settings.sport);
                console.log('sport in logon form edit', this.sport);
            }


            // `this` points to the vm instance
            console.log('a is: ' + this);
            this.sport = Object.assign({}, this.$store.state.settings.sport);
            console.log('sport in create sport component', this.sport);
        }
        ,
        data: () => ({
            sport: {}
        }),
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            createSport: function (sport) {
                console.log(sport);
                if (!sport.sportId) {
                    sport.sportId = 1;
                }
                this.$store.dispatch('createSport', sport)
                    .then(() => console.log('creating sport'))
                    .catch(err => console.log(err))
            },
            updateSport: function (sport) {
                console.log(sport);
                this.$store.dispatch('updateSport', sport)
                    .then(() => console.log('updating sport'))
                    .catch(err => console.log(err))
            },
            cancel: function () {
                this.$store.dispatch('cancelSportsForm')
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style>
</style>