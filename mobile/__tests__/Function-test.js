import 'react-native'
import React from 'react'
import Feed from '../screens/tab_navigator/car_defense/screens/Feed'
import renderer from 'react-test-renderer'

it('Function and state test', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.getFeedInfo()

    expect(feedData.getFeedInfo()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
})