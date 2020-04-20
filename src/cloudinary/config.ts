import dotenv from 'dotenv';
import path from 'path';
import process from 'process';
import { Transformation } from 'cloudinary-core';

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

  transformations: Transformation.Options = {
    quality: 'auto:low',
    format: 'png',
    crop: 'fit',
  };
})();
