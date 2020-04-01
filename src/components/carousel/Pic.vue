<template>
  <div :class="['container', $style.wrapper]">
    <img :src="item.url">
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { CarouselItem } from '@/types';

@Component
export default class Pic extends Vue {
  @Prop() item!: CarouselItem
}
</script>

<style lang="scss" module>
.wrapper{
  $padding: 9px;
  overflow: hidden;
  flex: 1 1 0;
  text-align: center;
  align-self: center;
  padding: 0 $padding $padding;

  @include widescreen {
    width: 952px;
  }

  @include fullhd {
    width: 1144px;
  }

  img {
    max-height: 100%;
    box-shadow: $padding $padding 4px 0 rgba(36, 38, 47, 0.32);
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
