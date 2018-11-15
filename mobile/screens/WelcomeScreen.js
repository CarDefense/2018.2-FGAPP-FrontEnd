import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Text,
    TouchableOpacity,
    ImageBackground,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const.js';

class WelcomeScreen extends Component {

    async facebookLogin() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2177002552568068', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            const baseUrl = `https://graph.facebook.com/me?access_token=${token}`
            const fields = '&debug=all&fields=id%2Cfirst_name%2Cpicture%7Burl%7D&format=json&method=get&pretty=0&suppress_http_code=1'
            const response = await fetch(`${baseUrl}${fields}`)
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
        //this.onSubmit = this.onSubmit.bind(this);
        //this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
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

    onSubmitUsername() {
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
                    if (responseJson.non_field_errors != undefined) {
                        this.setState({ non_field_alert: ['Usuário ou senha incorreto(s).'] })
                    }
                    else {
                        this.setState({ non_field_alert: [''] })
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
                    }
                });
        }
        this.setState({ errors });

    }

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;

        return (
            <ImageBackground
                source={require('../images/b6.jpg')}
                style={{ width: '100%', height: '100%' }}
            >
                <KeyboardAvoidingView behavior="position">
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.containerImage}>
                                <Image
                                    style={styles.image}
                                    source={require('../images/icontest.png')}
                                />
                            </View>
                            <View style={styles.container1}>

                                <TextField
                                    ref={this.usernameRef}
                                    value={data.username}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={this.onFocus}
                                    onChangeText={(username) => this.setState({ username })}
                                    onSubmitEditing={this.onSubmitUsername}
                                    returnKeyType='next'
                                    label='Nome de usuário'
                                    tintColor="white"
                                    underlineColorAndroid="transparent"
                                    error={errors.username}
                                    textColor='white'

                                />
                                <TextField
                                    ref={this.passwordRef}
                                    value={data.password}
                                    secureTextEntry={secureTextEntry}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    clearTextOnFocus={true}
                                    onFocus={this.onFocus}
                                    onChangeText={(password) => this.setState({ password })}
                                    onSubmitPassword={this.onSubmitPassword}
                                    returnKeyType='done'
                                    label='Senha'
                                    tintColor="white"
                                    underlineColorAndroid="transparent"
                                    error={errors.password}
                                    maxLength={20}
                                    characterRestriction={15}
                                    renderAccessory={this.renderPasswordAccessory}
                                    textColor='white'
                                />
                                <View style={styles.containerButton}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this._onPressButton()}
                                        containerViewStyle={{ width: '40%' }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }} >Entrar</Text>

                                    </TouchableOpacity>
                                    <FlatList
                                        data={this.state.non_field_alert}
                                        renderItem={({ item }) => <Text style={{ color: 'red' }}>{item}</Text>}
                                        keyExtractor={item => 'non_field_errors'}
                                    />
                                </View>
                                <View style={styles.containerButtonFacebook}>
                                    <Icon.Button
                                        name="facebook"
                                        backgroundColor="#3b5998"
                                        borderRadius={15}
                                        height={40}
                                        justifyContent='center'
                                        onPress={() => this.facebookLogin()}
                                    >
                                        Entrar com Facebook
                                </Icon.Button>
                                </View>
                                <TouchableOpacity
                                    style={styles.button1}
                                    onPress={() => this.props.navigation.navigate('SignUpScreen')}
                                    containerViewStyle={{ width: '40%' }}
                                >
                                    <Text style={{ color: "#B2EBF2" }} >Criar conta</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#26C6DA",
        borderRadius: 15,
        height: 40,
        width: 325,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container1: {
        marginTop: 70,
    },
    button1: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: 15,
        height: 40,
        width: 120,
        alignItems: 'center'

    },
    container: {
        margin: 16,
    },
    containerButton: {
        alignItems: 'center',
        marginTop: 10
    },
    containerButtonFacebook: {
        marginTop: 20,
        marginBottom: 10
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
        height: 170,
        width: 170,
    }
});
