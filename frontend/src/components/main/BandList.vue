<script setup lang="ts">
import { BandResponse } from "../../api/service/BandService";
import { computed, ref } from "vue";

const props = defineProps<{
  bands: BandResponse[];
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
    key: "bandName",
    title: "Název interpreta / kapely",
  },
  {
    key: "bandWebsite",
    title: "Webové stránky",
  },
  {
    key: "id",
    title: "Operace",
  },
];
</script>

<template>
  <v-data-table
    :items="bands"
    :headers="headers"
    :sort-by="[{ key: 'bandName', order: 'asc' }]"
    class="mb-2"
  >
    <template v-slot:item.bandWebsite="{ item }">
      <a v-if="item.bandWebsite !== null" :href="item.bandWebsite">{{
        item.bandWebsite
      }}</a>
      <a v-else>Nespecifikováno</a>
    </template>

    <template v-slot:item.id="{ item }">
      <EditBand
        :id="item.bandId"
        :name="item.bandName"
        :website="item.bandWebsite ?? ''"
        @on-place-modify="emit('onUpdate')"
        @on-error="displayError"
      />
      <DeleteBand
        :id="item.bandId"
        :name="item.bandName"
        @on-place-modify="emit('onUpdate')"
        @on-error="displayError"
      />
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
