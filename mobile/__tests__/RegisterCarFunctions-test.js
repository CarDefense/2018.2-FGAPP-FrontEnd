import RegisterCar from '../screens/RegisterCar'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('onFoncus', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData.onFocus()

    expect(feedData.onFocus()).toEqual(undefined)
})

it('onChangeText', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData.onChangeText()

    expect(feedData.onChangeText()).toEqual(undefined)
})

it('onSubmitPlate', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData.onSubmitPlate()

    expect(feedData.onSubmitPlate()).toEqual(undefined)
})

it('onSubmitModel', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData.onSubmitModel()

    expect(feedData.onSubmitModel()).toEqual(undefined)
})

it('onSubmitColor', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData.onSubmitColor()

    expect(feedData.onSubmitColor()).toEqual(undefined)
})

// it('_share', () => {
//     let feedData = renderer.create(<RegisterCar/>).getInstance()

//     feedData._share()

//     expect(feedData._share()).toEqual(undefined)
// })

// it('_copyToClipboard', () => {
//     let feedData = renderer.create(<RegisterCar/>).getInstance()

//     feedData._copyToClipboard()

//     expect(feedData._copyToClipboard()).toEqual(undefined)
// })

it('_takePhoto', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData._takePhoto()

    expect(feedData._takePhoto()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_pickImage', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData._pickImage()

    expect(feedData._pickImage()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_handleImagePicked', () => {
    let feedData = renderer.create(<RegisterCar/>).getInstance()

    feedData._handleImagePicked()

    expect(feedData._handleImagePicked()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})
