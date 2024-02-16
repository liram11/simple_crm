/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import { Error } from "..";

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  const tree = renderer
    .create(<Error message="Some error" />)
    .toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});

// eslint-disable-next-line no-undef
it("does not renders if message is empty", () => {
  const tree = renderer
    .create(<Error message="" />)
    .toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
