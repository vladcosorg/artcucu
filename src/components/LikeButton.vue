<template>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import HeartStrokeIcon from '@/assets/images/heart-stroke.svg?inline';
import HeartFullIcon from '@/assets/images/heart-full.svg?inline';
import { auth, likesCollection, picCollection } from '@/firebase';
import * as firebase from 'firebase/app';

@Component({
  components: {
    HeartStrokeIcon,
    HeartFullIcon,
  },
})
export default class LoveButton extends Vue {
  @Prop() id!: string;

  private isActive = false;

  private runAnimation = false;

  private currentUser!: firebase.User | null;

  // eslint-disable-next-line class-methods-use-this
  get docId() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return `${this.currentUser!.uid}_${this.id}`;
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

  created() {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      likesCollection.doc(this.docId)
        .get()
        .then((doc) => {
          this.isActive = doc.exists;
        });
    });
  }

  like() {
    likesCollection.doc(this.docId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          likesCollection.doc(this.docId)
            .delete()
            .then(() => {
              const decrement = firebase.firestore.FieldValue.increment(-1);
              picCollection.doc(this.id)
                .set({
                  likes: decrement,
                }, { merge: true });
            });
        } else {
          likesCollection.doc(this.docId)
            .set({
              picId: this.id,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              userId: this.currentUser!.uid,
            })
            .then(() => {
              const increment = firebase.firestore.FieldValue.increment(1);
              picCollection.doc(this.id)
                .set({
                  likes: increment,
                }, { merge: true });
            });
        }
      });
  }

  activateButton() {
    this.isActive = !this.isActive;
    this.like();
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
  $default-color: #5c5f63;
  $icon-width: 30px;
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

  &-inactive:hover, &-active {
    fill: #9E3E3B;
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
    width: $icon-width*2 !important;
    opacity: 0;
    fill: #9E3E3B;
  }

  &-fly + &-active {
    visibility: visible;
  }
}


</style>
