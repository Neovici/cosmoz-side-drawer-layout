import { html } from '@pionjs/pion';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../src/cosmoz-side-panel';

interface StoryArgs {
	'drawer-mode'?: string;
}

const meta: Meta<StoryArgs> = {
	title: 'SidePanel',
	component: 'cosmoz-side-panel',
	tags: ['autodocs'],
	argTypes: {
		'drawer-mode': {
			control: 'select',
			options: ['overlay', 'side'],
			description: 'Container mode — set via CSS custom property by parent layout',
		},
	},
	args: {},
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
	render: () =>
		html`
			<div style="width: 300px; height: 400px; border: 1px solid #ddd;">
				<cosmoz-side-panel>
					<div style="padding: 16px;">Panel Content</div>
				</cosmoz-side-panel>
			</div>
		`,
};