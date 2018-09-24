<template>
    <v-card height="100%">
        <v-toolbar color="gray" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>

            <v-toolbar-title>Manage Application</v-toolbar-title>
        </v-toolbar>
        <v-spacer></v-spacer>
        <v-list>
            <v-list-tile
                    @click="">
                <v-list-tile-action>
                    <v-icon>info</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>Add activities</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
                    @click="">
                <v-list-tile-action>
                    <v-icon>info</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>Add Leagues</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

        </v-list>
    </v-card>

</template>