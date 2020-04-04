<template class="dawdaw">
  <span class="cucu-love">
      <HeartStrokeIcon
        :class="['cucu-love-inactive', animation, {'cucu-love-fly': isActive} ]"
        @click="activateButton"
      />
      <HeartFullIcon
        :class="[ 'cucu-love-active']"
        @click="activateButton"
      />
    </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeartStrokeIcon from '@/assets/images/heart-stroke.svg?inline';
import HeartFullIcon from '@/assets/images/heart-full.svg?inline';

@Component({
  components: {
    HeartStrokeIcon,
    HeartFullIcon,
  },
})
export default class LoveButton extends Vue {
  private isActive = false;

  private runAnimation = false;

  activateButton() {
    this.isActive = !this.isActive;
    // this.runAnimation = true;
  }

  get animation() {
    if (!this.runAnimation) {
      return '';
    }

    if (!this.isActive) {
      return 'animated rubberBand';
    }

    return 'animated heartBeat';
  }
}
</script>

<style lang="scss" scoped>

@keyframes color-change {
  0% {
    color: inherit;
  }
  50% {
    color: #9E3E3B;
  }
  100% {
    color: inherit;
  }
}

.cucu-love {
  $icon-width: 40px;
  position: relative;
  line-height: 0;


  &:not(&-active) {
    /*animation-name: color-change, pulse;*/
    animation-iteration-count: infinite;
    animation-duration: 3s, 0.5s;
  }

  svg {
    cursor: pointer;
    width: $icon-width;
    fill: #5c5f63;
  }

  &-inactive {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover, &-active {
    fill: #9E3E3B;
  }

  &-active {
    visibility: hidden;
  }

  &-fly {
    transition: all 0.5s ease-out;
    width: $icon-width*2 !important;
    opacity: 0;
  }

  &-fly + &-active{
    visibility: visible;
  }
}


</style>
