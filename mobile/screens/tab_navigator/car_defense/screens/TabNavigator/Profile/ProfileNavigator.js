import React, { Component } from "react";
import {StackNavigator} from 'react-navigation'

import Profile from './Profile'


export default class ProfileNavigator extends Component {

    render() {
        return (
            <ProfileStackNavigator />
        );
    }
}

const ProfileStackNavigator = new StackNavigator({

    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
})