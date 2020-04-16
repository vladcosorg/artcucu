import url from 'cloudinary-core/src/url';

export default function (publicId: string, options = {}) {
  return url(publicId, options = {}, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    cloud_name: 'dirycjknd',
  });
}
