import React, { Component } from "react";
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import jwt_decode from 'jwt-decode';
import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const.js';

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
            this.props.navigation.navigate('TabHandler', { user: user });
        }
    }

    static navigationOption = {
        header: 'none'
    }
    constructor(props) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.usernameRef = this.updateRef.bind(this, 'username');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            userName: '',
            password: '',
            secureTextEntry: true,
            non_field_alert: ['']
        };

    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        ['username', 'password']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitUserName() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry ?
            'visibility' :
            'visibility-off';

        return (
            <MaterialIcon
                size={24}
                name={name}
                color={TextField.defaultProps.baseColor}
                onPress={this.onAccessoryPress}
                suppressHighlighting
            />
        );
    }

    _onPressButton = async () => {
        let errors = {};
        let errorUserName = false;
        let errorPassword = false;

        ['username']
            .forEach((text) => {
                let value = this[text].value();

                if (!value) {
                    errors[text] = 'Digite o nome de usuário!';
                    errorUserName = true;
                }
            });

        ['password']
            .forEach((text) => {
                let value = this[text].value();

                if (!value) {
                    errors[text] = 'Digite a senha!';
                    errorPassword = true;
                }
                else {
                    if (value.length < 8) {
                        errors[text] = 'Senha muito curta.';
                    }
                    else if (value.length > 15) {
                        errors[text] = 'Senha muito longa.';
                    }
                }
            });
            
        if (!errorUserName && !errorPassword) {
            var login_path = PROFILE_API + '/token-auth/';
            fetch(login_path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));
                if (responseJson.non_field_errors != undefined){
                    this.setState({ non_field_alert: ['Usuário ou senha incorreto(s).']})
                }
                else{
                    this.setState({ non_field_alert: ['']})
                }
                var token = responseJson.token ? responseJson.token : undefined;
                user = token ? jwt_decode(token) : undefined;
                if (user != undefined || responseJson.key != undefined) {
                    this.props.navigation.navigate('TabHandler', { user: user });
                }
            })
            .catch(err => {
                if (typeof err.text === 'function') {
                    err.text().then(errorMessage => {
                        this.props.dispatch(displayTheError(errorMessage))
                    });
                } else {
                    Alert.alert("Erro na conexão.");
                    console.log(err)
                }
            });
        }
        this.setState({ errors });

    }

    render() {
        let { image } = this.state;
        let { errors = {}, ...data } = this.state;
        let { userName = 'text' } = data;
        let { password = 'text' } = data;

        return (
            <ImageBackground
                source={require('../images/background.jpg')}
                style={{ width: '100%', height: '100%' }}
            >
                <View style={styles.container}>
                    <View style={styles.containerImage}>
                        <Image
                            style={styles.image}
                            source={require('../images/logo.png')}
                        />
                    </View>
                    <View>
                        <TextField
                            ref={this.usernameRef}
                            value={data.username}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={this.onFocus}
                            onChangeText={(username) => this.setState({ username })}
                            returnKeyType='next'
                            label='Nome de usuário'
                            tintColor="#760f9f"
                            underlineColorAndroid="transparent"
                            error={errors.username}
                        />
                        <TextField
                            ref={this.passwordRef}
                            value={data.password}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            onFocus={this.onFocus}
                            onChangeText={(password) => this.setState({ password })}
                            returnKeyType='done'
                            label='Senha'
                            tintColor="#760f9f"
                            underlineColorAndroid="transparent"
                            error={errors.password}
                            maxLength={20}
                            characterRestriction={15}
                            renderAccessory={this.renderPasswordAccessory}
                        />
                        <View style={styles.containerButton}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this._onPressButton()}
                                containerViewStyle={{ width: '40%' }}
                            >
                                <Text style={{ color: 'white' }} >Entrar</Text>
                            </TouchableOpacity>
                            <FlatList
                                data={this.state.non_field_alert}
                                renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
                                keyExtractor={item => 'non_field_errors'}
                            />
                        </View>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={{ color: 'gray' }} >
                            -    -    -    -    -    Ou     -     -    -     -    -
                    </Text>
                    </View>
                    <View style={styles.containerButton}>
                        <TouchableOpacity
                            style={styles.buttonFacebook}
                            onPress={() => this.logIn()}
                            containerViewStyle={{ width: '40%' }}
                        >
                            <Text style={{ color: 'white' }} >Entrar com Facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 30 }}>
                        <TouchableOpacity
                            style={styles.button1}
                            onPress={() => this.props.navigation.navigate('SignUpScreen')}
                            containerViewStyle={{ width: '40%' }}
                        >
                            <Text style={{ color: "#540b71" }} >Criar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: "#000000",
        opacity: 0.9
    },
    button: {
        backgroundColor: "#540b71",
        borderRadius: 15,
        height: 40,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonFacebook: {
        backgroundColor: "#3B5998",
        borderRadius: 15,
        height: 40,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button1: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: 15,
        height: 40,
        width: 120,
    },
    container: {
        margin: 16,
    },
    containerButton: {
        alignItems: 'center'
    },
    containerImage: {
        margin: 30,
        paddingTop: 4,
        paddingRight: 4,
        alignItems: 'center'
    },
    containerText: {
        margin: 60,
        alignItems: 'center'
    },
    image: {
        height: 100,
        width: 100,
    }
});