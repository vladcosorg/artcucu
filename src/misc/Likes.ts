import { picCollection } from '@/firebase';
import AprilGallery from '@/assets/meta/april.json';
import { LikedCarouselItem } from '@/types';

class Likes {
  public async getAprilList() {
    const likeList = await this.getList();
    const results: LikedCarouselItem[] = [];
    AprilGallery.forEach((item) => {
      results.push({
        ...item,
        likes: likeList[item.filename],
      });
    });
    results.sort((first: LikedCarouselItem, second: LikedCarouselItem) => {
      return second.likes - first.likes;
    });
    return results;
  }

  public async getList() {
    const results: { [key: string]: number } = {};
    const snapshot = await picCollection.orderBy('likes').get();
    snapshot.forEach((item) => {
      results[item.id] = item.get('likes');
    });
    return results;
  }
}

export default new Likes();
