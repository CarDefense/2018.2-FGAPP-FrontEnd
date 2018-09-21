import React, {Component} from "react";
import {
    StyleSheet
} from "react-native";

import {TabNavigator} from 'react-navigation'
import MyProducts from './screens/MyProducts'
import Offers from './screens/Offers'
import OrderedProducts from './screens/OrderedProducts'

const TabStackNavigator = new TabNavigator({
    Offers: {
        screen: Offers,
        navigationOptions: {
            tabBarLabel: 'Ofertas'
        }
    },
    MyProducts:{
        screen: MyProducts,
        navigationOptions: {
            tabBarLabel: 'Meus produtos',
        }
    },
    OrderedProducts: {
        screen: OrderedProducts,
        navigationOptions: {
            tabBarLabel: 'Pedidos'
        }
    }
}, {
    tabBarOptions: {
        showLabel: true,
        showIcon: false,
        tabStyle: {
            height: 40,
        },
    },
})

class TabHandlerVendasApp extends Component {
    render() {
        return (
            <TabStackNavigator/>
        );
    }
}

export default TabHandlerVendasApp;
