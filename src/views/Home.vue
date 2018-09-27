<template>
    <div class="home">
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card height="100%">
                        <v-toolbar color="gray" dark>
                            <v-toolbar-title v-if="settings.selectedOption == 'activities'">Activities</v-toolbar-title>
                            <v-toolbar-title v-if="settings.selectedOption == 'leagues'">Leagues</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-spacer></v-spacer>

                        <!--list of leagues-->
                        <v-list two-line class="pr-1" v-if="settings.selectedOption == 'leagues'">
                            <template v-for="league in leagues">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="league.name"></v-list-tile-title>
                                        <v-list-tile-sub-title >{{league.description}}: {{league.currentMembers}} / {{league.maxMembers}}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-btn icon>
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        <v-dialog
                                                v-model="showDeleteModal"
                                                width="25%"
                                                dark>
                                            <v-btn icon
                                                   slot="activator">
                                                <v-icon>
                                                    delete
                                                </v-icon>
                                            </v-btn>
                                            <delete-confirm-popover
                                                    v-model="showDeleteModal"
                                                    @close-delete-modal="closeConfirmDeletePopover">
                                            </delete-confirm-popover>
                                        </v-dialog>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider></v-divider>
                            </template>
                        </v-list>

                        <!--list of activities-->
                        <v-list two-line class="pr-1" v-if="settings.selectedOption == 'activities'">
                            <template v-for="activity in activities">
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="activity.name"></v-list-tile-title>
                                        <v-list-tile-sub-title >{{activity.description}}: '$'{{activity.price}}</v-list-tile-sub-title>
                                        <v-list-tile-sub-title></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-btn icon>
                                            <v-icon>
                                                edit
                                            </v-icon>
                                        </v-btn>
                                    </v-list-tile-action>
                                    <v-list-tile-action>
                                        <v-dialog
                                                v-model="showDeleteModal"
                                                width="25%"
                                                dark>
                                            <v-btn icon
                                                   slot="activator"
                                            @click="showDeleteModal = !showDeleteModal">
                                                <v-icon>
                                                    delete
                                                </v-icon>
                                            </v-btn>
                                            <delete-confirm-popover
                                                    v-model="showDeleteModal"
                                                    @close-delete-modal="closeConfirmDeletePopover">
                                            </delete-confirm-popover>
                                        </v-dialog>
                                    </v-list-tile-action>
                                </v-list-tile>
                                <v-divider></v-divider>
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

    import DeleteConfirmPopover from "@/components/DeleteConfirmPopover.vue";

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
            activities() {
                return this.$store.state.activities;
            },
            leagues() {
                return this.$store.state.leagues;
            }
        },
        methods: {
            closeConfirmDeletePopover(value){
                console.log('got event', value);
                this.$data.showDeleteModal = value;
            }
        }
    }
</script>

<style>
    img {
        padding-top: 2rem;
    }


</style>
