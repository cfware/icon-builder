import {Readable} from 'node:stream';
import fs from 'node:fs/promises';
import path from 'node:path';
import SVGIcons2SVGFontStream from 'svgicons2svgfont';
import pMap from 'p-map';
import svg2ttf from 'svg2ttf';
import wawoff2 from 'wawoff2';

async function getGlyphsData(files, getUnicode) {
    const glyphsData = await pMap(files, async sourcePath => {
        const name = path.basename(sourcePath, '.svg');
        return {
            contents: await fs.readFile(sourcePath, 'utf8'),
            sourcePath,
            metadata: {
                path: sourcePath,
                name,
                unicode: getUnicode(name, sourcePath),
                renamed: false
            }
        };
    }, {concurrency: 100});

    return glyphsData;
}

function toSvg(glyphsData, fontName) {
    let result = '';

    return new Promise((resolve, reject) => {
        const fontStream = new SVGIcons2SVGFontStream({
            fontName,
            log() {}
        })
            .on('finish', () => resolve(result))
            .on('data', data => {
                result += data;
            })
            .on('error', error => reject(error));

        for (const glyphData of glyphsData) {
            const glyphStream = new Readable();

            glyphStream.push(glyphData.contents);
            glyphStream.push(null);
            glyphStream.metadata = glyphData.metadata;

            fontStream.write(glyphStream);
        }

        fontStream.end();
    });
}

export default async function getWoff2(files, fontName, getUnicode) {
    const glyphsData = await getGlyphsData(files, getUnicode);
    const svg = await toSvg(glyphsData, fontName);
    const ttf = Buffer.from(svg2ttf(svg, {copyright: null, ts: null, version: null}).buffer);
    return wawoff2.compress(ttf);
}
