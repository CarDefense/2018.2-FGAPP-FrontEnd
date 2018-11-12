import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { TabNavigator } from 'react-navigation'
import Feed from './tab_navigator/car_defense/screens/Feed'
import PublicNotifications from './tab_navigator/car_defense/screens/TabNavigator/PublicNotifications/PublicNotifications'
import PrivateNotifications from './tab_navigator/car_defense/screens/TabNavigator/PrivateNotifications/PrivateNotifications'
import RegisterCar from './tab_navigator/car_defense/screens/TabNavigator/RegisterCar/RegisterCar'
import Profile from './tab_navigator/car_defense/screens/TabNavigator/Profile/Profile'
import PrivateFeed from './tab_navigator/car_defense/screens/TabNavigator/PrivateFeed/PrivateFeed'
import { Icon } from 'native-base';


const TabHandler = new TabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="home"
                    style={{ color: '#8bd4da', fontSize: 16 }}
                />
            ),
            headerLeft: null,
        }
    },

    PrivateNotifications: {
        screen: PrivateNotifications,
        navigationOptions: {
            tabBarLabel: 'Notificação',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="send-o"
                    style={{ color: '#8bd4da', fontSize: 15 }}

                />
            ),
            headerLeft: null,
        }
    },
    PublicNotifications: {
        screen: PublicNotifications,
        navigationOptions: {
            tabBarLabel: 'Alerta',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="warning"
                    style={{ color: '#8bd4da', fontSize: 15 }}

                />
            ),
            headerLeft: null,
        }
    },
    RegisterCar: {
        screen: RegisterCar,
        navigationOptions: {
            tabBarLabel: 'Carros',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="car"
                    style={{ color: '#8bd4da', fontSize: 15 }}


                />
            ),
            headerLeft: null,
        }
    },
    PrivateFeed: {
        screen: PrivateFeed,
        navigationOptions: {
            tabBarLabel: 'Feed Privado',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="bell-o"
                    style={{ color: '#8bd4da', fontSize: 15 }}
                />
            ),
            headerLeft: null,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ focused }) => (
                <Icon
                    type='FontAwesome'
                    name="user"
                    style={{ color: '#8bd4da', fontSize: 15 }}
                    />
            ),
            headerLeft: null,
        }
    },
},
            {
        tabBarOptions: {
            showLabel: true,
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