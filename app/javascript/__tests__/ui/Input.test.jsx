/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '../../ui/Input';

it('renders correctly', () => {
  const tree = renderer
    .create(<Input id="some_id" value="some value" label="Some Label" onChange={() => {}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
