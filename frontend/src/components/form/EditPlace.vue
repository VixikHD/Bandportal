<script setup lang="ts">
import { ref } from "vue";
import { updatePlace } from "../../api/service/PlaceService";
import { HttpStatusCode } from "axios";

const props = defineProps<{
  id: number;
  name: string;
  website: string;
}>();

const emit = defineEmits({
  onPlaceModify(): void {},
  onError(message: string): void {},
});

const name = ref(props.name);
const website = ref(props.website);

const update = () => {
  updatePlace(
    props.id,
    {
      placeName: name.value,
      placeWebsite: website.value === "" ? null : website.value,
    },
    () => {
      emit("onPlaceModify");
    },
    (e) => {
      let message = "Nastala neznámá chyba";
      if (e.status == HttpStatusCode.NotFound) {
        message =
          "Požadované místo nebylo nalezeno. Pravděpodobně ho už někdo smazal.";
      }

      emit("onError", message);
    },
  );
};
</script>

<template>
  <v-btn size="small">
    Upravit
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Upravit místo / podnik">
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Název místa / podniku"
            ></v-text-field>
            <v-text-field
              v-model="website"
              label="Webové stránky místa / podniku"
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
