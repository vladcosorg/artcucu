<template>
  <div class="container">
    <div class="columns is-multiline">
      <div
        v-for="item in aprilItems"
        :key="item.filename"
        class="column is-one-quarter-desktop is-half-tablet"
      >
        <div class="card">
          <header class="card-header">
            <div class="card-header-title is-centered">
              <span class="tag is-warning  "> {{ item.likes }} voturi </span>
            </div>
          </header>
          <div class="card-image">
            <figure class="image is-5by3">
              <img :src="getImageUrl(item.filename)" alt="" />
            </figure>
          </div>
          <div class="card-content">
            <div class="content">
              <b>{{ item.title }}</b
              ><br />
              {{ item.author }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Likese from '@/misc/Likes';
import { LikedCarouselItem } from '@/types';
import config from '@/cloudinary/config';

@Component({})
export default class Results extends Vue {
  aprilItems: LikedCarouselItem[] = [];

  getImageUrl(filename: string) {
    return config.getGalleryURLWithTransformation(
      'w_800,h_480,c_pad,b_auto:predominant',
      filename,
      'jpg',
      'april',
    );
  }

  async created() {
    this.aprilItems = await Likese.getAprilList();
  }
}
</script>

<style lang="scss"></style>
