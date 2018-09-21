import React, { Component } from "react";
import {
    StyleSheet
} from "react-native";
import {Icon} from 'native-base'

import {TabNavigator} from 'react-navigation'
import VendasApp from './tab_navigator/vendas/VendasApp'
import IndicaAiApp from './tab_navigator/indica_ai/IndicaAiApp'
import RolesApp from './tab_navigator/roles/RolesApp'
import CarDefenseApp from './tab_navigator/car_defense/CarDefenseApp'
import Settings from './tab_navigator/settings/settings'

const TabStackNavigator = new TabNavigator({
    Roles:{
        screen:RolesApp,
        navigationOptions:{
            tabBarLabel:'Eventos',
            tabBarIcon: ({focused}) => (
                <Icon 
                    name="md-star"
                    style= {{color: focused? '#1CBD24' : '#5A5A5A'}}
                />
            )
        }
    },
    Vendas:{
        screen:VendasApp,
        navigationOptions:{
            tabBarLabel:'Vendas',
            tabBarIcon: ({focused}) => (
                <Icon 
                    name="md-cart"
                    style= {{color: focused? '#0EAC6F' : '#5A5A5A'}}
                />
            )
        }
    },
    IndicaAi:{
        screen:IndicaAiApp,
        navigationOptions:{
            tabBarLabel:'IndicaAi',
            tabBarIcon: ({focused}) => (
                <Icon 
                    name="md-locate"
                    style= {{color: focused? '#0AACCC' : '#5A5A5A'}}
                />
            )
        }
    },
    CarDefense:{
        screen:CarDefenseApp,
        navigationOptions:{
            tabBarLabel:'CarDefense',
            tabBarIcon: ({focused}) => (
                <Icon
                    name="md-car"
                    style= {{color: focused? '#5C68C3' : '#5A5A5A'}}
                />
            )
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel:'Configurações',
            tabBarIcon: ({focused}) => (
                <Icon 
                    name="md-settings"
                    style= {{color: focused? '#BD1C5F' : '#5A5A5A'}}
                />
            )
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            backgroundColor: '#171717'
        },
        tabStyle: {
            height: 60,
        },
    },
    animationEnabled: true,
})

class TabHandler extends Component {
    render() {
        return (
            <TabStackNavigator/>
        );
    }
}
export default TabHandler;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});