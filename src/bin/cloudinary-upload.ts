/* eslint-disable @typescript-eslint/camelcase */
import { v2 as cl } from 'cloudinary';
import path from 'path';
import globbby from 'globby';
import dotenv from 'dotenv';
import { cartesianProduct } from 'js-combinatorics';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const { CLOUDINARY_SECRET_KEY } = process.env;

cl.config({
  cloud_name: 'dirycjknd',
  api_key: '511497777343757',
  api_secret: CLOUDINARY_SECRET_KEY,
});

const cwd = path.resolve(__dirname, '..');


async function run() {
  const paths = await globbby('graphics/gallery/*.png', {
    cwd,
  });

  await Promise.all(
    paths.map((filePath) => {
      const parsedPath = path.parse(filePath);
      const publicId = path.join(parsedPath.dir, parsedPath.name);
      return cl.uploader.upload(path.join(cwd, filePath), {
        async: true,
        eager_async: true,
        public_id: publicId,
        overwrite: false,
        eager: cartesianProduct(
          ['webp', 'jpg', 'jp2'],
          ['1800', '1600', '1400', '1200', '1000', '800'],
        )
          .toArray()
          .map(([format, width]: [string, string]) => ({
            quality: 'auto:low',
            fetchFormat: 'png',
            crop: 'fit',
            format,
            width,
          })),
      });
    }),
  );
}

run()
  .catch((error) => console.log(error));
