#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import {createRequire} from 'module';
import {fileURLToPath, pathToFileURL} from 'url';
import getWoff2 from './get-woff2.js';

const require = createRequire(import.meta.url);

const fontAwesomeDirectory = path.dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));

export default async function build(outputDirectory, iconCharsSource, iconCharsExport = 'default') {
	const iconChars = (await import(pathToFileURL(path.resolve(iconCharsSource))))[iconCharsExport];
	const files = Object.keys(iconChars).map(id => `${fontAwesomeDirectory}/svgs/solid/${id}.svg`);
	const woff2 = await getWoff2(files, 'cfware-icons', name => [iconChars[name]]);
	const iconsTemplate = await fs.readFile(fileURLToPath(new URL('./icons-template.js', import.meta.url)), 'utf8');

	await fs.writeFile(
		path.join(outputDirectory, 'icons.js'),
		iconsTemplate
			.replace('{{font.woff2}}', Buffer.from(woff2).toString('base64'))
	);

	const fontAwesomeOutput = path.join(outputDirectory, 'fontawesome-free');
	await fs.mkdir(fontAwesomeOutput, {recursive: true});
	await fs.copyFile(path.join(fontAwesomeDirectory, 'LICENSE.txt'), path.join(fontAwesomeOutput, 'LICENSE.txt'));
	await fs.copyFile(path.join(fontAwesomeDirectory, 'package.json'), path.join(fontAwesomeOutput, 'package.json'));
}

build(...process.argv.slice(2)).catch(error => {
	console.error(error);
	process.exit(1);
});
