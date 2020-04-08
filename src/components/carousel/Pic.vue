<style lang="scss" module>
$border: 9px;
.wrapper {
  $padding: $border + 2px;
  overflow: hidden;
  flex: 1 1 0;
  text-align: center;
  align-self: center;
  padding: 10px $padding $padding;
  @include tablet {
    padding-top: 20px;
  }

  @include widescreen {
    width: 952px;
  }

  @include fullhd {
    width: 1144px;
  }
}

img {
  max-height: 100%;
  box-shadow: $border $border 4px 0 rgba(36, 38, 47, 0.32);
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

@include tablet {
  .landscape img {
    width: 100%;
  }

  .portrait img {
    height: 100%;
  }
}
</style>

<template>
  <div :class="['container', $style.wrapper]">
    <v-lazy-image
      :src-placeholder="image('jpg', '_lqip')"
      :srcset="srcset('jpg')"
      :class="orientation()"
      :alt="item.title"
      :src="image('jpg')"
      use-picture
    >
      <source
        type="image/webp"
        :srcset="srcset('webp')"
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

  sizes = '(min-width: 1216px) 1152px, 100vw';

  srcset(format: 'png' | 'jpg' | 'webp'): string {
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

  orientation(): string {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line global-require,import/no-dynamic-require,@typescript-eslint/no-var-requires
    const dimensions = require(
      `!image-dimensions-loader!@/assets/images/gallery/${this.item.filename}.jpg`,
    );
    return (dimensions.width / dimensions.height) > 1
      ? this.$style.landscape
      : this.$style.portrait;
  }

  image(format: 'png' | 'jpg' | 'webp', suffix = ''): string {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}${suffix}.${format}`);
  }
}
</script>
