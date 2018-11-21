import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const.js';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIndicator } from 'react-native-indicators';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
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


class WelcomeScreen extends Component {
    
    async facebookLogin() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2177002552568068', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            const baseUrl = `https://graph.facebook.com/me?access_token=${token}`
            const fields = '&fields=id,first_name,picture{url}'
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
            non_field_alert: [''],
            loading: false,
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
                color={'white'}
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
                    errors[text] = 'Digite o nome de usuário';
                    errorUserName = true;
                }
            });

        ['password']
            .forEach((text) => {
                let value = this[text].value();

                if (!value) {
                    errors[text] = 'Digite uma senha';
                    errorPassword = true;
                }
                // else {
                //     if (value.length < 8) {
                //         errors[text] = 'Senha muito curta.';
                //         errorPassword = true;
                //     }
                //     else if (value.length > 15) {
                //         errors[text] = 'Senha muito longa.';
                //         errorPassword = true;
                //     }
                // }
            });

        if (!errorUserName && !errorPassword) {
            this.setState({
                loading: true
            });

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
                        this.setState({
                            loading: false
                        });
                    }
                    else {
                        this.setState({ non_field_alert: [''] })
                    }
                    var token = responseJson.token ? responseJson.token : undefined;
                    user = token ? jwt_decode(token) : undefined;
                    if (user != undefined || responseJson.key != undefined) {
                        this.props.navigation.navigate('TabHandler', { user: user });
                        this.setState({
                            loading: false
                        });
                    }
                })
                .catch(err => {
                    if (typeof err.text === 'function') {
                        this.setState({
                            loading: false
                        });
                        err.text().then(errorMessage => {
                            this.props.dispatch(displayTheError(errorMessage))
                        });
                    } else {
                        Alert.alert("Erro na conexão.");
                        this.setState({
                            loading: false
                        });
                    }
                });
        }
        this.setState({ errors });

    }

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;

        if(!this.state.loading){
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
                                    source={require('../images/imageedit_1_5249542411.png')}
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
                                    baseColor='white'
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
                                    baseColor='white'
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
                                    <Text style={{ color: "white", fontWeight: "bold" }} >Registrar-se</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                </ImageBackground>
            );
        } else {
            return (
                <ImageBackground
                    source={require('../images/b6.jpg')}
                    style={{ width: '100%', height: '100%' }}
                    >
                    <ScrollView>
                        <View style={styles.container}>
                            <View style={styles.containerImage}>
                                <Image
                                    style={styles.image}
                                    source={require('../images/imageedit_1_5249542411.png')}
                                    />
                            </View>
                            <View style={styles.container2}>
                                <View
                                    style={[StyleSheet.absoluteFill, styles.maybeLoading]}>
                                    <MaterialIndicator
                                        size= {50}
                                        color= "white"
                                        />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            ); 
        }
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    },
    containerImage: {
        margin: 30,
        paddingTop: 4,
        paddingRight: 4,
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200,
    },
    container1: {
        marginTop: 64,
    },
    containerButton: {
        alignItems: 'center',
        marginTop: 12,
    },
    button: {
        backgroundColor: "#26C6DA",
        borderRadius: 15,
        height: 40,
        width: 325,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButtonFacebook: {
        marginTop: 6,
        marginBottom: 12
    },
    button1: {
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderRadius: 15,
        height: 40,
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        paddingTop: "50%",
    },
    maybeLoading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
    },
    containerText: {
        alignItems: 'center'
    },
});
