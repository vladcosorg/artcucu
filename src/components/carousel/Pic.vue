<style lang="scss" module>
$border: 9px;
$padding: $border + 2px;

.wrapper {
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  text-align: center;
  padding: 0 $padding $padding $padding;
}

.picture img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100%;
  box-shadow: $border $border 4px 0 rgba(36, 38, 47, 0.32);
}

.loading {
  filter: blur(10px);
}

.loaded {
  transition: 0.3s filter linear;
  filter: blur(0);
}
</style>

<template>
  <div :class="[$style.wrapper]">
    <picture :class="$style.picture">
      <source type="image/webp" v-if="loaded > -1" :srcset="getSrcSet('webp')" />
      <source type="image/jp2" v-if="loaded > -1" :srcset="getSrcSet('jp2')" />
      <source type="image/jpeg" v-if="loaded > -1" :srcset="getSrcSet('jpg')" />
      <img :src="placeholder" :class="classes" @load="loaded++" :alt="item.title" sizes="100vw" />
    </picture>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CarouselItem } from '@/types';
import VLazyImage from 'v-lazy-image';
import cl from '@/cloudinary';
import { Transformation } from 'cloudinary-core';

@Component({
  components: {
    VLazyImage,
  },
})
export default class Pic extends Vue {
  @Prop() item!: CarouselItem;

  width = 0;

  height = 0;

  version = 0;

  loaded = -1;

  get classes() {
    if (this.loaded) {
      return this.$style.loaded;
    }

    return this.$style.loading;
  }

  get style() {
    return `height: ${this.height}px`;
  }

  getSrcSet(format: 'webp' | 'jp2' | 'jpg' = 'jpg') {
    const parts: string[] = [];
    [1800, 1600, 1400, 1200, 1000, 800].forEach((width) => {
      parts.push(
        `${this.getImage({
          width,
          format,
        })} ${width}w`,
      );
    });
    return parts.join(', ');
  }

  get placeholder() {
    return require(`@/assets/images/gallery/${this.item.filename}.svg?data`);
  }

  getImage(options: Transformation.Options = {}) {
    return cl.url(`graphics/gallery/${this.item.filename}.png`, {
      quality: 'auto:low',
      format: 'jpg',
      crop: 'fit',
      ...options,
    });
  }

  created() {
    const dimensions = require(`!image-dimensions-loader!@/graphics/gallery/${this.item.filename}.png`);

    this.width = dimensions.width;
    this.height = dimensions.height;
    this.version = dimensions.bytes;
  }
}
</script>
