<template>
  <v-app>
    <navbar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import {
  EventResponse,
  readAllEvents,
  readUpcomingEvents,
} from "./api/service/EventService";
import { PlaceResponse, readAllPlaces } from "./api/service/PlaceService";
import { BandResponse, readAllBands } from "./api/service/BandService";

// Places
const places: Ref<PlaceResponse[]> = ref([]);

const fetchPlaces = () => {
  readAllPlaces(
    (p: PlaceResponse[]) => {
      places.value = p;
    },
    (error) => {
      // TODO
    },
  );
};

// Bands
const bands: Ref<BandResponse[]> = ref([]);

const fetchBands = () => {
  readAllBands((b: BandResponse[]) => {
    bands.value = b;
  });
};

// Events
const events: Ref<EventResponse[]> = ref([]);
const upcomingEvents: Ref<EventResponse[]> = ref([]);

const fetchEvents = () => {
  readAllEvents((e: EventResponse[]) => {
    events.value = e;
    console.log(e);
  });
  readUpcomingEvents((e: EventResponse[]) => {
    upcomingEvents.value = e;
  });
};
</script>
