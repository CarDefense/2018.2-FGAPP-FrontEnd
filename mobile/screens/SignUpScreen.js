import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const'

export default class SignUpScreen extends Component {

  static navigationOption = {
    header: 'none'
  }
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);

    this.emailRef = this.updateRef.bind(this, 'email');
    this.usernameRef = this.updateRef.bind(this, 'username');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.state = {
      email: '',
      userName: '',
      password: '',
      secureTextEntry: true,
      username_field_alerts: ['']
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
    ['email', 'username', 'password']
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
    let errorEmail = false;
    let errorUserName = false;
    let errorPassword = false;

    ['email']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Digite um email válido!';
          errorEmail = true;
        }
      });

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
          errors[text] = 'Digite uma senha!';
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

    if (!errorUserName && !errorPassword && !errorEmail) {
      var registration_path = PROFILE_API + '/users/';
      fetch(registration_path, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'username': this.state.username,
          'password': this.state.password
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson));
          if (responseJson.username != undefined) {
            this.setState({ username_field_alerts: ['Um usuário já foi cadastrado com esse nome.'] })
          }
          else {
            this.setState({ username_field_alerts: [''] })
          }
          if (responseJson.token != undefined ||
            responseJson.key != undefined) {
            Alert.alert("Conta criada com sucesso!");
            this.props.navigation.navigate('WelcomeScreen')
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
    let { errors = {}, secureTextEntry, ...data } = this.state;

    return (
          <ImageBackground
            source={{ uri: 'http://cardefense2.eastus.cloudapp.azure.com:8002/media/b9_VpUTIV2.png' }}

            style={{ width: '100%', height: '100%' }}
          >
          <KeyboardAvoidingView behavior="position">
            <ScrollView>
            <View style={styles.container}>
              <View style={styles.containerImage}>
                <Image
                  style={styles.image}
                  source={{ uri: 'http://cardefense2.eastus.cloudapp.azure.com:8002/media/icontest_T8bTMAG.png' }}

                />
              </View>
              <View>
                <TextField
                  ref={this.emailRef}
                  value={data.email}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={(email) => this.setState({ email })}
                  returnKeyType='next'
                  label='Endereço de email'
                  tintColor="#760f9f"
                  underlineColorAndroid="transparent"
                  error={errors.email}
                />
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
                  secureTextEntry={secureTextEntry}
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
                    <Text style={{ color: 'white' }} >Cadastrar</Text>
                  </TouchableOpacity>
                  <FlatList
                    data={this.state.username_field_alerts}
                    renderItem={({ item }) => <Text style={{ color: 'red' }}>{item}</Text>}
                    keyExtractor={item => 'non_field_errors'}
                  />
                </View>
              </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
          </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#540b71",
    borderRadius: 15,
    height: 40,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center'
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

