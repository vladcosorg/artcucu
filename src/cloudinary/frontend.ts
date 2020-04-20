/* eslint-disable @typescript-eslint/camelcase */
import { Cloudinary } from 'cloudinary-core';
import config from '@/cloudinary/config';

export default new Cloudinary({
  // eslint-disable-next-line @typescript-eslint/camelcase
  cloud_name: config.cloudName,
  secure: true,
});
