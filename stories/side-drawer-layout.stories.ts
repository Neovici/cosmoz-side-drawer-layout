import '@neovici/cosmoz-tokens';
import { html } from '@pionjs/pion';
import type { Meta, StoryObj } from '@storybook/web-components';
import { fn } from 'storybook/test';
import '../src/cosmoz-side-drawer-layout';
import '../src/cosmoz-side-panel';

interface StoryArgs {
	breakpoint: number;
	side: 'left' | 'right';
	drawerOpen: boolean;
	onClose: ReturnType<typeof fn>;
}

const meta: Meta<StoryArgs> = {
	title: 'SideDrawerLayout',
	component: 'cosmoz-side-drawer-layout',
	tags: ['autodocs'],
	argTypes: {
		breakpoint: {
			control: 'number',
			description:
				'Width breakpoint (px) for side/overlay switch. 0 = always side mode.',
		},
		side: {
			control: 'select',
			options: ['left', 'right'],
			description: 'Which side the drawer opens on.',
		},
		drawerOpen: {
			control: 'boolean',
			description: 'Opens the drawer (overlay mode)',
		},
	},
	args: {
		breakpoint: 1024,
		side: 'left',
		drawerOpen: false,
		onClose: fn(),
	},
};

export default meta;

type Story = StoryObj<StoryArgs>;

const closeDrawer = (event: CustomEvent) => {
	(event.currentTarget as HTMLElement).removeAttribute('drawer-open');
};

const toggleDrawer = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.story-app');
	const layout = story?.querySelector('cosmoz-side-drawer-layout');

	if (!layout) {
		return;
	}

	layout.toggleAttribute('drawer-open', !layout.hasAttribute('drawer-open'));
};

const toggleDrawerInLayout = (event: Event, selector: string) => {
	const story = (event.currentTarget as HTMLElement).closest('.story-app');
	const layout = story?.querySelector(selector) as HTMLElement | null;

	if (!layout) {
		return;
	}

	layout.toggleAttribute('drawer-open', !layout.hasAttribute('drawer-open'));
};

const collapseFinanceNav = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.finance-story');
	if (!story) {
		return;
	}
	story.classList.add('is-nav-collapsed');
};

const expandFinanceNav = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.finance-story');
	if (!story) {
		return;
	}
	story.classList.remove('is-nav-collapsed');
};

const toggleFinanceNotifications = (event: Event) => {
	const story = (event.currentTarget as HTMLElement).closest('.finance-story');
	const inner = story?.querySelector('.finance-inner') as HTMLElement | null;
	if (!inner) {
		return;
	}
	inner.toggleAttribute('drawer-open', !inner.hasAttribute('drawer-open'));
};

const closeFinanceNotifications = (event: CustomEvent) => {
	(event.currentTarget as HTMLElement).removeAttribute('drawer-open');
};

export const Default: Story = {
	render: (args) => html`
		<cosmoz-side-drawer-layout
			breakpoint=${args.breakpoint}
			side=${args.side}
			?drawer-open=${args.drawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="drawer">
				<div style="padding: 16px;">Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
		</cosmoz-side-drawer-layout>
	`,
};

export const RightDrawer: Story = {
	args: {
		breakpoint: 1600,
		side: 'right',
		drawerOpen: true,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			breakpoint=${args.breakpoint}
			side=${args.side}
			?drawer-open=${args.drawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="drawer">
				<div style="padding: 16px;">Right Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
		</cosmoz-side-drawer-layout>
	`,
};

export const LeftDrawer: Story = {
	args: {
		breakpoint: 1600,
		side: 'left',
		drawerOpen: true,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			breakpoint=${args.breakpoint}
			side=${args.side}
			?drawer-open=${args.drawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="drawer">
				<div style="padding: 16px;">Left Drawer Content</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
		</cosmoz-side-drawer-layout>
	`,
};

export const AlwaysSideMode: Story = {
	args: {
		breakpoint: 0,
		side: 'left',
		drawerOpen: true,
	},
	render: (args) => html`
		<cosmoz-side-drawer-layout
			breakpoint=${args.breakpoint}
			side=${args.side}
			?drawer-open=${args.drawerOpen}
			@close=${(e: CustomEvent) => args.onClose(e.detail)}
			style="height: 400px; border: 1px solid #ddd;"
		>
			<cosmoz-side-panel slot="drawer">
				<div style="padding: 16px;">Drawer (always side mode)</div>
			</cosmoz-side-panel>
			<div style="padding: 16px;">Main Content Area</div>
		</cosmoz-side-drawer-layout>
	`,
};

export const FinanceDashboard: Story = {
	parameters: {
		layout: 'fullscreen',
	},
	render: () => html`
		<style>
			.finance-story {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				--cosmoz-side-drawer-layout-drawer-width: min(260px, 80cqw);
				background: var(--cz-color-bg-secondary, #f9fafb);
				color: var(--cz-color-text-primary, #181d27);
				font-family: var(--cz-font-body, system-ui, sans-serif);
				box-sizing: border-box;
			}

			.finance-story.is-nav-collapsed {
				--cosmoz-side-drawer-layout-drawer-width: 60px;
			}

			.finance-story .finance-inner {
				--cosmoz-side-drawer-layout-drawer-width: min(420px, 100cqw);
				height: 100%;
			}

			.finance-story cosmoz-side-panel {
				--drawer-margin: 0;
				--drawer-border-radius: 0;
				--drawer-border-top: 0;
				--drawer-border-bottom: 0;
			}

			.finance-story .finance-outer cosmoz-side-panel {
				--drawer-border-right: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
				--drawer-border-left: 0;
				background: var(--fin-nav-bg, #101828);
				color: var(--cz-color-white, #fff);
				min-height: 100vh;
			}

			.finance-story .finance-inner cosmoz-side-panel {
				--drawer-border-left: 1px solid
					var(--cz-color-border-secondary, #e9eaeb);
				--drawer-border-right: 0;
				background: transparent;
			}

			/* ─── Left Nav ─── */

			.fin-nav {
				background: var(--fin-nav-bg, #101828);
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 2);
				height: 100%;
				overflow: hidden;
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
				transition: padding 0.2s ease;
			}

			.fin-nav-brand {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				margin-bottom: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.fin-nav-logo {
				align-items: center;
				background: var(--cz-color-bg-brand-solid, #496dac);
				border-radius: var(--cz-radius-lg, 0.625rem);
				color: var(--cz-color-white, #fff);
				display: inline-grid;
				font-size: var(--cz-text-lg, 1.125rem);
				font-weight: var(--cz-font-weight-bold, 700);
				height: 36px;
				justify-items: center;
				min-width: 36px;
				width: 36px;
			}

			.fin-nav-brand-text {
				font-size: var(--cz-text-lg, 1.125rem);
				font-weight: var(--cz-font-weight-semibold, 600);
				letter-spacing: -0.01em;
			}

			.fin-nav-list {
				display: flex;
				flex-direction: column;
				gap: 2px;
				list-style: none;
				margin: 0;
				padding: 0;
			}

			.fin-nav-item {
				align-items: center;
				background: transparent;
				border: 0;
				border-radius: var(--cz-radius-xl, 0.75rem);
				color: rgb(255 255 255 / 0.7);
				cursor: pointer;
				display: flex;
				font: inherit;
				font-size: var(--cz-text-sm, 0.875rem);
				font-weight: var(--cz-font-weight-medium, 500);
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5)
					calc(var(--cz-spacing, 0.25rem) * 3);
				text-align: left;
				transition:
					background 0.15s ease,
					color 0.15s ease;
				width: 100%;
			}

			.fin-nav-item:hover {
				background: rgb(255 255 255 / 0.08);
				color: rgb(255 255 255 / 0.95);
			}

			.fin-nav-item.active {
				background: rgb(255 255 255 / 0.12);
				color: var(--cz-color-white, #fff);
				font-weight: var(--cz-font-weight-semibold, 600);
			}

			.fin-nav-icon {
				align-items: center;
				display: inline-grid;
				font-size: var(--cz-text-lg, 1.125rem);
				height: 22px;
				justify-items: center;
				width: 22px;
			}

			.fin-nav-spacer {
				flex: 1;
			}

			.fin-nav-collapse-btn,
			.fin-nav-expand-btn {
				align-items: center;
				background: rgb(255 255 255 / 0.06);
				border: 0;
				border-radius: var(--cz-radius-lg, 0.625rem);
				color: rgb(255 255 255 / 0.6);
				cursor: pointer;
				display: flex;
				font: inherit;
				font-size: var(--cz-text-sm, 0.875rem);
				gap: calc(var(--cz-spacing, 0.25rem) * 2);
				padding: calc(var(--cz-spacing, 0.25rem) * 2)
					calc(var(--cz-spacing, 0.25rem) * 3);
				transition:
					background 0.15s ease,
					color 0.15s ease;
				width: 100%;
			}

			.fin-nav-collapse-btn:hover,
			.fin-nav-expand-btn:hover {
				background: rgb(255 255 255 / 0.1);
				color: rgb(255 255 255 / 0.85);
			}

			.fin-nav-expand-btn {
				display: none;
			}

			/* ─── Collapsed Nav ─── */

			.finance-story.is-nav-collapsed .fin-nav {
				padding: calc(var(--cz-spacing, 0.25rem) * 5)
					calc(var(--cz-spacing, 0.25rem) * 2);
			}

			.finance-story.is-nav-collapsed .fin-nav-brand-text,
			.finance-story.is-nav-collapsed .fin-nav-label,
			.finance-story.is-nav-collapsed .fin-nav-collapse-label {
				display: none;
				opacity: 0;
				transition:
					display 0.15s ease allow-discrete,
					opacity 0.15s ease;
			}

			.finance-story.is-nav-collapsed .fin-nav-item {
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5);
			}

			.finance-story.is-nav-collapsed .fin-nav-collapse-btn {
				display: none;
			}

			.finance-story.is-nav-collapsed .fin-nav-expand-btn {
				display: flex;
				padding: calc(var(--cz-spacing, 0.25rem) * 2.5);
			}

			.finance-story.is-nav-collapsed .fin-nav-expand-label {
				display: none;
			}

			/* ─── Main Content ─── */

			.fin-main {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 6);
				min-height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 8);
				width: 100%;
			}

			.fin-topbar {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
				justify-content: space-between;
			}

			.fin-topbar-left {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
			}

			.fin-topbar-left h1,
			.fin-topbar-left p {
				margin: 0;
			}

			.fin-topbar-left h1 {
				font-size: var(--cz-text-xl, 1.25rem);
				letter-spacing: -0.02em;
			}

			.fin-topbar-left p {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
				margin-top: calc(var(--cz-spacing, 0.25rem));
			}

			.fin-hamburger {
				align-items: center;
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-lg, 0.625rem);
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: inline-grid;
				font-size: var(--cz-text-xl, 1.25rem);
				height: 40px;
				justify-items: center;
				transition:
					box-shadow 0.15s ease,
					background 0.15s ease;
				width: 40px;
			}

			.fin-hamburger:hover {
				background: var(--cz-color-bg-secondary, #f9fafb);
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
			}

			.fin-topbar-right {
				align-items: center;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.fin-icon-btn {
				align-items: center;
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-full, 9999px);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				color: var(--cz-color-text-secondary, #414651);
				cursor: pointer;
				display: inline-grid;
				font-size: var(--cz-text-lg, 1.125rem);
				height: 40px;
				justify-items: center;
				position: relative;
				transition:
					box-shadow 0.15s ease,
					transform 0.15s ease;
				width: 40px;
			}

			.fin-icon-btn:hover {
				box-shadow: var(--cz-shadow-sm, 0 1px 3px rgb(10 13 18 / 0.1));
				transform: translateY(-1px);
			}

			.fin-notif-badge {
				background: var(--cz-color-bg-error-solid, #d92d20);
				border: 2px solid var(--cz-color-bg-primary, #fff);
				border-radius: var(--cz-radius-full, 9999px);
				height: 10px;
				position: absolute;
				right: 6px;
				top: 6px;
				width: 10px;
			}

			.fin-avatar {
				align-items: center;
				background: var(--cz-color-bg-brand, #dee6f6);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-text-brand, #496dac);
				display: inline-grid;
				font-weight: var(--cz-font-weight-bold, 700);
				font-size: var(--cz-text-sm, 0.875rem);
				height: 40px;
				justify-items: center;
				width: 40px;
			}

			/* ─── Stat Cards ─── */

			.fin-stats {
				display: grid;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			}

			.fin-stat {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				padding: calc(var(--cz-spacing, 0.25rem) * 5);
			}

			.fin-stat h3,
			.fin-stat p,
			.fin-stat h2 {
				margin: 0;
			}

			.fin-stat-label {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
				font-weight: var(--cz-font-weight-medium, 500);
			}

			.fin-stat-value {
				font-size: var(--cz-text-2xl, 1.5rem);
				font-weight: var(--cz-font-weight-bold, 700);
				letter-spacing: -0.02em;
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1);
			}

			.fin-stat-change {
				align-items: center;
				display: inline-flex;
				font-size: var(--cz-text-xs, 0.75rem);
				font-weight: var(--cz-font-weight-semibold, 600);
				gap: calc(var(--cz-spacing, 0.25rem));
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1);
				padding: calc(var(--cz-spacing, 0.25rem) * 1)
					calc(var(--cz-spacing, 0.25rem) * 2);
				border-radius: var(--cz-radius-full, 9999px);
			}

			.fin-stat-change.up {
				background: var(--cz-color-bg-success, #ecfdf3);
				color: var(--cz-color-text-success, #067647);
			}

			.fin-stat-change.down {
				background: var(--cz-color-bg-error, #fef3f2);
				color: var(--cz-color-text-error, #b42318);
			}

			/* ─── Chart Area ─── */

			.fin-chart-section {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.fin-chart-section h3,
			.fin-chart-section p {
				margin: 0;
			}

			.fin-chart-header {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}

			.fin-chart-header h3 {
				font-size: var(--cz-text-lg, 1.125rem);
				letter-spacing: -0.01em;
			}

			.fin-chart-mocked {
				background:
					linear-gradient(
						135deg,
						var(--cz-color-brand-50, #dee6f6) 0%,
						transparent 40%
					),
					linear-gradient(
						60deg,
						rgb(73 109 172 / 0.18),
						rgb(73 109 172 / 0.04) 60%,
						transparent 60%
					);
				border: 1px solid var(--cz-color-border-tertiary, #f5f5f5);
				border-radius: var(--cz-radius-xl, 0.75rem);
				height: 180px;
				margin-top: calc(var(--cz-spacing, 0.25rem) * 5);
				position: relative;
				overflow: hidden;
			}

			.fin-chart-bar-group {
				align-items: flex-end;
				bottom: 12px;
				display: flex;
				gap: 6px;
				left: 16px;
				position: absolute;
				right: 16px;
			}

			.fin-chart-bar {
				background: var(--cz-color-bg-brand-solid, #496dac);
				border-radius: 3px 3px 0 0;
				flex: 1;
				opacity: 0.7;
			}

			.fin-chart-bar:nth-child(odd) {
				background: linear-gradient(
					180deg,
					var(--cz-color-bg-brand-solid, #496dac),
					rgb(73 109 172 / 0.5)
				);
			}

			/* ─── Transactions ─── */

			.fin-txn-section {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-2xl, 1rem);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.fin-txn-section h3 {
				margin: 0 0 calc(var(--cz-spacing, 0.25rem) * 5);
				font-size: var(--cz-text-lg, 1.125rem);
				letter-spacing: -0.01em;
			}

			.fin-txn-row {
				align-items: center;
				border-bottom: 1px solid var(--cz-color-border-tertiary, #f5f5f5);
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 4);
				padding: calc(var(--cz-spacing, 0.25rem) * 4) 0;
			}

			.fin-txn-row:last-child {
				border-bottom: 0;
			}

			.fin-txn-icon {
				align-items: center;
				border-radius: var(--cz-radius-lg, 0.625rem);
				display: inline-grid;
				font-size: var(--cz-text-lg, 1.125rem);
				height: 40px;
				justify-items: center;
				width: 40px;
			}

			.fin-txn-icon.income {
				background: var(--cz-color-bg-success, #ecfdf3);
				color: var(--cz-color-text-success, #067647);
			}

			.fin-txn-icon.expense {
				background: var(--cz-color-bg-error, #fef3f2);
				color: var(--cz-color-text-error, #b42318);
			}

			.fin-txn-details {
				flex: 1;
			}

			.fin-txn-details p {
				margin: 0;
			}

			.fin-txn-name {
				font-weight: var(--cz-font-weight-medium, 500);
			}

			.fin-txn-date {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-xs, 0.75rem);
			}

			.fin-txn-amount {
				font-weight: var(--cz-font-weight-semibold, 600);
			}

			.fin-txn-amount.income {
				color: var(--cz-color-text-success, #067647);
			}

			.fin-txn-amount.expense {
				color: var(--cz-color-text-error, #b42318);
			}

			/* ─── Notifications Drawer ─── */

			.fin-notif-panel {
				background: var(--cz-color-bg-primary, #fff);
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 5);
				height: 100%;
				overflow: auto;
				padding: calc(var(--cz-spacing, 0.25rem) * 6);
			}

			.fin-notif-header {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}

			.fin-notif-header h2,
			.fin-notif-header p {
				margin: 0;
			}

			.fin-notif-header h2 {
				font-size: var(--cz-text-lg, 1.125rem);
				letter-spacing: -0.01em;
			}

			.fin-notif-count {
				background: var(--cz-color-bg-error-solid, #d92d20);
				border-radius: var(--cz-radius-full, 9999px);
				color: var(--cz-color-white, #fff);
				font-size: var(--cz-text-xs, 0.75rem);
				font-weight: var(--cz-font-weight-semibold, 600);
				padding: calc(var(--cz-spacing, 0.25rem) * 1)
					calc(var(--cz-spacing, 0.25rem) * 2.5);
			}

			.fin-notif-list {
				display: flex;
				flex-direction: column;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
			}

			.fin-notif-item {
				background: var(--cz-color-bg-primary, #fff);
				border: 1px solid var(--cz-color-border-secondary, #e9eaeb);
				border-radius: var(--cz-radius-xl, 0.75rem);
				cursor: pointer;
				display: flex;
				gap: calc(var(--cz-spacing, 0.25rem) * 3);
				padding: calc(var(--cz-spacing, 0.25rem) * 3);
				transition:
					background 0.15s ease,
					box-shadow 0.15s ease;
			}

			.fin-notif-item:hover {
				background: var(--cz-color-bg-secondary, #f9fafb);
				box-shadow: var(--cz-shadow-xs, 0 1px 2px rgb(10 13 18 / 0.05));
			}

			.fin-notif-item.unread {
				border-left: 3px solid var(--cz-color-bg-brand-solid, #496dac);
			}

			.fin-notif-dot {
				align-items: center;
				display: inline-grid;
				font-size: var(--cz-text-sm, 0.875rem);
				height: 36px;
				justify-items: center;
				width: 36px;
				border-radius: var(--cz-radius-full, 9999px);
				flex-shrink: 0;
			}

			.fin-notif-dot.payment {
				background: var(--cz-color-bg-success, #ecfdf3);
				color: var(--cz-color-text-success, #067647);
			}

			.fin-notif-dot.alert {
				background: var(--cz-color-bg-warning, #fffaeb);
				color: var(--cz-color-bg-warning-solid, #dc6803);
			}

			.fin-notif-dot.info {
				background: var(--cz-color-bg-brand, #dee6f6);
				color: var(--cz-color-text-brand, #496dac);
			}

			.fin-notif-body {
				flex: 1;
			}

			.fin-notif-body p {
				margin: 0;
			}

			.fin-notif-title {
				font-weight: var(--cz-font-weight-medium, 500);
				color: var(--cz-color-text-secondary, #535862);
			}

			.fin-notif-time {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-xs, 0.75rem);
				margin-top: calc(var(--cz-spacing, 0.25rem) * 1);
			}

			/* ─── Utility ─── */

			.fin-muted {
				color: var(--cz-color-text-tertiary, #535862);
				font-size: var(--cz-text-sm, 0.875rem);
			}

			@media (max-width: 768px) {
				.fin-stats {
					grid-template-columns: 1fr;
				}

				.fin-main {
					padding: calc(var(--cz-spacing, 0.25rem) * 5);
				}

				.fin-topbar {
					flex-wrap: wrap;
				}
			}
		</style>

		<div class="story-app finance-story">
			<cosmoz-side-drawer-layout
				class="finance-outer"
				side="left"
				@close=${closeDrawer}
				breakpoint="720"
			>
				<cosmoz-side-panel slot="drawer">
					<nav class="fin-nav" aria-label="Finance navigation">
						<div class="fin-nav-brand">
							<span class="fin-nav-logo">F</span>
							<span class="fin-nav-brand-text">Finova</span>
						</div>

						<ul class="fin-nav-list">
							<li>
								<button class="fin-nav-item active" type="button">
									<span class="fin-nav-icon">&#9632;</span>
									<span class="fin-nav-label">Dashboard</span>
								</button>
							</li>
							<li>
								<button class="fin-nav-item" type="button">
									<span class="fin-nav-icon">&#8644;</span>
									<span class="fin-nav-label">Transactions</span>
								</button>
							</li>
							<li>
								<button class="fin-nav-item" type="button">
									<span class="fin-nav-icon">&#9674;</span>
									<span class="fin-nav-label">Investments</span>
								</button>
							</li>
							<li>
								<button class="fin-nav-item" type="button">
									<span class="fin-nav-icon">&#9733;</span>
									<span class="fin-nav-label">Goals</span>
								</button>
							</li>
							<li>
								<button class="fin-nav-item" type="button">
									<span class="fin-nav-icon">&#9881;</span>
									<span class="fin-nav-label">Settings</span>
								</button>
							</li>
						</ul>

						<span class="fin-nav-spacer"></span>

						<button
							class="fin-nav-collapse-btn"
							type="button"
							@click=${collapseFinanceNav}
						>
							<span class="fin-nav-icon">&#8592;</span>
							<span class="fin-nav-collapse-label">Collapse</span>
						</button>
						<button
							class="fin-nav-expand-btn"
							type="button"
							@click=${expandFinanceNav}
						>
							<span class="fin-nav-icon">&#8594;</span>
							<span class="fin-nav-expand-label">Expand</span>
						</button>
					</nav>
				</cosmoz-side-panel>

				<cosmoz-side-drawer-layout
					class="finance-inner"
					side="right"
					breakpoint="9999"
					@close=${closeFinanceNotifications}
				>
					<main class="fin-main">
						<header class="fin-topbar">
							<div class="fin-topbar-left">
								<button
									class="fin-hamburger"
									type="button"
									@click=${toggleDrawer}
									aria-label="Toggle navigation menu"
								>
									&#9776;
								</button>
								<div>
									<h1>Good morning, Alex</h1>
									<p class="fin-muted">
										Here's your financial overview for today.
									</p>
								</div>
							</div>
							<div class="fin-topbar-right">
								<button
									class="fin-icon-btn"
									type="button"
									@click=${toggleFinanceNotifications}
									aria-label="Open notifications"
								>
									&#128276;
									<span class="fin-notif-badge"></span>
								</button>
								<div class="fin-avatar">AK</div>
							</div>
						</header>

						<section class="fin-stats">
							<div class="fin-stat">
								<p class="fin-stat-label">Total Balance</p>
								<h2 class="fin-stat-value">$48,290</h2>
								<span class="fin-stat-change up">&#8593; 12.4%</span>
							</div>
							<div class="fin-stat">
								<p class="fin-stat-label">Monthly Income</p>
								<h2 class="fin-stat-value">$7,840</h2>
								<span class="fin-stat-change up">&#8593; 3.2%</span>
							</div>
							<div class="fin-stat">
								<p class="fin-stat-label">Monthly Expenses</p>
								<h2 class="fin-stat-value">$4,120</h2>
								<span class="fin-stat-change down">&#8595; 1.8%</span>
							</div>
							<div class="fin-stat">
								<p class="fin-stat-label">Savings Rate</p>
								<h2 class="fin-stat-value">47.4%</h2>
								<span class="fin-stat-change up">&#8593; 5.1%</span>
							</div>
						</section>

						<section class="fin-chart-section">
							<div class="fin-chart-header">
								<h3>Revenue Trend</h3>
							</div>
							<div class="fin-chart-mocked">
								<div class="fin-chart-bar-group">
									<div class="fin-chart-bar" style="height: 45%;"></div>
									<div class="fin-chart-bar" style="height: 62%;"></div>
									<div class="fin-chart-bar" style="height: 38%;"></div>
									<div class="fin-chart-bar" style="height: 74%;"></div>
									<div class="fin-chart-bar" style="height: 55%;"></div>
									<div class="fin-chart-bar" style="height: 88%;"></div>
									<div class="fin-chart-bar" style="height: 70%;"></div>
									<div class="fin-chart-bar" style="height: 52%;"></div>
									<div class="fin-chart-bar" style="height: 82%;"></div>
									<div class="fin-chart-bar" style="height: 65%;"></div>
									<div class="fin-chart-bar" style="height: 91%;"></div>
									<div class="fin-chart-bar" style="height: 78%;"></div>
								</div>
							</div>
						</section>

						<section class="fin-txn-section">
							<h3>Recent Transactions</h3>
							<div class="fin-txn-row">
								<span class="fin-txn-icon income">&#8593;</span>
								<div class="fin-txn-details">
									<p class="fin-txn-name">Salary deposit</p>
									<p class="fin-txn-date">Jun 1, 2026</p>
								</div>
								<span class="fin-txn-amount income">+$7,840.00</span>
							</div>
							<div class="fin-txn-row">
								<span class="fin-txn-icon expense">&#8595;</span>
								<div class="fin-txn-details">
									<p class="fin-txn-name">Rent payment</p>
									<p class="fin-txn-date">Jun 1, 2026</p>
								</div>
								<span class="fin-txn-amount expense">-$2,100.00</span>
							</div>
							<div class="fin-txn-row">
								<span class="fin-txn-icon expense">&#8595;</span>
								<div class="fin-txn-details">
									<p class="fin-txn-name">Groceries</p>
									<p class="fin-txn-date">May 30, 2026</p>
								</div>
								<span class="fin-txn-amount expense">-$186.50</span>
							</div>
							<div class="fin-txn-row">
								<span class="fin-txn-icon income">&#8593;</span>
								<div class="fin-txn-details">
									<p class="fin-txn-name">Freelance project</p>
									<p class="fin-txn-date">May 28, 2026</p>
								</div>
								<span class="fin-txn-amount income">+$1,200.00</span>
							</div>
						</section>
					</main>

					<cosmoz-side-panel slot="drawer">
						<aside class="fin-notif-panel" aria-label="Notifications">
							<div class="fin-notif-header">
								<h2>Notifications</h2>
								<span class="fin-notif-count">4 new</span>
							</div>

							<div class="fin-notif-list">
								<div class="fin-notif-item unread">
									<span class="fin-notif-dot payment">&#10003;</span>
									<div class="fin-notif-body">
										<p class="fin-notif-title">Payment received</p>
										<p class="fin-notif-time">2 min ago</p>
									</div>
								</div>
								<div class="fin-notif-item unread">
									<span class="fin-notif-dot alert">&#9888;</span>
									<div class="fin-notif-body">
										<p class="fin-notif-title">Spending limit alert</p>
										<p class="fin-notif-time">18 min ago</p>
									</div>
								</div>
								<div class="fin-notif-item">
									<span class="fin-notif-dot info">&#8505;</span>
									<div class="fin-notif-body">
										<p class="fin-notif-title">Investment maturity</p>
										<p class="fin-notif-time">1 hour ago</p>
									</div>
								</div>
								<div class="fin-notif-item">
									<span class="fin-notif-dot payment">&#10003;</span>
									<div class="fin-notif-body">
										<p class="fin-notif-title">Transfer completed</p>
										<p class="fin-notif-time">3 hours ago</p>
									</div>
								</div>
								<div class="fin-notif-item">
									<span class="fin-notif-dot info">&#8505;</span>
									<div class="fin-notif-body">
										<p class="fin-notif-title">Monthly report ready</p>
										<p class="fin-notif-time">Yesterday</p>
									</div>
								</div>
							</div>
						</aside>
					</cosmoz-side-panel>
				</cosmoz-side-drawer-layout>
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
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				--cosmoz-side-drawer-layout-drawer-width: min(320px, 88cqw);
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
				box-sizing: border-box;
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

			.pizza-story .pizza-inner cosmoz-side-panel {
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

			.pizza-inner {
				--cosmoz-side-drawer-layout-drawer-width: min(460px, 94cqw);
				--cosmoz-side-drawer-layout-backdrop-color: rgb(10 13 18 / 0.22);
				height: 100%;
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
			<cosmoz-side-drawer-layout
				class="pizza-outer"
				side="left"
				@close=${closeDrawer}
			>
				<cosmoz-side-panel slot="drawer">
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
					class="pizza-inner"
					side="right"
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
										toggleDrawerInLayout(event, '.pizza-outer')}
								>
									Order menu
								</button>
								<button
									class="pizza-button"
									type="button"
									@click=${(event: Event) =>
										toggleDrawerInLayout(event, '.pizza-inner')}
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

					<cosmoz-side-panel slot="drawer">
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
