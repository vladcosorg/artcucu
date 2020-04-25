<template>
  <div class="carousel-item" v-if="isActive">
    <slot />
  </div>
</template>

<script>
import CarouselItem from 'buefy/src/components/carousel/CarouselItem.vue';

export default {
  name: 'CCarouselItem',
  extends: CarouselItem,
};
</script>
