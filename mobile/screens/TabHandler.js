import Notifications from './tab_navigator/car_defense/screens/TabNavigator/Notifications/Notifications.js'
import PrivateFeed from './tab_navigator/car_defense/screens/TabNavigator/PrivateFeed/PrivateFeed'
import Profile from './tab_navigator/car_defense/screens/TabNavigator/Profile/Profile'
import Feed from './tab_navigator/car_defense/screens/Feed'
import { TabNavigator } from 'react-navigation'
import React, { Component } from "react";
import { Icon } from 'native-base';


const TabHandler = new TabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="home"
                    style={{ color: '#26C6DA', fontSize: 20 }}
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
                    style={{ color: '#26C6DA', fontSize: 20 }}

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
                    style={{ color: '#26C6DA', fontSize: 20 }}
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
                    style={{ color: '#26C6DA', fontSize: 20 }}
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
            swipeEnabled: false,
            activeTintColor: 'black',

            labelStyle: {
                fontSize: 5,
            },
            tabStyle: {
                height: 65,
            },
            style: {
                backgroundColor: '#E0F7FA',

            },
            animationEnabled: true,
        },

    });


export default TabHandler;