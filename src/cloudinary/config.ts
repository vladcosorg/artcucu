import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export type Format = string | 'jpg' | 'jp2' | 'webp';

export default new (class {
  cloudName = 'dirycjknd';

  formats: Format[] = ['webp', 'jp2', 'jpg'];

  apiKey = '511497777343757';

  apiSecret = process.env.CLOUDINARY_SECRET_KEY;

  sizes: number[] = [1800, 1600, 1400, 1200, 1000, 800];

  transformations = {
    quality: 'auto:low',
    format: 'png',
    crop: 'fit',
  };

  getTransformationString(width: number) {
    return `c_fit,q_auto:low,w_${width}`;
  }

  getGalleryURLWithTransformation(transformationString: string, fileName: string, format: Format) {
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformationString}/assets/images/gallery/${fileName}.${format}`;
  }

  getGalleryURL(fileName: string, width: number, format: Format) {
    return `https://res.cloudinary.com/${
      this.cloudName
    }/image/upload/${this.getTransformationString(
      width,
    )}/assets/images/gallery/${fileName}.${format}`;
  }
})();
