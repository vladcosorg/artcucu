<template>
  <span :class="$style.wrapper">
    <LogoSvg :class="$style.logo"/>
<!--    <span :class="$style.text">#staiacasa</span>-->
<!--    <span :class="$style.text">Curățați suprafețele cu dezinfectant</span>-->
  </span>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoSvg from '@/assets/images/cucu.svg?inline';

@Component({
  components: {
    LogoSvg,
  },
})
export default class Logo extends Vue {

}
</script>

<style lang="scss" module>

.wrapper {
  display: flex;
}

.logo {
  width: 32px;
  @include mobile {
    width: 22px;
  }

  fill: white;
}
</style>
