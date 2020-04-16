import { Cloudinary } from 'cloudinary-core';

const cl = new Cloudinary({
  // eslint-disable-next-line @typescript-eslint/camelcase
  cloud_name: 'dirycjknd',
  secure: true,
});

export default cl;
