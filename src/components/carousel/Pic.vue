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

.picture {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100%;
  box-shadow: $border $border 4px 0 rgba(36, 38, 47, 0.32);
}

:global {
  .v-lazy-image {
    transition: 0.3s filter linear;
    filter: blur(10px);
  }

  .v-lazy-image-loaded {
    filter: blur(0);
  }
}
</style>

<template>
  <div :class="[ $style.wrapper]">
    <v-lazy-image
      :class="$style.picture"
      :src="img"
      :srcset="srcset"
      :sizes="sizes"
      :alt="item.title"
      :src-placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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

  sizes = '100vw';

  width = 0;

  height = 0;

  version = 0;

  loaded = false;

  get style() {
    return `height: ${this.height}px`;
  }

  get img() {
    return this.cloudinaryImage();
  }

  cloudinaryImage(options: Transformation.Options = {}) {
    return cl.url(
      `v${this.version}/artcucu/graphics/gallery/${this.item.filename}.png`,
      {
        quality: 'auto:low',
        fetchFormat: 'auto',
        crop: 'fit',
        ...options,
      },
    );
  }

  get srcset(): string {
    const parts: string[] = [];
    [1800, 1600, 1400, 1200, 1000, 800].forEach((width) => {
      parts.push(`${this.cloudinaryImage({ width })} ${width}w`);
    });
    return parts.join(', ');
  }

  created() {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line global-require,import/no-dynamic-require,@typescript-eslint/no-var-requires
    const dimensions = require(
      `!image-dimensions-loader!@/assets/images/gallery/${this.item.filename}.jpg`,
    );

    this.width = dimensions.width;
    this.height = dimensions.height;
    this.version = dimensions.bytes;
  }

  orientation(): string {
    return (this.width / this.height) > 1
      ? this.$style.landscape
      : this.$style.portrait;
  }

  get placeholder() {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}.svg?data`);
  }
}
</script>
