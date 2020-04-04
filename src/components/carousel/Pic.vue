<template>
  <div :class="['container', $style.wrapper]">
    <v-lazy-image
      :src="image('jpg')"
      :src-placeholder="image('jpg', '_lqip')"
      :alt="item.title"
      use-picture
    >
      <source type="image/webp" :srcset="image('webp')" :alt="item.title">
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

  image(format: 'png' | 'jpg' | 'webp', suffix = ''): string {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}${suffix}.${format}`);
  }
}
</script>

<style lang="scss" module>

:global {
  .v-lazy-image {
    filter: blur(10);
    transition: filter 1.6s;
    will-change: filter;
  }

  .v-lazy-image-loaded {
    filter: blur(0);
  }
}

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
