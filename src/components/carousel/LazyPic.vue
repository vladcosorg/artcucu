<style lang="scss" module>

.wrapper {
  $padding: 9px;
  overflow: hidden;
  flex: 1 1 0;
  text-align: center;
  align-self: center;
  padding: 0 $padding $padding;

  @include widescreen {
    width: 952px;
  }

  @include fullhd {
    width: 1144px;
  }

  img {
    max-height: 100%;
    box-shadow: $padding $padding 4px 0 rgba(36, 38, 47, 0.32);
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

<template>
  <div :class="['container', $style.wrapper]">
    <v-lazy-image
      :srcset="srcset('jpeg')"
      sizes="(min-width: 1024px) and (max-width: 1216px) 960px, (min-width: 1216px) 1152px, 100vw"
      :src-placeholder="image('jpeg', '_lqip')"
      :alt="item.title"
      :src="image('jpeg')"
      use-picture
    >
      <source
        type="image/webp"
        :srcset="srcset('webp')"
        sizes="(min-width: 1024px) and (max-width: 1216px) 960px, (min-width: 1216px) 1152px, 100vw"
      >
    </v-lazy-image>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CarouselItem } from '@/types';
import VLazyImage from 'v-lazy-image';

@Component({
  components: {
    VLazyImage,
  },
})
export default class Pic extends Vue {
  @Prop() item!: CarouselItem;

  srcset(format: 'png' | 'jpeg' | 'webp'): string {
    const parts: string[] = [];
    [1800, 1600, 1400, 1200, 1000, 800].forEach((size) => {
      let prefix = '';
      if (size < 1800) {
        prefix = `_${size}w`;
      }
      parts.push(`${this.image(format, prefix)} ${size}w`);
    });
    return parts.join(', ');
  }

  image(format: 'png' | 'jpeg' | 'webp', suffix = ''): string {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}${suffix}.${format}`);
  }
}
</script>
