import ShadowElement, {html, template, htmlNode, define, stringProperties} from '@cfware/shadow-element';

document.head.append(htmlNode`
	<style>
		@font-face {
			font-family: 'CFWare Icons';
			font-style: normal;
			font-weight: 900;
			font-display: auto;
			src: url("data:font/woff2;base64,{{font.woff2}}") format("woff2");
		}
	</style>
`);

class CFWareIcon extends ShadowElement {
	get [template]() {
		return html`
			<style>
				:host {
					display: inline;
					font-family: 'CFWare Icons';
					font-weight: 900;
					user-select: none;
					cursor: default;
				}
			</style>
			${this.icon}
		`;
	}
}

CFWareIcon[define]('cfware-icon', {
	[stringProperties]: {
		icon: ''
	}
});
