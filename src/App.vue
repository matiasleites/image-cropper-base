<template>
  <v-app>
    <v-main>
      <div class="d-flex flex-column">
        <div
          style="max-width: 800px; border: 1px solid #d1d1d1; width:100%;"
          class="mx-auto mt-8 rounded"
        >
          <div style="min-height: 70px" class="d-flex px-4">
            <h3 class="my-auto">Cortar imagem</h3>
            <div class="ml-auto my-auto"><v-icon>mdi-close</v-icon></div>
          </div>
          <AImageCropper
            :img-url="imgUrl"
            @image="
              (e) => {
                previewImage = e;
              }
            "
          />
        </div>

        <div style="max-width: 800px; width: 100%" class="mx-auto mt-8">
          <v-text-field
            placeholder="Url Imagem"
            label="Url da imagem"
            v-model="imgUrl"
            outlined
            dense
            hide-details
          ></v-text-field>

          <div v-if="previewImage" class="mt-1 d-flex flex-column pb-10">
            <small>Pre-visualização da imagem</small>

            <img
              :src="previewImage"
              alt="Imagem"
              style="max-width: 100%; height: auto"
            />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AImageCropper from "./components/AImageCropper.vue";

export default Vue.extend({
  name: "App",

  components: {
    AImageCropper,
  },

  data: () => ({
    imgUrl:
      "https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    previewImage: "",
  }),
});
</script>
