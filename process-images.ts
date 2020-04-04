import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { sync as glob } from 'glob';
import Svgo from 'svgo';
import filesize from 'filesize';
import { cwd } from 'process';

const inDirPath = path.resolve('./src/graphics');
const outDirPath = path.resolve('./src/assets/images');

const svgOptimizer = new Svgo({
  plugins: [
    {
      removeUnknownsAndDefaults: {
        keepDataAttrs: false,
      },
    },
  ],
});

function report(inPath: string, outPath: string): void {
  const rawInSize = fs.statSync(inPath).size;
  const inPathSize = filesize(rawInSize);
  const inShortPath = inPath.replace(cwd(), '');

  const rawOutSize = fs.statSync(outPath).size;
  const outPathSize = filesize(rawOutSize);
  const outShortPath = outPath.replace(cwd(), '');
  const savings = 100 - Math.round((rawOutSize * 100) / rawInSize);

  console.info(`Copied file from ${inShortPath} to ${outShortPath}`);
  console.log(`Compressed from ${inPathSize} to ${outPathSize} with savings of ${savings}% \n`);
}

function compileSvg(inFilePath: string, outFilePath: string) {
  fs.readFile(inFilePath, 'utf8', (err, data) => {
    svgOptimizer.optimize(data)
      .then((result) => {
        fs.writeFile(outFilePath, result.data, (error) => {
          if (err) {
            throw err;
          }
          report(inFilePath, outFilePath);
        });
      });
  });
}

function compile(options: Options) {
  glob(options.glob, { cwd: inDirPath })
    .forEach((file) => {
      const inFilePath = path.join(inDirPath, file);
      const outFilePath = path.join(outDirPath, file);
      const extName = path.extname(inFilePath);
      const extNameWithoutDot = extName
        .split('.')
        .pop();
      const baseName = path.basename(file, path.extname(inFilePath));
      const dirName = path.dirname(outFilePath);

      fs.mkdirSync(dirName, { recursive: true });

      if (extNameWithoutDot === 'svg') {
        compileSvg(inFilePath, outFilePath);
        return;
      }


      if (options.sharp) {
        options.sharp.forEach((operation) => {
          const sharpFile = sharp(inFilePath);
          const fileName = operation(sharpFile, baseName);
          const generatedOutFilePath = path.join(dirName, fileName);

          sharpFile.toFile(generatedOutFilePath)
            .then((info) => report(inFilePath, generatedOutFilePath));
        });
      }
    });
}

interface Options {
  glob: string;
  sharp?: { (object: sharp.Sharp, basename: string): string }[];
}

fs.rmdirSync(outDirPath, { recursive: true });

compile({
  glob: '**/*.svg',
});

compile({
  glob: '**/*.+(jpg|jpeg|png)',
  sharp: [
    applyJpegOperation,
    applyWebpOperation,
  ],
});

compile({
  glob: 'gallery/*.+(jpg|jpeg|png)',
  sharp: [
    (file: sharp.Sharp, basename: string): string => {
      file
        .blur(20)
        .toFormat('jpeg', {
          quality: 1,
          optimiseScans: true,
          progressive: true,
        });

      return `${basename}_lqip.jpg`;
    },
  ],
});

function applyJpegOperation(file: sharp.Sharp, basename: string): string {
  file
    .toFormat('jpeg', {
      quality: 80,
      optimiseScans: true,
    });

  return `${basename}.jpg`;
}

function applyWebpOperation(file: sharp.Sharp, basename: string): string {
  file
    .toFormat('webp', {
      quality: 80,
    });
  return `${basename}.webp`;
}
