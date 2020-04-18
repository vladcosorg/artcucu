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
    <picture :class="$style.picture">
      <source type="image/webp" :srcset="getSrcSet('webp')">
      <source type="image/jp2" :srcset="getSrcSet('jp2')">
      <source type="image/jpeg" :srcset="getSrcSet('jpg')">
      <img :src="placeholder" :alt="item.title">
    </picture>
<!--    <picture>-->
<!--      <source :srcset="getSrcSet('jp2')" type="image/jp2"> &lt;!&ndash; safari &ndash;&gt;-->
<!--      <img-->
<!--        sizes="100vw"-->
<!--        :alt="item.title"-->
<!--        :srcset="getSrcSet('jpg')"-->
<!--      />-->
<!--    </picture>-->
    <!--    <v-lazy-image-->
    <!--      :alt="item.title"-->
    <!--      :class="$style.picture"-->
    <!--      :sizes="sizes"-->
    <!--      :src-placeholder="placeholder"-->
    <!--      :src="getImage('jpg')"-->
    <!--      use-picture-->
    <!--    >-->
    <!--      <source-->
    <!--        :srcset="getSrcSet('jp2')"-->
    <!--        type="image/jp2"-->
    <!--      />-->
    <!--      <source-->
    <!--        :srcset="getSrcSet('webp')"-->
    <!--        type="image/webp"-->
    <!--      />-->
    <!--      <source-->
    <!--        :srcset="getSrcSet('jpg')"-->
    <!--        type="image/jpeg"-->
    <!--      />-->
    <!--    </v-lazy-image>-->
  </div>
</template>

<script lang="ts">
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

  sizes = '100vw';

  width = 0;

  height = 0;

  version = 0;

  loaded = false;

  get style() {
    return `height: ${this.height}px`;
  }


  getSrcSet(format: 'webp' | 'jp2' | 'jpg' = 'jpg') {
    const parts: string[] = [];
    [1800, 1600, 1400, 1200, 1000, 800].forEach((width) => {
      parts.push(`${this.getImage({
        width,
        format,
      })} ${width}w`);
    });
    return parts.join(', ');
  }

  get placeholder() {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}.svg?data`);
  }

  getImage(options: Transformation.Options = {}) {
    return cl.url(
      `graphics/gallery/${this.item.filename}.png`,
      {
        quality: 'auto:low',
        format: 'jpg',
        crop: 'fit',
        ...options,
      },
    );
  }

  created() {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
    const dimensions = require(
      // eslint-disable-next-line global-require,import/no-dynamic-require
      `!image-dimensions-loader!@/graphics/gallery/${this.item.filename}.png`,
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
}
</script>
