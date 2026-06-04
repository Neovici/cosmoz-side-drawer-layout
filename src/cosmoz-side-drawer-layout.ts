import { useStyleSheet } from '@neovici/cosmoz-utils/hooks/use-stylesheet';
import { component, css, html, useEffect } from '@pionjs/pion';

type Props = {
	leftBreakpoint?: string;
	rightBreakpoint?: string;
};

const parseBreakpoint = (value: string | undefined, fallback: number) => {
	const parsed = parseInt(String(value ?? fallback), 10);
	return Number.isNaN(parsed) ? fallback : parsed;
};

const CosmozSideDrawerLayout = (host: Element & Props) => {
	const leftBreakpoint = parseBreakpoint(host.leftBreakpoint, 1024);
	const rightBreakpoint = parseBreakpoint(host.rightBreakpoint, 1024);

	useEffect(() => {
		let lastObservedSize = 0;
		const observer = new ResizeObserver((entries) => {
			const newSize = entries[0].contentRect.width;
			if (newSize < lastObservedSize) {
				if (lastObservedSize >= leftBreakpoint && newSize < leftBreakpoint) {
					host.dispatchEvent(
						new CustomEvent('close', { detail: { side: 'left' } }),
					);
				}
				if (lastObservedSize >= rightBreakpoint && newSize < rightBreakpoint) {
					host.dispatchEvent(
						new CustomEvent('close', { detail: { side: 'right' } }),
					);
				}
			}
			lastObservedSize = newSize;
		});
		observer.observe(host);
		return () => observer.unobserve(host);
	}, [leftBreakpoint, rightBreakpoint]);

	useStyleSheet(css`
		@container (min-width: ${leftBreakpoint}px) {
			.side.left {
				position: static;
				box-shadow: none;
				z-index: unset;
			}

			:host([left-drawer-open]) .click-layer {
				display: none;
			}

			:host([left-drawer-open]) {
				--left-drawer-current-width: var(--left-drawer-width);
				--cosmoz-side-drawer-layout-left-gap: var(--cz-spacing);
			}
		}
	`);

	useStyleSheet(css`
		@container (min-width: ${rightBreakpoint}px) {
			.side.right {
				position: static;
				box-shadow: none;
				z-index: unset;
			}

			:host([right-drawer-open]) .click-layer {
				display: none;
			}

			:host([right-drawer-open]) {
				--right-drawer-current-width: var(--right-drawer-width);
				--cosmoz-side-drawer-layout-right-gap: var(--cz-spacing);
			}
		}
	`);

	return html`
		<div class="wrapper">
			<slot name="left-drawer" class="side left"></slot>
			<div class="main-wrapper">
				<div
					class="click-layer"
					@click=${() => host.dispatchEvent(new CustomEvent('close'))}
				></div>
				<slot class="main" part="main"></slot>
			</div>
			<slot name="right-drawer" class="side right"></slot>
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

	:host([left-drawer-open]) .click-layer,
	:host([right-drawer-open]) .click-layer {
		display: block;
		opacity: 1;
	}

	:host([left-drawer-open]) .click-layer,
	:host([right-drawer-open]) .click-layer {
		display: block;
		opacity: 1;
	}

	@starting-style {
		:host([left-drawer-open]) .click-layer,
		:host([right-drawer-open]) .click-layer {
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

		--right-drawer-width: var(
			--cosmoz-side-drawer-layout-right-drawer-width,
			min(400px, 100cqw)
		);
		--right-drawer-current-width: 0px;
		--left-drawer-width: var(
			--cosmoz-side-drawer-layout-left-drawer-width,
			min(400px, 100cqw)
		);
		--left-drawer-current-width: 0px;

		margin: 0 auto;
	}

	:host([left-drawer-open]) {
		--left-drawer-current-width: var(--left-drawer-width);
		--cosmoz-side-drawer-layout-left-gap: var(--cz-spacing);
	}

	:host([right-drawer-open]) {
		--right-drawer-current-width: var(--right-drawer-width);
		--cosmoz-side-drawer-layout-right-gap: var(--cz-spacing);
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
		flex: 0 1 auto;
		flex: none;
		min-width: 0;
		height: 100%;
		transition: width 0.2s ease-in-out;
		contain: paint;
		box-shadow:
			-6px 0px 16px rgba(16, 24, 40, 0.06),
			-1px 0px 8px rgba(16, 24, 40, 0.1);
		max-width: 100cqw;
		box-sizing: border-box;
		background: var(--primary-background-color, #fff);
		z-index: 1000;
	}

	.left {
		left: 0;
		width: var(--left-drawer-current-width, 0);
		margin-right: var(--cosmoz-side-drawer-layout-left-gap, var(--cz-spacing));
	}

	.right {
		right: 0;
		width: var(--right-drawer-current-width, 0);
		margin-left: var(--cosmoz-side-drawer-layout-right-gap, var(--cz-spacing));
	}

	.main {
		display: flex;
		flex: 1 1 auto;
	}

	::slotted([slot='left-drawer']) {
		width: var(--left-drawer-width);
	}

	::slotted([slot='right-drawer']) {
		width: var(--right-drawer-width);
	}
`;

customElements.define(
	'cosmoz-side-drawer-layout',
	component(CosmozSideDrawerLayout, {
		styleSheets: [style],
		observedAttributes: ['left-breakpoint', 'right-breakpoint'],
	}),
);

export { CosmozSideDrawerLayout };
