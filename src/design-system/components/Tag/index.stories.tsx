import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tag } from './index';
import { EG } from '@unified-checkout/design-system/icons/countries';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    controls: { exclude: ['type', 'onChangeHandler', 'onClose'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    text: 'Text Tag',
    size: 'lg',
    onClose: action('close icon clicked'),
  },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const TextTag: Story = {};

export const CheckboxTag: Story = {
  args: {
    type: 'checkbox',
    text: 'checkbox Tag',
    onChangeHandler: (checked: boolean) => action('checkbox-checked')(checked),
  },
};

export const CountryTag: Story = {
  args: {
    type: 'country',
    text: 'Egypt',
    country: EG,
  },
};
export const UserTag: Story = {
  args: {
    type: 'user',
    text: 'John Doe',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawkCJpzo3g6nJgWYxidlyQm8Bx3MA6eceYA&s',
  },
  parameters: {
    controls: { exclude: [...meta.parameters?.controls?.exclude, 'img'] },
  },
};
