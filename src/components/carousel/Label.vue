<template>
  <div :class="[$style.wrapper, 'has-text-dark']">
    <div :class="$style.card">
      <h1 :class="$style.cardAuthor">{{item.author}}</h1>
      <h2 :class="$style.cardTitle">{{item.title}}</h2>
      <p :class="$style.cardExtra">{{item.technique}}</p>
      <p :class="$style.cardExtra">{{item.dimensions}}</p>
    </div>
    <share-button :class="$style.share"/>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CarouselItem } from '@/types';
import ShareButton from '@/components/carousel/ShareButton.vue';

@Component({
  components: {
    ShareButton,
  },
})
export default class Label extends Vue {
  @Prop() item!: CarouselItem;
}
</script>

<style lang="scss" module>
.wrapper {
  background-position: top center;
  background-size: cover;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @mixin podea($x1, $x2: false) {
    @include bg('podea', $x1, $x2);
  }

  @include podea(800, 800);

  @media (min-width: 800px) {
    @include podea(800, 1600);
  }

  @media (min-width: 1000px) {
    @include podea(1000, 2000);
  }

  @media (min-width: 1200px) {
    @include podea(1200, 2400);
  }

  @media (min-width: 1400px) {
    @include podea(1400);
  }
}

.card {
  background-color: #ffffffcf;
  margin: 1.5rem 1.5rem 0;
  padding: 1rem 1rem;
  color: $black-ter;
  @include mobile {
    width: 90%;
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
    @include mobile {
      font-size: 1.5rem;
    }
  }

  &Title {
    margin-top: 0.3rem;

    &:before {
      content: "“";
    }

    &:after {
      content: "”";
    }

    font-weight: 300;
    font-style: italic;
    font-size: $size-5;

    @include mobile {
      line-height: 1.1;
      font-size: 0.9rem;
      padding-bottom: 40px;
    }
  }

  &Extra {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.2;
    @include mobile {
      display: none;
    }
  }
}

.share svg {
  width: 80px;
  display: block;
  margin: 0.5rem;
  @include mobile {
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin: 0;
    margin-left: -40px;
  }

}
</style>
