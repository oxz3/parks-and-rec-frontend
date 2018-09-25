<!--Display a message about leagues/activities from the settings menu-->
<template>
    <div class="text-xs-center">
        <v-card>
            <v-card-title>
                <div>
                    <span class="blue--text">
                        Select this option to view, created, edit, or delete
                        <span>{{settings.selectedOption}}</span>
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