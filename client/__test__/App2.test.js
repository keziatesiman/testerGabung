import React from 'react';
import App2 from '../src/components/App2';

import renderer from 'react-test-renderer';
 
it('renders correctly', () => {
  const tree = renderer
    .create(<App2/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
  
});

