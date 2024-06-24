<script setup lang="ts">
import { ref } from "vue";
import { deleteBand, updateBand } from "../../api/service/BandService";

const props = defineProps<{
  id: number;
  name: string;
}>();

const emit = defineEmits({
  onPlaceModify() {},
  onError(message: string) {},
});

const remove = () => {
  deleteBand(
    props.id,
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
    Smazat
    <v-dialog activator="parent" max-width="550">
      <template v-slot:default="{ isActive }">
        <v-card title="Smazat interpreta">
          <v-card-text>
            <span
              >Opravdu chcete smazat interpreta {{ props.name }} z
              databáze?</span
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
