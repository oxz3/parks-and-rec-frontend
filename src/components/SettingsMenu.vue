<template>
    <v-card height="100%">
        <v-toolbar color="gray" dark>
            <v-toolbar-title>Manage Application</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-list>
            <template v-for="option in settings.options">
                <v-list-tile
                        @click="setManagedOption(option)">
                    <v-list-tile-action>
                        <v-menu
                                :close-on-content-click="false"
                                :nudge-width="200"
                                offset-x
                                dark>
                            <v-btn icon
                                   slot="activator">
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                            <popover-menu></popover-menu>
                        </v-menu>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>Manage {{ option | capitalize }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </template>
        </v-list>
    </v-card>

</template>

<script>

    import PopoverMenu from "@/components/PopoverMenu.vue";

    export default {
        name: 'settings-menu',
        components: {
            PopoverMenu
        },
        data: function () {
            return {}
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
        },
        methods: {
            setManagedOption: function (option) {
                console.log(option);
                this.$store.dispatch("setManagedOption", option);
            }
        },
        filters: {
            capitalize: function (value) {
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        }
    }
</script>