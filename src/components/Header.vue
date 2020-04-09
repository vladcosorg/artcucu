<template>
  <div :class="$style.wrapper">
    <Logo :class="$style.logo"/>
    <a
      :class="$style.contacts"
      title="Contacteaza-ma"
      href="mailto:capatina.oxana@gmail.com"
    >
      <ContactIcon :class="$style.contactIcon"/>
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import Goo from '@/components/Goo.vue';
import Home from '@/views/Home.vue';
import ContactIcon from '@mdi/svg/svg/email-outline.svg?inline';

@Component({
  components: {
    Logo,
    Home,
    Goo,
    ContactIcon,
  },
})
export default class App extends Vue {

}
</script>

<style lang="scss" module>
.wrapper {
}

.contactIcon {
  width: 34px;
  fill: white;
  padding-right: 15px;
  opacity: 0.6;
  position: absolute;
  right: 0;

  &:hover {
    opacity: 1;
  }
}
</style>
