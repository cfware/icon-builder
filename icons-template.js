import ShadowElement, {html, template, css, adoptedStyleSheets, adoptDocumentStyleSheets, define, reflectStringProperties} from '@cfware/shadow-element';

adoptDocumentStyleSheets(css`
	@font-face {
		font-family: 'CFWare Icons';
		font-style: normal;
		font-weight: 900;
		font-display: auto;
		src: url("data:font/woff2;base64,{{font.woff2}}") format("woff2");
	}
`);

class CFWareIcon extends ShadowElement {
	static [adoptedStyleSheets] = [
		css`
			:host {
				display: inline;
				font-family: 'CFWare Icons';
				font-weight: 900;
				user-select: none;
				cursor: default;
			}
		`
	];

	get [template]() {
		return html`${this.icon}`;
	}
}

reflectStringProperties(CFWareIcon, {icon: ''});
CFWareIcon[define]('cfware-icon');
