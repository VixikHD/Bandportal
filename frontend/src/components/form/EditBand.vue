<script setup lang="ts">
import { ref } from "vue";
import { updatePlace } from "../../api/service/PlaceService";
import { updateBand } from "../../api/service/BandService";

const props = defineProps<{
  id: number;
  name: string;
  website: string;
}>();

const emit = defineEmits({
  onPlaceModify() {},
  onError(message: string): void {},
});

const name = ref(props.name);
const website = ref(props.website);

const update = () => {
  updateBand(
    props.id,
    {
      bandName: name.value,
      bandWebsite: website.value === "" ? null : website.value,
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
  <v-btn size="small">
    Upravit
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
                  update();
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
