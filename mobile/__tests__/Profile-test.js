import Profile from '../screens/tab_navigator/car_defense/screens/TabNavigator/Profile/Profile'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('Profile snapShot', () => {
    const snap = renderer.create(
        <Profile/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})