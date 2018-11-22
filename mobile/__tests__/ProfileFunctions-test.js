import Profile from '../screens/tab_navigator/car_defense/screens/TabNavigator/Profile/Profile'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('Function _onRefresh', () => {
    let feedData = renderer.create(<Profile/>).getInstance()

    feedData._onRefresh()

    expect(feedData._onRefresh()).toEqual(undefined)
    
})

it('Function componentDidMount', async () => {
    let feedData = renderer.create(<Profile/>).getInstance()

    feedData.componentDidMount()

    expect(feedData.componentDidMount()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
})

// it('registerCar', () => {
//     let feedData = renderer.create(<Profile/>).getInstance()

//     feedData.registerCar()

//     expect(feedData.registerCar()).toEqual(undefined)
// })