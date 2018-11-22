import 'react-native'
import React from 'react'
import SignUpScreen from '../screens/SignUpScreen'
import renderer from 'react-test-renderer'

it('Function onFocus', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onFocus()

    expect(signUpSreenData.onFocus()).toEqual(undefined)
    
})

it('Function onChangeText', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onChangeText()

    expect(signUpSreenData.onChangeText()).toEqual(undefined)
    
})


it('Function onAccessoryPress', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onAccessoryPress()

    expect(signUpSreenData.onAccessoryPress()).toEqual(undefined)
    
})

it('Function onSubmitEmail', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onSubmitEmail()

    expect(signUpSreenData.onSubmitEmail()).toEqual(undefined)
    
})

it('Function onSubmitUsername', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onSubmitUsername()

    expect(signUpSreenData.onSubmitUsername()).toEqual(undefined)
    
})

it('Function onSubmitPassword', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onSubmitPassword()

    expect(signUpSreenData.onSubmitPassword()).toEqual(undefined)
    
})

// it('Function onPressButton', async () => {
//     let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

//     expect(signUpSreenData._onPressButton()).toEqual()
    
// })
// it('Function componentDidMount', async () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.componentDidMount()

//     expect(feedData.componentDidMount()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
// })