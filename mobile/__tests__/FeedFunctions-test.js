import 'react-native'
import React from 'react'
import Feed from '../screens/tab_navigator/car_defense/screens/Feed'
import renderer from 'react-test-renderer'

// it('Function getFeedInfo', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.getFeedInfo()

//     expect(feedData.state.isLoading).toEqual()
// })
 

it('Function onRefresh', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData._onRefresh()

    expect(feedData._onRefresh()).toEqual(undefined)
    
})

it('Function componentDidMount', async () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.componentDidMount()

    expect(feedData.componentDidMount()).toEqual({"_40": 0, "_55": null, "_65": 0, "_72": null})
    
})

// it('async function register', async () => {
//     register()
//     // if (status != 'granted') {
//     //     alert('You need to enable permissions in settings');
//     //     return;
//     // }

//     const value = await Expo.Notifications.getExpoPushTokenAsync();
//     tk = value;
//     expect(tk).toBe()
// })

// // it('Function sendIdData', () => {
// //     let feedData = renderer.create(<Feed/>).getInstance()

// //     feedData.sendIdData()

// //     expect(feedData.sendIdData()).toEqual()

// // })

// it('Function renderItem', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.renderItem()

//     expect(feedData.renderItem()).toEqual()

// })
