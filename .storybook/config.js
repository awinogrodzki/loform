import { configure } from '@storybook/react';

const req = require.context('../src/components', true,  /(\.stories\.ts$)|(\.stories\.tsx$)/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
