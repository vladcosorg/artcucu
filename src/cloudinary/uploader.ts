/* eslint-disable @typescript-eslint/camelcase */
import { TransformationOptions, v2 as cl } from 'cloudinary';
import path from 'path';
import globbby from 'globby';
import { cartesianProduct } from 'js-combinatorics';
import fs from 'fs';
import config from './config';

cl.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const cwd = path.resolve(__dirname, '..');

async function run() {
  const paths = await globbby('graphics/gallery/ana.png', {
    cwd,
  });

  const result = await Promise.all(
    paths.map((filePath) => {
      const parsedPath = path.parse(filePath);
      const publicId = path.join(parsedPath.dir, parsedPath.name);
      return cl.uploader.upload(path.join(cwd, filePath), {
        public_id: publicId,
        overwrite: false,
        eager: cartesianProduct(config.formats, config.sizes)
          .toArray()
          .map(
            ([format, width]: [string, string]): TransformationOptions => ({
              ...config.transformations,
              format,
              width,
            }),
          ),
      });
    }),
  );
  // await fs.promises.writeFile('./files.json', JSON.stringify(result));
}

run().catch((error) => console.log(error));
