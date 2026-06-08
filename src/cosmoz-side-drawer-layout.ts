import { useStyleSheet } from '@neovici/cosmoz-utils/hooks/use-stylesheet';
import { component, css, html } from '@pionjs/pion';

type Props = {
	breakpoint?: string;
};

const parseBreakpoint = (value: string | undefined, fallback: number) => {
	const parsed = parseInt(String(value ?? fallback), 10);
	return Number.isNaN(parsed) ? fallback : parsed;
};

const sideModeRules = `
	.wrapper {
		--drawer-mode: side;
	}

	.side-left,
	.side-right {
		position: static;
		box-shadow: none;
		z-index: unset;
	}

	:host(:is([left-drawer-open], [right-drawer-open])) .click-layer {
		display: none;
	}

	:host([left-drawer-open]) {
		--left-drawer-current-width: var(--left-drawer-width);
		--cosmoz-side-drawer-layout-gap: var(--cz-spacing);
	}

	:host([right-drawer-open]) {
		--right-drawer-current-width: var(--right-drawer-width);
		--cosmoz-side-drawer-layout-gap: var(--cz-spacing);
	}
`;

const CosmozSideDrawerLayout = (host: Element & Props) => {
	const breakpoint = parseBreakpoint(host.breakpoint, 1460);

	useStyleSheet(css`
		${breakpoint > 0
			? `@container (min-width: ${breakpoint}px) {${sideModeRules}}`
			: sideModeRules}
	`);

	return html`
		<div class="wrapper">
			<slot name="left" class="side side-left"></slot>
			<div class="main-wrapper">
				<div
					class="click-layer"
					@click=${() => host.dispatchEvent(new CustomEvent('close'))}
				></div>
				<slot class="main" part="main"></slot>
			</div>
			<slot name="right" class="side side-right"></slot>
		</div>
	`;
};

const style = css`
	.click-layer {
		position: absolute;
		z-index: 999;
		inset: 0;
		background: var(
			--cosmoz-side-drawer-layout-backdrop-color,
			rgba(0, 0, 0, 0.3)
		);
		transition:
			display 0.2s allow-discrete,
			opacity 0.2s;
		display: none;
		opacity: 0;
	}

	:host(:is([left-drawer-open], [right-drawer-open])) .click-layer {
		display: block;
		opacity: 1;
	}

	@starting-style {
		:host(:is([left-drawer-open], [right-drawer-open])) .click-layer {
			opacity: 0;
		}
	}

	.main-wrapper {
		display: flex;
		flex: 1 1 auto;
		overflow: hidden auto;
		position: relative;
	}
	.main-wrapper::-webkit-scrollbar {
		width: 4px;
	}
	.main-wrapper::-webkit-scrollbar-track {
		background: transparent;
		cursor: pointer;
	}
	.main-wrapper::-webkit-scrollbar-thumb,
	.main-wrapper::-webkit-scrollbar-thumb:hover {
		background: var(--cosmoz-omnitable-mini-scrollbar-thumb-bg, #aaa);
		cursor: pointer;
	}
	:host {
		display: block;
		width: 100%;
		height: 100%;
		min-height: 0;

		contain: paint;
		container-type: inline-size;

		--left-drawer-width: var(
			--cosmoz-side-drawer-layout-left-drawer-width,
			min(400px, 100cqw)
		);
		--left-drawer-current-width: 0px;

		--right-drawer-width: var(
			--cosmoz-side-drawer-layout-right-drawer-width,
			min(400px, 100cqw)
		);
		--right-drawer-current-width: 0px;

		margin: 0 auto;
	}

	:host([left-drawer-open]) {
		--left-drawer-current-width: var(--left-drawer-width);
		--cosmoz-side-drawer-layout-gap: var(--cz-spacing);
	}

	:host([right-drawer-open]) {
		--right-drawer-current-width: var(--right-drawer-width);
		--cosmoz-side-drawer-layout-gap: var(--cz-spacing);
	}

	.wrapper {
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		--drawer-mode: overlay;
	}

	.side {
		position: fixed;
		display: block;
		flex: none;
		min-width: 0;
		height: 100%;
		transition: width 0.2s ease-in-out;
		contain: paint;
		max-width: 100cqw;
		box-sizing: border-box;
		background: var(--primary-background-color, #fff);
		z-index: 1000;
	}

	.side-left {
		left: 0;
		width: var(--left-drawer-current-width, 0);
		box-shadow:
			-6px 0px 16px rgba(16, 24, 40, 0.06),
			-1px 0px 8px rgba(16, 24, 40, 0.1);
	}

	.side-right {
		right: 0;
		order: 1;
		width: var(--right-drawer-current-width, 0);
		box-shadow:
			6px 0px 16px rgba(16, 24, 40, 0.06),
			1px 0px 8px rgba(16, 24, 40, 0.1);
	}

	:host([left-drawer-open]) .side-left {
		margin-right: var(--cosmoz-side-drawer-layout-gap, var(--cz-spacing));
	}

	:host([right-drawer-open]) .side-right {
		margin-left: var(--cosmoz-side-drawer-layout-gap, var(--cz-spacing));
	}

	.main {
		display: flex;
		flex: 1 1 auto;
	}

	::slotted([slot='left']) {
		width: var(--left-drawer-width);
		transition: width 0.2s ease-in-out;
	}

	::slotted([slot='right']) {
		width: var(--right-drawer-width);
		transition: width 0.2s ease-in-out;
	}
`;

customElements.define(
	'cosmoz-side-drawer-layout',
	component(CosmozSideDrawerLayout, {
		styleSheets: [style],
		observedAttributes: ['breakpoint'],
	}),
);

export { CosmozSideDrawerLayout };
