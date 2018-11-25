import Feed from '../screens/tab_navigator/car_defense/screens/TabNavigator/PrivateFeed/PrivateFeed'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

it('Function _onRefresh', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData._onRefresh()

    expect(feedData._onRefresh()).toEqual(undefined)
    
})

it('Function componentDidMount', async () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.componentDidMount()

    expect(feedData.componentDidMount()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
})

it('_height', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData._height()

    expect(feedData._height(400)).toEqual(undefined)
})