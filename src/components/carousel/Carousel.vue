<template>
  <b-carousel
    class="cucu-carousel"
    :indicator-inside="false"
    :autoplay="false"
    :indicator="false"
    animated="fade"
  >
    <b-carousel-item v-for="(item,key) in items" :key="key">
      <Pic :item="item"/>
      <LikeButton class="like"/>
      <Label :item="item"/>
    </b-carousel-item>
  </b-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LikeButton from '@/components/LikeButton.vue';
import Label from '@/components/carousel/Label.vue';
import Pic from '@/components/carousel/Pic.vue';
import { CarouselItem } from '@/types';
import data from '@/data.json';

@Component({
  components: {
    LikeButton,
    Label,
    Pic,
  },
})
export default class Carousel extends Vue {
  items!: CarouselItem[];

  created() {
    this.items = data;
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

.mdi-chevron-left, .mdi-chevron-right {
  background-color: #5c5f63;
  mask: url("~@/assets/images/arrow.svg") no-repeat 100% 100%;
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
      --arrow-padding: 30rem;
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
