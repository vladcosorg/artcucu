<template>
  <div :class="$style.wrapper">
    <div :class="['container', $style.logoWrapper]">
      <Logo/>
    </div>
    <div :class="$style.view">
      <Home/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import Home from '@/views/Home.vue';

@Component({
  components: {
    Logo,
    Home,
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

  @include tablet {
    padding-top: 3rem;
  }

  .logoWrapper  {
    padding: 10px 0;

    @include tablet {
      text-align: left;
      padding: 0 0 0 3rem;
      position: absolute;
    }
  }
}

.view {
  height: 100%;
}
</style>
