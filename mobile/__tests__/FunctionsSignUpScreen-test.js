import 'react-native'
import React from 'react'
import SignUpScreen from '../screens/SignUpScreen'
import renderer from 'react-test-renderer'

it('Function onFocus', () => {
    let signUpSreenData = renderer.create(<SignUpScreen/>).getInstance()

    signUpSreenData.onFocus()

    expect(signUpSreenData.onFocus()).toEqual(undefined)
    
})

// it('Function componentWillUnmount', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.componentWillUnmount()

//     expect(feedData.componentWillUnmount()).toEqual(undefined)
    
// })

// it('Function listen', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()
//     let origin = ''
//     let data = ''

//     feedData.listen(origin, data)

//     expect(feedData.listen(origin, data)).toEqual(undefined)
    
// })

// it('Function componentDidMount', async () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.componentDidMount()

//     expect(feedData.componentDidMount()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
// })