<!--Display a message asking user if they are sure they want to delete an item-->
<template>
    <v-card>
        <v-card-text>
            <span>
                Are you sure you want to delete?</span>
            </span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="red"
                    flat
                    @click="closeModal">
                DELETE
            </v-btn>
            <v-btn
                    flat
                    @click="closeModal">
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'delete-confirm-popover',
        data: function () {
            return {
                dialogOpen: false
            }
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            },
        },
        methods: {
            closeModal: function (event) {
                console.log('closing', event);
                this.$emit('close-delete-modal', false);
            }
        },
        filters: {
            singular: function (value) {
                return value.substring(0, value.length - 1);
            }
        }
    }
</script>