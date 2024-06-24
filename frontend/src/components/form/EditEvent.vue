<script setup lang="ts">
import { ref } from "vue";
import { updateEvent } from "../../api/service/EventService";
import { PlaceResponse } from "../../api/service/PlaceService";
import { BandResponse } from "../../api/service/BandService";

const props = defineProps<{
  id: number;
  name: string;
  website: string;
  start: string;
  end: string;
  place: PlaceResponse;
  bands: BandResponse[];

  allPlaces: PlaceResponse[];
  allBands: BandResponse[];
}>();

const emit = defineEmits({
  onEventModify() {},
  onError(message: string): void {},
});

const name = ref(props.name);
const website = ref(props.website);
const start = ref(props.start);
const end = ref(props.end);

const place = ref(props.place);
const bands = ref(props.bands);

const update = () => {
  updateEvent(
    props.id,
    {
      eventName: name.value,
      eventWebsite: website.value === "" ? null : website.value,
      eventStart: start.value,
      eventEnd: end.value,
      placeId: place.value.placeId,
      bands: bands.value.map((b) => b.bandId),
    },
    () => {
      emit("onEventModify");
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
        <v-card title="Upravit událost">
          <v-card-text>
            <v-text-field v-model="name" label="Název události"></v-text-field>
            <v-text-field
              v-model="website"
              label="Webové stránky události"
            ></v-text-field>
            <div class="d-flex">
              <v-text-field
                v-model="start"
                label="Začátek události"
                type="datetime-local"
              ></v-text-field>
              <v-text-field
                v-model="end"
                label="Konec události"
                type="datetime-local"
              ></v-text-field>
            </div>
            <v-select
              v-model="place"
              :item-props="
                (p: PlaceResponse) => {
                  return { title: p.placeName };
                }
              "
              :items="
                allPlaces.sort((a, b) => a.placeName.localeCompare(b.placeName))
              "
              label="Místo konání"
            ></v-select>
            <v-select
              v-model="bands"
              :item-props="
                (b: BandResponse) => {
                  return { title: b.bandName };
                }
              "
              :items="
                allBands.sort((a, b) => a.bandName.localeCompare(b.bandName))
              "
              label="Kapely"
              multiple
            ></v-select>
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
