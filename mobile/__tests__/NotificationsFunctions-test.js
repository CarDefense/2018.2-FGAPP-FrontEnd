import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Notifications from '../screens/tab_navigator/car_defense/screens/TabNavigator/Notifications/Notifications';

// it('PrivateNotifications', () => {
//     let feedData = renderer.create(<Notifications/>).getInstance()

//     feedData.PrivateNotifications()

//     expect(feedData.PrivateNotifications()).toEqual(undefined)
// })

// it('PublicNotifications', () => {
//     let feedData = renderer.create(<Notifications/>).getInstance()

//     feedData.PublicNotifications()

//     expect(feedData.PublicNotifications()).toEqual(undefined)
// })

test('Notifications snapShot', () => {
    const snap = renderer.create(
        <Notifications/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})