import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'react-native-material-textfield';
import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { Icon } from "native-base";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Alert,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';


async function _Alert(){
  Alert.alert('Atenção', 'Recomenda-se o envio de foto de um documento de identificação com foto durante o cadastro.')
}


export default class SignUpScreen extends Component {
  state = {
    loading: false, 
  }

  componentWillMount() {
    _Alert();
  }

  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitUsername = this.onSubmitUsername.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
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
      username_field_alerts: [''],
      uploading: false,
      image: null,
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

  onSubmitEmail() {
    this.username.focus();
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
    let errorEmail = false;
    let errorUserName = false;
    let errorPassword = false;

    ['email']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Digite o email';
          errorEmail = true;
        }
        else {
          if(!value.includes("@") || !value.includes(".com")){
            errors[text] = 'Digite um email válido';
            errorEmail = true;
          }
        }
      });

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
        else {
          if (value.length < 8) {
            errors[text] = 'Use 8 caracteres ou mais para a sua senha';
            errorPassword = true;
          }
          else if (value.length > 15) {
            errors[text] = 'Use 15 caracteres ou menos para a sua senha';
            errorPassword = true;
          }
        }
      });

    if (!errorUserName && !errorPassword && !errorEmail) {
      this.setState({
        loading: true
      });

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
            this.setState({
              loading: false
          });
          }
          else {
            this.setState({ username_field_alerts: [''] })
          }
          if (responseJson.token != undefined ||
            responseJson.key != undefined) {
              this.setState({
                loading: false
            });
            Alert.alert("Conta criada com sucesso!");
            this.props.navigation.navigate('WelcomeScreen')
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
            console.log(err)
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
    let { image } = this.state;

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
                    source={require('../images/icontest.png')}
                    />
                </View>
                <View style={styles.container1}>
                  <TextField
                    ref={this.emailRef}
                    value={data.email}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={this.onFocus}
                    onChangeText={(email) => this.setState({ email })}
                    onSubmitEditing={this.onSubmitEmail}
                    returnKeyType='next'
                    label='Endereço de email'
                    tintColor="white"
                    underlineColorAndroid="transparent"
                    error={errors.email}
                    textColor='white'
                    />
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
                    onSubmitEditing={this.onSubmitUsername}
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
                  <View style={styles.container2}>
                    <TouchableOpacity
                      color="#B2EBF2"
                      onPress={this._takePhoto}
                      containerViewStyle={{ width: '10%' }}
                      >
                      <Icon
                        type='FontAwesome'
                        name="camera"
                        style={{ color: "white" }}
                        />
                    </TouchableOpacity>
                  </View>
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
                  source={require('../images/icontest.png')}
                  />
              </View>
              <View style={styles.container3}>
                <View
                  style={[StyleSheet.absoluteFill, styles.maybeLoading]}>
                  <ActivityIndicator color="#ffffff" size="large" />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      ); 
    }
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={styles.maybeRenderUploading}>
          <ActivityIndicator color="#313869" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    // onPress={this._copyToClipboard}
    // onLongPress={this._share}

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,

      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        console.log(uploadResult.document)

        this.setState({
          image: uploadResult.document
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Falha de Upload, tente novamente.');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = PROFILE_API + '/document/';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('document', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  console.log(uri)

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return fetch(apiUrl, options);
}

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
    height: 100,
    width: 100,
  },
  container1:{
    marginTop: 70,
    marginBottom: 12
  },
  container2: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10
  },
  containerButton: {
    alignItems: 'center',
    marginTop: 6
  },
  button: {
    backgroundColor: "#26C6DA",
    borderRadius: 15,
    height: 40,
    width: 325,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container3: {
    paddingTop: "50%",
  },
  maybeLoading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
  },
  maybeRenderUploading: {
    paddingTop: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
    marginTop: 32,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },

  containerText: {
    margin: 60,
    alignItems: 'center'
  },
});
