import PrivateNotifications from '../screens/PrivateNotifications'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('PrivateNotifications snapShot', () => {
    const snap = renderer.create(
        <PrivateNotifications/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})