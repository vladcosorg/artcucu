<template>
  <a
    :class="$style.link"
    :href="shareUrl" target="_blank">
    <Button :class="$style.button"/>
  </a>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/assets/images/share.svg?inline';

@Component({
  components: {
    Button,
  },
})
export default class Logo extends Vue {
  // eslint-disable-next-line class-methods-use-this
  get shareUrl() {
    return `https://www.facebook.com/dialog/feed?&app_id=216349622971976&link=${window.location.href}&display=popup&hashtag=#artcucu`;
  }
}
</script>

<style lang="scss" module>
.link {
  line-height: 0;
}

.button {
  width: 70px;

  &:hover {
    filter: brightness(130%);
  }
}
</style>
