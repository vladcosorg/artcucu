<template>
  <span class="cucu-love">
    <HeartStrokeIcon
      :class="['cucu-love-inactive', { 'cucu-love-fly': isActive }]"
      @click="toggle"
    />
    <HeartFullIcon :class="['cucu-love-active']" @click="toggle" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HeartStrokeIcon from '@/assets/images/heart-stroke.svg?inline';
import HeartFullIcon from '@/assets/images/heart-full.svg?inline';

@Component({
  components: {
    HeartStrokeIcon,
    HeartFullIcon,
  },
})
export default class LoveButton extends Vue {
  @Prop() id!: string;

  private isActive = false;

  async created() {
    if (this.$storage.has(this.id)) {
      this.isActive = this.$storage.get(this.id, false);
    } else {
      const Voter = await this.getVoter();
      const status = await Voter.getVoteStatus(this.id);
      this.$storage.set(this.id, status);
      this.isActive = status;
    }
  }

  async getVoter() {
    const { default: Voter } = await import(/* webpackChunkName: "voter" */ '@/misc/Voter');
    return Voter;
  }

  async toggle() {
    this.isActive = !this.isActive;
    const Voter = await this.getVoter();
    const newStatus = await Voter.toggle(this.id);
    this.$storage.set(this.id, newStatus);
  }
}
</script>

<style lang="scss" scoped>
@keyframes color-change {
  0% {
    color: inherit;
  }
  50% {
    color: #9e3e3b;
  }
  100% {
    color: inherit;
  }
}

.cucu-love {
  $default-color: #5c5f63;
  $icon-width: 30px;
  position: relative;
  line-height: 0;

  &:not(&-active) {
    animation-iteration-count: infinite;
    animation-duration: 3s, 0.5s;
  }

  svg {
    cursor: pointer;
    width: $icon-width;
    -webkit-tap-highlight-color: transparent;
  }

  &-inactive {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: $default-color;
  }

  &-inactive:hover,
  &-active {
    fill: #9e3e3b;
  }

  @include no-hover-support {
    &-inactive:hover {
      fill: $default-color;
    }
  }

  &-active {
    visibility: hidden;
  }

  &-fly {
    transition: all 0.5s ease-out;
    width: $icon-width * 2 !important;
    opacity: 0;
    fill: #9e3e3b;
  }

  &-fly + &-active {
    visibility: visible;
  }
}
</style>
