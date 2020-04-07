<template>
  <div :class="$style.wrapper">
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
  background-image: url("./assets/images/perete.jpeg");
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;

  @mixin replace-text($image, $x: 50%, $y: 50%) {
    text-indent: -99999em;
    overflow: hidden;
    text-align: left;

    background: {
      image: $image;
      repeat: no-repeat;
      position: $x $y;
    }
  }

  background-image: url("./assets/images/perete_800w.jpeg"),
  url("./assets/images/perete_lqip.jpeg");
  background-image: image-set(
      url("./assets/images/perete_800w.jpeg") 1x,
      url("./assets/images/perete_1600w.jpeg") 2x
  ), url("./assets/images/perete_lqip.jpeg");

  @media (min-width: 1000px) {
    background-image: url("./assets/images/perete_1000w.jpeg"),
    url("./assets/images/perete_lqip.jpeg");
    background-image: image-set(
        url("./assets/images/perete_1000w.jpeg") 1x,
        url("./assets/images/perete_2000w.jpeg") 2x
    ), url("./assets/images/perete_lqip.jpeg");
  }

  @media (min-width: 1200px) {
    background-image: url("./assets/images/perete_1200w.jpeg"),
    url("./assets/images/perete_lqip.jpeg");
    background-image: image-set(
        url("./assets/images/perete_1200w.jpeg") 1x,
        url("./assets/images/perete_2400w.jpeg") 2x
    ), url("./assets/images/perete_lqip.jpeg");
  }

  @media (min-width: 1400px) {
    background-image: url("./assets/images/perete_1400w.jpeg"),
    url("./assets/images/perete_lqip.jpeg");
    background-image: image-set(
        url("./assets/images/perete_1400w.jpeg") 1x,
        url("./assets/images/perete.jpeg") 2x
    ), url("./assets/images/perete_lqip.jpeg");
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
  height: 100%;
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
