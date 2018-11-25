import PrivateNotifications from '../screens/PrivateNotifications'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('Function onFocus', () => {
    let PrivateNotificationsData = renderer.create(<PrivateNotifications/>).getInstance()

    PrivateNotificationsData.onFocus()

    expect(PrivateNotificationsData.onFocus()).toEqual(undefined)

})

it('Function onChangeText', () => {
    let PrivateNotificationsData = renderer.create(<PrivateNotifications/>).getInstance()

    PrivateNotificationsData.onChangeText()

    expect(PrivateNotificationsData.onChangeText()).toEqual(undefined)

})

it('Function updateTitle', () => {
    let PrivateNotificationsData = renderer.create(<PrivateNotifications/>).getInstance()

    PrivateNotificationsData.updateTitle()

    expect(PrivateNotificationsData.updateTitle()).toEqual(undefined)

})

it('_takePhoto', () => {
    let Data = renderer.create(<PrivateNotifications/>).getInstance()

    Data._takePhoto()

    expect(Data._takePhoto()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_pickImage', () => {
    let Data = renderer.create(<PrivateNotifications/>).getInstance()

    Data._pickImage()

    expect(Data._pickImage()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_handleImagePicked', () => {
    let Data = renderer.create(<PrivateNotifications/>).getInstance()

    Data._handleImagePicked()

    expect(Data._handleImagePicked()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})
