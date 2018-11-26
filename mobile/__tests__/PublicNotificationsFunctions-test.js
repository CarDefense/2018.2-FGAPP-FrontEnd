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

it('Function updateTitle', () => {
    let publicNotificationsData = renderer.create(<PublicNotifications/>).getInstance()

    publicNotificationsData.updateTitle()

    expect(publicNotificationsData.updateTitle()).toEqual(undefined)

})

it('_takePhoto', () => {
    let Data = renderer.create(<PublicNotifications/>).getInstance()

    Data._takePhoto()

    expect(Data._takePhoto()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_pickImage', () => {
    let Data = renderer.create(<PublicNotifications/>).getInstance()

    Data._pickImage()

    expect(Data._pickImage()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_handleImagePicked', () => {
    let Data = renderer.create(<PublicNotifications/>).getInstance()

    Data._handleImagePicked()

    expect(Data._handleImagePicked()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})
