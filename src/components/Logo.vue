<template>
  <LogoSvg :class="$style.logo"/>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoSvg from '@/assets/cucu.svg?inline';

@Component({
  components: {
    LogoSvg,
  },
})
export default class Logo extends Vue {

}
</script>

<style lang="scss" module>
.logo {
  width: 32px;
  fill: white;
}
</style>
