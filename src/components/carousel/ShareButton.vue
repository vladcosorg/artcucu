<template>
  <a href="https://www.facebook.com/dialog/feed?&app_id=216349622971976&link=https://artcucu.com&display=popup&hashtag=#artcucu" target="_blank" :class="$style.link">
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
