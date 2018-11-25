import React from 'react';
import TabHandler from '../screens/TabHandler';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<TabHandler />).toJSON();
  expect(tree).toMatchSnapshot();
});