<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import { BandResponse, readAllBands } from "../api/service/BandService";

const bands: Ref<BandResponse[]> = ref([]);

const fetchAllBands = () => {
  readAllBands(
    (p) => {
      bands.value = p;
    },
    () => {},
  );
};

onMounted(fetchAllBands);
</script>

<template>
  <v-container>
    <div class="d-flex justify-space-between mb-2">
      <div class="text-h4">Interpreti a kapely</div>
      <AddBand @on-band-modify="fetchAllBands" />
    </div>
    <BandList :bands="bands" @on-update="fetchAllBands" />
  </v-container>
</template>

<style scoped></style>
