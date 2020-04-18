import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { sync as glob } from 'glob';
import Svgo from 'svgo';
import filesize from 'filesize';
import { cwd } from 'process';
import sqip from 'sqip';

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
    svgOptimizer.optimize(data).then((result) => {
      fs.writeFile(outFilePath, result.data, () => {
        if (err) {
          throw err;
        }
        report(inFilePath, outFilePath);
      });
    });
  });
}

function compile(options: Options) {
  glob(options.glob, { cwd: inDirPath }).forEach((file) => {
    const inFilePath = path.join(inDirPath, file);
    const outFilePath = path.join(outDirPath, file);
    const extName = path.extname(inFilePath);
    const extNameWithoutDot = extName.split('.').pop();
    const baseName = path.basename(file, path.extname(inFilePath));
    const dirName = path.dirname(outFilePath);

    fs.mkdirSync(dirName, { recursive: true });

    if (options.posterize) {
      const outPath = `${dirName}/${baseName}.svg`;
      sqip({
        input: inFilePath,
        output: outPath,
        width: 0,
        plugins: [
          {
            name: 'primitive',
            options: {
              numberOfPrimitives: 8,
              mode: 0,
            },
          },
          'blur',
          {
            name: 'svgo',
            options: {
              plugins: [
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeXMLNS: false },
                { removeEditorsNSData: true },
                { cleanupAttrs: true },
                { inlineStyles: true },
                { minifyStyles: true },
                { convertStyleToAttrs: true },
                { cleanupIDs: true },
                { prefixIds: true },
                { removeRasterImages: true },
                { removeUselessDefs: true },
                { cleanupNumericValues: true },
                { cleanupListOfValues: true },
                { convertColors: true },
                { removeUnknownsAndDefaults: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeViewBox: false },
                { cleanupEnableBackground: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { convertShapeToPath: true },
                { moveElemsAttrsToGroup: true },
                { moveGroupAttrsToElems: true },
                { collapseGroups: true },
                { convertPathData: true },
                { convertTransform: true },
                { removeEmptyAttrs: true },
                { removeEmptyContainers: true },
                { mergePaths: true },
                { removeUnusedNS: true },
                { sortAttrs: true },
                { removeTitle: true },
                { removeDesc: true },
                { removeDimensions: false },
                { removeAttrs: false },
                { removeAttributesBySelector: false },
                { removeElementsByAttr: false },
                { addClassesToSVGElement: false },
                { removeStyleElement: false },
                { removeScriptElement: false },
                { addAttributesToSVGElement: false },
                { removeOffCanvasPaths: true },
                { reusePaths: true },
              ],
            },
          },
        ],
      }).then(() => {
        report(inFilePath, outPath);
      });
    }

    if (extNameWithoutDot === 'svg') {
      compileSvg(inFilePath, outFilePath);
      return;
    }

    if (options.sharp) {
      options.sharp.forEach((operation) => {
        const sharpFile = sharp(inFilePath);
        const fileName = operation(sharpFile, baseName);
        const generatedOutFilePath = path.join(dirName, fileName);

        sharpFile.toFile(generatedOutFilePath).then(() => report(inFilePath, generatedOutFilePath));
      });
    }
  });
}

interface Options {
  glob: string;
  sharp?: { (object: sharp.Sharp, basename: string): string }[];
  posterize?: boolean;
}

// fs.rmdirSync(outDirPath, { recursive: true });
compile({
  glob: 'gallery/*.png',
  posterize: true,
});

compile({
  glob: '**/*.svg',
});
