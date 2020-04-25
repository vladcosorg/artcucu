<template>
  <LogoSvg :class="$style.logo" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoSvg from '@/assets/images/logo.svg?inline';

@Component({
  components: {
    LogoSvg,
  },
})
export default class Logo extends Vue {}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
}

.logo {
  width: 100px;
  @include mobile {
    width: 70px;
  }

  #fk {
    fill: white;
  }
}
</style>
