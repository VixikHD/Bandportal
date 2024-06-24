<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { PlaceResponse, readAllPlaces } from "../api/service/PlaceService";

const places: Ref<PlaceResponse[]> = ref([]);

const fetchAllPlaces = () => {
  readAllPlaces(
    (p) => {
      places.value = p;
    },
    () => {},
  );
};

onMounted(fetchAllPlaces);
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between mb-2">
      <div class="text-h4">Místa a podniky</div>
      <AddPlace @on-place-modify="fetchAllPlaces" />
    </div>

    <PlaceList :places="places" @on-update="fetchAllPlaces" />
  </v-container>
</template>

<style scoped></style>
