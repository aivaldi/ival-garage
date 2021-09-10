import React from 'react';

import { MultipleItemContainer } from '../components/form/itemContainer';

export default {
  title: 'Components/Item/MultipleItemContainer',
  component: MultipleItemContainer,
  
};

const Template = (args) => <MultipleItemContainer><span>Content</span> <span>Content Multiple</span></MultipleItemContainer>;

export const MultipleItemContent = Template.bind({});
