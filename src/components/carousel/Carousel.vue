<template>
  <b-carousel
    :autoplay="false"
    :indicator="false"
    :indicator-inside="false"
    :value="slide"
    @change="slide = $event"
    animated="slide"
    class="cucu-carousel"
  >
    <c-carousel-item :key="key" v-for="(item, key) in items">
      <Pic :item="item" />
      <LikeButton :id="item.filename" class="like" />
      <Label :item="item" />
    </c-carousel-item>
  </b-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Label from '@/components/carousel/Label.vue';
import Pic from '@/components/carousel/Pic.vue';
import CCarouselItem from '@/components/carousel/CarouselItem.vue';
import { CarouselItem } from '@/types';
import data from '@/data.json';
import { MetaInfo } from 'vue-meta';
import config from '@/cloudinary/config';

@Component({
  components: {
    LikeButton: () => import(/* webpackChunkName: "like" */ '@/components/LikeButton.vue'),
    Label,
    Pic,
    CCarouselItem,
  },
  metaInfo(this: Carousel): MetaInfo {
    const title = `${this.currentSlide.title} - ${this.currentSlide.author} | ArtCucu - Stai Acasa si Admira`;
    return {
      title,
      meta: [
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:url',
          content: `https://www.artcucu.com/gallery/${this.currentSlide.filename}/`,
        },
        {
          property: 'og:width',
          content: '1000',
        },
        {
          property: 'og:height',
          content: '1000',
        },
        {
          property: 'og:image',
          content: config.getGalleryURL(this.currentSlide.filename, 1000, 'jpg'),
        },
      ],
    };
  },
})
export default class Carousel extends Vue {
  items!: CarouselItem[];

  slideMap: string[] = [];

  get currentSlide() {
    return this.items[this.slide];
  }

  get slide() {
    const { id } = this.$route.params;
    const index = this.slideMap.indexOf(id);

    if (index < 0) {
      return 0;
    }

    return this.slideMap.indexOf(this.$route.params.id);
  }

  set slide(id: number) {
    this.$router.push({
      path: `/gallery/${this.slideMap[id]}`,
    });
  }

  created() {
    this.items = data;
    this.slideMap = this.items.map((item: CarouselItem) => item.filename);
  }
}
</script>

<style lang="scss">
.carousel-items {
  .carousel-arrow.is-hovered {
    @include mobile {
      opacity: 0;
    }
    opacity: 1;
  }
}

.mdi {
}

.mdi-chevron-left,
.mdi-chevron-right {
  background-color: #5c5f63;
  mask: url('~@/assets/images/arrow.svg?data') no-repeat 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: #86898e;
  }
}

.mdi-chevron-right {
  transform: rotate(180deg);
}

.carousel-arrow {
  .icon {
    top: calc(50% - 100px) !important;
    border: none !important;
    color: transparent !important;
    background-color: transparent !important;
  }

  --arrow-padding: 1.5rem;

  @include fullhd {
    @media (max-resolution: 1dppx) {
      --arrow-padding: 20rem;
    }
  }

  .has-icons-left {
    left: var(--arrow-padding) !important;
  }

  .has-icons-right {
    right: var(--arrow-padding) !important;
  }
}

.carousel {
  display: flex;
  height: 100%;

  .carousel-items {
    overflow: visible !important;

    .carousel-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .like {
        --like-margin: 5px;

        @include tablet {
          --like-margin: 10px;
        }
        margin-top: var(--like-margin);
        margin-bottom: calc(var(--like-margin) * 2);
      }
    }
  }
}
</style>
