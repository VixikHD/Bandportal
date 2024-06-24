<script setup lang="ts">
import { deletePlace } from "../../api/service/PlaceService";
import { HttpStatusCode } from "axios";

const props = defineProps<{
  id: number;
  name: string;
}>();

const emit = defineEmits({
  onPlaceModify() {},
  onError(message: string) {},
});

const remove = () => {
  deletePlace(
    props.id,
    () => {
      emit("onPlaceModify");
    },
    (e) => {
      let message = "Nastala neznámá chyba";
      if (e.status == HttpStatusCode.Conflict) {
        message = "Na místě je závislá událost a tudíž nejde smazat.";
      } else if (e.status == HttpStatusCode.NotFound) {
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
    Smazat
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Smazat interpreta">
          <v-card-text>
            <span
              >Opravdu chcete místo / podnik {{ props.name }} z databáze?</span
            >
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
                  remove();
                }
              "
              >Smazat</v-btn
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-btn>
</template>

<style scoped></style>
