<template>
  <div :class="$style.wrapper" id="app">
    <div :class="$style.logoWrapper">
      <Logo :class="$style.logo"/>
      <a :class="$style.contacts" title="Contacteaza-ma" href="mailto:capatina.oxana@gmail.com">
        <b-icon
          icon="email-outline"
          size="is-small"
          style="font-size: 20px"
        >
        </b-icon>
      </a>
    </div>
    <div :class="$style.view">
      <Home/>
    </div>
    <Goo :class="$style.goo"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import Goo from '@/components/Goo.vue';
import Home from '@/views/Home.vue';

@Component({
  components: {
    Logo,
    Home,
    Goo,
  },
})
export default class App extends Vue {

}
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

  .logoWrapper {
    padding-top: 10px;
    text-align: center;
    @include tablet {
      padding-top: 20px;
    }
  }

  .logo {
    /*align-self: center;*/
    /*margin: 0 auto;*/
  }

  .contacts {
    color: white;
    font-weight: bold;
    padding-right: 15px;
    opacity: 0.6;
    position: absolute;
    right: 0;

    &:hover {
      opacity: 1;
    }
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
