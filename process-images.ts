import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const inDirPath = path.resolve('./src/assets/picture/sources');
const outDirPath = path.resolve('./src/assets/picture');

fs.readdirSync(inDirPath, { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .forEach((item): void => {
    const filePath = path.join(inDirPath, item.name);
    const fileName = path.basename(filePath, path.extname(filePath));
    const file = sharp(filePath);
    file
      .toFormat('jpeg')
      .jpeg({
        quality: 100,
      })
      .toFile(path.join(outDirPath, `${fileName}.jpeg`));

    file.toFormat('webp')
      .webp({
        lossless: true,
      })
      .toFile(path.join(outDirPath, `${fileName}.webp`));
  });
