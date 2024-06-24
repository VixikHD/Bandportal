<script setup lang="ts">
import { onMounted, ref } from "vue";
import { readAllBands } from "../api/service/BandService";
import { readAllPlaces } from "../api/service/PlaceService";
import { readAllEvents, readUpcomingEvents } from "../api/service/EventService";
import { ErrorResponse } from "../api/ErrorResponse";

const bands = ref([]);
const places = ref([]);
const events = ref([]);
const upcomingEvents = ref([]);

onMounted(() => {
  readAllBands(
    (b) => {
      bands.value = b;
    },
    (r: ErrorResponse) => {},
  );
  readAllPlaces(
    (p) => {
      places.value = p;
    },
    (r: ErrorResponse) => {},
  );
  readAllEvents(
    (e) => {
      events.value = e;
    },
    (r: ErrorResponse) => {},
  );
  readUpcomingEvents(
    (e) => {
      upcomingEvents.value = e;
    },
    (r: ErrorResponse) => {},
  );
});
</script>

<template>
  <v-container>
    <div class="text-h4 mb-3">Přehled portálu</div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Události</v-card-title>
          <v-card-text
            >Počet proběhlých událostí: {{ events.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="events">Správa událostí</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Nadcházející události</v-card-title>
          <v-card-text
            >Počet naplánovaných událostí:
            {{ upcomingEvents.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="events">Správa událostí</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Místa, podniky</v-card-title>
          <v-card-text
            >Počet registrovaných míst: {{ places.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="places">Správa míst a podniků</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Interpreti</v-card-title>
          <v-card-text
            >Počet registrovaných interpretů: {{ bands.length }}</v-card-text
          >
          <v-card-actions>
            <v-btn to="bands">Správa interpretů</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
