import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button
} from 'react-native';

process.env.VENDAS_PRODUCTS='https://5baa70ed53adf70014d15d2e.mockapi.io'
process.env.INTEGRA_LOGIN_AUTH='http://5babadabecc1a70014306b40.mockapi.io/api/rest-auth'

class WelcomeScreen extends Component {

    static navigationOption = {
        header: 'none'
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title='log in'
                    onPress={() => this.props.navigation.navigate('LoginScreen')}
                />
                <Button
                    title='Sign Up'
                    onPress={() => this.props.navigation.navigate('SignUpScreen')}
                />
            </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
