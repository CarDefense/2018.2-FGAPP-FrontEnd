import React, { Component } from 'react';
import {
    View,
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
        <View
        style={{ backgroundColor: '#00ACC1', flex: 1 }}
        >
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.PrivateNotifications()}
                    >
                        <Image style={styles.avatar}
                            source={ require('../../../../../../images/oie_transparent.png') }
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.container1}>
                    <TouchableOpacity
                        onPress={() => this.PublicNotifications()}
                    >
                        <Image style={styles.avatar}
                            source={require('../../../../../../images/al.png')}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </View>
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
        padding: 50,
    },
    avatar: {
        width: 240,
        height: 240, 
        marginBottom: 10,
        
    },
    name: {
        fontSize: 18,
        color: "white",
        fontWeight: '800',
        justifyContent: "center",
        alignItems: "center"
    },
});
