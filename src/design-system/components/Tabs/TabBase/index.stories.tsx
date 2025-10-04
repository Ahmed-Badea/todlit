import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TabBase } from './index';
import { Circle } from '@unified-checkout/design-system/icons/index';

const meta: Meta<typeof TabBase> = {
  title: 'Components/Tabs/TabBase',
  component: TabBase,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['tabName', 'onClickHandler'] },
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['line', 'contained']
    }
  },
  args: {
    type: 'line',
    active: false,
    disabled: false,
    tabName: 'Tab name',
    tabLabel: 'Tab label',
    onClickHandler: (tabLabel) => action('')(`Label: ${tabLabel}`)
  }
};

export default meta;
type Story = StoryObj<typeof TabBase>;

export const Basic: Story = {};

export const WithLeadingIcon: Story = {
  parameters: {
    controls: { exclude: [...meta?.parameters?.controls.exclude, 'counter'] },
  },
  args: {
    leadingIcon: Circle,
  }
};

export const WithCounter: Story = {
  parameters: {
    controls: { exclude: [...meta?.parameters?.controls.exclude, 'leadingIcon'] },
  },
  args: {
    counter: 5,
  }
};

export const FullFeatured: Story = {
  args: {
    counter: 5,
    leadingIcon: Circle,
  }
};