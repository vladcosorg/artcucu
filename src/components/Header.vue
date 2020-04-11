<template>
  <div :class="$style.wrapper">
    <Logo :class="$style.logo"/>
    <div :class="$style.socialWrapper">
      <a
        target="_blank"
        :class="$style.contacts"
        title="Contacteaza-ma pe e-mail"
        href="mailto:capatina.oxana@gmail.com"
      >
        <InstagramIcon :class="$style.contactIcon"/>
      </a>
      <a
        target="_blank"
        :class="$style.contacts"
        title="Contacteaza-ma pe Instagram"
        href="https://www.instagram.com/art.cucu/"
      >
        <EmailIcon :class="$style.contactIcon"/>
      </a>
      <a
        target="_blank"
        :class="$style.contacts"
        title="Contacteaza-ma pe Facebook"
        href="https://www.facebook.com/Artcucu-168904146983848/"
      >
        <FacebookIcon :class="$style.contactIcon"/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '@/components/Logo.vue';
import Goo from '@/components/Goo.vue';
import Home from '@/views/Home.vue';
import EmailIcon from '@/assets/images/social/email.svg?inline';
import InstagramIcon from '@/assets/images/social/instagram.svg?inline';
import FacebookIcon from '@/assets/images/social/facebook.svg?inline';

@Component({
  components: {
    Logo,
    Home,
    Goo,
    EmailIcon,
    InstagramIcon,
    FacebookIcon,
  },
})
export default class App extends Vue {

}
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr ;
  justify-items: center;
  align-items: center;
}
.logo {
 grid-column-start: 2;
}
.socialWrapper {
  margin-left: auto;
}

.contactIcon {
  width: 34px;
  padding-right: 15px;

  path {
    fill: white !important;
  }

  &:hover {
    opacity: 0.5;
  }
}
</style>
