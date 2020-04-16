import { Cloudinary } from 'cloudinary-core';
import url from 'cloudinary-core/src/url';

const cl = new Cloudinary({
  // eslint-disable-next-line @typescript-eslint/camelcase
  cloud_name: 'dirycjknd',
});

export default cl;
