/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import Home from "../../screens/Home";

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  const tree = renderer
    .create(<Home id="some_id" value="some value" label="Some Label" onChange={() => {}}/>)
    .toJSON();
    // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
