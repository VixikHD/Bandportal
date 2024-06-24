<script setup lang="ts">
import { ref } from "vue";
import { createBand } from "../../api/service/BandService";

const emit = defineEmits({
  onBandModify(): void {},
  onError(message: string): void {},
});

const name = ref("");
const website = ref("");

const add = () => {
  createBand(
    {
      bandName: name.value,
      bandWebsite: website.value == "" ? null : website.value,
    },
    () => {
      name.value = website.value = "";
      emit("onBandModify");
    },
    (e) => {
      emit("onError", e.message);
    },
  );
};
</script>

<template>
  <v-btn prepend-icon="$plus">
    Nový interpret / kapela
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Upravit interpreta">
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Název interpreta"
            ></v-text-field>
            <v-text-field
              v-model="website"
              label="Webové stránky interpreta"
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
