import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from 'react-native';

process.env.VENDAS_PRODUCTS='https://5baa70ed53adf70014d15d2e.mockapi.io'
process.env.INTEGRA_LOGIN_AUTH='http://5babadabecc1a70014306b40.mockapi.io/api/rest-auth'

class WelcomeScreen extends Component {

    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2177002552568068', {
            permissions: ['public_profile'],
          });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const id = (await response.json()).id;
            console.log(id);
            this.props.navigation.navigate('TabHandler', {id:id});
         }
      }

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
                <Button
                    title='Entrar com Facebook'
                    onPress={() => this.logIn()}
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