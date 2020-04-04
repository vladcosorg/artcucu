<template>
  <LogoSvg :class="$style.logo"/>
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
.logo {
  width: 22px;
  fill: white;
  opacity: 0.7;
}
</style>
