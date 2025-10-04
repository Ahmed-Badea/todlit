import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextArea from './index';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'padded',
    controls: { exclude: ['lang', 'name', 'required', 'onChange', 'autoFocus'] },
  },
  argTypes: {},
  args: {
    maxLength: 500,
    minLength: 0,
    disabled: false,
    readOnly: false,
    autoFocus: false,
    label: "Label",
    optionalText: "optional",
    placeholder: "What's on your mind",
    defaultValue: "",
    value: "",
    helperText: "your opinion matters",
    errorMessage: "",
    showCharactersCount: true
  },
  render: (args) => {
    const [inputValue, setInputValue] = useState('');

    return <TextArea
      {...args}
      value={inputValue}
      onChange={(e) => {
        const value = e.target.value;

        setInputValue(value);
        action('value: ')(value);
      }}
    />
  }
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {};