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

.mdi-chevron-left, .mdi-chevron-right {
  background-color: #5c5f63;
  mask: url("~@/assets/arrow.svg") no-repeat 100% 100%;
  background-repeat: no-repeat;

  &:hover {
    background-color: #86898e;
  }
}

.mdi-chevron-right {
  transform: rotate(180deg);
}

.carousel-arrow .icon.has-icons-left {
  left: $layout-padding;
}

.carousel-arrow .icon.has-icons-right {
  right: $layout-padding;
}

.carousel-arrow .icon.has-icons-left, .carousel-arrow .icon.has-icons-right {
  top: calc(50% - 100px) !important;
}

.carousel-arrow .icon {
  color: transparent !important;
  border-color: inherit !important;
  background-color: transparent !important;
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
        margin: 15px;
      }
    }
  }
}
</style>
