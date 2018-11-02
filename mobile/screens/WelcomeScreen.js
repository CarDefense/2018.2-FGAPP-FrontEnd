import React, { Component } from "react";
import { View, StyleSheet, Button, Alert } from 'react-native';


class WelcomeScreen extends Component {

    async logIn() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2177002552568068', {
            permissions: ['public_profile'],
          });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/v3.2/me?access_token=${token}&debug=all&fields=id%2Cname%2Cemail&format=json&method=get&pretty=0&suppress_http_code=1`);
            const user = (await response.json());
            console.log(user);
            this.props.navigation.navigate('TabHandler', {user:user});
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