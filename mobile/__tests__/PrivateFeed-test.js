import Feed from '../screens/tab_navigator/car_defense/screens/TabNavigator/PrivateFeed/PrivateFeed'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('PrivateFeed snapShot', () => {
    const snap = renderer.create(
        <Feed/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})