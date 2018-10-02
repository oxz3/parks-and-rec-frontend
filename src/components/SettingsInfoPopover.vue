<!--Display a message about leagues/activities from the settings menu-->
<template>
    <div class="text-xs-center">
        <v-card v-if="settings.info.selected !='user'">
            <v-card-title>
                <div>
                    <span>
                        Select this option to view, create, edit, or delete
                        <span>{{settings.info.selected}}</span>
                    </span>
                </div>
            </v-card-title>
        </v-card>
        <v-card v-if="settings.info.selected == 'user'">
            <v-card-title>
                <div>
                    <span>
                        Select this option to change your password
                    </span>
                </div>
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'popover-menu',
        data: function () {
            return {}
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
        },
        methods: {}
    }
</script>