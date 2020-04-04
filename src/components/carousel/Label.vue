<template>
  <div :class="[$style.wrapper, 'has-text-dark']">
    <div :class="$style.card">
      <h1 :class="$style.cardAuthor">{{item.author}}</h1>
      <h2 :class="$style.cardTitle">{{item.title}}</h2>
      <p :class="$style.cardExtra">{{item.technique}}</p>
      <p :class="$style.cardExtra">{{item.dimensions}}</p>
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
  background-image: url("~@/assets/images/podea.jpg");
  background-size: cover;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
}

.card {
  background-color: #ffffffcf;
  margin: 1.5rem 1.5rem 0;
  padding: 1rem 1rem;
  color: $black-ter;
  @include mobile {
    width: 100%;
  }
  @include tablet {
    width: 40%;
  }
  @include fullhd {
    width: 30%;
  }
  &Author {
    font-size: 1.9rem;
    font-weight: 300;
  }
  &Title {
    &:before{
      content: "“";
    }
    &:after{
      content: "”";
    }
    font-weight: 700;
    font-style: italic;
    font-size: $size-5;
  }
  &Extra {
    font-size: 0.9rem;
    font-weight: 400;
  }
}


</style>
