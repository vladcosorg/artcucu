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
  <div :class="[$style.wrapper, 'container']">
    <picture :class="$style.picture">
      <source
        v-for="source in sources"
        :key="source"
        :type="`image/${source}`"
        :srcset="getSrcSet(source)"
        :sizes="sizes"
      />
      <img :src="placeholder" :class="classes" @load="loaded++" :alt="item.title" />
    </picture>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CarouselItem } from '@/types';
import config, { Format } from '@/cloudinary/config';

const manifest: { [key: string]: string } = require('@/assets/generated/sqip/manifest.json');

@Component({})
export default class Pic extends Vue {
  @Prop() item!: CarouselItem;

  @Prop() dir!: string;

  loaded = 0;

  get classes() {
    if (this.loaded > 1) {
      return this.$style.loaded;
    }

    return this.$style.loading;
  }

  get sizes() {
    return [
      '(max-width: 1024px) 100vw',
      '(max-width: 1216px) 960px',
      '(max-width: 1408px) 1152px',
      '1344px',
    ].join(', ');
  }

  get sources() {
    if (!this.loaded || this.$isPrerendering) {
      return [];
    }
    return config.formats;
  }

  getSrcSet(format: Format) {
    const parts: string[] = [];

    config.sizes.forEach((width) => {
      parts.push(`${this.getImage(width, format)} ${width}w`);
    });

    return parts.join(', ');
  }

  get placeholder() {
    const filename = manifest[this.item.filename];
    return require(`@/assets/generated/sqip/${this.dir}/${filename}?data`);
  }

  getImage(width: number, format: Format) {
    return `https://res.cloudinary.com/${
      config.cloudName
    }/image/upload/${config.getTransformationString(width)}/v1/assets/images/gallery/${this.dir}/${
      this.item.filename
    }.${format}`;
  }
}
</script>
