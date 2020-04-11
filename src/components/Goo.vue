<template>
  <div :class="$style.wrapper">
    <GooSvg :class="$style.goo"/>
    <span :class="$style.text">#staiacasa</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GooSvg from '@/assets/images/goo.svg?inline';

@Component({
  components: {
    GooSvg,
  },
})
export default class Goo extends Vue {

}
</script>

<style lang="scss" module>
.wrapper {
  /*position: relative;*/
}
.goo {
  width: 100%;
  height: auto;
  fill: #feff32;
}

.text {
  position: absolute;
  top: 50%;
  transform: translateY(-30%);
  $space: 3rem;
  margin-left: $space;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-style: italic;
  display: flex;
  color: $black;
  font-size: 1.3rem;
}
</style>
