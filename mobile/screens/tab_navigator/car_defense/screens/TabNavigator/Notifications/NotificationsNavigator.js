import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'
import Notifications from './Notifications'


export default class NotificationsNavigator extends Component {

    render() {
        return (
            <NotificationsStackNavigator />
        );
    }
}

const NotificationsStackNavigator = new StackNavigator({

    Notificatios: {
        screen: Notifications,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})
