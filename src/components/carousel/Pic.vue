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
      <source
        v-for="source in sources"
        :key="source"
        :type="`image/${source}`"
        :srcset="getSrcSet(source)"
      />
      <img
        :src="placeholder"
        :class="classes"
        @load="loaded = true"
        :alt="item.title"
        sizes="100vw"
      />
    </picture>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CarouselItem } from '@/types';
import VLazyImage from 'v-lazy-image';
import cloudinary from '@/cloudinary/frontend';
import config, { Format } from '@/cloudinary/config';
import { Transformation } from 'cloudinary-core';

const manifest: { [key: string]: string } = require('@/assets/generated/sqip/manifest.json');
@Component({
  components: {
    VLazyImage,
  },
})
export default class Pic extends Vue {
  @Prop() item!: CarouselItem;

  loaded = false;

  get classes() {
    if (this.loaded) {
      return this.$style.loaded;
    }

    return this.$style.loading;
  }

  get sources() {
    if (!this.loaded) {
      return [];
    }
    return config.formats;
  }

  getSrcSet(format: Format) {
    const parts: string[] = [];

    config.sizes.forEach((width) => {
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
    const filename = manifest[this.item.filename];
    return require(`@/assets/generated/sqip/${filename}?data`);
  }

  getImage(options: Transformation.Options = {}) {
    return cloudinary.url(`assets/images/gallery/${this.item.filename}.png`, {
      ...config.transformations,
      ...options,
    });
  }
}
</script>
