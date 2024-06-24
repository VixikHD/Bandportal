<script setup lang="ts">
import {
  EventResponse,
  readAllEvents,
  readUpcomingEvents,
} from "../api/service/EventService";
import { onMounted, Ref, ref } from "vue";
import { BandResponse, readAllBands } from "../api/service/BandService";
import { PlaceResponse, readAllPlaces } from "../api/service/PlaceService";
import { ErrorResponse } from "../api/ErrorResponse";

const events: Ref<EventResponse[]> = ref([]);
const upcomingEvents: Ref<EventResponse[]> = ref([]);

const bands = ref([]);
const places = ref([]);

const fetchAllEvents = () => {
  readAllEvents(
    (e: EventResponse[]) => {
      events.value = e;
    },
    (r: ErrorResponse) => {},
  );
  readUpcomingEvents(
    (e: EventResponse[]) => {
      upcomingEvents.value = e;
    },
    (r: ErrorResponse) => {},
  );
};

onMounted(() => {
  readAllBands(
    (b: BandResponse[]) => {
      bands.value = b;
    },
    (r: ErrorResponse) => {},
  );
  readAllPlaces(
    (p: PlaceResponse[]) => {
      places.value = p;
    },
    (r: ErrorResponse) => {},
  );

  fetchAllEvents();
});
</script>

<template>
  <v-container>
    <div class="mb-4">
      <div class="d-flex justify-space-between mb-2">
        <div class="text-h4">Nadcházející události</div>
        <AddEvent
          :bands="bands"
          :places="places"
          @on-event-modify="fetchAllEvents"
        />
      </div>
      <EventList
        :events="upcomingEvents"
        :bands="bands"
        :places="places"
        sort-order="asc"
        @on-update="fetchAllEvents"
      />
    </div>

    <div>
      <div class="text-h4 mb-2">Všechny události</div>
      <EventList
        :events="events"
        :bands="bands"
        :places="places"
        sort-order="desc"
        @on-update="fetchAllEvents"
      ></EventList>
    </div>
  </v-container>
</template>

<style scoped></style>
