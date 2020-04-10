<template>
    <div v-if="isActive" class="carousel-item">
      <slot/>
    </div>
</template>

<script>
import CarouselItem from 'buefy/src/components/carousel/CarouselItem.vue';

export default {
  name: 'CCarouselItem',
  extends: CarouselItem,
};
</script>
