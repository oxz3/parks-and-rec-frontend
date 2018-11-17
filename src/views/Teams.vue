<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                        <v-toolbar color="gray" dark>
                            <v-toolbar-title>
                                Teams
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                        </v-toolbar>

                        <v-spacer></v-spacer>

                        <!-- sports list with nested leagues lists -->
                        <v-list>
                          <div class="loading" v-if="loading">
                            Loading...
                          </div>

                          <div v-if="error" class="error">
                            {{ error }}
                          </div>

                          <div v-if="teams" class="content">
                            <v-list-group
                                    v-for="team in teams"
                                    no-action>
                                <v-list-tile slot="activator">
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ team.teamName }}</v-list-tile-title>
                                        <v-list-tile-sub-title>{{team.description}}
                                        </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list-group>
                          </div>
                        </v-list>
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
      data () {
        return {
          loading: false,
          teams: null,
          error: null
        }
      },
      created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData()
      },
      watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
      },
      methods: {
        fetchData () {
          this.error = this.teams = null;
          this.loading = true;
          // replace `getteams` with your data fetching util / API wrapper
          var leagueId = this.$route.params.id;
          var that = this;
          this.$store.dispatch("getAllTeams", leagueId).then(() => {
            that.loading = false;
            that.teams = this.$store.state.teams;
          })
        }
      }
    }
</script>

<style>

</style>
