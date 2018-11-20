import PublicNotifications from '../screens/PublicNotifications'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('PublicNotifications snapShot', () => {
    const snap = renderer.create(
        <PublicNotifications/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})