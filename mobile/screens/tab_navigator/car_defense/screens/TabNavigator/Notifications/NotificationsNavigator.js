import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import Notifications from './PublicNotifications'


export default class NotificationsNavigator extends Component {

    render() {
        return (
            <PublicNotificationsStackNavigator />
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
