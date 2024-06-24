<script setup lang="ts">
import { PlaceResponse } from "../../api/service/PlaceService";
import { ref } from "vue";
import EditPlace from "../form/EditPlace.vue";
import DeletePlace from "../form/DeletePlace.vue";

const props = defineProps<{
  places: PlaceResponse[];
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
    key: "placeName",
    title: "Název místa / podniku",
  },
  {
    key: "placeWebsite",
    title: "Webové stránky",
  },
  {
    key: "placeId",
    title: "Operace",
  },
];
</script>

<template>
  <v-data-table
    :items="places"
    :headers="headers"
    :sort-by="[{ key: 'name', order: 'asc' }]"
    class="mb-2"
  >
    <template v-slot:item.placeWebsite="{ item }">
      <a v-if="item.placeWebsite !== null" :href="item.placeWebsite">{{
        item.placeWebsite
      }}</a>
      <span v-else>Nespecifikováno</span>
    </template>
    <template v-slot:item.placeId="{ item }">
      <EditPlace
        :id="item.placeId"
        :name="item.placeName"
        :website="item.placeWebsite ?? ''"
        @on-place-modify="emit('onUpdate')"
        @on-error="displayError"
      />
      <DeletePlace
        :id="item.placeId"
        :name="item.placeName"
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
