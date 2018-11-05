<template>
    <v-card height="100%">
        <v-toolbar color="gray" dark>
            <v-toolbar-title>Manage Application</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-list>
            <v-list-tile>
                <v-list-tile-action>
                    <v-menu
                            :close-on-content-click="false"
                            :nudge-width="200"
                            offset-x
                            dark>
                        <v-btn icon
                               slot="activator"
                               @click="setSettingInfo('user')">
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                        <popover-menu></popover-menu>
                    </v-menu>
                </v-list-tile-action>
                <v-list-tile-content @click="openEditUserForm(settings.user)">
                    <v-list-tile-title class="font-weight-bold">Manage User</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>

</template>

<script>

    import PopoverMenu from "@/components/SettingsInfoPopover.vue";

    export default {
        name: 'settings-menu',
        components: {
            PopoverMenu
        },
        data: function () {
            return {
                settingsMenuOpen: false,
            }
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
        },
        methods: {
            setManagedOption: function (option) {
                this.$store.dispatch("setManagedOption", option);
                this.$emit('close-settings-menu', false);
            },
            setSettingInfo: function (option) {
                this.$store.dispatch("setSettingInfo", option);
            },
            openEditUserForm: function (user) {
                this.$store.dispatch("editUser", user);
            }
        },
        filters: {
            capitalize: function (value) {
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        }
    }
</script>