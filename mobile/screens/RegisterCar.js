import React, { Component } from "react";
import { Constants, ImagePicker, Permissions } from 'expo';
import { TextField } from 'react-native-material-textfield';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { CAR_API } from '../screens/tab_navigator/car_defense/screens/TabNavigator/const/Const'
import { Icon } from "native-base";


async function _Alert() {
  Alert.alert('Mande uma foto do documento do seu carro.')
}

export default class RegisterCar extends Component {

  componentWillMount() {
    _Alert();
  }

  constructor(props) {
    super(props);

    this.plateRef = this.updateRef.bind(this, 'plate');
    this.modelRef = this.updateRef.bind(this, 'model');
    this.colorRef = this.updateRef.bind(this, 'color');
    this.onFocus = this.onFocus.bind(this);

    this.state = {
      plate: '',
      model: '',
      color: '',
      refreshing: false,
      uploading: false,
    };
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let text in errors) {
      let ref = this[text];

      if (ref && ref.isFocused()) {
        delete errors[text];
      }
    }

    this.setState({ errors });
  }

  onChangeText(words) {
    ['plate']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
    ['model']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
    ['color']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
  }

  async componentDidMount() {
    this.setState({ hasError: false, errorMessage: '' })
    const { state } = this.props.navigation;
    var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;

    let link = CAR_API + '/car/?token=' + id

    return fetch(link)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressButton = () => {
    let errors = {};
    let errorPlate = false;

    ['plate']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Campo obrigatório.';
          errorPlate = true;
        } else {
          if ('plate' === text && value.length < 8) {
            errors[text] = 'Placa inválida. Ex.:AAA-0000';
            errorPlate = true;
          }
        }
      });

    ['plate']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Campo obrigatório.';
          errorPlate = true;
        } else {
          if ('plate' === text && value.length < 8) {
            errors[text] = 'Placa inválida. Ex.:AAA-0000';
            errorPlate = true;
          }
        }
      });

    ['model']
      .forEach((text) => {
        let value = this[text].value();
      });

    ['color']
      .forEach((text) => {
        let value = this[text].value();
      });


    if (errorPlate == false) {

      const { state } = this.props.navigation;
      var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;

      const url = CAR_API + '/validate_car/' //cars db models url


      let car = JSON.stringify({
        id_token: id,
        plate: this.state.plate,
        model: this.state.model,
        color: this.state.color
      })

      console.log(car)

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: car
      }).then(response => { return response.json() }
      ).then(jsonResponse => {
        console.log(jsonResponse);
        // this.setState({ registered: true, registerMessage: 'Veículo cadastrado!' })
        Alert.alert('Veículo cadastrado!')
      }
      ).catch(error => {
        console.log(error)
        Alert.alert('Erro ao cadastrar!')
      })
    }
    this.setState({ errors });
  }

  updateRef(text, ref) {
    this[text] = ref;
  }

  render() {

    let { errors = {}, ...data } = this.state;
    let { plate = 'text' } = data;
    let { model = 'text' } = data;
    let { color = 'text' } = data;
    const { state } = this.props.navigation;
    var user = state.params ? (state.params.user.name ? state.params.user.name : state.params.user.username) : undefined;


    return (
      <View style={{ backgroundColor: '#00ACC1', flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={require('../images/s.png')}
                />
                <Text style={styles.name}>Olá, {user}! Cadastre seus carros!</Text>
              </View>
              <View style={styles.border}>
                <TextField
                  ref={this.plateRef}
                  value={data.plate}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={(plate) => this.setState({ plate })}
                  // onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitPLate}
                  returnKeyType='next'
                  label='Placa'
                  tintColor="white"
                  underlineColorAndroid="transparent"
                  maxLength={8}
                  autoCapitalize="characters"
                  error={errors.plate}
                  textColor="white"
                  labelPadding={5}
                  inputContainerStyle={{ marginHorizontal: 20 }}
                />
                <TextField
                  ref={this.modelRef}
                  value={data.model}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={(model) => this.setState({ model })}
                  // onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitModel}
                  returnKeyType='next'
                  label='Modelo'
                  tintColor="white"
                  textColor="white"
                  labelPadding={5}
                  inputContainerStyle={{ marginHorizontal: 20 }}
                />
                <TextField
                  ref={this.colorRef}
                  value={data.color}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={this.onFocus}
                  onChangeText={(color) => this.setState({ color })}
                  // onChangeText={this.onChangeText}
                  // onSubmitEditing={this.onSubmitMessage}
                  returnKeyType='next'
                  label='Cor'
                  tintColor="white"
                  textColor="white"
                  labelPadding={5}
                  inputContainerStyle={{ marginHorizontal: 20 }}
                />
                <View style={styles.container1}>
                  <TouchableOpacity
                    color="#B2EBF2"
                    onPress={this._takePhoto}
                    containerViewStyle={{ width: '10%' }}
                  >
                    <Icon
                      type='FontAwesome'
                      name="camera"
                      style={{ color: "#26C6DA" }}
                    />
                  </TouchableOpacity>

                </View>
                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}
                <View style={styles.container1}>
                  <TouchableOpacity
                    style={styles.button}
                    color="#26C6DA"
                    onPress={this.onPressButton}
                    containerViewStyle={{ width: '40%' }}
                  >
                    <Text style={{ color: '#26C6DA', fontWeight: '800', fontSize: 15 }} >Cadastrar</Text>
                  </TouchableOpacity>
                  {/* {this.state.registered ? <Text style={{ flexDirection: 'row', justifyContent: 'center', color: '#5c68c3', marginTop: 20 }}>{this.state.registerMessage}</Text> : null } */}

                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => { //done
    if (this.state.uploading) {
      return (
        <View
          style={styles.maybeRenderUploading}>
          <ActivityIndicator color="#313869" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => { //done
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

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

  _takePhoto = async () => { //Done
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

        console.log(uploadResult.image)

        this.setState({
          image: uploadResult.image
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = CAR_API + '/documents/';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
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
  container1: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10
  },
  header2: {
    color: '#760f9f',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 35,
    fontWeight: '100',
    fontSize: 30,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item2: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4
  },
  text1: {
    color: "#760f9f",
    fontWeight: '200',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: '800',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  box: {
    color: 'white'
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
  userInfo: {
    fontSize: 15,
    color: "white",
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15
  },
  border: {
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: '#B2EBF2'
  }
});

