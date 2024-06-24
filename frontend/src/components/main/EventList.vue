<script setup lang="ts">
import { EventResponse } from "../../api/service/EventService";
import { computed, onMounted, ref } from "vue";
import { dateToString } from "../../utils/DateFormat";
import { BandResponse, readAllBands } from "../../api/service/BandService";
import { PlaceResponse, readAllPlaces } from "../../api/service/PlaceService";

const props = defineProps<{
  events: EventResponse[];
  places: PlaceResponse[];
  bands: BandResponse[];
  sortOrder: "desc" | "asc";
}>();

const emit = defineEmits({
  onUpdate() {},
});

const error = ref(null);
const snackbar = ref(false);
const displayError = (message: string) => {
  snackbar.value = true;
  error.value = message;
};

const headers = [
  {
    key: "eventName",
    title: "Název události",
  },
  {
    key: "eventStart",
    title: "Od",
  },
  {
    key: "eventEnd",
    title: "Do",
  },
  {
    key: "place",
    title: "Místo",
  },
  {
    key: "bands",
    title: "Další kapely",
  },
  {
    key: "id",
    title: "Operace",
  },
];
</script>

<template>
  <div v-if="events.length === 0">Žádné události nebyly nalezeny</div>
  <v-data-table
    v-else
    :items="props.events"
    :headers="headers"
    :sort-by="[{ key: 'eventStart', order: props.sortOrder }]"
    class="mb-2"
  >
    <template v-slot:item.eventName="{ item }">
      <a v-if="item.eventWebsite" :href="item.eventWebsite">{{
        item.eventName
      }}</a>
      <a v-else>{{ item.eventName }}</a>
    </template>
    <template v-slot:item.eventStart="{ item }">
      {{ dateToString(item.eventStart) }}
    </template>
    <template v-slot:item.eventEnd="{ item }">
      <div v-if="item.eventEnd">{{ dateToString(item.eventEnd) }}</div>
      <div v-else>Nezadáno</div>
    </template>
    <template v-slot:item.place="{ item }">
      <a v-if="item.place.placeWebsite" :href="item.place.placeWebsite">{{
        item.place.placeName
      }}</a>
      <a v-else>{{ item.place.placeName }}</a>
    </template>
    <template v-slot:item.bands="{ item }">
      {{ item.bands.map((b) => b.bandName).join(", ") }}
    </template>
    <template v-slot:item.id="{ item }">
      <div class="d-flex justify-start">
        <EditEvent
          :id="item.eventId"
          :name="item.eventName"
          :website="item.eventWebsite ?? ''"
          :start="item.eventStart"
          :end="item.eventEnd ?? ''"
          :place="item.place"
          :bands="item.bands"
          :all-places="props.places"
          :all-bands="props.bands"
          @on-event-modify="emit('onUpdate')"
          @on-error="displayError"
        />
        <DeleteEvent
          :id="item.eventId"
          :name="item.eventName"
          @on-event-modify="emit('onUpdate')"
          @on-error="displayError"
        />
      </div>
    </template>
  </v-data-table>
  <v-snackbar v-model="snackbar" timeout="3000">
    {{ error }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar = false">
        Zavřít
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped></style>
