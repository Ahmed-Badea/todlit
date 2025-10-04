import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import type { ITabBase } from 'libs/design-system/src/types/tabs/tab_base';
import { Circle } from '@unified-checkout/design-system/icons/index';
import { TabsGroup } from './index';

const meta: Meta<typeof TabsGroup> = {
  title: 'Components/Tabs/TabsGroup',
  component: TabsGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['line', 'contained']
    },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical']
    }
  },
  args: {
    type: 'line',
    orientation: 'horizontal',
    tabsProps: [
      {
        active: false,
        disabled: false,
        tabLabel: 'Tab1',
        onClickHandler: () => action('Label')(`Tab 1`)
      },
      {
        active: false,
        disabled: false,
        tabLabel: 'Tab2',
        onClickHandler: () => action('Label')(`Tab 2`)
      },
      {
        active: false,
        disabled: false,
        tabLabel: 'Tab3',
        onClickHandler: () => action('Label')(`Tab 3`)
      }
    ]
  }
};

export default meta;
type Story = StoryObj<typeof TabsGroup>;

export const Basic: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    tabsProps: [
      ...meta?.args?.tabsProps?.map(
        (tab) => ({
          ...tab,
          leadingIcon: Circle
        })
      ) as Omit<ITabBase, 'type'>[],
    ]
  }
};

export const WithCounter: Story = {
  args: {
    tabsProps: [
      ...meta?.args?.tabsProps?.map(
        (tab, index) => ({
          ...tab,
          counter: ((index + 1) * 2)
        })
      ) as Omit<ITabBase, 'type'>[],
    ]
  }
};

export const FullFeatured: Story = {
  args: {
    tabsProps: [
      ...meta?.args?.tabsProps?.map(
        (tab, index) => ({
          ...tab,
          leadingIcon: Circle,
          counter: ((index + 1) * 2)
        })
      ) as Omit<ITabBase, 'type'>[],
    ]
  }
};