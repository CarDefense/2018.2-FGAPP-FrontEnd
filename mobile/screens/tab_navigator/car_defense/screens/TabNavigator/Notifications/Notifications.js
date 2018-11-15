import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';


export default class Notifications extends Component {

    PrivateNotifications = () => {
        const { state } = this.props.navigation;
        var user = state.params ? state.params.user : undefined;
        this.props.navigation.navigate('PrivateNotifications', { user: user })
    }

    PublicNotifications = () => {
        const { state } = this.props.navigation;
        var user = state.params ? state.params.user : undefined;
        this.props.navigation.navigate('PublicNotifications', { user: user })
    }


    render() {
        return (
            <ScrollView>
                <View style={{ backgroundColor: '#8bd4da', flex: 1 }}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.PrivateNotifications()}
                        >
                            <Image style={styles.avatar}
                                source={require('../../../../../../images/notification.png')}
                            />
                            <Text style={styles.name}>Envie aqui as notificões</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container1}>
                        <TouchableOpacity
                            onPress={() => this.PublicNotifications()}
                        >
                            <Image style={styles.avatar}
                                source={require('../../../../../../images/alert.png')}
                            />
                            <Text style={styles.name}>Envie aqui os alertas</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100
    },
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    avatar: {
        width: 170,
        height: 170,
        borderRadius: 63,
        borderWidth: 7,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        color: "white",
        fontWeight: '800',
    },
});
