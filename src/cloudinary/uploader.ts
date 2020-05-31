/* eslint-disable @typescript-eslint/camelcase */
import { TransformationOptions, v2 as cl } from 'cloudinary';
import path from 'path';
import globbby from 'globby';
// import md5File from 'md5-file';
import { cartesianProduct } from 'js-combinatorics';
import config from './config';

cl.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const cwd = path.resolve(__dirname, '..');

async function run() {
  const paths = await globbby('assets/images/gallery/**/*.png', {
    cwd,
  });

  const result = await Promise.all(
    paths.map((filePath) => {
      const parsedPath = path.parse(filePath);
      const publicId = path.join(parsedPath.dir, parsedPath.name);
      const fullPath = path.join(cwd, filePath);
      // const fileHash = md5File.sync(fullPath);
      return cl.uploader.upload(fullPath, {
        public_id: publicId,
        overwrite: false,
        async: true,
        eager_async: true,
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
  console.log(result);
  // await fs.promises.writeFile('./files.json', JSON.stringify(result));
}

run().catch((error) => console.log(error));
