import Feed from '../screens/tab_navigator/car_defense/screens/Feed'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('Feed snapShot', () => {
    const snap = renderer.create(
        <Feed/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
});
