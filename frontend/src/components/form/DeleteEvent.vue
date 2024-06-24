<script setup lang="ts">
import { deleteEvent } from "../../api/service/EventService";
import { HttpStatusCode } from "axios";

const props = defineProps<{
  id: number;
  name: string;
}>();

const emit = defineEmits({
  onEventModify(): void {},
  onError(message: string): void {},
});

const remove = () => {
  deleteEvent(
    props.id,
    () => {
      emit("onEventModify");
    },
    (e) => {
      let message = "Nastala neznámá chyba";
      if (e.status == HttpStatusCode.NotFound) {
        message =
          "Požadovaná událost nebyla nalezeno. Pravděpodobně ji už někdo smazal.";
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
        <v-card title="Smazat místo">
          <v-card-text>
            <span>Opravdu chcete událost {{ props.name }} z databáze?</span>
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
