/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../screens/Home';

it('renders correctly', () => {
  const tree = renderer
    .create(<Home id="some_id" value="some value" label="Some Label" onChange={() => {}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
