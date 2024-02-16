/**
 * @jest-environment jsdom
 */

import React from "react";
import renderer from "react-test-renderer";
import { Input } from "../../ui/Input";

// eslint-disable-next-line no-undef
it("renders correctly", () => {
  const tree = renderer
    .create(<Input id="some_id" value="some value" label="Some Label" onChange={() => { }} />)
    .toJSON();
  // eslint-disable-next-line no-undef
  expect(tree).toMatchSnapshot();
});
