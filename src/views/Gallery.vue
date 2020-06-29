<template>
  <b-carousel
    :autoplay="false"
    :indicator="false"
    :indicator-inside="false"
    :value="slide"
    @change="slide = $event"
    animated="slide"
    class="cucu-carousel"
    v-if="this.items.length"
  >
    <c-carousel-item :key="key" v-for="(item, key) in items">
      <Pic :item="item" :dir="album" />
      <ShareButton class="like" />
      <!--      <LikeButton :id="item.filename" class="like" />-->
      <Label :item="item" />
    </c-carousel-item>
  </b-carousel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Label from '@/components/carousel/Label.vue';
import Pic from '@/components/carousel/Pic.vue';
import LikeButton from '@/components/LikeButton.vue';
import CCarouselItem from '@/components/carousel/CarouselItem.vue';
import { CarouselItem } from '@/types';
import { MetaInfo } from 'vue-meta';
import config from '@/cloudinary/config';
import ShareButton from '@/components/carousel/ShareButton.vue';

@Component({
  components: {
    LikeButton,
    Label,
    Pic,
    CCarouselItem,
    ShareButton,
  },
  metaInfo(this: Gallery): MetaInfo {
    if (this.currentSlide === undefined) {
      return {};
    }
    const title = `${this.currentSlide.title} - ${this.currentSlide.author} | ArtCucu - Expoziții Online de Pictură și Grafică`;
    return {
      title,
      meta: [
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:url',
          content: `https://www.artcucu.com/gallery/${this.album}/${this.currentSlide.filename}/`,
        },
        {
          property: 'og:width',
          content: '1200',
        },
        {
          property: 'og:height',
          content: '1000',
        },
        {
          property: 'og:image',
          content: config.getGalleryURLWithTransformation(
            'w_1200,c_pad,ar_41:20,b_auto:predominant',
            this.currentSlide.filename,
            'jpg',
            this.album,
          ),
        },
      ],
    };
  },
})
export default class Gallery extends Vue {
  @Prop(String) readonly id!: string;

  @Prop({ default: 'march', type: String }) readonly album!: string;

  items: CarouselItem[] = [];

  slideMap: string[] = ['loading'];

  get currentSlide(): CarouselItem | undefined {
    return this.items[this.slide];
  }

  get slide() {
    const index = this.slideMap.indexOf(this.id);
    if (index < 0) {
      return 0;
    }

    return this.slideMap.indexOf(this.$route.params.id);
  }

  set slide(id: number) {
    if (this.album === 'april') {
      this.$router.push({
        path: `/gallery/april/${this.slideMap[id]}/`,
      });
    } else if (this.album === 'june') {
      this.$router.push({
        path: `/gallery/june/${this.slideMap[id]}/`,
      });
    } else {
      this.$router.push({
        path: `/gallery/${this.slideMap[id]}/`,
      });
    }
  }

  async created() {
    this.items = (await import(`@/assets/meta/${this.album}.json`)).default;
    this.slideMap = this.items.map((item: CarouselItem) => item.filename);
  }
}
</script>

<style lang="scss">
body {
  overflow: hidden;
}

.carousel-items {
  .carousel-arrow.is-hovered {
    @include mobile {
      opacity: 0;
    }
    opacity: 1;
  }
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
  @extend .container;
  position: absolute;
  width: 100%;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  top: calc(50% - 130px) !important;
  .icon {
    position: static !important;
    border: none !important;
    color: transparent !important;
    background-color: transparent !important;
  }
  .has-icons-right {
    margin-left: auto;
    margin-right: -30px;
  }
  .has-icons-left {
    margin-left: -30px;
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
