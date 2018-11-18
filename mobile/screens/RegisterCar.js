import { CAR_API } from '../screens/tab_navigator/car_defense/screens/TabNavigator/const/Const'
import { TextField } from 'react-native-material-textfield';
import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from "react";
import { Icon } from "native-base";
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


async function _Alert() {
  Alert.alert('Atenção', 'Mande uma foto do documento do seu carro para efetuar o cadastro.')
}


export default class RegisterCar extends Component {
  componentWillMount() {
    _Alert();
  }

  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
    //this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitPlate = this.onSubmitPlate.bind(this);
    this.onSubmitModel = this.onSubmitModel.bind(this);
    this.onSubmitColor = this.onSubmitColor.bind(this);

    this.plateRef = this.updateRef.bind(this, 'plate');
    this.modelRef = this.updateRef.bind(this, 'model');
    this.colorRef = this.updateRef.bind(this, 'color');

    this.state = {
      plate: '',
      model: '',
      color: '',
      document: '',
      refreshing: false,
      uploading: false,
      id: '',
      user: '',
      image: null,
      colorIcon: 'white'
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

  //onAccessoryPress() {
  //  this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  //}

  onSubmitPlate() {
    this.model.focus();
  }

  onSubmitModel() {
    this.color.focus();
  }

  onSubmitColor() {
    this.color.blur();
  }

  async componentDidMount() {
    this.setState({ hasError: false, errorMessage: '' })
    const { state } = this.props.navigation;
    this.state.id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
    this.state.user = state.params ? (state.params.user.first_name ? state.params.user.first_name : state.params.user.username) : undefined;

    let link = CAR_API + '/car/?token=' + this.state.id

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

    if (!this.state.image) {
      this.state.colorIcon = 'red'
    }

    if (errorPlate == false && this.state.image) {
      const url = CAR_API + '/validate_car/'
      this.state.document = this.state.image

      let car = JSON.stringify({
        id_token: this.state.id,
        plate: this.state.plate,
        model: this.state.model,
        color: this.state.color,
        document: this.state.document
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
        Alert.alert(jsonResponse)
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


    return (
      <View style={{ backgroundColor: '#00ACC1', flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={require('../images/s.png')}
                  />
                <Text style={styles.name}>Olá, {this.state.user}! Cadastre seus Veículos!</Text>
              </View>
              <View style={styles.borderContainer}>
                <View style={styles.border}>
                  <View style={styles.textContainer}>
                    <TextField
                      ref={this.plateRef}
                      value={data.plate}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={(plate) => this.setState({ plate })}
                      // onChangeText={this.onChangeText}
                      onSubmitEditing={this.onSubmitPlate}
                      returnKeyType='next'
                      label='Placa'
                      tintColor="white"
                      underlineColorAndroid="transparent"
                      maxLength={8}
                      autoCapitalize="characters"
                      error={errors.plate}
                      textColor="white"
                      labelPadding={5}
                      // inputContainerStyle={{ marginHorizontal: 20 }}
                      />
                    <TextField
                      ref={this.modelRef}
                      value={data.model}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={(model) => this.setState({ model })}
                      // onChangeText={this.onChangeText}
                      onSubmitEditing={this.onSubmitModel}
                      returnKeyType='next'
                      label='Modelo'
                      tintColor="white"
                      textColor="white"
                      labelPadding={5}
                      // inputContainerStyle={{ marginHorizontal: 20 }}
                      />
                    <TextField
                      ref={this.colorRef}
                      value={data.color}
                      autoCorrect={false}
                      enablesReturnKeyAutomatically={true}
                      onFocus={this.onFocus}
                      onChangeText={(color) => this.setState({ color })}
                      // onChangeText={this.onChangeText}
                      onSubmitEditing={this.onSubmitMessage}
                      returnKeyType='next'
                      label='Cor'
                      tintColor="white"
                      textColor="white"
                      labelPadding={5}
                      // inputContainerStyle={{ marginHorizontal: 20 }}
                      />
                  </View>
                  <View style={styles.container1}>
                    <TouchableOpacity
                      color="#B2EBF2"
                      onPress={this._takePhoto}
                      containerViewStyle={{ width: '10%' }}
                      >
                        <Icon
                          type='FontAwesome'
                          name="camera"
                          style={{ color: this.state.colorIcon }}
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
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
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
    else{
      this.state.colorIcon = "#26C6DA"
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
  let apiUrl = CAR_API + '/document/';

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
    flex: 1,
  },
  container1: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10
  },
  textContainer: {
    paddingRight: 8,
    paddingLeft: 8,
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
    height: '38%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
    marginTop: 10,
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
    height: 200,
    width: 310,
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
    backgroundColor: '#B2EBF2',
  },
  borderContainer: {
    paddingBottom: 20,
    marginBottom: 20
  }
});
