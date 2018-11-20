import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import PublicNotifications from '../screens/PublicNotifications'

it('Function onFocus', () => {
    let publicNotificationsData = renderer.create(<PublicNotifications/>).getInstance()

    publicNotificationsData.onFocus()

    expect(publicNotificationsData.onFocus()).toEqual(undefined)

})

it('Function onChangeText', () => {
    let publicNotificationsData = renderer.create(<PublicNotifications/>).getInstance()

    publicNotificationsData.onChangeText()

    expect(publicNotificationsData.onChangeText()).toEqual(undefined)

})
