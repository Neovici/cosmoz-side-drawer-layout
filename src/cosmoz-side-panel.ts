import { component, css, html } from '@pionjs/pion';

const CosmozSidePanel = () => html`<div class="wrapper"><slot></slot></div>`;

const style = css`
	:host {
		display: block;
		container-name: var(--drawer-mode);
		container-type: size;
	}

	.wrapper {
		background: #fff;
		border-radius: var(--drawer-border-radius, 16px);
		height: 100%;
		overflow: var(--drawer-overflow, auto);
		border-right: var(--drawer-border-right, 1px solid #ebebeb);
		border-left: var(--drawer-border-left, 1px solid #ebebeb);
		border-top: var(--drawer-border-top, 1px solid #ebebeb);
		border-bottom: var(--drawer-border-bottom, 1px solid #ebebeb);
		margin: var(--drawer-margin, 0 5px 0 0);
	}
	.wrapper::-webkit-scrollbar {
		width: 4px;
	}
	.wrapper::-webkit-scrollbar-track {
		background: transparent;
		cursor: pointer;
	}
	.wrapper::-webkit-scrollbar-thumb,
	.wrapper::-webkit-scrollbar-thumb:hover {
		background: var(--cosmoz-omnitable-mini-scrollbar-thumb-bg, #aaa);
		cursor: pointer;
	}
	@container overlay (min-width: 0) {
		.wrapper {
			border: none;
			border-radius: 0;
		}
	}
`;

customElements.define(
	'cosmoz-side-panel',
	component(CosmozSidePanel, { styleSheets: [style] }),
);

export { CosmozSidePanel };