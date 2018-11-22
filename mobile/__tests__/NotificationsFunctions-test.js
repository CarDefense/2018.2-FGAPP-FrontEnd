import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Notifications from '../screens/tab_navigator/car_defense/screens/TabNavigator/Notifications/Notifications';

test('Notifications snapShot', () => {
    const snap = renderer.create(
        <Notifications/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})
