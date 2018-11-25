import RegisterCar from '../screens/RegisterCar'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('onFoncus', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data.onFocus()

    expect(Data.onFocus()).toEqual(undefined)
})

it('onChangeText', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data.onChangeText()

    expect(Data.onChangeText()).toEqual(undefined)
})

it('onSubmitPlate', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data.onSubmitPlate()

    expect(Data.onSubmitPlate()).toEqual(undefined)
})

it('onSubmitModel', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data.onSubmitModel()

    expect(Data.onSubmitModel()).toEqual(undefined)
})

it('onSubmitColor', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data.onSubmitColor()

    expect(Data.onSubmitColor()).toEqual(undefined)
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
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data._takePhoto()

    expect(Data._takePhoto()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_pickImage', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data._pickImage()

    expect(Data._pickImage()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})

it('_handleImagePicked', () => {
    let Data = renderer.create(<RegisterCar/>).getInstance()

    Data._handleImagePicked()

    expect(Data._handleImagePicked()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})
