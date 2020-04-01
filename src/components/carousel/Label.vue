<template>
  <div :class="[$style.wrapper, 'has-text-dark']">
    <div :class="$style.card">
      <h1 class="title ">{{item.author}}</h1>
      <h1 class="subtitle has-text-dark">{{item.title}}</h1>
      <p class="has-text-dark has-text-weight-bold">{{item.technique}}</p>
      <p class="has-text-dark has-text-weight-bold">{{item.dimensions}}</p>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CarouselItem } from '@/types';

@Component
export default class Label extends Vue {
  @Prop() item!: CarouselItem;
}
</script>

<style lang="scss" module>
.wrapper {
  background-position: top center;
  background-image: url("~@/assets/podea.jpg");
  background-size: cover;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.card {
  background-color: white;
  opacity: 0.5;
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  min-width: 40%;
  max-width: 75%;
}
</style>
