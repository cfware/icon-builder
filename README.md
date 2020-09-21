# @cfware/icon-builder [![NPM Version][npm-image]][npm-url]

Build `icons.js` in the target directory.

## Usage

Create `./pkgs/@myapp/icons/icon-chars.js`:
```js
export const iconChars = {
	ban: '\uF05E',
	'caret-down': '\uF0D7',
	'caret-right': '\uF0DA',
	download: '\uF019',
	edit: '\uF044',
	envelope: '\uF0E0',
	'exclamation-triangle': '\uF071',
	'id-card': '\uF2C2',
	list: '\uF03A',
	lock: '\uF023',
	microphone: '\uF130',
	'phone-alt': '\uF879',
	plus: '\uF067',
	'question-circle': '\uF059',
	'sign-out-alt': '\uF2F5',
	times: '\uF00D',
	'trash-alt': '\uF2ED',
	upload: '\uF093',
	user: '\uF007'
};
```

The exported object should have keys associated with Font-Awesome icon names,
values should be the Unicode point to produce for the WOFF2 font.

```
npm i -D @cfware/icon-builder
npm i @cfware/shadow-element
npx cfware-iconbuilder ./pkgs/@myapp/icons ./pkgs/@myapp/icons/icon-chars.js iconChars
```

This command will produce `./pkgs/@myapp/icons/icons.js`.  Importing that file will
register the custom element `cfware-icons`.  An example usage is:
```js
const banIcon = () => html`<cfware-icons>\uF05E</cfware-icons>`;
```

In addition `./pkgs/@myapp/icons/fontawesome-free` will be created containing the
`package.json` and `LICENSE.txt` files installed by `@fortawesome/fontawesome-free`.

[npm-image]: https://img.shields.io/npm/v/@cfware/icon-builder.svg
[npm-url]: https://npmjs.org/package/@cfware/icon-builder
