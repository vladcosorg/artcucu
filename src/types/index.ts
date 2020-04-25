export interface CarouselItem {
  author: string;
  title: string;
  technique: string;
  dimensions: string;
  filename: string;
}

export interface LikedCarouselItem extends CarouselItem {
  likes: number;
}
