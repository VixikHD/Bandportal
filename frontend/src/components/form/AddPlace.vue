<script setup lang="ts">
import { ref } from "vue";
import { createPlace } from "../../api/service/PlaceService";

const emit = defineEmits({
  onPlaceModify(): void {},
  onError(message: string): void {},
});

const name = ref("");
const website = ref("");

const add = () => {
  createPlace(
    {
      placeName: name.value,
      placeWebsite: website.value == "" ? null : website.value,
    },
    () => {
      emit("onPlaceModify");
    },
    (e) => {
      emit("onError", e.message);
    },
  );
};
</script>

<template>
  <v-btn prepend-icon="$plus">
    Nové místo / podnik
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Nové místo">
          <v-card-text>
            <v-text-field v-model="name" label="Název místa"></v-text-field>
            <v-text-field
              v-model="website"
              label="Webové stránky místa"
            ></v-text-field>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="isActive.value = false">Zrušit</v-btn>
            <v-btn
              color="primary"
              @click="
                () => {
                  isActive.value = false;
                  add();
                }
              "
              >Uložit</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<style scoped></style>
