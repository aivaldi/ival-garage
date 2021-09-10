import React from 'react';

import { Admin } from '../pages/admin';

export default {
  title: 'Pages/Admin',
  component: Admin,
  
};

const Template = (args) => <Admin {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Admin',
};
