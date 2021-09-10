import React from 'react';

import { ItemContainer } from '../components/form/itemContainer';
import { ItemInput } from '../components/form/itemInput';
export default {
  title: 'Components/Item/ItemContainer',
  component: ItemContainer,
  
};

const Template = (args) => <ItemContainer><ItemInput name="test" placeholder="hello" label="test"></ItemInput></ItemContainer>;

export const ItemContent = Template.bind({});
