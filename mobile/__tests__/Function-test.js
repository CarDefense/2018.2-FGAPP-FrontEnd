import 'react-native'
import React from 'react'
import Feed from '../screens/tab_navigator/car_defense/screens/Feed'
import renderer from 'react-test-renderer'

it('Function getFeedInfo', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.getFeedInfo()

    expect(feedData.state.isLoading).toEqual()
})


it('Function onRefresh', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData._onRefresh()

    expect(feedData._onRefresh(true)).toEqual()
    
})

// it('Function sendIdData', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.sendIdData()

//     expect(feedData.sendIdData()).toEqual()

// })

it('Function renderItem', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.renderItem()

    expect(feedData.renderItem()).toEqual()

})
