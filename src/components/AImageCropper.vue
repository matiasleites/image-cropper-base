<template>
  <div>
    <cropper
      ref="cropper"
      class="class-cropper"
      background-class="class-cropper__background"
      foreground-class="class-cropper__foreground"
      image-restriction="stencil"
      default-boundaries="fill"
      :stencil-size="stencilSize"
      :stencil-props="stencilProps"
      :transitions="false"
      :debounce="false"
      :default-size="defaultSize"
      :src="imgUrl"
      @change="onChange"
    />
    <a-image-cropper-zoom-slider :zoom="zoom" @change="onZoom" />
  </div>
</template>

<script lang="ts">
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import AImageCropperZoomSlider from "./AImageCropperZoomSlider.vue";
import Vue from "vue";

export default Vue.extend({
  components: {
    Cropper,
    AImageCropperZoomSlider,
  },

  props: {
    imgUrl: {
      type: String,
      default:
        "https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },

    aspect: {
      type: Number,
      default: 3,
    },
  },

  data() {
    return {
      zoom: 0,
    };
  },


  computed: {
    stencilProps() {
      return {
        lines: {},
        handlers: {},
        movable: true,
        scalable: true,
        aspectRatio: this.aspect,
        previewClass: "class-cropper__stencil",
      };
    },
  },

  methods: {
    defaultSize({ imageSize }) {
      return {
        width: Math.min(imageSize.height, imageSize.width),
        height: Math.min(imageSize.height, imageSize.width),
      };
    },

    stencilSize({ boundaries }) {
      return {
        width: boundaries.width,
      };
    },

    onChange(result) {
      const cropper = this.$refs.cropper;
      if (cropper) {
        const { coordinates, imageSize } = cropper;
        if (
          imageSize.width / imageSize.height >
          coordinates.width / coordinates.height
        ) {
          this.zoom =
            (cropper.imageSize.height - cropper.coordinates.height) /
            (cropper.imageSize.height - cropper.sizeRestrictions.minHeight);
        } else {
          this.zoom =
            (cropper.imageSize.width - cropper.coordinates.width) /
            (cropper.imageSize.width - cropper.sizeRestrictions.minWidth);
        }
      }

      const canvas = result?.canvas;

      if (canvas) {
        this.$emit("image", canvas.toDataURL());
      }
    },

    onZoom(value) {
      const cropper = this.$refs.cropper;
      if (cropper) {
        if (cropper.imageSize.height < cropper.imageSize.width) {
          const minHeight = cropper.sizeRestrictions.minHeight;
          const imageHeight = cropper.imageSize.height;
          // Determine the current absolute zoom and the new absolute zoom
          // to calculate the sought relative zoom value
          cropper.zoom(
            (imageHeight - this.zoom * (imageHeight - minHeight)) /
              (imageHeight - value * (imageHeight - minHeight))
          );
        } else {
          const minWidth = cropper.sizeRestrictions.minWidth;
          const imageWidth = cropper.imageSize.width;
          cropper.zoom(
            (imageWidth - this.zoom * (imageWidth - minWidth)) /
              (imageWidth - value * (imageWidth - minWidth))
          );
        }
      }
    },

  },
});
</script>

<style lang="scss">
.class-cropper {
  height: 521px;
  &__background {
    background-color: #000;
  }
  &__foreground {
    background-color: #000;
  }
  &__stencil {
    border: solid 1px rgb(255, 255, 255);
  }
}
</style>
