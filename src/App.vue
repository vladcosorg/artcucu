<template>
  <div :class="$style.wrapper" id="app">
    <LazyHydrate ssr-only>
      <Header :class="$style.header" ssr />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <div :class="$style.view">
        <router-view></router-view>
      </div>
    </LazyHydrate>
    <LazyHydrate ssr-only>
      <Goo :class="$style.goo" />
    </LazyHydrate>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Goo from '@/components/Goo.vue';
import LazyHydrate from 'vue-lazy-hydration';

@Component({
  components: {
    Header,
    Goo,
    LazyHydrate,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" module>
.wrapper {
  height: calc(var(--vh, 1vh) * 100);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;

  @mixin perete($x1, $x2: false) {
    @include bg('perete', $x1, $x2);
  }

  @include perete(800, 800);

  @media (min-width: 800px) {
    @include perete(800, 1600);
  }

  @media (min-width: 1000px) {
    @include perete(1000, 2000);
  }

  @media (min-width: 1200px) {
    @include perete(1200, 2400);
  }

  @media (min-width: 1400px) {
    @include perete(1400);
  }
}

.header {
  line-height: 0;
  text-align: center;
  padding: 1rem 0;
  @include mobile {
    padding: 0.5rem 0;
  }
}

.view {
  flex: 1 1 0;
}

.goo {
  position: fixed;
  right: -5px;
  bottom: 0;
  width: 200px;
  @include mobile {
    display: none;
  }
}
</style>
