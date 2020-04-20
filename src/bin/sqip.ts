import path from 'path';
import fs from 'fs';
import globby from 'globby';
import filesize from 'filesize';
import { cwd, env } from 'process';
import sqip from 'sqip';
import md5File from 'md5-file';

const root = env.PWD || cwd();
const inDirPath = path.resolve(root, 'src/assets/images/gallery');
const outDirPath = path.resolve(root, 'src/assets/generated/sqip');

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

async function compile(pattern: string) {
  const paths = await globby(pattern, { cwd: inDirPath });
  const manifest: { [k: string]: string } = {};
  paths.forEach((file) => {
    const inFilePath = path.join(inDirPath, file);
    const outFilePath = path.join(outDirPath, file);
    const baseName = path.basename(file, path.extname(inFilePath));
    const dirName = path.dirname(outFilePath);
    const md5Hash = md5File.sync(inFilePath);
    const outPath = `${dirName}/${baseName}-${md5Hash}.svg`;

    manifest[baseName] = `${baseName}-${md5Hash}.svg`;

    if (fs.existsSync(outPath)) {
      console.log(`${outPath} already exists`);
      return;
    }

    fs.mkdirSync(dirName, { recursive: true });

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
  });

  await fs.promises.writeFile(path.join(outDirPath, 'manifest.json'), JSON.stringify(manifest));
}

// fs.rmdirSync(outDirPath, { recursive: true });
compile('*.png').catch((error) => console.log(error));
