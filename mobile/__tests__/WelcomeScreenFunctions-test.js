import WelcomeScreen from '../screens/WelcomeScreen'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('facebookLogin', async () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.facebookLogin()

    expect(feedData.facebookLogin()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
})

// it('_onPressButton', async () => {
//     let feedData = renderer.create(<WelcomeScreen/>).getInstance()

//     feedData._onPressButton()

//     expect(feedData._onPressButton()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
// })

it('onFoncus', () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.onFocus()

    expect(feedData.onFocus()).toEqual(undefined)
})

it('onChangeText', () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.onChangeText()

    expect(feedData.onChangeText()).toEqual(undefined)
})

it('onAccessoryPress', () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.onAccessoryPress()

    expect(feedData.onAccessoryPress()).toEqual(undefined)
})

it('onSubmitUsername', () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.onSubmitUsername()

    expect(feedData.onSubmitUsername()).toEqual(undefined)
})

it('onSubmitPassword', () => {
    let feedData = renderer.create(<WelcomeScreen/>).getInstance()

    feedData.onSubmitPassword()

    expect(feedData.onSubmitPassword()).toEqual(undefined)
})
