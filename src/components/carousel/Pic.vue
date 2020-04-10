<style lang="scss" module>
$border: 9px;
$padding: $border + 2px;
.wrapper {
  display: flex;
  flex: 1 1 0;
  align-items: center;
  overflow: hidden;
  @include mobile {
    $margin: 15px;
    margin-left: $margin !important;
    margin-right: $margin - $padding !important;
  }

  @include widescreen {
  }

  @include fullhd {
  }


  .picture {
    justify-items: center;
    display: flex;
    align-items: center;
    height: 100%;
    width: auto;
    padding-bottom: $padding;
    padding-right: $padding;
    img {
      max-height: 100%;
      width: auto;
      box-shadow: $border $border 4px 0 rgba(36, 38, 47, 0.32);
    }
  }

  @include tablet {
    .landscape img {
      /*width: 100%;*/
    }

    .portrait img {
      /*height: 100%;*/
    }
  }

}


</style>

<template>
  <div :class="['container', $style.wrapper]">
    <v-lazy-image
      :src-placeholder="image('jpg', '_lqip')"
      :srcset="srcset('jpg')"
      :class="[orientation(), $style.picture]"
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

  width = 0;

  height = 0;

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

  created() {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line global-require,import/no-dynamic-require,@typescript-eslint/no-var-requires
    const dimensions = require(
      `!image-dimensions-loader!@/assets/images/gallery/${this.item.filename}.jpg`,
    );
    this.width = dimensions.width;
    this.height = dimensions.height;
  }

  orientation(): string {
    return (this.width / this.height) > 1
      ? this.$style.landscape
      : this.$style.portrait;
  }

  image(format: 'png' | 'jpg' | 'webp', suffix = ''): string {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    return require(`@/assets/images/gallery/${this.item.filename}${suffix}.${format}`);
  }
}
</script>
