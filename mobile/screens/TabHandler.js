import React, { Component } from "react";
import { TabNavigator } from 'react-navigation'
import Feed from './tab_navigator/car_defense/screens/Feed'
import Notifications from './tab_navigator/car_defense/screens/TabNavigator/Notifications/Notifications.js'
import Profile from './tab_navigator/car_defense/screens/TabNavigator/Profile/Profile'
import PrivateFeed from './tab_navigator/car_defense/screens/TabNavigator/PrivateFeed/PrivateFeed'
import { Icon } from 'native-base';


const TabHandler = new TabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="home"
                    style={{ color: '#8bd4da', fontSize: 16 }}
                />
            ),
            header: null,
        }
    },

    Notifications: {
        screen: Notifications,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="send-o"
                    style={{ color: '#8bd4da', fontSize: 15 }}

                />
            ),
            header: null,
        }
    },
    PrivateFeed: {
        screen: PrivateFeed,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="bell-o"
                    style={{ color: '#8bd4da', fontSize: 15 }}
                />
            ),
            header: null,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="user"
                    style={{ color: '#8bd4da', fontSize: 15 }}
                />
            ),
            header: null,
        }
    },
},
    {  
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            swipeEnabled: true,
            activeTintColor: '#318E95',
            inactiveTintColor: '#8bd4da',

            labelStyle: {
                fontSize: 5,
            },
            tabStyle: {
                height: 65,
            },
            style: {
                backgroundColor: 'white',

            },
            animationEnabled: true,
        },

    });


export default TabHandler;