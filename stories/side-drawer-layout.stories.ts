import { html } from '@pionjs/pion';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/cosmoz-side-drawer-layout';
import '../src/cosmoz-side-panel';

interface StoryArgs {
	leftBreakpoint: number;
	rightBreakpoint: number;
	leftDrawerOpen: boolean;
	rightDrawerOpen: boolean;
}

const meta: Meta<StoryArgs> = {
	title: 'SideDrawerLayout',
	component: 'cosmoz-side-drawer-layout',
	tags: ['autodocs'],
	argTypes: {
		leftBreakpoint: {
			control: 'number',
			description: 'Width breakpoint (px) for left drawer side/overlay switch. 0 = always side mode.',
		},
		rightBreakpoint: {
			control: 'number',
			description: 'Width breakpoint (px) for right drawer side/overlay switch. 0 = always side mode.',
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
	},
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
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
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
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
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
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
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
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
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
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
	render: (args) =>
		html`
			<cosmoz-side-drawer-layout
				left-breakpoint=${args.leftBreakpoint}
				right-breakpoint=${args.rightBreakpoint}
				?left-drawer-open=${args.leftDrawerOpen}
				?right-drawer-open=${args.rightDrawerOpen}
				style="height: 400px; border: 1px solid #ddd;"
			>
				<cosmoz-side-panel slot="left-drawer">
					<div style="padding: 16px;">Left Drawer (breakpoint: ${args.leftBreakpoint})</div>
				</cosmoz-side-panel>
				<div style="padding: 16px;">Main Content Area</div>
				<cosmoz-side-panel slot="right-drawer">
					<div style="padding: 16px;">Right Drawer (breakpoint: ${args.rightBreakpoint})</div>
				</cosmoz-side-panel>
			</cosmoz-side-drawer-layout>
		`,
};