import '@neovici/cosmoz-tokens';
import { html } from '@pionjs/pion';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import '../src/cosmoz-side-drawer-layout';
import '../src/cosmoz-side-panel';

interface StoryArgs {
	leftBreakpoint: number;
	rightBreakpoint: number;
	leftDrawerOpen: boolean;
	rightDrawerOpen: boolean;
	onClose: ReturnType<typeof fn>;
}

const meta: Meta<StoryArgs> = {
	title: 'SideDrawerLayout',
	component: 'cosmoz-side-drawer-layout',
	tags: ['autodocs'],
	argTypes: {
		leftBreakpoint: {
			control: 'number',
			description:
				'Width breakpoint (px) for left drawer side/overlay switch. 0 = always side mode.',
		},
		rightBreakpoint: {
			control: 'number',
			description:
				'Width breakpoint (px) for right drawer side/overlay switch. 0 = always side mode.',
		},
		leftDrawerOpen: {
			control: 'boolean',
			description: 'Opens the left drawer (overlay mode)',
		},
		rightDrawerOpen: {
			control: 'boolean',
			description: 'Opens the right drawer (overlay mode)',
		},
	},
	args: {
		leftBreakpoint: 1024,
		rightBreakpoint: 1024,
		leftDrawerOpen: false,
		rightDrawerOpen: false,
		onClose: fn(),
	},
};

export default meta;

type Story = StoryObj<StoryArgs>;

const closeDrawer = (event: CustomEvent) => {
	const layout = event.currentTarget as HTMLElement;
	const side = event.detail?.side;

	if (side === 'left') {
		layout.removeAttribute('left-drawer-open');
		return;
	}

	if (side === 'right') {
		layout.removeAttribute('right-drawer-open');
		return;
	}

	layout.removeAttribute('left-drawer-open');
	layout.removeAttribute('right-drawer-open');
};

const toggleDrawer = (event: Event, side: 'left' | 'right') => {
	const story = (event.currentTarget as HTMLElement).closest('.story-app');
	const layout = story?.querySelector('cosmoz-side-drawer-layout');
	const attr = `${side}-drawer-open`;

	if (!layout) {
		return;
	}

	layout.toggleAttribute(attr, !layout.hasAttribute(attr));
};

const toggleDrawerInLayout = (
	event: Event,
	selector: string,
	side: 'left' | 'right',
) => {
	const story = (event.currentTarget as HTMLElement).closest('.story-app');
	const layout = story?.querySelector(selector) as HTMLElement | null;
	const attr = `${side}-drawer-open`;

	if (!layout) {
		return;
	}

	layout.toggleAttribute(attr, !layout.hasAttribute(attr));
};

const collapseFinanceNav = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.finance-story');
	const layout = story?.querySelector('cosmoz-side-drawer-layout');

	story?.classList.add('is-nav-collapsed');
	layout?.setAttribute('left-breakpoint', '0');
	layout?.setAttribute('left-drawer-open', '');
};

const expandFinanceNav = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.finance-story');
	const layout = story?.querySelector('cosmoz-side-drawer-layout');

	story?.classList.remove('is-nav-collapsed');
	layout?.setAttribute('left-breakpoint', '1024');
	layout?.setAttribute('left-drawer-open', '');
};

const closeFinanceDrawer = (event: CustomEvent) => {
	const layout = event.currentTarget as HTMLElement;
	const story = layout.closest('.finance-story');
	const side = event.detail?.side;

	if (side === 'right' || (!side && layout.hasAttribute('right-drawer-open'))) {
		layout.removeAttribute('right-drawer-open');
		return;
	}

	story?.classList.add('is-nav-collapsed');
	layout.setAttribute('left-breakpoint', '0');
	layout.setAttribute('left-drawer-open', '');
	layout.removeAttribute('right-drawer-open');
};

export const Default: Story = {
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="left-drawer">
				<div style="padding: 16px;">Left Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
			<cosmoz-side-panel slot="right-drawer">
				<div style="padding: 16px;">Right Drawer Content</div>
			</cosmoz-side-panel>
		</cosmoz-side-drawer-layout>
	`,
};

export const RightDrawerOpen: Story = {
	args: {
		leftBreakpoint: 1600,
		rightBreakpoint: 1600,
		leftDrawerOpen: false,
		rightDrawerOpen: true,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<div style="padding: 16px;">Main Content Area</div>
			<cosmoz-side-panel slot="right-drawer">
				<div style="padding: 16px;">Right Drawer Content</div>
			</cosmoz-side-panel>
		</cosmoz-side-drawer-layout>
	`,
};

export const LeftDrawerOpen: Story = {
	args: {
		leftBreakpoint: 1600,
		rightBreakpoint: 1600,
		leftDrawerOpen: true,
		rightDrawerOpen: false,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="left-drawer">
				<div style="padding: 16px;">Left Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
		</cosmoz-side-drawer-layout>
	`,
};

export const BothDrawersOpen: Story = {
	args: {
		leftBreakpoint: 1600,
		rightBreakpoint: 1600,
		leftDrawerOpen: true,
		rightDrawerOpen: true,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="left-drawer">
				<div style="padding: 16px;">Left Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
			<cosmoz-side-panel slot="right-drawer">
				<div style="padding: 16px;">Right Drawer Content</div>
			</cosmoz-side-panel>
		</cosmoz-side-drawer-layout>
	`,
};

export const AlwaysSideModeLeft: Story = {
	args: {
		leftBreakpoint: 0,
		rightBreakpoint: 1024,
		leftDrawerOpen: false,
		rightDrawerOpen: false,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="left-drawer">
				<div style="padding: 16px;">Left Drawer (always side)</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
			<cosmoz-side-panel slot="right-drawer">
				<div style="padding: 16px;">Right Drawer (overlay)</div>
			</cosmoz-side-panel>
		</cosmoz-side-drawer-layout>
	`,
};

export const DifferentBreakpoints: Story = {
	args: {
		leftBreakpoint: 600,
		rightBreakpoint: 1200,
		leftDrawerOpen: false,
		rightDrawerOpen: false,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			left-breakpoint=${args.leftBreakpoint}
			right-breakpoint=${args.rightBreakpoint}
			?left-drawer-open=${args.leftDrawerOpen}
			?right-drawer-open=${args.rightDrawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="left-drawer">
				<div style="padding: 16px;">
					Left Drawer (breakpoint: ${args.leftBreakpoint})
				</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
			<cosmoz-side-panel slot="right-drawer">
				<div style="padding: 16px;">
					Right Drawer (breakpoint: ${args.rightBreakpoint})
				</div>
			</cosmoz-side-panel>
		</cosmoz-side-drawer-layout>
	`,
};

export const FinancialDashboard: Story = {
	parameters: {
		layout: 'fullscreen',
	},
	render: () => html`
		<style>
			.finance-story {
				--sidebar-width: 288px;
				--cosmoz-side-drawer-layout-left-drawer-width: var(--sidebar-width);
				--cosmoz-side-drawer-layout-right-drawer-width: min(420px, 92cqw);
				--cosmoz-side-drawer-layout-backdrop-color: rgb(10 13 18 / 0.34);
				background: var(--cz-color-bg-secondary, #fafafa);
				color: var(--cz-color-text-primary, #181d27);
				font-family: var(--cz-font-body, system-ui, sans-serif);
				height: 720px;
				padding: calc(var(--cz-spacing, 0.25rem) * 4);
				box-sizing: border-box;
			}

			.finance-story.is-nav-collapsed {
				--sidebar-width: 76px;
			}

			.finance-layout {
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				box-shadow: var(--cz-shadow-xl, 0 20px 24px rgb(10 13 18 / 0.08));
				overflow: hidden;
			}

			.finance-story cosmoz-side-panel {
				--drawer-margin: 0;
				--drawer-border-top: 0;
				--drawer-border-bottom: 0;
				--drawer-border-left: 0;
				--drawer-border-right: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
				--drawer-border-radius: 0;
			}

			.finance-story cosmoz-side-panel[slot='right-drawer'] {
				--drawer-border-right: 0;
				--drawer-border-left: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
			}

			.finance-nav {
				background:
					linear-gradient(
						180deg,
						rgb(251 252 254 / 0.94),
						rgb(255 255 255 / 0.98)
					),
					var(--cz-color-bg-primary, #fff);
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				height: 100%;
				overflow: hidden;
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
				box-sizing: border-box;
			}

			.finance-brand,
			.finance-nav-item,
			.finance-nav-footer {
				display: grid;
				grid-template-columns: 40px 1fr;
				align-items: center;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.finance-brand {
				min-height: 44px;
			}

			.finance-logo,
			.finance-nav-icon,
			.finance-avatar {
				align-items: center;
				border-radius: var(--cz-radius-xl, 0.75rem);
				display: inline-grid;
				height: 40px;
				justify-items: center;
				transition:
					border-radius 0.28s ease,
					box-shadow 0.28s ease,
					transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
					background 0.28s ease;
				width: 40px;
			}

			.finance-logo {
				background: var(--cz-color-bg-brand-solid, #496dac);
				box-shadow: 0 10px 26px rgb(73 109 172 / 0.28);
				color: var(--cz-color-text-on-brand, #fff);
				font-weight: var(--cz-font-weight-bold, 700);
			}

			.finance-brand-copy,
			.finance-nav-label,
			.finance-nav-meta,
			.finance-profile-copy {
				min-width: 0;
				opacity: 1;
				transform: translateX(0);
				transition:
					opacity 0.18s ease,
					transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1),
					max-width 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
				white-space: nowrap;
			}

			.finance-brand-title,
			.finance-profile-name {
				font-size: var(--cz-text-sm, 0.875rem);
				font-weight: var(--cz-font-weight-semibold, 600);
			}

			.finance-brand-subtitle,
			.finance-profile-role,
			.finance-nav-meta,
			.finance-muted {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-xs, 0.75rem);
			}

			.finance-toggle {
				align-items: center;
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-full, 9999px);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: flex;
				font: inherit;
				gap: calc(var(--cz-spacing, 0.25rem) * 2);
				justify-content: center;
				min-height: 38px;
				padding: 0 calc(var(--cz-spacing, 0.25rem) * 3);
				transition:
					background 0.2s ease,
					border-color 0.2s ease,
					color 0.2s ease,
					transform 0.2s ease;
			}

			.finance-toggle:hover {
				background: var(--cz-color-bg-secondary, #fafafa);
				color: var(--cz-color-text-primary, #181d27);
				transform: translateY(-1px);
			}

			.finance-expand {
				display: none;
			}

			.finance-toggle-icon {
				display: inline-block;
				transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
			}

			.finance-menu {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 1.5);
			}

			.finance-nav-item {
				background: transparent;
				border: 0;
				border-radius: var(--cz-radius-xl, 0.75rem);
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				font: inherit;
				min-height: 44px;
				padding: calc(var(--cz-spacing, 0.25rem) * 1.5);
				position: relative;
				text-align: left;
				transition:
					background 0.22s ease,
					color 0.22s ease,
					grid-template-columns 0.28s cubic-bezier(0.2, 0.8, 0.2, 1),
					transform 0.22s ease;
			}

			.finance-nav-item:hover {
				background: var(--cz-color-bg-secondary, #fafafa);
				transform: translateX(2px);
			}

			.finance-nav-item.is-active {
				background: var(--cz-color-bg-brand, #dee6f6);
				color: var(--cz-color-text-brand, #496dac);
			}

			.finance-nav-item.is-active::before {
				background: var(--cz-color-bg-brand-solid, #496dac);
				border-radius: var(--cz-radius-full, 9999px);
				content: '';
				height: 24px;
				left: -12px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				transition: height 0.24s ease;
				width: 4px;
			}

			.finance-nav-icon {
				background: var(--cz-color-bg-primary, #fff);
				box-shadow: inset 0 0 0 1px var(--cz-color-border-secondary, #e9eaeb);
				font-size: 1.1rem;
			}

			.finance-spacer {
				flex: 1;
			}

			.finance-nav-footer {
				border-top: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				padding-top: calc(var(--cz-spacing, 0.25rem) * 4);
			}

			.finance-avatar {
				background: var(--cz-color-bg-success, #ecfdf3);
				color: var(--cz-color-text-success, #067647);
				font-weight: var(--cz-font-weight-bold, 700);
			}

			.finance-story.is-nav-collapsed .finance-nav {
				align-items: center;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				padding: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.finance-story.is-nav-collapsed .finance-menu {
				justify-items: center;
			}

			.finance-story.is-nav-collapsed .finance-brand,
			.finance-story.is-nav-collapsed .finance-nav-item,
			.finance-story.is-nav-collapsed .finance-nav-footer {
				grid-template-columns: 40px;
				gap: 0;
				justify-content: center;
				justify-items: center;
				width: 40px;
			}

			.finance-story.is-nav-collapsed .finance-nav-item {
				border-radius: var(--cz-radius-lg, 0.625rem);
				height: 40px;
				min-height: 40px;
				padding: 0;
				width: 40px;
			}

			.finance-story.is-nav-collapsed .finance-nav-item.is-active::before {
				display: none;
			}

			.finance-story.is-nav-collapsed .finance-nav-item.is-active {
				box-shadow: inset 0 0 0 1px var(--cz-color-border-brand, #5f81bd);
			}

			.finance-story.is-nav-collapsed .finance-nav-icon {
				height: 40px;
				line-height: 1;
				width: 40px;
			}

			.finance-story.is-nav-collapsed .finance-toggle {
				border-radius: var(--cz-radius-lg, 0.625rem);
				display: grid;
				justify-items: center;
				min-height: 40px;
				padding: 0;
				width: 40px;
			}

			.finance-story.is-nav-collapsed .finance-toggle-icon {
				line-height: 1;
			}

			.finance-story.is-nav-collapsed .finance-nav-footer {
				border-top: 0;
				justify-self: center;
				padding-top: 0;
			}

			.finance-story.is-nav-collapsed .finance-brand-copy,
			.finance-story.is-nav-collapsed .finance-nav-label,
			.finance-story.is-nav-collapsed .finance-nav-meta,
			.finance-story.is-nav-collapsed .finance-profile-copy,
			.finance-story.is-nav-collapsed .finance-toggle-text {
				max-width: 0;
				opacity: 0;
				overflow: hidden;
				transform: translateX(-12px);
			}

			.finance-story.is-nav-collapsed .finance-collapse {
				display: none;
			}

			.finance-story.is-nav-collapsed .finance-expand {
				display: inline-flex;
			}

			.finance-story.is-nav-collapsed .finance-toggle-icon {
				transform: rotate(180deg);
			}

			.finance-story.is-nav-collapsed .finance-nav-item:hover {
				transform: scale(1.04);
			}

			.finance-main {
				background:
					radial-gradient(
						circle at top left,
						rgb(222 230 246 / 0.66),
						transparent 34rem
					),
					var(--cz-color-bg-secondary, #fafafa);
				box-sizing: border-box;
				min-height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 8);
				width: 100%;
			}

			.finance-topbar,
			.finance-card,
			.finance-panel,
			.finance-transaction {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
			}

			.finance-topbar {
				align-items: center;
				border-radius: var(--cz-radius-2xl, 1rem);
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
				justify-content: space-between;
				padding: calc(var(--cz-spacing, 0.25rem) * 4);
			}

			.finance-title h2,
			.finance-title p,
			.finance-panel h3,
			.finance-panel p,
			.finance-card p,
			.finance-card h3 {
				margin: 0;
			}

			.finance-title h2 {
				font-size: var(--cz-text-display-xs, 1.5rem);
				letter-spacing: -0.02em;
			}

			.finance-actions {
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				flex-wrap: wrap;
				justify-content: flex-end;
			}

			.finance-button,
			.finance-secondary-button {
				border-radius: var(--cz-radius-full, 9999px);
				cursor: pointer;
				font: inherit;
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5)
					calc(var(--cz-spacing, 0.25rem) * 4);
				transition:
					transform 0.2s ease,
					box-shadow 0.2s ease,
					background 0.2s ease;
			}

			.finance-button {
				background: var(--cz-color-bg-brand-solid, #496dac);
				border: 1px solid var(--cz-color-bg-brand-solid, #496dac);
				box-shadow: var(--cz-shadow-xs-skeumorphic, var(--cz-shadow-xs, none));
				color: var(--cz-color-text-on-brand, #fff);
			}

			.finance-secondary-button {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-primary, #d5d7da);
				color: var(--cz-color-text-secondary, #414651);
			}

			.finance-button:hover,
			.finance-secondary-button:hover {
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
				transform: translateY(-1px);
			}

			.finance-grid {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: repeat(4, minmax(150px, 1fr));
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.finance-card {
				border-radius: var(--cz-radius-2xl, 1rem);
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.finance-card h3 {
				font-size: var(--cz-text-display-xs, 1.5rem);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 2);
			}

			.finance-card-trend {
				color: var(--cz-color-text-success, #067647);
				font-size: var(--cz-text-xs, 0.75rem);
				font-weight: var(--cz-font-weight-semibold, 600);
			}

			.finance-content-grid {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.finance-panel {
				border-radius: var(--cz-radius-2xl, 1rem);
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.finance-chart {
				align-items: end;
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: repeat(10, 1fr);
				height: 220px;
				margin-top: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.finance-bar {
				background: linear-gradient(
					180deg,
					var(--cz-color-brand-400, #7896ca),
					var(--cz-color-brand-700, #405d90)
				);
				border-radius: var(--cz-radius-full, 9999px)
					var(--cz-radius-full, 9999px) var(--cz-radius-sm, 0.375rem)
					var(--cz-radius-sm, 0.375rem);
				box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.34);
				min-height: 34px;
			}

			.finance-transactions {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.finance-transaction {
				align-items: center;
				border-radius: var(--cz-radius-xl, 0.75rem);
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 42px 1fr auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.finance-transaction-icon {
				align-items: center;
				background: var(--cz-color-bg-secondary, #fafafa);
				border-radius: var(--cz-radius-xl, 0.75rem);
				display: inline-grid;
				height: 42px;
				justify-items: center;
				width: 42px;
			}

			.finance-notifications {
				background: var(--cz-color-bg-primary, #fff);
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
				height: 100%;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.finance-notifications-header {
				align-items: start;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				justify-content: space-between;
			}

			.finance-icon-button {
				align-items: center;
				background: var(--cz-color-bg-secondary, #fafafa);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: inline-grid;
				font: inherit;
				height: 36px;
				justify-items: center;
				width: 36px;
			}

			.finance-notice {
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-left: 4px solid var(--cz-color-border-brand, #5f81bd);
				border-radius: var(--cz-radius-xl, 0.75rem);
				padding: calc(var(--cz-spacing, 0.25rem) * 4);
			}

			.finance-notice.warning {
				border-left-color: var(--cz-color-warning-500, #f79009);
			}

			.finance-notice.success {
				border-left-color: var(--cz-color-success-500, #17b26a);
			}

			.finance-notice h4,
			.finance-notice p {
				margin: 0;
			}

			.finance-notice p {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1.5);
			}

			@media (max-width: 940px) {
				.finance-grid,
				.finance-content-grid {
					grid-template-columns: 1fr;
				}

				.finance-main {
					padding: calc(var(--cz-spacing, 0.25rem) * 5);
				}
			}
		</style>

		<div class="story-app finance-story">
			<cosmoz-side-drawer-layout
				class="finance-layout"
				left-breakpoint="1024"
				right-breakpoint="9999"
				left-drawer-open
				@close=${closeFinanceDrawer}
			>
				<cosmoz-side-panel slot="left-drawer">
					<nav class="finance-nav" aria-label="Financial dashboard sections">
						<div class="finance-brand">
							<div class="finance-logo">F</div>
							<div class="finance-brand-copy">
								<div class="finance-brand-title">Finova</div>
								<div class="finance-brand-subtitle">Portfolio OS</div>
							</div>
						</div>

						<button
							class="finance-toggle finance-collapse"
							type="button"
							@click=${collapseFinanceNav}
						>
							<span class="finance-toggle-icon">&lt;</span>
							<span class="finance-toggle-text">Collapse menu</span>
						</button>

						<button
							class="finance-toggle finance-expand"
							type="button"
							@click=${expandFinanceNav}
						>
							<span class="finance-toggle-icon">&gt;</span>
							<span class="finance-toggle-text">Expand menu</span>
						</button>

						<div class="finance-menu">
							<button class="finance-nav-item is-active" type="button">
								<span class="finance-nav-icon">H</span>
								<span
									><span class="finance-nav-label">Overview</span><br /><span
										class="finance-nav-meta"
										>Live balances</span
									></span
								>
							</button>
							<button class="finance-nav-item" type="button">
								<span class="finance-nav-icon">C</span>
								<span
									><span class="finance-nav-label">Cash flow</span><br /><span
										class="finance-nav-meta"
										>Runway forecast</span
									></span
								>
							</button>
							<button class="finance-nav-item" type="button">
								<span class="finance-nav-icon">I</span>
								<span
									><span class="finance-nav-label">Investments</span><br /><span
										class="finance-nav-meta"
										>32 positions</span
									></span
								>
							</button>
							<button class="finance-nav-item" type="button">
								<span class="finance-nav-icon">T</span>
								<span
									><span class="finance-nav-label">Transfers</span><br /><span
										class="finance-nav-meta"
										>Pending approvals</span
									></span
								>
							</button>
						</div>

						<div class="finance-spacer"></div>
						<div class="finance-nav-footer">
							<div class="finance-avatar">AM</div>
							<div class="finance-profile-copy">
								<div class="finance-profile-name">Avery Morgan</div>
								<div class="finance-profile-role">Finance lead</div>
							</div>
						</div>
					</nav>
				</cosmoz-side-panel>

				<main class="finance-main">
					<section class="finance-topbar">
						<div class="finance-title">
							<p class="finance-muted">Thursday, June 4</p>
							<h2>Good morning, Avery</h2>
						</div>
						<div class="finance-actions">
							<button class="finance-secondary-button" type="button">
								Export report
							</button>
							<button
								class="finance-button"
								type="button"
								@click=${(event: Event) => toggleDrawer(event, 'right')}
							>
								Notifications
							</button>
						</div>
					</section>

					<section class="finance-grid" aria-label="Financial KPIs">
						<article class="finance-card">
							<p class="finance-muted">Available cash</p>
							<h3>$428,940</h3>
							<p class="finance-card-trend">+8.2% month over month</p>
						</article>
						<article class="finance-card">
							<p class="finance-muted">Net revenue</p>
							<h3>$92,180</h3>
							<p class="finance-card-trend">+12.4% vs forecast</p>
						</article>
						<article class="finance-card">
							<p class="finance-muted">Burn rate</p>
							<h3>$31,600</h3>
							<p class="finance-card-trend">6.8 months runway</p>
						</article>
						<article class="finance-card">
							<p class="finance-muted">Approvals</p>
							<h3>14</h3>
							<p class="finance-card-trend">5 require review</p>
						</article>
					</section>

					<section class="finance-content-grid">
						<article class="finance-panel">
							<p class="finance-muted">Treasury activity</p>
							<h3>Daily liquidity trend</h3>
							<div class="finance-chart" aria-hidden="true">
								<div class="finance-bar" style="height: 44%;"></div>
								<div class="finance-bar" style="height: 62%;"></div>
								<div class="finance-bar" style="height: 51%;"></div>
								<div class="finance-bar" style="height: 78%;"></div>
								<div class="finance-bar" style="height: 66%;"></div>
								<div class="finance-bar" style="height: 84%;"></div>
								<div class="finance-bar" style="height: 58%;"></div>
								<div class="finance-bar" style="height: 92%;"></div>
								<div class="finance-bar" style="height: 73%;"></div>
								<div class="finance-bar" style="height: 88%;"></div>
							</div>
						</article>

						<article class="finance-panel">
							<p class="finance-muted">Recent transactions</p>
							<h3>Needs attention</h3>
							<div class="finance-transactions">
								<div class="finance-transaction">
									<span class="finance-transaction-icon">OUT</span>
									<span
										><strong>Vendor payout</strong><br /><span
											class="finance-muted"
											>Acme Cloud Services</span
										></span
									>
									<strong>-$8,420</strong>
								</div>
								<div class="finance-transaction">
									<span class="finance-transaction-icon">IN</span>
									<span
										><strong>Subscription revenue</strong><br /><span
											class="finance-muted"
											>Northwind renewal</span
										></span
									>
									<strong>+$18,900</strong>
								</div>
								<div class="finance-transaction">
									<span class="finance-transaction-icon">!</span>
									<span
										><strong>Wire review</strong><br /><span
											class="finance-muted"
											>Awaiting second approval</span
										></span
									>
									<strong>$42,000</strong>
								</div>
							</div>
						</article>
					</section>
				</main>

				<cosmoz-side-panel slot="right-drawer">
					<aside
						class="finance-notifications"
						aria-label="Financial notifications"
					>
						<div class="finance-notifications-header">
							<div>
								<p class="finance-muted">Alerts</p>
								<h2>Notifications</h2>
							</div>
							<button
								class="finance-icon-button"
								type="button"
								aria-label="Close notifications"
								@click=${(event: Event) => toggleDrawer(event, 'right')}
							>
								x
							</button>
						</div>
						<div class="finance-notice warning">
							<h4>Wire approval required</h4>
							<p>Atlas Manufacturing needs a second approver before 15:00.</p>
						</div>
						<div class="finance-notice success">
							<h4>Forecast updated</h4>
							<p>
								Cash runway increased by 11 days after today's revenue batch.
							</p>
						</div>
						<div class="finance-notice">
							<h4>FX rate movement</h4>
							<p>
								EUR exposure moved 1.8% since yesterday. Hedge review suggested.
							</p>
						</div>
					</aside>
				</cosmoz-side-panel>
			</cosmoz-side-drawer-layout>
		</div>
	`,
};

export const PizzaOrderMap: Story = {
	parameters: {
		layout: 'fullscreen',
	},
	render: () => html`
		<style>
			.pizza-story {
				--cosmoz-side-drawer-layout-left-drawer-width: min(320px, 88cqw);
				--cosmoz-side-drawer-layout-right-drawer-width: min(460px, 94cqw);
				--cosmoz-side-drawer-layout-backdrop-color: rgb(10 13 18 / 0.28);
				background:
					radial-gradient(
						circle at 20% 10%,
						rgb(254 240 199 / 0.8),
						transparent 24rem
					),
					var(--cz-color-bg-secondary, #fafafa);
				color: var(--cz-color-text-primary, #181d27);
				font-family: var(--cz-font-body, system-ui, sans-serif);
				height: 720px;
				padding: calc(var(--cz-spacing, 0.25rem) * 4);
				box-sizing: border-box;
			}

			.pizza-layout {
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				box-shadow: var(--cz-shadow-xl, 0 20px 24px rgb(10 13 18 / 0.08));
				overflow: hidden;
			}

			.pizza-layout:not([left-drawer-open])
				cosmoz-side-panel[slot='left-drawer'],
			.pizza-layout:not([right-drawer-open])
				cosmoz-side-panel[slot='right-drawer'] {
				pointer-events: none;
				visibility: hidden;
			}

			.pizza-story cosmoz-side-panel {
				--drawer-margin: 0;
				--drawer-border-radius: 0;
				--drawer-border-top: 0;
				--drawer-border-bottom: 0;
				--drawer-border-left: 0;
				--drawer-border-right: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
			}

			.pizza-story cosmoz-side-panel[slot='right-drawer'] {
				--drawer-border-right: 0;
				--drawer-border-left: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
			}

			.pizza-menu,
			.pizza-map-panel {
				background: var(--cz-color-bg-primary, #fff);
				box-sizing: border-box;
				height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.pizza-menu {
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-restaurant {
				background:
					linear-gradient(135deg, rgb(122 39 26 / 0.92), rgb(220 104 3 / 0.9)),
					var(--cz-color-bg-warning-solid, #dc6803);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-lg, 0 12px 16px rgb(10 13 18 / 0.08));
				color: var(--cz-color-white, #fff);
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-restaurant p,
			.pizza-restaurant h3,
			.pizza-order-title p,
			.pizza-order-title h2,
			.pizza-section h3,
			.pizza-section p,
			.pizza-card p,
			.pizza-card h3,
			.pizza-map-panel p,
			.pizza-map-panel h2,
			.pizza-map-card p,
			.pizza-map-card h3 {
				margin: 0;
			}

			.pizza-menu-list {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 2);
			}

			.pizza-menu-button {
				align-items: center;
				background: transparent;
				border: 0;
				border-radius: var(--cz-radius-xl, 0.75rem);
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: grid;
				font: inherit;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 38px 1fr;
				padding: calc(var(--cz-spacing, 0.25rem) * 3);
				text-align: left;
				transition:
					background 0.2s ease,
					transform 0.2s ease;
			}

			.pizza-menu-button:hover,
			.pizza-menu-button.active {
				background: var(--cz-color-bg-warning, #fffaeb);
				transform: translateX(2px);
			}

			.pizza-menu-icon {
				align-items: center;
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-lg, 0.625rem);
				display: inline-grid;
				height: 38px;
				justify-items: center;
				width: 38px;
			}

			.pizza-main {
				box-sizing: border-box;
				min-height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 8);
				width: 100%;
			}

			.pizza-hero {
				align-items: center;
				background:
					linear-gradient(
						135deg,
						rgb(255 255 255 / 0.94),
						rgb(255 250 235 / 0.96)
					),
					var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: minmax(0, 1fr) auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.pizza-eyebrow,
			.pizza-muted {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
			}

			.pizza-order-title h2 {
				font-size: var(--cz-text-display-sm, 1.875rem);
				letter-spacing: -0.03em;
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1);
			}

			.pizza-actions {
				display: flex;
				flex-wrap: wrap;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				justify-content: flex-end;
			}

			.pizza-button,
			.pizza-button-secondary {
				border-radius: var(--cz-radius-full, 9999px);
				cursor: pointer;
				font: inherit;
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5)
					calc(var(--cz-spacing, 0.25rem) * 4);
				transition:
					transform 0.2s ease,
					box-shadow 0.2s ease,
					background 0.2s ease;
			}

			.pizza-button {
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 1px solid var(--cz-color-bg-warning-solid, #dc6803);
				box-shadow: var(--cz-shadow-xs-skeumorphic, var(--cz-shadow-xs, none));
				color: var(--cz-color-white, #fff);
			}

			.pizza-button-secondary {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-primary, #d5d7da);
				color: var(--cz-color-text-secondary, #414651);
			}

			.pizza-button:hover,
			.pizza-button-secondary:hover {
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
				transform: translateY(-1px);
			}

			.pizza-grid {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-section,
			.pizza-card,
			.pizza-map-card {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-timeline {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-step {
				align-items: start;
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 30px 1fr;
			}

			.pizza-dot {
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 4px solid var(--cz-color-bg-warning, #fffaeb);
				border-radius: var(--cz-radius-full, 9999px);
				height: 18px;
				margin-top: 2px;
				width: 18px;
			}

			.pizza-dot.pending {
				background: var(--cz-color-bg-quaternary, #e9eaeb);
			}

			.pizza-items {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-item,
			.pizza-total-row {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				justify-content: space-between;
			}

			.pizza-item {
				border-bottom: 1px solid var(--cz-color-border-tertiary, #f5f5f5);
				padding-bottom: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.pizza-pill {
				background: var(--cz-color-bg-success, #ecfdf3);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-success, #067647);
				font-size: var(--cz-text-xs, 0.75rem);
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 1.5)
					calc(var(--cz-spacing, 0.25rem) * 2.5);
			}

			.pizza-map-panel {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-rows: auto minmax(280px, 1fr) auto;
			}

			.pizza-map {
				background:
					linear-gradient(
						90deg,
						transparent 47%,
						rgb(255 255 255 / 0.86) 47% 53%,
						transparent 53%
					),
					linear-gradient(
						27deg,
						transparent 40%,
						rgb(255 255 255 / 0.86) 40% 46%,
						transparent 46%
					),
					linear-gradient(
						150deg,
						transparent 55%,
						rgb(255 255 255 / 0.75) 55% 61%,
						transparent 61%
					),
					linear-gradient(
						135deg,
						var(--cz-color-brand-50, #dee6f6),
						var(--cz-color-warning-50, #fffaeb)
					);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				min-height: 330px;
				overflow: hidden;
				position: relative;
			}

			.pizza-route {
				border: 5px dashed var(--cz-color-warning-600, #dc6803);
				border-bottom: 0;
				border-left: 0;
				border-radius: 0 var(--cz-radius-4xl, 1.5rem) 0 0;
				height: 44%;
				left: 24%;
				position: absolute;
				top: 34%;
				transform: rotate(-10deg);
				width: 52%;
			}

			.pizza-pin {
				align-items: center;
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 4px solid var(--cz-color-white, #fff);
				border-radius: var(--cz-radius-full, 9999px);
				box-shadow: var(--cz-shadow-lg, 0 12px 16px rgb(10 13 18 / 0.08));
				color: var(--cz-color-white, #fff);
				display: inline-grid;
				height: 48px;
				justify-items: center;
				position: absolute;
				width: 48px;
			}

			.pizza-pin.restaurant {
				left: 19%;
				top: 62%;
			}

			.pizza-pin.home {
				background: var(--cz-color-bg-brand-solid, #496dac);
				right: 16%;
				top: 23%;
			}

			.pizza-driver {
				align-items: center;
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 52px 1fr auto;
			}

			.pizza-driver-avatar {
				align-items: center;
				background: var(--cz-color-bg-brand, #dee6f6);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-brand, #496dac);
				display: inline-grid;
				font-weight: var(--cz-font-weight-bold, 700);
				height: 52px;
				justify-items: center;
				width: 52px;
			}

			@media (max-width: 880px) {
				.pizza-hero,
				.pizza-grid {
					grid-template-columns: 1fr;
				}

				.pizza-actions {
					justify-content: flex-start;
				}

				.pizza-main {
					padding: calc(var(--cz-spacing, 0.25rem) * 5);
				}
			}
		</style>

		<div class="story-app pizza-story">
			<cosmoz-side-drawer-layout class="pizza-layout" @close=${closeDrawer}>
				<cosmoz-side-panel slot="left-drawer">
					<aside class="pizza-menu" aria-label="Order menu">
						<section class="pizza-restaurant">
							<p>Now preparing</p>
							<h3>Luigi's Corner Pizza</h3>
							<p>Order #4821 - 2.4 miles away</p>
						</section>

						<nav class="pizza-menu-list">
							<button class="pizza-menu-button active" type="button">
								<span class="pizza-menu-icon">1</span>
								<span
									><strong>Track order</strong><br /><span class="pizza-muted"
										>Live kitchen and delivery steps</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">2</span>
								<span
									><strong>Delivery note</strong><br /><span class="pizza-muted"
										>Gate code and drop-off details</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">3</span>
								<span
									><strong>Contact driver</strong><br /><span
										class="pizza-muted"
										>Available after pickup</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">4</span>
								<span
									><strong>Receipt</strong><br /><span class="pizza-muted"
										>Payment, taxes, and tip</span
									></span
								>
							</button>
						</nav>
					</aside>
				</cosmoz-side-panel>

				<main class="pizza-main">
					<section class="pizza-hero">
						<div class="pizza-order-title">
							<p class="pizza-eyebrow">Arriving around 7:42 PM</p>
							<h2>Your pizza is in the oven</h2>
							<p class="pizza-muted">
								Marco is preparing your order before it heads across Midtown.
							</p>
						</div>
						<div class="pizza-actions">
							<button
								class="pizza-button-secondary"
								type="button"
								@click=${(event: Event) => toggleDrawer(event, 'left')}
							>
								Order menu
							</button>
							<button
								class="pizza-button"
								type="button"
								@click=${(event: Event) => toggleDrawer(event, 'right')}
							>
								Show map
							</button>
						</div>
					</section>

					<section class="pizza-grid">
						<article class="pizza-section">
							<p class="pizza-muted">Order progress</p>
							<h3>Almost ready for pickup</h3>
							<div class="pizza-timeline">
								<div class="pizza-step">
									<span class="pizza-dot"></span>
									<span
										><strong>Order confirmed</strong><br /><span
											class="pizza-muted"
											>Accepted at 7:06 PM.</span
										></span
									>
								</div>
								<div class="pizza-step">
									<span class="pizza-dot"></span>
									<span
										><strong>Baking now</strong><br /><span class="pizza-muted"
											>Finishing in the deck oven.</span
										></span
									>
								</div>
								<div class="pizza-step">
									<span class="pizza-dot pending"></span>
									<span
										><strong>Out for delivery</strong><br /><span
											class="pizza-muted"
											>Driver heads your way after pickup.</span
										></span
									>
								</div>
							</div>
						</article>

						<article class="pizza-card">
							<p class="pizza-muted">Order details</p>
							<h3>Family dinner</h3>
							<div class="pizza-items">
								<div class="pizza-item">
									<span
										><strong>1x Pepperoni Grande</strong><br /><span
											class="pizza-muted"
											>Extra basil, well done</span
										></span
									>
									<strong>$21.00</strong>
								</div>
								<div class="pizza-item">
									<span
										><strong>1x Burrata Margherita</strong><br /><span
											class="pizza-muted"
											>Add chili oil</span
										></span
									>
									<strong>$19.50</strong>
								</div>
								<div class="pizza-item">
									<span
										><strong>Garlic knots</strong><br /><span
											class="pizza-muted"
											>Parmesan and marinara</span
										></span
									>
									<strong>$7.00</strong>
								</div>
								<div class="pizza-total-row">
									<span class="pizza-pill">Paid with Apple Pay</span
									><strong>$56.84</strong>
								</div>
							</div>
						</article>
					</section>
				</main>

				<cosmoz-side-panel slot="right-drawer">
					<aside class="pizza-map-panel" aria-label="Delivery map">
						<div>
							<p class="pizza-muted">Delivery map</p>
							<h2>Midtown route</h2>
						</div>
						<div class="pizza-map" aria-hidden="true">
							<div class="pizza-route"></div>
							<div class="pizza-pin restaurant">P</div>
							<div class="pizza-pin home">H</div>
						</div>
						<section class="pizza-map-card">
							<div class="pizza-driver">
								<div class="pizza-driver-avatar">DR</div>
								<div>
									<h3>Drew is assigned</h3>
									<p class="pizza-muted">Pickup estimate: 6 minutes</p>
								</div>
								<span class="pizza-pill">2.4 mi</span>
							</div>
						</section>
					</aside>
				</cosmoz-side-panel>
			</cosmoz-side-drawer-layout>
		</div>
	`,
};

export const PizzaOrderMapNestedLayouts: Story = {
	parameters: {
		layout: 'fullscreen',
	},
	render: () => html`
		<style>
			.pizza-nested-story {
				background:
					radial-gradient(
						circle at 20% 10%,
						rgb(254 240 199 / 0.8),
						transparent 24rem
					),
					var(--cz-color-bg-secondary, #fafafa);
				color: var(--cz-color-text-primary, #181d27);
				font-family: var(--cz-font-body, system-ui, sans-serif);
				height: 720px;
				padding: calc(var(--cz-spacing, 0.25rem) * 4);
				box-sizing: border-box;
			}

			.pizza-nested-outer {
				--cosmoz-side-drawer-layout-left-drawer-width: min(320px, 88cqw);
				--cosmoz-side-drawer-layout-backdrop-color: rgb(10 13 18 / 0.28);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				box-shadow: var(--cz-shadow-xl, 0 20px 24px rgb(10 13 18 / 0.08));
				overflow: hidden;
			}

			.pizza-nested-inner {
				--cosmoz-side-drawer-layout-right-drawer-width: min(460px, 94cqw);
				--cosmoz-side-drawer-layout-backdrop-color: rgb(10 13 18 / 0.22);
				height: 100%;
			}

			.pizza-nested-outer:not([left-drawer-open])
				cosmoz-side-panel[slot='left-drawer'],
			.pizza-nested-inner:not([right-drawer-open])
				cosmoz-side-panel[slot='right-drawer'] {
				pointer-events: none;
				visibility: hidden;
			}

			.pizza-nested-story cosmoz-side-panel {
				--drawer-margin: 0;
				--drawer-border-radius: 0;
				--drawer-border-top: 0;
				--drawer-border-bottom: 0;
				--drawer-border-left: 0;
				--drawer-border-right: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
			}

			.pizza-nested-story cosmoz-side-panel[slot='right-drawer'] {
				--drawer-border-right: 0;
				--drawer-border-left: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
			}

			.pizza-menu,
			.pizza-map-panel {
				background: var(--cz-color-bg-primary, #fff);
				box-sizing: border-box;
				height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.pizza-menu {
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-restaurant {
				background:
					linear-gradient(135deg, rgb(122 39 26 / 0.92), rgb(220 104 3 / 0.9)),
					var(--cz-color-bg-warning-solid, #dc6803);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-lg, 0 12px 16px rgb(10 13 18 / 0.08));
				color: var(--cz-color-white, #fff);
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-restaurant p,
			.pizza-restaurant h3,
			.pizza-order-title p,
			.pizza-order-title h2,
			.pizza-section h3,
			.pizza-section p,
			.pizza-card p,
			.pizza-card h3,
			.pizza-map-panel p,
			.pizza-map-panel h2 {
				margin: 0;
			}

			.pizza-menu-list {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 2);
			}

			.pizza-menu-button {
				align-items: center;
				background: transparent;
				border: 0;
				border-radius: var(--cz-radius-xl, 0.75rem);
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: grid;
				font: inherit;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 38px 1fr;
				padding: calc(var(--cz-spacing, 0.25rem) * 3);
				text-align: left;
			}

			.pizza-menu-button:hover,
			.pizza-menu-button.active {
				background: var(--cz-color-bg-warning, #fffaeb);
			}

			.pizza-menu-icon {
				align-items: center;
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-lg, 0.625rem);
				display: inline-grid;
				height: 38px;
				justify-items: center;
				width: 38px;
			}

			.pizza-main {
				box-sizing: border-box;
				min-height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 8);
				width: 100%;
			}

			.pizza-hero {
				align-items: center;
				background:
					linear-gradient(
						135deg,
						rgb(255 255 255 / 0.94),
						rgb(255 250 235 / 0.96)
					),
					var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: minmax(0, 1fr) auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.pizza-eyebrow,
			.pizza-muted {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
			}

			.pizza-order-title h2 {
				font-size: var(--cz-text-display-sm, 1.875rem);
				letter-spacing: -0.03em;
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1);
			}

			.pizza-actions {
				display: flex;
				flex-wrap: wrap;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				justify-content: flex-end;
			}

			.pizza-button,
			.pizza-button-secondary {
				border-radius: var(--cz-radius-full, 9999px);
				cursor: pointer;
				font: inherit;
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5)
					calc(var(--cz-spacing, 0.25rem) * 4);
			}

			.pizza-button {
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 1px solid var(--cz-color-bg-warning-solid, #dc6803);
				box-shadow: var(--cz-shadow-xs-skeumorphic, var(--cz-shadow-xs, none));
				color: var(--cz-color-white, #fff);
			}

			.pizza-button-secondary {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-primary, #d5d7da);
				color: var(--cz-color-text-secondary, #414651);
			}

			.pizza-grid {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-section,
			.pizza-card,
			.pizza-map-card {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-timeline,
			.pizza-items {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.pizza-step {
				align-items: start;
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 30px 1fr;
			}

			.pizza-dot {
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 4px solid var(--cz-color-bg-warning, #fffaeb);
				border-radius: var(--cz-radius-full, 9999px);
				height: 18px;
				margin-top: 2px;
				width: 18px;
			}

			.pizza-item,
			.pizza-total-row {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				justify-content: space-between;
			}

			.pizza-item {
				border-bottom: 1px solid var(--cz-color-border-tertiary, #f5f5f5);
				padding-bottom: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.pizza-pill {
				background: var(--cz-color-bg-success, #ecfdf3);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-success, #067647);
				font-size: var(--cz-text-xs, 0.75rem);
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 1.5)
					calc(var(--cz-spacing, 0.25rem) * 2.5);
			}

			.pizza-map-panel {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-rows: auto minmax(280px, 1fr);
			}

			.pizza-map {
				background:
					linear-gradient(
						90deg,
						transparent 47%,
						rgb(255 255 255 / 0.86) 47% 53%,
						transparent 53%
					),
					linear-gradient(
						27deg,
						transparent 40%,
						rgb(255 255 255 / 0.86) 40% 46%,
						transparent 46%
					),
					linear-gradient(
						150deg,
						transparent 55%,
						rgb(255 255 255 / 0.75) 55% 61%,
						transparent 61%
					),
					linear-gradient(
						135deg,
						var(--cz-color-brand-50, #dee6f6),
						var(--cz-color-warning-50, #fffaeb)
					);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-3xl, 1.25rem);
				min-height: 330px;
				overflow: hidden;
				position: relative;
			}

			.pizza-route {
				border: 5px dashed var(--cz-color-warning-600, #dc6803);
				border-bottom: 0;
				border-left: 0;
				border-radius: 0 var(--cz-radius-4xl, 1.5rem) 0 0;
				height: 44%;
				left: 24%;
				position: absolute;
				top: 34%;
				transform: rotate(-10deg);
				width: 52%;
			}

			.pizza-pin {
				align-items: center;
				background: var(--cz-color-bg-warning-solid, #dc6803);
				border: 4px solid var(--cz-color-white, #fff);
				border-radius: var(--cz-radius-full, 9999px);
				box-shadow: var(--cz-shadow-lg, 0 12px 16px rgb(10 13 18 / 0.08));
				color: var(--cz-color-white, #fff);
				display: inline-grid;
				height: 48px;
				justify-items: center;
				position: absolute;
				width: 48px;
			}

			.pizza-pin.restaurant {
				left: 19%;
				top: 62%;
			}

			.pizza-pin.home {
				background: var(--cz-color-bg-brand-solid, #496dac);
				right: 16%;
				top: 23%;
			}

			.pizza-driver {
				align-items: center;
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				grid-template-columns: 52px 1fr auto;
			}

			.pizza-driver-avatar {
				align-items: center;
				background: var(--cz-color-bg-brand, #dee6f6);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-brand, #496dac);
				display: inline-grid;
				font-weight: var(--cz-font-weight-bold, 700);
				height: 52px;
				justify-items: center;
				width: 52px;
			}

			@media (max-width: 880px) {
				.pizza-hero,
				.pizza-grid {
					grid-template-columns: 1fr;
				}

				.pizza-actions {
					justify-content: flex-start;
				}

				.pizza-main {
					padding: calc(var(--cz-spacing, 0.25rem) * 5);
				}
			}
		</style>

		<div class="story-app pizza-story pizza-nested-story">
			<cosmoz-side-drawer-layout
				class="pizza-layout pizza-nested-outer"
				@close=${closeDrawer}
			>
				<cosmoz-side-panel slot="left-drawer">
					<aside class="pizza-menu" aria-label="Order menu">
						<section class="pizza-restaurant">
							<p>Now preparing</p>
							<h3>Luigi's Corner Pizza</h3>
							<p>Order #4821 - 2.4 miles away</p>
						</section>
						<nav class="pizza-menu-list">
							<button class="pizza-menu-button active" type="button">
								<span class="pizza-menu-icon">1</span>
								<span
									><strong>Track order</strong><br /><span class="pizza-muted"
										>Live kitchen and delivery steps</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">2</span>
								<span
									><strong>Delivery note</strong><br /><span class="pizza-muted"
										>Gate code and drop-off details</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">3</span>
								<span
									><strong>Contact driver</strong><br /><span
										class="pizza-muted"
										>Available after pickup</span
									></span
								>
							</button>
							<button class="pizza-menu-button" type="button">
								<span class="pizza-menu-icon">4</span>
								<span
									><strong>Receipt</strong><br /><span class="pizza-muted"
										>Payment, taxes, and tip</span
									></span
								>
							</button>
						</nav>
					</aside>
				</cosmoz-side-panel>

				<cosmoz-side-drawer-layout
					class="pizza-nested-inner"
					@close=${closeDrawer}
				>
					<main class="pizza-main">
						<section class="pizza-hero">
							<div class="pizza-order-title">
								<p class="pizza-eyebrow">Arriving around 7:42 PM</p>
								<h2>Your pizza is in the oven</h2>
								<p class="pizza-muted">
									Marco is preparing your order before it heads across Midtown.
								</p>
							</div>
							<div class="pizza-actions">
								<button
									class="pizza-button-secondary"
									type="button"
									@click=${(event: Event) =>
										toggleDrawerInLayout(event, '.pizza-nested-outer', 'left')}
								>
									Order menu
								</button>
								<button
									class="pizza-button"
									type="button"
									@click=${(event: Event) =>
										toggleDrawerInLayout(event, '.pizza-nested-inner', 'right')}
								>
									Show map
								</button>
							</div>
						</section>

						<section class="pizza-grid">
							<article class="pizza-section">
								<p class="pizza-muted">Order progress</p>
								<h3>Almost ready for pickup</h3>
								<div class="pizza-timeline">
									<div class="pizza-step">
										<span class="pizza-dot"></span>
										<span
											><strong>Order confirmed</strong><br /><span
												class="pizza-muted"
												>Accepted at 7:06 PM.</span
											></span
										>
									</div>
									<div class="pizza-step">
										<span class="pizza-dot"></span>
										<span
											><strong>Baking now</strong><br /><span
												class="pizza-muted"
												>Finishing in the deck oven.</span
											></span
										>
									</div>
									<div class="pizza-step">
										<span class="pizza-dot pending"></span>
										<span
											><strong>Out for delivery</strong><br /><span
												class="pizza-muted"
												>Driver heads your way after pickup.</span
											></span
										>
									</div>
								</div>
							</article>
							<article class="pizza-card">
								<p class="pizza-muted">Order details</p>
								<h3>Family dinner</h3>
								<div class="pizza-items">
									<div class="pizza-item">
										<span
											><strong>1x Pepperoni Grande</strong><br /><span
												class="pizza-muted"
												>Extra basil, well done</span
											></span
										>
										<strong>$21.00</strong>
									</div>
									<div class="pizza-item">
										<span
											><strong>1x Burrata Margherita</strong><br /><span
												class="pizza-muted"
												>Add chili oil</span
											></span
										>
										<strong>$19.50</strong>
									</div>
									<div class="pizza-item">
										<span
											><strong>Garlic knots</strong><br /><span
												class="pizza-muted"
												>Parmesan and marinara</span
											></span
										>
										<strong>$7.00</strong>
									</div>
									<div class="pizza-total-row">
										<span class="pizza-pill">Paid with Apple Pay</span
										><strong>$56.84</strong>
									</div>
								</div>
							</article>
						</section>
					</main>

					<cosmoz-side-panel slot="right-drawer">
						<aside class="pizza-map-panel" aria-label="Delivery map">
							<div>
								<p class="pizza-muted">Delivery map</p>
								<h2>Midtown route</h2>
							</div>
							<div class="pizza-map" aria-hidden="true">
								<div class="pizza-route"></div>
								<div class="pizza-pin restaurant">P</div>
								<div class="pizza-pin home">H</div>
							</div>
							<section class="pizza-map-card">
								<div class="pizza-driver">
									<div class="pizza-driver-avatar">DR</div>
									<div>
										<h3>Drew is assigned</h3>
										<p class="pizza-muted">Pickup estimate: 6 minutes</p>
									</div>
									<span class="pizza-pill">2.4 mi</span>
								</div>
							</section>
						</aside>
					</cosmoz-side-panel>
				</cosmoz-side-drawer-layout>
			</cosmoz-side-drawer-layout>
		</div>
	`,
};
