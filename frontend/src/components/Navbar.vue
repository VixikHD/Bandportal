<script setup lang="ts"></script>

<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>
      <v-btn to="/">Bandportal</v-btn>
    </v-app-bar-title>

    <v-btn to="events">Události</v-btn>
    <v-btn to="places">Místa</v-btn>
    <v-btn to="bands">Interpreti</v-btn>

    <v-spacer></v-spacer>

    <v-btn>Uživatel</v-btn>
  </v-app-bar>
</template>

<style scoped></style>
