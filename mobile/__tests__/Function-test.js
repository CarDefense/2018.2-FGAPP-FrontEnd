import 'react-native'
import React from 'react'
import Feed from '../screens/tab_navigator/car_defense/screens/Feed'
import renderer from 'react-test-renderer'
import * as register from '../screens/tab_navigator/car_defense/screens/Feed'

// it('Function getFeedInfo', () => {
//     let feedData = renderer.create(<Feed/>).getInstance()

//     feedData.getFeedInfo()

//     expect(feedData.state.isLoading).toEqual()
// })
 

it('Function onRefresh', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData._onRefresh()

    expect(feedData._onRefresh(true)).toEqual(undefined)
    
})

// componentWillUnmount() {
//     this.listener && Expo.Notifications.addListener(this.listen);
//   }
it('Function componentWillUnmount', () => {
    let feedData = renderer.create(<Feed/>).getInstance()

    feedData.componentWillUnmount()

    expect(feedData.componentWillUnmount(true)).toEqual(undefined)
    
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
